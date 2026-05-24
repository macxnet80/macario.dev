import { NextRequest, NextResponse } from 'next/server'
import {
  isValidEmail,
  sanitizeInput,
  isValidBudget,
  isValidProjectType,
  isValidTimeline,
  isValidPriority,
  sanitizeForLogging,
} from '@/lib/security-utils'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { buildProjectRequestInsert, insertProjectRequest } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const rateLimit = checkRateLimit(`submit-project:${ip}`, 10, 60000)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    }

    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 100000) {
      return NextResponse.json(
        { success: false, message: 'Anfrage zu groß' },
        { status: 413 }
      )
    }

    const data = await request.json()

    const requiredFields = [
      'projectType',
      'budget',
      'timeline',
      'priority',
      'description',
      'firstName',
      'lastName',
      'email',
    ]
    const missingFields = requiredFields.filter((field) => !data[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Fehlende Felder: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      )
    }

    if (!isValidProjectType(data.projectType)) {
      return NextResponse.json(
        { success: false, message: 'Ungültiger Projekttyp' },
        { status: 400 }
      )
    }

    if (!isValidBudget(data.budget)) {
      return NextResponse.json(
        { success: false, message: 'Ungültiges Budget' },
        { status: 400 }
      )
    }

    if (!isValidTimeline(data.timeline)) {
      return NextResponse.json(
        { success: false, message: 'Ungültige Timeline' },
        { status: 400 }
      )
    }

    if (!isValidPriority(data.priority)) {
      return NextResponse.json(
        { success: false, message: 'Ungültige Priorität' },
        { status: 400 }
      )
    }

    const sanitizedData = {
      projectType: data.projectType,
      projectTypeLabel: sanitizeInput(data.projectTypeLabel, 100),
      budget: parseInt(String(data.budget)),
      timeline: data.timeline,
      timelineLabel: sanitizeInput(data.timelineLabel, 100),
      priority: data.priority,
      priorityLabel: sanitizeInput(data.priorityLabel, 100),
      description: sanitizeInput(data.description, 5000),
      firstName: sanitizeInput(data.firstName, 100),
      lastName: sanitizeInput(data.lastName, 100),
      email: data.email.toLowerCase().trim(),
      company: sanitizeInput(data.company, 200),
      phone: sanitizeInput(data.phone, 50),
      source: sanitizeInput(data.source, 50),
      sourceLabel: sanitizeInput(data.sourceLabel, 100),
      features: Array.isArray(data.features)
        ? data.features.map((f: string) => sanitizeInput(f, 200))
        : [],
      aiAnalysis: sanitizeInput(data.aiAnalysis, 2000),
      finalPrice: data.finalPrice ? parseInt(String(data.finalPrice)) : null,
      privacyAccepted: Boolean(data.privacyAccepted),
      marketingAccepted: Boolean(data.marketingAccepted),
    }

    console.log(
      'Neue Projektanfrage:',
      sanitizeForLogging({
        timestamp: new Date().toISOString(),
        projectType: sanitizedData.projectType,
        budget: sanitizedData.budget,
        timeline: sanitizedData.timeline,
        priority: sanitizedData.priority,
        source: sanitizedData.source,
      })
    )

    const insertData = buildProjectRequestInsert(sanitizedData)
    const { id } = await insertProjectRequest(insertData)

    console.log('✅ Projektanfrage in Supabase gespeichert, ID:', id)

    return NextResponse.json({
      success: true,
      message: 'Projektanfrage erfolgreich übermittelt',
      id,
    })
  } catch (error) {
    console.error('Fehler beim Speichern der Projektanfrage:', error)
    return NextResponse.json(
      { success: false, message: 'Fehler beim Übermitteln der Anfrage' },
      { status: 500 }
    )
  }
}
