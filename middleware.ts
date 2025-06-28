import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Admin-Authentifizierung prüfen
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const session = request.cookies.get('admin-session')
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Redirect von /admin/login wenn bereits eingeloggt
  if (request.nextUrl.pathname === '/admin/login') {
    const session = request.cookies.get('admin-session')
    
    if (session && session.value === 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Überprüfe, ob es sich um den Admin-Bereich handelt
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const response = NextResponse.next()
    
    // Setze zusätzliche Headers für maximalen Schutz vor Suchmaschinen
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex, nocache')
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    // Zusätzliche Sicherheits-Headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'no-referrer')
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
} 