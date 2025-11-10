import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '@/lib/auth-config'

export async function POST() {
  try {
    const cookieStore = cookies()
    
    // Lösche Session-Cookie
    cookieStore.delete(AUTH_COOKIE_NAME)

    return NextResponse.json({
      success: true,
      message: 'Erfolgreich abgemeldet'
    })

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: 'Fehler beim Abmelden' },
      { status: 500 }
    )
  }
}
