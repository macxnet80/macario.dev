import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-utils'

export async function GET() {
  try {
    const session = getSession()
    
    if (!session) {
      return NextResponse.json(
        { message: 'Nicht authentifiziert' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        email: session.email
      }
    })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { message: 'Interner Serverfehler' },
      { status: 500 }
    )
  }
}
