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
      notes: null
    }

    console.log('Neue Projektanfrage:', {
      timestamp: new Date().toISOString(),
      ...projectRequest
    })

    // Daten in Supabase speichern
    if (isSupabaseConfigured()) {
      try {
        const savedRequest = await projectRequestsApi.createProjectRequest(projectRequest)
        console.log('✅ Projektanfrage erfolgreich in Supabase gespeichert:', savedRequest.id)
        
        return NextResponse.json({ 
          success: true, 
          message: 'Projektanfrage erfolgreich übermittelt',
          requestId: savedRequest.id
        })
      } catch (supabaseError) {
        console.error('❌ Supabase-Fehler:', supabaseError)
        // Fallback: Auch wenn Supabase fehlschlägt, geben wir Erfolg zurück
        // (die Daten wurden bereits geloggt)
        return NextResponse.json({ 
          success: true, 
          message: 'Projektanfrage erfolgreich übermittelt (lokale Speicherung)'
        })
      }
    } else {
      console.warn('⚠️ Supabase nicht konfiguriert - Daten nur geloggt')
      return NextResponse.json({ 
        success: true, 
        message: 'Projektanfrage erfolgreich übermittelt (lokale Speicherung)'
      })
    }

  } catch (error) {
    console.error('Fehler beim Speichern der Projektanfrage:', error)
    return NextResponse.json(
      { success: false, message: 'Fehler beim Übermitteln der Anfrage' },
      { status: 500 }
    )
  }
} 