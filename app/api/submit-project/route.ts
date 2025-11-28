import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
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

    console.log('Neue Projektanfrage:', {
      timestamp: new Date().toISOString(),
      projectType: data.projectType,
      budget: data.budget,
      timeline: data.timeline,
      priority: data.priority,
      description: data.description,
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone
    })

    // n8n Webhook senden
    try {
      const webhookUrl = process.env.N8N_WEBHOOK_PROJEKT_ANFRAGE
      
      if (!webhookUrl) {
        console.error('❌ N8N_WEBHOOK_PROJEKT_ANFRAGE Umgebungsvariable nicht gesetzt')
        throw new Error('Webhook-URL nicht konfiguriert')
      }
      
      // Daten für n8n Webhook formatieren
      const webhookData = {
        timestamp: new Date().toISOString(),
        projectType: data.projectType,
        budget: parseInt(data.budget),
        timeline: data.timeline,
        priority: data.priority,
        description: data.description,
        features: data.features || [],
        name: data.name,
        email: data.email,
        company: data.company || '',
        phone: data.phone || '',
        aiAnalysis: data.aiAnalysis || '',
        finalPrice: data.finalPrice || null,
        source: 'website'
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