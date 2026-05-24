import { NextRequest, NextResponse } from 'next/server'
import { captureAndStoreScreenshot } from '@/lib/screenshot'

function verifyAdminSecret(adminSecret: string | null | undefined): boolean {
  const serverSecret = process.env.ADMIN_SECRET || 'dev-secret-123'
  return !!adminSecret && adminSecret === serverSecret
}

export async function POST(request: NextRequest) {
  try {
    const { projectUrl, adminSecret } = await request.json()

    if (!verifyAdminSecret(adminSecret)) {
      return NextResponse.json(
        { success: false, message: 'Nicht autorisiert. Falsches Passwort.' },
        { status: 401 }
      )
    }

    if (!projectUrl || typeof projectUrl !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Live-URL ist erforderlich.' },
        { status: 400 }
      )
    }

    try {
      new URL(projectUrl)
    } catch {
      return NextResponse.json(
        { success: false, message: 'Ungültige URL.' },
        { status: 400 }
      )
    }

    const imageUrl = await captureAndStoreScreenshot(projectUrl.trim())

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Screenshot konnte nicht erstellt werden. Bitte später erneut versuchen oder manuell hochladen.' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      imageUrl,
    })
  } catch (error: unknown) {
    console.error('Fehler beim Screenshot-Capture:', error)
    const message = error instanceof Error ? error.message : 'Ein interner Fehler ist aufgetreten.'
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}
