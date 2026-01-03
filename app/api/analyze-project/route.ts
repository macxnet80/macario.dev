import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { sanitizeForPrompt, isValidProjectType, isValidBudget, isValidTimeline, isValidPriority } from '@/lib/security-utils'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting (5 Requests pro Minute pro IP - OpenAI kostet Geld)
    const ip = getClientIp(request)
    const rateLimit = checkRateLimit(`analyze-project:${ip}`, 5, 60000)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { analysis: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
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
        { analysis: 'Anfrage zu groß. Bitte versuchen Sie es mit weniger Text.' },
        { status: 413 }
      )
    }

    const data = await request.json()

    // Validierung
    if (data.projectType && !isValidProjectType(data.projectType)) {
      return NextResponse.json(
        { analysis: 'Ungültiger Projekttyp' },
        { status: 400 }
      )
    }

    if (data.budget && !isValidBudget(data.budget)) {
      return NextResponse.json(
        { analysis: 'Ungültiges Budget' },
        { status: 400 }
      )
    }

    if (data.timeline && !isValidTimeline(data.timeline)) {
      return NextResponse.json(
        { analysis: 'Ungültige Timeline' },
        { status: 400 }
      )
    }

    if (data.priority && !isValidPriority(data.priority)) {
      return NextResponse.json(
        { analysis: 'Ungültige Priorität' },
        { status: 400 }
      )
    }
    
    const projectTypes = {
      'trainer-website': 'Trainer-Website',
      'booking-app': 'Buchungs-App',
      'client-portal': 'Kunden-Portal',
      'studio-management': 'Studio-Management',
      'ai-assistant': 'KI-Assistent',
      automation: 'Automatisierung'
    }

    const priorities = {
      speed: 'Schnelle Umsetzung',
      quality: 'Höchste Qualität',
      budget: 'Kostenoptimiert',
      features: 'Maximale Features'
    }

    const timelineLabels = {
      '1-2-weeks': '1-2 Wochen',
      '3-4-weeks': '3-4 Wochen', 
      '1-2-months': '1-2 Monate',
      '3-6-months': '3-6 Monate',
      'flexible': 'Flexibel'
    }

    const prompt = `
Du bist Sam, der KI-Assistent von Lars Macario (No/Low-Code Entwickler spezialisiert auf Fitness-Branche). 

Analysiere das folgende Fitness-Projekt kritisch und realistisch:

PROJEKTDATEN:
- Gewählter Typ: ${projectTypes[data.projectType as keyof typeof projectTypes] || 'Nicht spezifiziert'}
- Budget: ${data.budget || 'Nicht spezifiziert'}€
- Timeline: ${timelineLabels[data.timeline as keyof typeof timelineLabels] || 'Nicht spezifiziert'}
- Priorität: ${priorities[data.priority as keyof typeof priorities] || 'Nicht spezifiziert'}
- Beschreibung: ${sanitizeForPrompt(data.description) || 'Keine Beschreibung angegeben'}

STRUKTUR - verwende EXAKT dieses Format:

Hi! Sam hier 👋 die KI-Assistentin von Lars

**Projekt-Check:** [Bewertung ob Typ zur Beschreibung passt - 1 Satz]

**Budget & Timeline:** [Optimistische Bewertung - 1-2 Sätze, nicht zu streng]

**Meine Einschätzung:** [Kurze motivierende Bewertung - 1-2 Sätze]

**Wie geht's weiter?**
[Bei klaren Projekten: "Lars meldet sich zeitnah zurück" / Bei Unklarheiten: Terminvorschlag]

REGELN:
- KEINE Tool-Namen (Cursor, Supabase, etc.)
- NICHT über Prototypen sprechen
- Locker und freundlich
- Max. 120 Wörter
- Emojis sparsam verwenden
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Du bist Sam, der KI-Assistent von Lars Macario. Du gibst ehrliche, direkte und realistische Projektanalysen. Sei prägnant und hilfreich."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.6,
    })

    const analysis = completion.choices[0]?.message?.content || 
      'Dein Projekt sieht sehr vielversprechend aus! Basierend auf deinen Angaben kann ich eine maßgeschneiderte Lösung entwickeln, die perfekt zu deinen Anforderungen passt. Ich freue mich darauf, mehr Details mit dir zu besprechen.'

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // Fallback analysis
    const fallbackAnalysis = `
Hi! Sam hier 👋 die KI-Assistentin von Lars

**Projekt-Check:** Der gewählte Projekttyp passt gut zu deiner Beschreibung.

**Budget & Timeline:** Deine Angaben sind ambitioniert, aber mit modernen Ansätzen durchaus machbar!

**Meine Einschätzung:** Spannendes Projekt mit klarem Mehrwert - Lars freut sich schon darauf!

**Wie geht's weiter?**
Lars meldet sich zeitnah mit einem detaillierten Angebot zurück.
    `

    return NextResponse.json({ analysis: fallbackAnalysis.trim() })
  }
} 