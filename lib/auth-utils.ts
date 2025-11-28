import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from './auth-config'

export interface SessionData {
  email: string
  loginTime: number
  expires: number
}

export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies()
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

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession()
  if (!session) {
    throw new Error('Authentication required')
  }
  return session
}
