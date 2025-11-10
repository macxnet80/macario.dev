// Einfache Auth-Konfiguration ohne externe Services
export const ADMIN_EMAIL = 'lars.macario@gmail.com'

// Einfacher Session-Check
export function isAdminEmail(email: string): boolean {
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
}

// Session-Cookie Name
export const AUTH_COOKIE_NAME = 'admin_session'

// Session-Dauer (24 Stunden)
export const SESSION_DURATION = 24 * 60 * 60 * 1000
