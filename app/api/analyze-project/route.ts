import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const projectTypes = {
      website: 'Moderne Website',
      webapp: 'Web-Anwendung', 
      ecommerce: 'E-Commerce',
      automation: 'Automatisierung',
      ai: 'KI-Integration'
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
Du bist Sam, der KI-Assistent von Lars Macario (No/Low-Code Entwickler). 

Analysiere das folgende Projekt kritisch und realistisch:

PROJEKTDATEN:
- Gewählter Typ: ${projectTypes[data.projectType as keyof typeof projectTypes] || data.projectType}
- Budget: ${data.budget}€
- Timeline: ${timelineLabels[data.timeline as keyof typeof timelineLabels] || data.timeline}
- Priorität: ${priorities[data.priority as keyof typeof priorities] || data.priority}
- Beschreibung: ${data.description || 'Keine Beschreibung angegeben'}

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
      model: "gpt-4",
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