import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-utils'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function GET() {
  try {
    await requireAuth()
    
    const diagnostics = {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseServiceKey,
      url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'fehlt',
      keyLength: supabaseServiceKey ? supabaseServiceKey.length : 0,
      canConnect: false,
      error: null as string | null
    }
    
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        
        // Test-Verbindung
        const { data, error } = await supabase
          .from('onboarding_sessions')
          .select('count')
          .limit(1)
        
        if (error) {
          diagnostics.error = error.message
        } else {
          diagnostics.canConnect = true
        }
      } catch (error: any) {
        diagnostics.error = error.message || 'Unbekannter Fehler'
      }
    }
    
    return NextResponse.json({
      success: true,
      diagnostics
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { message: 'Nicht authentifiziert' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { message: 'Fehler beim Testen der Verbindung' },
      { status: 500 }
    )
  }
}
