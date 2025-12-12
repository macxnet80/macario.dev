import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { sanitizeForPrompt } from '@/lib/security-utils'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting (5 Requests pro Minute pro IP - OpenAI kostet Geld)
    const ip = getClientIp(request)
    const rateLimit = checkRateLimit(`generate-idea:${ip}`, 5, 60000)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString()
          }
        }
      )
    }

    // Request Size Limit prüfen
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 50000) {
      return NextResponse.json(
        { success: false, message: 'Anfrage zu groß' },
        { status: 413 }
      )
    }

    const { input } = await request.json()
    
    if (!input || !input.trim()) {
      return NextResponse.json(
        { success: false, message: 'Projektbeschreibung ist erforderlich' },
        { status: 400 }
      )
    }

    // Sanitize Input für Prompt Injection Schutz
    const sanitizedInput = sanitizeForPrompt(input)
    
    if (!sanitizedInput || sanitizedInput.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Projektbeschreibung ist erforderlich' },
        { status: 400 }
      )
    }

    // Fallback falls OpenAI nicht verfügbar ist
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API Key nicht verfügbar - verwende Fallback')
      const fallbackIdeas = [
        `Basierend auf Ihrer Projektidee könnte ich eine Mobile App mit KI-gestützter Analyse entwickeln. Die Umsetzung würde etwa 2-3 Wochen dauern.`,
        `Für Ihr Projekt empfehle ich eine Lösung mit modernen No/Low-Code Tools. Wir könnten automatisierte Workflows integrieren und das Ganze in 1-2 Wochen fertigstellen.`,
        `Interessante Idee! Für Ihr Projekt würde sich eine Web-Applikation anbieten. Mit modernen Tools können wir ein benutzerfreundliches Interface umsetzen.`
      ]
      return NextResponse.json({
        success: true,
        idea: fallbackIdeas[Math.floor(Math.random() * fallbackIdeas.length)]
      })
    }

    const prompt = `Du bist Lars Macario, ein erfahrener No/Low-Code Entwickler. 

Analysiere diese Projektidee und gib einen konkreten, realistischen Umsetzungsvorschlag:

PROJEKTIDEE: "${sanitizedInput}"

DEINE EXPERTISE:
- Cursor für schnelle Entwicklung
- Supabase für Backend & Datenbank
- Vercel für Deployment
- n8n für Automatisierungen
- Moderne Web-Technologien

ANTWORT-FORMAT:
Basierend auf "[PROJEKTIDEE]" könnte ich dir eine [LÖSUNGSART] mit [HAUPTFEATURE] entwickeln. Die Umsetzung würde etwa [ZEITRAHMEN] dauern.

REGELN:
- Konkret und realistisch
- Erwähne passende Tools aus deinem Stack
- Zeitschätzung: 1-2 Wochen, 2-3 Wochen, 3-4 Wochen oder 1-2 Monate
- Lösungsarten: Mobile App, Web-Applikation, Dashboard, Automatisierung, Portal
- Hauptfeatures: KI-Integration, Echtzeit-Sync, automatisierte Workflows, benutzerfreundliches Interface, intelligente Datenverarbeitung
- Maximal 2 Sätze
- Deutsch
- Motivierend und professionell`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Du bist Sam, der Assistent von Lars Macario, ein No/Low-Code Entwickler. Du gibst konkrete, realistische Projektvorschläge basierend auf modernen Tools."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    })

    const idea = completion.choices[0]?.message?.content?.trim()

    if (!idea) {
      throw new Error('Keine Antwort von OpenAI erhalten')
    }

    return NextResponse.json({
      success: true,
      idea
    })

  } catch (error) {
    console.error('Fehler bei der Ideen-Generierung:', error)
    
    // Fallback bei Fehlern (ohne User-Input zu verwenden)
    const fallbackIdeas = [
      `Basierend auf Ihrer Projektidee könnte ich eine innovative Lösung mit modernen No/Low-Code Tools entwickeln. Die Umsetzung würde etwa 2-3 Wochen dauern.`,
      `Für Ihr Projekt empfehle ich eine maßgeschneiderte Web-Applikation mit automatisierten Workflows. Das Projekt wäre in 1-2 Wochen umsetzbar.`,
      `Interessante Idee! Für Ihr Projekt würde sich eine intelligente Plattform mit Echtzeit-Features anbieten. Mit modernen Tools schnell realisierbar.`
    ]
    
    return NextResponse.json({
      success: true,
      idea: fallbackIdeas[Math.floor(Math.random() * fallbackIdeas.length)],
      fallback: true
    })
  }
} 