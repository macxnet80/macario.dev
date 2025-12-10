import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware kann bei Bedarf für andere Features erweitert werden
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Kann bei Bedarf für spezifische Pfade erweitert werden
  ],
} 