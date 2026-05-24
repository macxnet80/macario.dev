// Sicherheits-Utilities für die Anwendung

/**
 * Validiert E-Mail-Adressen
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }
  
  // Einfache aber effektive E-Mail-Validierung
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim()) && email.length <= 254
}

/**
 * Sanitized User-Input für sichere Verwendung
 */
export function sanitizeInput(input: string | undefined | null, maxLength: number = 10000): string {
  if (!input || typeof input !== 'string') {
    return ''
  }
  
  // Entferne gefährliche Zeichen und begrenze Länge
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Entferne < und > um XSS zu verhindern
}

/**
 * Sanitized Text für OpenAI Prompts (verhindert Prompt Injection)
 */
export function sanitizeForPrompt(input: string | undefined | null): string {
  if (!input || typeof input !== 'string') {
    return ''
  }
  
  // Entferne gefährliche Prompt-Injection-Zeichen
  return input
    .trim()
    .slice(0, 5000) // Maximal 5000 Zeichen für Prompts
    .replace(/```/g, '') // Entferne Code-Blöcke
    .replace(/---/g, '') // Entferne Markdown-Trenner
    .replace(/\[SYSTEM\]/gi, '') // Entferne System-Befehle
    .replace(/\[INST\]/gi, '') // Entferne Instruktionen
    .replace(/\[/g, '\\[') // Escape eckige Klammern
    .replace(/\]/g, '\\]')
}

/**
 * Validiert Budget-Werte
 */
export function isValidBudget(budget: string | number): boolean {
  if (typeof budget === 'number') {
    return budget >= 0 && budget <= 1000000
  }
  
  const num = parseInt(String(budget))
  return !isNaN(num) && num >= 0 && num <= 1000000
}

/**
 * Validiert Projekttyp
 */
export function isValidProjectType(type: string): boolean {
  const validTypes = ['business-website', 'ki-consulting', 'web-application']
  return validTypes.includes(type)
}

/**
 * Validiert Timeline-Werte
 */
export function isValidTimeline(timeline: string): boolean {
  const validTimelines = ['1-2-weeks', '3-4-weeks', '1-2-months', '3-6-months', 'flexible']
  return validTimelines.includes(timeline)
}

/**
 * Validiert Priority-Werte
 */
export function isValidPriority(priority: string): boolean {
  const validPriorities = ['speed', 'quality', 'budget', 'features']
  return validPriorities.includes(priority)
}

/**
 * Entfernt sensitive Daten aus Objekten für Logging
 */
export function sanitizeForLogging(data: Record<string, any>): Record<string, any> {
  const sensitiveFields = ['email', 'password', 'token', 'apiKey', 'secret', 'phone', 'creditCard']
  const sanitized = { ...data }
  
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]'
    }
  }
  
  return sanitized
}

