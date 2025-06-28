import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
}

// TypeScript Typen für die Datenbank
export interface Project {
  id: number
  title: string
  description: string
  tools: string[]
  features: string[]
  color: string
  image_url: string | null
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}

// Helper Funktionen für CRUD Operationen
export const projectsApi = {
  // Alle aktiven Projekte abrufen (sortiert nach order_index)
  async getActiveProjects() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('order_index')
    
    if (error) throw error
    return data as Project[]
  },

  // Alle Projekte abrufen (für Admin)
  async getAllProjects() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index')
    
    if (error) throw error
    return data as Project[]
  },

  // Projekt erstellen
  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()
    
    if (error) throw error
    return data as Project
  },

  // Projekt aktualisieren
  async updateProject(id: number, updates: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Project
  },

  // Projekt löschen
  async deleteProject(id: number) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Projekt-Reihenfolge aktualisieren
  async updateProjectOrder(projectUpdates: { id: number; order_index: number }[]) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('projects')
      .upsert(projectUpdates.map(update => ({
        id: update.id,
        order_index: update.order_index,
        updated_at: new Date().toISOString()
      })))
    
    if (error) throw error
  }
}

// Bild-Upload Funktionen
export const storageApi = {
  // Bild hochladen
  async uploadImage(file: File, path: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    console.log('🔄 Uploading image:', { fileName: file.name, size: file.size, type: file.type, path })
    
    // Direkter Upload ohne Bucket-Check (der kann manchmal fehlschlagen)
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (error) {
      console.error('❌ Upload error details:', {
        message: error.message,
        error: error,
        file: { name: file.name, size: file.size, type: file.type },
        path: path
      })
      
      // Spezifische Fehlermeldungen
      if (error.message.includes('row-level security') || error.message.includes('policy')) {
        throw new Error('Berechtigungsfehler: Der Storage-Bucket benötigt öffentliche Upload-Rechte. Bitte prüfen Sie die Storage-Policies in Supabase.')
      } else if (error.message.includes('not found') || error.message.includes('does not exist')) {
        throw new Error('Storage-Bucket "project-images" nicht gefunden. Bitte erstellen Sie den Bucket in Supabase.')
      } else if (error.message.includes('size') || error.message.includes('exceeded')) {
        throw new Error('Datei zu groß. Maximale Dateigröße ist 5MB.')
      } else if (error.message.includes('type') || error.message.includes('mime')) {
        throw new Error('Dateityp nicht erlaubt. Bitte verwenden Sie JPG, PNG, WebP oder GIF.')
      } else {
        throw new Error(`Upload fehlgeschlagen: ${error.message}`)
      }
    }
    
    console.log('✅ Upload successful:', data)
    return data
  },

  // Öffentliche URL für Bild abrufen
  getPublicUrl(path: string) {
    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(path)
    
    console.log('🔗 Public URL generated:', data.publicUrl)
    return data.publicUrl
  },

  // Bild löschen
  async deleteImage(path: string) {
    const { error } = await supabase.storage
      .from('project-images')
      .remove([path])
    
    if (error) throw error
  },

  // Storage Bucket prüfen
  async checkBucket() {
    try {
      const { data, error } = await supabase.storage.listBuckets()
      if (error) throw error
      
      const bucket = data.find(b => b.name === 'project-images')
      console.log('📦 Bucket status:', bucket ? 'exists' : 'not found', data)
      return !!bucket
    } catch (error) {
      console.error('❌ Bucket check error:', error)
      return false
    }
  },

  // Dateien im Bucket auflisten
  async listFiles() {
    try {
      const { data, error } = await supabase.storage
        .from('project-images')
        .list()
      
      if (error) throw error
      console.log('📁 Files in bucket:', data)
      return data
    } catch (error) {
      console.error('❌ List files error:', error)
      return []
    }
  }
} 