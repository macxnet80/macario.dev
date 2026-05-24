import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { resolveProjectImageUrl } from '@/lib/project-images'
import { sanitizeForPrompt } from '@/lib/security-utils'



// Liste von erlaubten Tailwind Gradients passend zum Midnight Design System
const ALLOWED_GRADIENTS = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-teal-500 to-emerald-500',
  'from-pink-500 to-rose-500',
]

/**
 * Holt den Inhalt einer README.md aus einem öffentlichen GitHub Repository
 */
async function fetchGithubReadme(gitUrl: string): Promise<string> {
  try {
    // Normalisiere URL
    let cleanUrl = gitUrl.trim().replace(/\.git$/, '')
    
    // Regex für GitHub Repository extrahieren
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/
    const match = cleanUrl.match(githubRegex)
    
    if (!match) {
      return ''
    }
    
    const owner = match[1]
    const repo = match[2]
    
    // Versuche README aus 'main' Branch zu laden
    const mainReadmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`
    const mainResponse = await fetch(mainReadmeUrl, { headers: { 'User-Agent': 'macario.dev-scaper' } })
    
    if (mainResponse.ok) {
      return await mainResponse.text()
    }
    
    // Fallback: Versuche 'master' Branch
    const masterReadmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`
    const masterResponse = await fetch(masterReadmeUrl, { headers: { 'User-Agent': 'macario.dev-scaper' } })
    
    if (masterResponse.ok) {
      return await masterResponse.text()
    }
    
    return ''
  } catch (error) {
    console.error('Fehler beim Abrufen der GitHub-README:', error)
    return ''
  }
}

/**
 * Scraped Text-Inhalt und Metadaten von einer Live-URL
 */
async function scrapeUrlContent(url: string): Promise<{ title: string; description: string; text: string }> {
  const result = { title: '', description: '', text: '' }
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
      },
      next: { revalidate: 0 }
    })
    
    if (!response.ok) {
      return result
    }
    
    const html = await response.text()
    
    // Extrahiere Title
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i)
    if (titleMatch) {
      result.title = titleMatch[1].trim()
    }
    
    // Extrahiere Meta Description
    const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i) ||
                      html.match(/<meta\s+content="([\s\S]*?)"\s+name="description"/i)
    if (descMatch) {
      result.description = descMatch[1].trim()
    }
    
    // Säubere HTML Body Text
    let bodyText = html
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '') // Entferne Scripts
      .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')   // Entferne Styles
      .replace(/<[^>]+>/g, ' ')                           // Ersetze HTML Tags mit Leerzeichen
      .replace(/\s+/g, ' ')                               // Komprimiere Whitespaces
      .trim()
    
    result.text = bodyText.substring(0, 4000) // Begrenze auf 4000 Zeichen
    
    return result
  } catch (error) {
    console.error('Fehler beim Scrapen der URL:', error)
    return result
  }
}

