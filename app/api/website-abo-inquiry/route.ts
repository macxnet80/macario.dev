import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Nur Supabase-Client erstellen wenn Umgebungsvariablen verfügbar sind
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, phone, industry, package: selectedPackage, message } = body

    // Validate required fields
    if (!name || !company || !email || !industry) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen' },
        { status: 400 }
      )
    }

    // Insert into Supabase falls verfügbar
    if (supabase) {
      const { data, error } = await supabase
        .from('website_abo_inquiries')
        .insert([
          {
            name,
            company,
            email,
            phone: phone || null,
            industry,
            selected_package: selectedPackage || null,
            message: message || null,
            created_at: new Date().toISOString(),
            status: 'new'
          }
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { error: 'Fehler beim Speichern der Anfrage' },
          { status: 500 }
        )
      }
    } else {
      console.warn('Supabase nicht konfiguriert - Daten werden nur geloggt')
      console.log('Website-Abo Anfrage:', { name, company, email, phone, industry, selectedPackage, message })
    }

    // Optional: Send notification email here
    // You could integrate with a service like Resend, SendGrid, etc.

    return NextResponse.json(
      { message: 'Anfrage erfolgreich gesendet' },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    )
  }
}
