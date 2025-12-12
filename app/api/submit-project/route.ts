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
      projectType: data.projectType,
      budget: parseInt(String(data.budget)),
      timeline: data.timeline,
      priority: data.priority,
      description: sanitizeInput(data.description, 5000),
      name: sanitizeInput(data.name, 200),
      email: data.email.toLowerCase().trim(),
      company: sanitizeInput(data.company, 200),
      phone: sanitizeInput(data.phone, 50),
      source: sanitizeInput(data.source, 50),
      features: Array.isArray(data.features) ? data.features.map((f: string) => sanitizeInput(f, 200)) : [],
      aiAnalysis: sanitizeInput(data.aiAnalysis, 2000),
      finalPrice: data.finalPrice ? parseInt(String(data.finalPrice)) : null
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
    try {
      const webhookUrl = process.env.N8N_WEBHOOK_PROJEKT_ANFRAGE
      
      if (!webhookUrl) {
        console.error('❌ N8N_WEBHOOK_PROJEKT_ANFRAGE Umgebungsvariable nicht gesetzt')
        throw new Error('Webhook-URL nicht konfiguriert')
      }
      
      // Daten für n8n Webhook formatieren (bereits sanitized)
      const webhookData = {
        timestamp: new Date().toISOString(),
        projectType: sanitizedData.projectType,
        budget: sanitizedData.budget,
        timeline: sanitizedData.timeline,
        priority: sanitizedData.priority,
        description: sanitizedData.description,
        features: sanitizedData.features,
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company || '',
        phone: sanitizedData.phone || '',
        source: sanitizedData.source || 'website',
        aiAnalysis: sanitizedData.aiAnalysis || '',
        finalPrice: sanitizedData.finalPrice
      }

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      })

      if (webhookResponse.ok) {
        console.log('✅ n8n Webhook erfolgreich gesendet')
      } else {
        console.error('❌ n8n Webhook-Fehler:', webhookResponse.status, webhookResponse.statusText)
      }
    } catch (webhookError) {
      console.error('❌ Fehler beim Senden des n8n Webhooks:', webhookError)
      // Webhook-Fehler sollten nicht die gesamte Anfrage zum Scheitern bringen
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