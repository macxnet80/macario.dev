import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware ist jetzt leer, da der Admin-Bereich entfernt wurde
  // Kann bei Bedarf für andere Features erweitert werden
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Keine spezifischen Pfade mehr, da Admin-Bereich entfernt wurde
  ],
} 