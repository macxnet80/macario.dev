import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json()
    
    if (!input || !input.trim()) {
      return NextResponse.json(
        { success: false, message: 'Projektbeschreibung ist erforderlich' },
        { status: 400 }
      )
    }

    // Fallback falls OpenAI nicht verfügbar ist
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API Key nicht verfügbar - verwende Fallback')
      const fallbackIdeas = [
        `Basierend auf "${input}" könnte ich dir eine Mobile App mit KI-gestützter Analyse entwickeln. Die Umsetzung würde etwa 2-3 Wochen dauern.`,
        `Für "${input}" empfehle ich eine Lösung mit Supabase und n8n. Wir könnten automatisierte Workflows integrieren und das Ganze in 1-2 Wochen fertigstellen.`,
        `Interessante Idee! Für "${input}" würde sich eine Web-Applikation anbieten. Mit Vercel können wir ein benutzerfreundliches Interface umsetzen.`
      ]
      return NextResponse.json({
        success: true,
        idea: fallbackIdeas[Math.floor(Math.random() * fallbackIdeas.length)]
      })
    }

    const prompt = `Du bist Lars Macario, ein erfahrener No/Low-Code Entwickler. 

Analysiere diese Projektidee und gib einen konkreten, realistischen Umsetzungsvorschlag:

PROJEKTIDEE: "${input}"

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
    
    // Fallback bei Fehlern
    const { input } = await request.json()
    const fallbackIdeas = [
      `Basierend auf "${input}" könnte ich dir eine innovative Lösung mit modernen No/Low-Code Tools entwickeln. Die Umsetzung würde etwa 2-3 Wochen dauern.`,
      `Für "${input}" empfehle ich eine maßgeschneiderte Web-Applikation mit automatisierten Workflows. Das Projekt wäre in 1-2 Wochen umsetzbar.`,
      `Interessante Idee! Für "${input}" würde sich eine intelligente Plattform mit Echtzeit-Features anbieten. Mit modernen Tools schnell realisierbar.`
    ]
    
    return NextResponse.json({
      success: true,
      idea: fallbackIdeas[Math.floor(Math.random() * fallbackIdeas.length)],
      fallback: true
    })
  }
} 