import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from './auth-config'

export interface SessionData {
  email: string
  loginTime: number
  expires: number
}

export function getSession(): SessionData | null {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME)

    if (!sessionCookie?.value) {
      return null
    }

    // Dekodiere Session-Daten
    const sessionData: SessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    )

    // Prüfe ob Session abgelaufen ist
    if (Date.now() > sessionData.expires) {
      return null
    }

    return sessionData
  } catch (error) {
    console.error('Session parsing error:', error)
    return null
  }
}

export function isAuthenticated(): boolean {
  const session = getSession()
  return session !== null
}

export function requireAuth(): SessionData {
  const session = getSession()
  if (!session) {
    throw new Error('Authentication required')
  }
  return session
}
