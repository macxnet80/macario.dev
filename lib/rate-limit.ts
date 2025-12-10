// Einfaches Rate Limiting für API-Routes
// In Produktion sollte ein Redis-basiertes System verwendet werden

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Cleanup alter Einträge alle 5 Minuten
setInterval(() => {
  const now = Date.now()
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  }
}, 5 * 60 * 1000)

/**
 * Rate Limiting Middleware
 * @param identifier - Eindeutiger Identifier (z.B. IP-Adresse)
 * @param maxRequests - Maximale Anzahl Requests
 * @param windowMs - Zeitfenster in Millisekunden
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 Minute
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = identifier

  if (!store[key] || store[key].resetTime < now) {
    // Neues Zeitfenster
    store[key] = {
      count: 1,
      resetTime: now + windowMs
    }
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: store[key].resetTime
    }
  }

  // Erhöhe Counter
  store[key].count++

  if (store[key].count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: store[key].resetTime
    }
  }

  return {
    allowed: true,
    remaining: maxRequests - store[key].count,
    resetTime: store[key].resetTime
  }
}

/**
 * Holt IP-Adresse aus Request
 */
export function getClientIp(request: Request): string {
  // Versuche verschiedene Header (für Vercel/Proxies)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }
  
  // Fallback
  return 'unknown'
}

