import { uploadProjectImage } from '@/lib/project-images'

const SCREENSHOT_TIMEOUT_MS = 15000

interface MicrolinkResponse {
  status?: string
  data?: {
    screenshot?: {
      url?: string
    }
  }
  message?: string
}

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), SCREENSHOT_TIMEOUT_MS)

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Erstellt einen Screenshot einer URL über die Microlink API.
 */
export async function captureScreenshot(url: string): Promise<Buffer | null> {
  try {
    const params = new URLSearchParams({
      url,
      screenshot: 'true',
      meta: 'false',
      embed: 'screenshot.url',
      // 16:10 Viewport – passt zur ProjectPreview im Showcase
      'viewport.width': '1280',
      'viewport.height': '800',
      'viewport.deviceScaleFactor': '2',
    })

    const headers: Record<string, string> = {
      'User-Agent': 'macario.dev-screenshot/1.0',
    }

    if (process.env.MICROLINK_API_KEY) {
      headers['x-api-key'] = process.env.MICROLINK_API_KEY
    }

    const apiUrl = `https://api.microlink.io/?${params.toString()}`
    const response = await fetchWithTimeout(apiUrl, { headers })

    if (!response.ok) {
      console.warn('Microlink API Fehler:', response.status, response.statusText)
      return null
    }

    const payload = (await response.json()) as MicrolinkResponse

    if (payload.status !== 'success') {
      console.warn('Microlink Screenshot fehlgeschlagen:', payload.message || 'Unbekannter Fehler')
      return null
    }

    const screenshotUrl = payload.data?.screenshot?.url
    if (!screenshotUrl) {
      console.warn('Microlink lieferte keine Screenshot-URL')
      return null
    }

    const imageResponse = await fetchWithTimeout(screenshotUrl)
    if (!imageResponse.ok) {
      console.warn('Screenshot-Download fehlgeschlagen:', imageResponse.status)
      return null
    }

    const arrayBuffer = await imageResponse.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Microlink Screenshot Timeout nach', SCREENSHOT_TIMEOUT_MS, 'ms')
    } else {
      console.error('Fehler beim Screenshot-Capture:', error)
    }
    return null
  }
}

/**
 * Erstellt einen Screenshot und speichert ihn in Supabase Storage.
 */
export async function captureAndStoreScreenshot(url: string): Promise<string | null> {
  const buffer = await captureScreenshot(url)
  if (!buffer) return null

  try {
    const hostname = new URL(url).hostname.replace(/[^a-zA-Z0-9.-]/g, '-')
    return await uploadProjectImage(buffer, `${hostname}-screenshot.png`, 'image/png')
  } catch (error) {
    console.error('Fehler beim Speichern des Screenshots:', error)
    return null
  }
}
