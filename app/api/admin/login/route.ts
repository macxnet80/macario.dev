import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminEmail, AUTH_COOKIE_NAME, SESSION_DURATION } from '@/lib/auth-config'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'E-Mail-Adresse ist erforderlich' },
        { status: 400 }
      )
    }

    // Prüfe ob es die Admin-E-Mail ist
    if (!isAdminEmail(email)) {
      return NextResponse.json(
        { message: 'Zugriff verweigert. Diese E-Mail-Adresse ist nicht autorisiert.' },
        { status: 401 }
      )
    }

    // Erstelle Session-Token (einfacher JWT-ähnlicher Token)
    const sessionData = {
      email,
      loginTime: Date.now(),
      expires: Date.now() + SESSION_DURATION
    }

    // Einfache Base64-Kodierung für Session (in Produktion würde man JWT verwenden)
    const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString('base64')

    // Setze Cookie
    const cookieStore = await cookies()
    cookieStore.set(AUTH_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DURATION / 1000, // in Sekunden
      path: '/'
    })

    return NextResponse.json({
      success: true,
      message: 'Erfolgreich angemeldet',
      user: { email }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Interner Serverfehler' },
      { status: 500 }
    )
  }
}
