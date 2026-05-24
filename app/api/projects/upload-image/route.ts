import { NextRequest, NextResponse } from 'next/server'
import {
  getExtensionFromMime,
  uploadProjectImage,
  validateImageFile,
} from '@/lib/project-images'

function verifyAdminSecret(adminSecret: string | null | undefined): boolean {
  const serverSecret = process.env.ADMIN_SECRET || 'dev-secret-123'
  return !!adminSecret && adminSecret === serverSecret
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const adminSecret = formData.get('adminSecret') as string | null
    const file = formData.get('file') as File | null

    if (!verifyAdminSecret(adminSecret)) {
      return NextResponse.json(
        { success: false, message: 'Nicht autorisiert. Falsches Passwort.' },
        { status: 401 }
      )
    }

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Keine Datei hochgeladen.' },
        { status: 400 }
      )
    }

    const validationError = validateImageFile(file)
    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const extension = getExtensionFromMime(file.type as Parameters<typeof getExtensionFromMime>[0])
    const filename = file.name || `upload.${extension}`

    const imageUrl = await uploadProjectImage(buffer, filename, file.type as Parameters<typeof uploadProjectImage>[2])

    return NextResponse.json({
      success: true,
      imageUrl,
    })
  } catch (error: unknown) {
    console.error('Fehler beim Bild-Upload:', error)
    const message = error instanceof Error ? error.message : 'Ein interner Fehler ist aufgetreten.'
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}
