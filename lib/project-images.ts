import { createClient } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const BUCKET = 'project-images'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const

export type AllowedImageMime = (typeof ALLOWED_MIME_TYPES)[number]

function getStorageClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('Supabase URL ist nicht konfiguriert.')
  }

  if (serviceRoleKey) {
    return createClient(supabaseUrl, serviceRoleKey)
  }

  if (anonKey) {
    return createClient(supabaseUrl, anonKey)
  }

  return supabase
}

export function isAllowedImageMime(mime: string): mime is AllowedImageMime {
  return ALLOWED_MIME_TYPES.includes(mime as AllowedImageMime)
}

export function validateImageFile(file: File): string | null {
  if (!isAllowedImageMime(file.type)) {
    return 'Dateityp nicht erlaubt. Bitte JPG, PNG, WebP oder GIF verwenden.'
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'Datei zu groß. Maximale Dateigröße ist 5MB.'
  }

  return null
}

export function buildProjectImagePath(filename: string): string {
  const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
  return `projects/${Date.now()}-${safeName}`
}

export function getExtensionFromMime(mime: AllowedImageMime): string {
  switch (mime) {
    case 'image/jpeg':
      return 'jpg'
    case 'image/png':
      return 'png'
    case 'image/webp':
      return 'webp'
    case 'image/gif':
      return 'gif'
    default:
      return 'png'
  }
}

export function getPublicImageUrl(path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    throw new Error('Supabase URL ist nicht konfiguriert.')
  }

  return `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${path}`
}

export function extractStoragePathFromUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return null

  const prefix = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/`
  if (!imageUrl.startsWith(prefix)) return null

  return imageUrl.slice(prefix.length)
}

export async function uploadProjectImage(
  buffer: Buffer,
  filename: string,
  contentType: AllowedImageMime = 'image/png'
): Promise<string> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase ist nicht konfiguriert.')
  }

  const path = buildProjectImagePath(filename)
  const client = getStorageClient()

  const { error } = await client.storage.from(BUCKET).upload(path, buffer, {
    cacheControl: '3600',
    upsert: true,
    contentType,
  })

  if (error) {
    throw new Error(`Upload fehlgeschlagen: ${error.message}`)
  }

  return getPublicImageUrl(path)
}

export async function deleteProjectImage(imageUrl: string | null | undefined): Promise<void> {
  const path = extractStoragePathFromUrl(imageUrl)
  if (!path || !isSupabaseConfigured()) return

  const client = getStorageClient()
  const { error } = await client.storage.from(BUCKET).remove([path])

  if (error) {
    console.warn('Altes Projektbild konnte nicht gelöscht werden:', error.message)
  }
}

export async function resolveProjectImageUrl(options: {
  imageUrl?: string | null
  projectUrl?: string | null
  skipAiScreenshot?: boolean
}): Promise<string | null> {
  if (options.imageUrl) {
    return options.imageUrl
  }

  if (options.skipAiScreenshot || !options.projectUrl) {
    return null
  }

  const { captureAndStoreScreenshot } = await import('@/lib/screenshot')
  return captureAndStoreScreenshot(options.projectUrl)
}
