import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-utils'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    requireAuth()
    
    const { briefing, projectScope, techStack, customerName, company, addressStyle } = await request.json()
    
    if (!briefing) {
      return NextResponse.json(
        { message: 'Briefing ist erforderlich' },
        { status: 400 }
      )
    }

    // Fallback falls OpenAI nicht verfügbar ist
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API Key nicht verfügbar - verwende Fallback')
      return NextResponse.json({
        success: true,
        optimizedBriefing: `${briefing}\n\n✨ [KI-Optimierung nicht verfügbar - Original-Briefing beibehalten]`
      })
    }

    const techStackText = techStack && techStack.length > 0 
      ? `\nGeplante Technologien: ${techStack.join(', ')}`
      : ''

    const prompt = `Du bist ein erfahrener Projektmanager und No/Low-Code Entwickler. Optimiere das folgende Projektbriefing für maximale Klarheit und Vollständigkeit.

KONTEXT:
- Kunde: ${customerName}${company ? ` (${company})` : ''}
- Projekttyp: ${projectScope}
- Anrede-Stil: ${addressStyle === 'du' ? 'Du (persönlich)' : 'Sie (förmlich)'}${techStackText}

ORIGINAL-BRIEFING:
${briefing}

AUFGABE:
Optimiere das Briefing nach diesen Kriterien:

1. Struktur und Klarheit
   - Logische Gliederung mit klaren Abschnitten
   - Präzise und verständliche Formulierungen
   - Entfernung von Redundanzen

2. Vollständigkeit
   - Ergänze fehlende wichtige Aspekte
   - Stelle sicher, dass alle Projektphasen abgedeckt sind
   - Berücksichtige technische und gestalterische Anforderungen

3. Professionelle Sprache
   - Verwende Fachterminologie angemessen
   - Klare Ziele und Erwartungen definieren
   - Messbare Erfolgskriterien einbauen

4. Praktische Umsetzung
   - Berücksichtige die geplanten Technologien
   - Realistische Zeitschätzungen
   - Konkrete Deliverables definieren

5. Projektmanagement
   - Meilensteine und Phasen strukturieren
   - Abhängigkeiten identifizieren
   - Risiken und Herausforderungen ansprechen

STIL:
- Professionell aber verständlich
- Sauber strukturiert mit klaren Abschnitten (KEINE Markdown-Formatierung wie ## oder ** verwenden)
- Verwende stattdessen Absätze, Einrückungen und Leerzeilen für Struktur
- Konkret und umsetzungsorientiert
- Deutsch
- Maximal 500 Wörter

WICHTIG:
- Verwende KEINE Markdown-Formatierung (keine ##, **, __, etc.)
- Strukturiere den Text durch Absätze, Einrückungen und klare Gliederung
- Verwende normale Überschriften ohne Markdown-Syntax
- Nutze Leerzeilen und Einrückungen für visuelle Struktur

Antworte NUR mit dem optimierten Briefing, ohne zusätzliche Kommentare oder Erklärungen.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Du bist ein erfahrener Projektmanager und No/Low-Code Entwickler. Du optimierst Projektbriefings für maximale Klarheit, Vollständigkeit und Umsetzbarkeit. WICHTIG: Verwende KEINE Markdown-Formatierung (keine ##, **, __, etc.). Strukturiere den Text durch Absätze, Einrückungen und Leerzeilen für eine saubere, lesbare Gliederung."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.3,
    })

    const optimizedBriefing = completion.choices[0]?.message?.content || briefing

    return NextResponse.json({
      success: true,
      optimizedBriefing
    })

  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { message: 'Nicht authentifiziert' },
        { status: 401 }
      )
    }
    
    console.error('Briefing optimization error:', error)
    return NextResponse.json(
      { message: 'Fehler bei der KI-Optimierung' },
      { status: 500 }
    )
  }
}
