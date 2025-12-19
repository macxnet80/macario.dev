import { NextRequest, NextResponse } from 'next/server'
import { 
  isValidEmail, 
  sanitizeInput, 
  isValidBudget, 
  isValidProjectType, 
  isValidTimeline, 
  isValidPriority,
  sanitizeForLogging 
} from '@/lib/security-utils'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting (10 Requests pro Minute pro IP)
    const ip = getClientIp(request)
    const rateLimit = checkRateLimit(`submit-project:${ip}`, 10, 60000)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString()
          }
        }
      )
    }

    // Request Size Limit prüfen (max 100KB)
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 100000) {
      return NextResponse.json(
        { success: false, message: 'Anfrage zu groß' },
        { status: 413 }
      )
    }

    const data = await request.json()
    
    // Validierung der erforderlichen Felder
    const requiredFields = ['projectType', 'budget', 'timeline', 'priority', 'description', 'name', 'email']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Fehlende Felder: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Input-Validierung
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      )
    }

    if (!isValidProjectType(data.projectType)) {
      return NextResponse.json(
        { success: false, message: 'Ungültiger Projekttyp' },
        { status: 400 }
      )
    }

    if (!isValidBudget(data.budget)) {
      return NextResponse.json(
        { success: false, message: 'Ungültiges Budget' },
        { status: 400 }
      )
    }

    if (!isValidTimeline(data.timeline)) {
      return NextResponse.json(
        { success: false, message: 'Ungültige Timeline' },
        { status: 400 }
      )
    }

    if (!isValidPriority(data.priority)) {
      return NextResponse.json(
        { success: false, message: 'Ungültige Priorität' },
        { status: 400 }
      )
    }

    // Sanitize Input
    const sanitizedData = {
      projectType: data.projectType, // ID für Validierung
      projectTypeLabel: sanitizeInput(data.projectTypeLabel, 100), // Label für Webhook
      budget: parseInt(String(data.budget)),
      timeline: data.timeline, // ID für Validierung
      timelineLabel: sanitizeInput(data.timelineLabel, 100), // Label für Webhook
      priority: data.priority, // ID für Validierung
      priorityLabel: sanitizeInput(data.priorityLabel, 100), // Label für Webhook
      description: sanitizeInput(data.description, 5000),
      name: sanitizeInput(data.name, 200),
      email: data.email.toLowerCase().trim(),
      company: sanitizeInput(data.company, 200),
      phone: sanitizeInput(data.phone, 50),
      source: sanitizeInput(data.source, 50), // ID für Validierung
      sourceLabel: sanitizeInput(data.sourceLabel, 100), // Label für Webhook
      features: Array.isArray(data.features) ? data.features.map((f: string) => sanitizeInput(f, 200)) : [],
      aiAnalysis: sanitizeInput(data.aiAnalysis, 2000),
      finalPrice: data.finalPrice ? parseInt(String(data.finalPrice)) : null,
      privacyAccepted: Boolean(data.privacyAccepted),
      marketingAccepted: Boolean(data.marketingAccepted)
    }

    // Logge ohne sensitive Daten
    console.log('Neue Projektanfrage:', sanitizeForLogging({
      timestamp: new Date().toISOString(),
      projectType: sanitizedData.projectType,
      budget: sanitizedData.budget,
      timeline: sanitizedData.timeline,
      priority: sanitizedData.priority,
      source: sanitizedData.source
    }))

    // n8n Webhook senden
    let webhookSuccess = false
    try {
      const webhookUrl = process.env.N8N_WEBHOOK_PROJEKT_ANFRAGE
      
      if (!webhookUrl) {
        console.error('❌ N8N_WEBHOOK_PROJEKT_ANFRAGE Umgebungsvariable nicht gesetzt')
        throw new Error('Webhook-URL nicht konfiguriert')
      }
      
      // Daten für n8n Webhook formatieren (bereits sanitized)
      // Verwende Labels für bessere Lesbarkeit im Webhook
      const webhookData = {
        timestamp: new Date().toISOString(),
        projectType: sanitizedData.projectTypeLabel || sanitizedData.projectType,
        projectTypeId: sanitizedData.projectType, // ID zusätzlich mitsenden
        budget: sanitizedData.budget,
        timeline: sanitizedData.timelineLabel || sanitizedData.timeline,
        timelineId: sanitizedData.timeline, // ID zusätzlich mitsenden
        priority: sanitizedData.priorityLabel || sanitizedData.priority,
        priorityId: sanitizedData.priority, // ID zusätzlich mitsenden
        description: sanitizedData.description,
        features: sanitizedData.features,
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company || '',
        phone: sanitizedData.phone || '',
        source: sanitizedData.sourceLabel || sanitizedData.source || 'website',
        sourceId: sanitizedData.source, // ID zusätzlich mitsenden
        aiAnalysis: sanitizedData.aiAnalysis || '',
        finalPrice: sanitizedData.finalPrice,
        privacyAccepted: sanitizedData.privacyAccepted,
        marketingAccepted: sanitizedData.marketingAccepted
      }

      console.log('📤 Sende Webhook an:', webhookUrl)
      console.log('📦 Webhook-Daten:', JSON.stringify(webhookData, null, 2))

      // Timeout Controller für Webhook
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        const responseText = await webhookResponse.text()
        
        if (webhookResponse.ok) {
          console.log('✅ n8n Webhook erfolgreich gesendet')
          console.log('📥 Webhook-Antwort:', responseText.substring(0, 200))
          webhookSuccess = true
        } else {
          console.error('❌ n8n Webhook-Fehler:', webhookResponse.status, webhookResponse.statusText)
          console.error('❌ Webhook-Antwort:', responseText.substring(0, 500))
          throw new Error(`Webhook-Fehler: ${webhookResponse.status} ${webhookResponse.statusText}`)
        }
      } finally {
        clearTimeout(timeoutId)
      }
    } catch (webhookError: any) {
      console.error('❌ Fehler beim Senden des n8n Webhooks:', webhookError)
      if (webhookError.name === 'AbortError' || webhookError.message?.includes('aborted')) {
        console.error('❌ Webhook-Timeout nach 10 Sekunden')
      }
      // Webhook-Fehler sollten nicht die gesamte Anfrage zum Scheitern bringen,
      // aber wir loggen es deutlich
      console.error('⚠️ Projektanfrage wird trotz Webhook-Fehler als erfolgreich markiert')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Projektanfrage erfolgreich übermittelt'
    })

  } catch (error) {
    console.error('Fehler beim Speichern der Projektanfrage:', error)
    return NextResponse.json(
      { success: false, message: 'Fehler beim Übermitteln der Anfrage' },
      { status: 500 }
    )
  }
} 