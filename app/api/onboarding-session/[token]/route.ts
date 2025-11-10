import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params

    if (!token) {
      return NextResponse.json(
        { message: 'Token fehlt' },
        { status: 400 }
      )
    }

    if (!supabase) {
      console.warn('Supabase nicht konfiguriert - verwende Fallback')
      return NextResponse.json(
        { message: 'Datenbank nicht verfügbar' },
        { status: 503 }
      )
    }

    // Lade Session-Daten aus Supabase
    const { data: session, error } = await supabase
      .from('onboarding_sessions')
      .select('*')
      .eq('token', token)
      .single()

    if (error || !session) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { message: 'Session nicht gefunden' },
        { status: 404 }
      )
    }

    // Prüfe ob Session bereits abgeschlossen ist
    if (session.status === 'completed') {
      return NextResponse.json(
        { message: 'Diese Onboarding-Session wurde bereits abgeschlossen' },
        { status: 410 }
      )
    }

    // Setze Status auf in_progress wenn noch created
    if (session.status === 'created') {
      await supabase
        .from('onboarding_sessions')
        .update({ status: 'in_progress' })
        .eq('token', token)
    }

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        token: session.token,
        customerName: session.customer_name,
        customerEmail: session.customer_email,
        company: session.company,
        customerGender: session.customer_gender,
        projectReference: session.project_reference,
        projectScope: session.project_scope,
        contractType: session.contract_type,
        paymentTerms: session.payment_terms,
        plannedStart: session.planned_start,
        personalMessage: session.personal_message,
        addressStyle: session.address_style,
        projectBriefing: session.project_briefing,
        techStack: session.tech_stack || [],
        projectDeadline: session.project_deadline,
        status: session.status
      }
    })

  } catch (error) {
    console.error('Error loading session:', error)
    return NextResponse.json(
      { message: 'Fehler beim Laden der Session' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params
    const body = await request.json()

    if (!token) {
      return NextResponse.json(
        { message: 'Token fehlt' },
        { status: 400 }
      )
    }

    if (!supabase) {
      console.warn('Supabase nicht konfiguriert - verwende Fallback')
      return NextResponse.json(
        { message: 'Datenbank nicht verfügbar' },
        { status: 503 }
      )
    }

    // Aktualisiere Session mit Kundendaten
    const { data: updatedSession, error } = await supabase
      .from('onboarding_sessions')
      .update({
        customer_data: body.customerData,
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('token', token)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { message: 'Fehler beim Aktualisieren der Session' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      session: updatedSession
    })

  } catch (error) {
    console.error('Error updating session:', error)
    return NextResponse.json(
      { message: 'Fehler beim Aktualisieren der Session' },
      { status: 500 }
    )
  }
}