export async function POST(request: NextRequest) {
  try {
    const { gitUrl, projectUrl, projectCategory, adminSecret, imageUrl, skipAiScreenshot } = await request.json()
    
    // 1. Authentifizierung prüfen
    const serverSecret = process.env.ADMIN_SECRET || 'dev-secret-123'
    if (!adminSecret || adminSecret !== serverSecret) {
      return NextResponse.json(
        { success: false, message: 'Nicht autorisiert. Falsches Passwort.' },
        { status: 401 }
      )
    }
    
    // 2. Input-Validierung
    if (!gitUrl && !projectUrl) {
      return NextResponse.json(
        { success: false, message: 'Bitte gib mindestens eine Git-Repository-URL oder eine Live-URL an.' },
        { status: 400 }
      )
    }
    
    if (projectCategory !== 'client' && projectCategory !== 'personal') {
      return NextResponse.json(
        { success: false, message: 'Ungültige Kategorie. Muss "client" oder "personal" sein.' },
        { status: 400 }
      )
    }
    
    // 3. Supabase Konfiguration prüfen
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, message: 'Supabase-Datenbank ist nicht konfiguriert.' },
        { status: 500 }
      )
    }
    
    // 4. OpenAI Key prüfen
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'OpenAI API-Key fehlt auf dem Server.' },
        { status: 500 }
      )
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    
    // 5. Daten aus Quellen laden
    let readmeText = ''
    let scrapedText = ''
    let scrapedTitle = ''
    let scrapedDesc = ''
    
    if (gitUrl) {
      console.log(`Lade README von Git: ${gitUrl}`)
      readmeText = await fetchGithubReadme(gitUrl)
    }
    
    if (projectUrl) {
      console.log(`Scrape Webseite: ${projectUrl}`)
      const scraped = await scrapeUrlContent(projectUrl)
      scrapedText = scraped.text
      scrapedTitle = scraped.title
      scrapedDesc = scraped.description
    }
    
    // 6. Inhalt für Prompt aufbereiten
    const promptContext = `
GITHUB README INHALT (falls vorhanden):
${sanitizeForPrompt(readmeText)}

WEBSITE METADATEN (falls vorhanden):
Titel: ${sanitizeForPrompt(scrapedTitle)}
Beschreibung: ${sanitizeForPrompt(scrapedDesc)}

WEBSITE TEXT INHALT (falls vorhanden):
${sanitizeForPrompt(scrapedText)}
`
    
    // 7. OpenAI Prompt definieren
    const systemPrompt = `Du bist ein professioneller Copywriter und Webdesigner für Lars Macario (No/Low-Code Entwickler für KMU).
Deine Aufgabe ist es, aus den gelieferten Informationen (README und/oder Website-Scrape) ein Projektportfolio-Eintrag für Lars' Website zu erstellen.

Das Projekt muss im selben UI präsentiert werden wie seine bestehenden Projekte.
Erzeuge ein JSON-Objekt im exakten Format:
{
  "title": "Aussagekräftiger, kurzer deutscher Projekttitel (z.B. 'Kunden-Portal' oder 'E-Commerce Plattform')",
  "description": "Ein ansprechender, prägnanter Beschreibungstext auf Deutsch (1-2 Sätze), der den Nutzen und die Funktion des Projekts hervorhebt.",
  "tools": ["Liste von 3 bis 5 verwendeten Tools/Technologien (z.B. Next.js, Supabase, n8n, Tailwind CSS, Stripe, OpenAI)"],
  "features": ["3 bis 4 prägnante Key Features (Stichpunkte, Deutsch)"],
  "color": "Einer der folgenden Tailwind CSS Gradient-Klassen: ${ALLOWED_GRADIENTS.join(', ')}"
}

Regeln:
- Antworte AUSSCHLIESSLICH im JSON-Format.
- Der Text muss professionell, verständlich für KMU und auf Deutsch sein.
- Die Tools müssen realistisch anhand der Repository-Daten/Webseite extrahiert werden. Standard-Tools wie Next.js, Supabase, n8n, Tailwind CSS, React, PostgreSQL, Cursor oder OpenAI sind bevorzugt.
- Wähle eine Farbe, die thematisch passt (z.B. grün/teal für Finanzen/Security, blau/cyan für E-Commerce, purple/pink für KI/Modernes).
`

    console.log('Rufe OpenAI auf...')
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analysiere die folgenden Projektdaten und erstelle den JSON-Portfolio-Eintrag:\n\n${promptContext}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2
    })
    
    const responseText = completion.choices[0]?.message?.content?.trim()
    if (!responseText) {
      throw new Error('Keine Antwort von OpenAI erhalten.')
    }
    
    const parsedData = JSON.parse(responseText)
    
    // Validiere OpenAI-Antwortfelder
    if (!parsedData.title || !parsedData.description || !Array.isArray(parsedData.tools) || !Array.isArray(parsedData.features)) {
      throw new Error('Ungültiges Antwortformat von der KI.')
    }
    
    // Stelle sicher, dass die Farbe in der erlaubten Liste ist
    let finalColor = parsedData.color
    if (!ALLOWED_GRADIENTS.includes(finalColor)) {
      finalColor = ALLOWED_GRADIENTS[0] // Fallback: from-blue-500 to-cyan-500
    }
    
    // 8. Finde nächsten order_index in der Datenbank
    const { data: orderData, error: orderError } = await supabase
      .from('projects')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)
      
    if (orderError) {
      console.error('Fehler beim Ermitteln des order_index:', orderError)
    }
    
    const nextOrderIndex = (orderData && orderData.length > 0) ? (orderData[0].order_index + 1) : 1

    // 9. Screenshot / Bild-URL ermitteln
    const finalImageUrl = await resolveProjectImageUrl({
      imageUrl: typeof imageUrl === 'string' ? imageUrl.trim() || null : null,
      projectUrl: projectUrl || null,
      skipAiScreenshot: !!skipAiScreenshot,
    })
    
    // 10. Speichere das Projekt in der Datenbank
    const newProject = {
      title: parsedData.title,
      description: parsedData.description,
      tools: parsedData.tools,
      features: parsedData.features,
      color: finalColor,
      project_category: projectCategory,
      project_url: projectUrl || null,
      git_url: gitUrl || null,
      order_index: nextOrderIndex,
      is_active: true,
      image_url: finalImageUrl,
    }
    
    const { data: insertedData, error: insertError } = await supabase
      .from('projects')
      .insert(newProject)
      .select()
      .single()
      
    if (insertError) {
      throw insertError
    }
    
    console.log('Erfolgreich in DB gespeichert:', insertedData)
    
    return NextResponse.json({
      success: true,
      project: insertedData
    })
    
  } catch (error: any) {
    console.error('Fehler im Generate API-Endpoint:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Ein interner Fehler ist aufgetreten.' },
      { status: 500 }
    )
  }
}
