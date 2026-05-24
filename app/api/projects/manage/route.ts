import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/supabase'
import { deleteProjectImage } from '@/lib/project-images'
import { createAdminSupabaseClient } from '@/lib/supabase-admin'

export async function PUT(request: NextRequest) {
  try {
    const { id, updates, adminSecret } = await request.json()
    
    // Authentifizierung prüfen
    const serverSecret = process.env.ADMIN_SECRET || 'dev-secret-123'
    if (!adminSecret || adminSecret !== serverSecret) {
      return NextResponse.json(
        { success: false, message: 'Nicht autorisiert. Falsches Passwort.' },
        { status: 401 }
      )
    }
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Projekt-ID ist erforderlich.' },
        { status: 400 }
      )
    }
    
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, message: 'Supabase-Datenbank ist nicht konfiguriert.' },
        { status: 500 }
      )
    }

    const supabase = createAdminSupabaseClient()

    let previousImageUrl: string | null = null
    if (updates && 'image_url' in updates) {
      const { data: existingProject } = await supabase
        .from('projects')
        .select('image_url')
        .eq('id', id)
        .maybeSingle()

      previousImageUrl = existingProject?.image_url ?? null
    }
    
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle()
      
    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { success: false, message: 'Projekt nicht gefunden. Update fehlgeschlagen.' },
        { status: 404 }
      )
    }

    if (
      previousImageUrl &&
      updates?.image_url !== previousImageUrl
    ) {
      await deleteProjectImage(previousImageUrl)
    }
    
    return NextResponse.json({
      success: true,
      project: data
    })
    
  } catch (error: any) {
    console.error('Fehler beim Aktualisieren des Projekts:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Ein interner Fehler ist aufgetreten.' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id, adminSecret } = await request.json()
    
    // Authentifizierung prüfen
    const serverSecret = process.env.ADMIN_SECRET || 'dev-secret-123'
    if (!adminSecret || adminSecret !== serverSecret) {
      return NextResponse.json(
        { success: false, message: 'Nicht autorisiert. Falsches Passwort.' },
        { status: 401 }
      )
    }
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Projekt-ID ist erforderlich.' },
        { status: 400 }
      )
    }
    
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, message: 'Supabase-Datenbank ist nicht konfiguriert.' },
        { status: 500 }
      )
    }
    
    const supabase = createAdminSupabaseClient()

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      
    if (error) throw error
    
    return NextResponse.json({
      success: true,
      message: 'Projekt erfolgreich gelöscht.'
    })
    
  } catch (error: any) {
    console.error('Fehler beim Löschen des Projekts:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Ein interner Fehler ist aufgetreten.' },
      { status: 500 }
    )
  }
}
