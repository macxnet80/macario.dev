import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Admin-Passwort (in Produktion sollte dies in einer Umgebungsvariable stehen)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2024!'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Passwort erforderlich' },
        { status: 400 }
      )
    }

    // Passwort überprüfen
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Ungültiges Passwort' },
        { status: 401 }
      )
    }

    // Session Cookie setzen (24 Stunden gültig)
    const response = NextResponse.json({ success: true })
    
    const cookieStore = cookies()
    response.cookies.set('admin-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 Stunden
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Server-Fehler' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  // Logout - Cookie löschen
  const response = NextResponse.json({ success: true })
  
  response.cookies.set('admin-session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  return response
} 