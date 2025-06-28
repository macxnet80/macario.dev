// Server-side Authentifizierung (nur für Server Components)
export function isAuthenticated(cookieStore: any): boolean {
  try {
    const session = cookieStore.get('admin-session')
    return session?.value === 'authenticated'
  } catch (error) {
    return false
  }
}

// Client-side Logout-Funktion
export async function logout() {
  try {
    await fetch('/api/admin/auth', {
      method: 'DELETE',
    })
    // Seite neu laden um Cookies zu aktualisieren
    window.location.href = '/admin/login'
  } catch (error) {
    console.error('Logout error:', error)
  }
} 