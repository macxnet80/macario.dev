import { NextRequest, NextResponse } from 'next/server'
import { projectRequestsApi, isSupabaseConfigured } from '@/lib/supabase'

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

    // Daten für Supabase vorbereiten
    const projectRequest = {
      project_type: data.projectType,
      budget: parseInt(data.budget),
      timeline: data.timeline,
      priority: data.priority,
      description: data.description,
      features: data.features || [],
      name: data.name,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      ai_analysis: data.aiAnalysis || null,
      status: 'new' as const,
      notes: null,
      
      // Adress-Felder (optional)
      street: null,
      postal_code: null,
      city: null,
      country: null,
      
      // Angebots-Felder (werden später vom Admin gesetzt)
      offer_amount: null,
      offer_date: null,
      offer_status: null,
      contract_status: null,
      offer_description: null,
      offer_description_optimized: null,
      
      // Business-Felder (werden später vom Admin gesetzt)
      lead_source: 'website' as const,
      priority_level: null,
      next_followup: null,
      estimated_hours: null,
      hourly_rate: null,
      
      // Tracking-Felder (werden automatisch gesetzt)
      first_contact_date: new Date().toISOString(),
      last_contact_date: null,
      project_start_date: null,
      project_end_date: null
    }

    console.log('Neue Projektanfrage:', {
      timestamp: new Date().toISOString(),
      ...projectRequest
    })

    let savedRequestId: number | null = null

    // Daten in Supabase speichern
    if (isSupabaseConfigured()) {
      try {
        const savedRequest = await projectRequestsApi.createProjectRequest(projectRequest)
        savedRequestId = savedRequest.id
        console.log('✅ Projektanfrage erfolgreich in Supabase gespeichert:', savedRequest.id)
      } catch (supabaseError) {
        console.error('❌ Supabase-Fehler:', supabaseError)
        // Fallback: Auch wenn Supabase fehlschlägt, fahren wir fort
      }
    } else {
      console.warn('⚠️ Supabase nicht konfiguriert - Daten nur geloggt')
    }

    // n8n Webhook senden (parallel zur Supabase-Speicherung)
    try {
      const webhookUrl = 'https://auto.macario.dev/webhook/125bf416-5a16-46dc-bda5-43a6dd202d4d'
      
      // Daten für n8n Webhook formatieren
      const webhookData = {
        id: savedRequestId || undefined,
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
      message: 'Projektanfrage erfolgreich übermittelt',
      requestId: savedRequestId
    })

  } catch (error) {
    console.error('Fehler beim Speichern der Projektanfrage:', error)
    return NextResponse.json(
      { success: false, message: 'Fehler beim Übermitteln der Anfrage' },
      { status: 500 }
    )
  }
} 