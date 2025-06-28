import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { description, projectType, budget, features } = await request.json()
    
    if (!description) {
      return NextResponse.json(
        { success: false, message: 'Beschreibung ist erforderlich' },
        { status: 400 }
      )
    }

    // Fallback falls OpenAI nicht verfügbar ist
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API Key nicht verfügbar - verwende Fallback')
      return NextResponse.json({
        success: true,
        optimizedDescription: `${description}\n\n✨ Professionell optimiert für ${projectType}-Projekte mit modernen Tools und bewährten Methoden.`
      })
    }

    const prompt = `Du bist ein erfahrener Freelancer für No/Low-Code Entwicklung. Optimiere diese Angebotsbeschreibung für einen professionellen Kunden:

PROJEKT-KONTEXT:
- Projekttyp: ${projectType}
- Budget: ${budget}€
- Features: ${features?.join(', ') || 'Nicht spezifiziert'}

ORIGINAL-BESCHREIBUNG:
${description}

AUFGABE:
Optimiere die Beschreibung für ein professionelles Angebot. Achte auf:

1. **Professionelle Sprache** - Klar, verständlich, überzeugend
2. **Konkrete Leistungen** - Was genau wird geliefert?
3. **Technische Kompetenz** - Zeige Expertise ohne zu technisch zu werden
4. **Nutzen für den Kunden** - Warum ist das wertvoll?
5. **Struktur** - Gut lesbar mit Aufzählungen
6. **Vertrauen schaffen** - Seriös und kompetent

STIL:
- Direkte Ansprache (Sie/Ihr Unternehmen)
- Aktive Formulierungen
- Konkrete Ergebnisse
- Professionell aber persönlich
- Deutsch
- Maximal 300 Wörter

Antworte NUR mit der optimierten Beschreibung, ohne zusätzliche Kommentare.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Du bist ein Experte für professionelle Angebotserstellung im Bereich No/Low-Code Entwicklung."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const optimizedDescription = completion.choices[0]?.message?.content?.trim()

    if (!optimizedDescription) {
      throw new Error('Keine Antwort von OpenAI erhalten')
    }

    return NextResponse.json({
      success: true,
      optimizedDescription
    })

  } catch (error) {
    console.error('Fehler bei der Angebots-Optimierung:', error)
    
    // Fallback bei Fehlern
    const { description } = await request.json()
    return NextResponse.json({
      success: true,
      optimizedDescription: `${description}\n\n✨ Diese Leistung wird mit modernsten No/Low-Code Tools und bewährten Entwicklungsmethoden umgesetzt, um Ihnen eine professionelle und zukunftssichere Lösung zu bieten.`,
      fallback: true
    })
  }
} 