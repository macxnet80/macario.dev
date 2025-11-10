import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-utils'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Nur Supabase-Client erstellen wenn Umgebungsvariablen verfügbar sind
let supabase: ReturnType<typeof createClient> | null = null

if (supabaseUrl && supabaseServiceKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey)
  } catch (error) {
    console.error('Fehler beim Erstellen des Supabase-Clients:', error)
  }
} else {
  console.warn('Supabase-Umgebungsvariablen fehlen:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseServiceKey
  })
}

interface OnboardingSession {
  id: string
  token: string
  
  // Von Admin eingegeben
  customer_name: string
  customer_email: string
  company?: string
  project_reference?: string
  project_scope: string
  contract_type: string
  payment_terms: string
  planned_start: string
  personal_message?: string
  address_style: 'du' | 'sie'
  
  // Status
  status: 'created' | 'in_progress' | 'completed'
  created_at: string
  completed_at?: string
  
  // Kundendaten (werden später gefüllt)
  customer_data?: any
}

// GET - Liste aller Sessions
export async function GET() {
  try {
    requireAuth()
    
    if (!supabase) {
      console.warn('Supabase nicht konfiguriert - verwende Fallback')
      return NextResponse.json({
        sessions: []
      })
    }
    
    const { data: sessions, error } = await supabase
      .from('onboarding_sessions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { message: 'Fehler beim Laden der Sessions' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      sessions: sessions || []
    })

  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { message: 'Nicht authentifiziert' },
        { status: 401 }
      )
    }
    
    console.error('Error loading sessions:', error)
    return NextResponse.json(
      { message: 'Fehler beim Laden der Sessions' },
      { status: 500 }
    )
  }
}

// POST - Neue Session erstellen
export async function POST(request: NextRequest) {
  try {
    requireAuth()
    
    const data = await request.json()
    
    // Validierung
    if (!data.customerName || !data.customerEmail || !data.projectScope || !data.contractType) {
      return NextResponse.json(
        { message: 'Pflichtfelder fehlen' },
        { status: 400 }
      )
    }

    // Generiere eindeutigen Token
    const token = `${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}`

    if (!supabase) {
      console.error('Supabase nicht konfiguriert')
      console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'gesetzt' : 'fehlt')
      console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'gesetzt' : 'fehlt')
      
      // Versuche mit MCP Supabase-Verbindung als Fallback
      try {
        // Erstelle temporären Client für Test
        const testUrl = 'https://gskragygntljpurdaqqf.supabase.co'
        if (!supabaseServiceKey) {
          return NextResponse.json(
            { 
              message: 'SUPABASE_SERVICE_ROLE_KEY fehlt in den Umgebungsvariablen. Bitte setzen Sie diese in .env.local',
              error: 'SUPABASE_SERVICE_ROLE_KEY_MISSING',
              details: {
                hasUrl: !!supabaseUrl,
                hasKey: false,
                supabaseUrl: supabaseUrl || testUrl
              }
            },
            { status: 503 }
          )
        }
      } catch (error) {
        console.error('Error checking Supabase:', error)
      }
      
      return NextResponse.json(
        { 
          message: 'Datenbank nicht verfügbar. Bitte überprüfen Sie die Supabase-Konfiguration in den Umgebungsvariablen.',
          error: 'SUPABASE_NOT_CONFIGURED',
          details: {
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseServiceKey
          }
        },
        { status: 503 }
      )
    }

    // Erstelle Session in Supabase
    const { data: newSession, error } = await supabase
      .from('onboarding_sessions')
      .insert([
        {
          token,
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          company: data.company || null,
          customer_gender: data.customerGender || 'keine_angabe',
          project_reference: data.projectReference || null,
          project_scope: data.projectScope,
          contract_type: data.contractType,
          payment_terms: data.paymentTerms || '7 Tage',
          planned_start: data.plannedStart || null,
          personal_message: data.personalMessage || null,
          address_style: data.addressStyle || 'sie',
          project_briefing: data.projectBriefing || null,
          tech_stack: data.techStack || [],
          project_deadline: data.projectDeadline || null,
          status: 'created'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      
      // Detaillierte Fehlermeldung
      let errorMessage = 'Fehler beim Erstellen der Session'
      if (error.code === 'PGRST116') {
        errorMessage = 'Tabelle onboarding_sessions nicht gefunden. Bitte überprüfen Sie die Datenbank-Migrationen.'
      } else if (error.code === '23505') {
        errorMessage = 'Token bereits vorhanden. Bitte versuchen Sie es erneut.'
      } else if (error.message?.includes('JWT')) {
        errorMessage = 'Ungültiger Supabase Service Role Key. Bitte überprüfen Sie SUPABASE_SERVICE_ROLE_KEY in .env.local'
      }
      
      return NextResponse.json(
        { 
          message: errorMessage,
          error: 'SUPABASE_ERROR',
          details: {
            code: error.code,
            message: error.message
          }
        },
        { status: 500 }
      )
    }

    // Generiere Onboarding-URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const onboardingUrl = `${baseUrl}/onboarding/${token}`

    return NextResponse.json({
      success: true,
      session: newSession,
      onboardingUrl
    })

  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { message: 'Nicht authentifiziert' },
        { status: 401 }
      )
    }
    
    console.error('Error creating session:', error)
    return NextResponse.json(
      { message: 'Fehler beim Erstellen der Session' },
      { status: 500 }
    )
  }
}
