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

export interface ProjectRequest {
  id: number
  project_type: string
  budget: number
  timeline: string
  priority: string
  description: string
  features: string[]
  name: string
  email: string
  company: string | null
  phone: string | null
  ai_analysis: string | null
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
  notes: string | null
  
  // Adress-Felder
  street: string | null
  postal_code: string | null
  city: string | null
  country: string | null
  
  // Angebots-Felder
  offer_amount: number | null
  offer_date: string | null
  offer_status: 'pending' | 'sent' | 'accepted' | 'rejected' | null
  contract_status: 'none' | 'draft' | 'sent' | 'signed' | 'completed' | null
  offer_description: string | null
  offer_description_optimized: string | null
  
  // Business-Felder
  lead_source: 'website' | 'referral' | 'social_media' | 'direct' | 'other' | null
  priority_level: 'low' | 'medium' | 'high' | 'urgent' | null
  next_followup: string | null
  estimated_hours: number | null
  hourly_rate: number | null
  
  // Tracking-Felder
  first_contact_date: string | null
  last_contact_date: string | null
  project_start_date: string | null
  project_end_date: string | null
  
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
      project_requests: {
        Row: ProjectRequest
        Insert: Omit<ProjectRequest, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ProjectRequest, 'id' | 'created_at' | 'updated_at'>>
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

// API-Funktionen für Projektanfragen
export const projectRequestsApi = {
  // Projektanfrage erstellen
  async createProjectRequest(request: Omit<ProjectRequest, 'id' | 'created_at' | 'updated_at'>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('project_requests')
      .insert(request)
      .select()
      .single()
    
    if (error) throw error
    return data as ProjectRequest
  },

  // Alle Projektanfragen abrufen (für Admin)
  async getAllProjectRequests() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('project_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as ProjectRequest[]
  },

  // Projektanfrage nach ID abrufen
  async getProjectRequest(id: number) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('project_requests')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as ProjectRequest
  },

  // Projektanfrage-Status aktualisieren
  async updateProjectRequestStatus(id: number, status: ProjectRequest['status'], notes?: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const updates: any = { status }
    if (notes !== undefined) updates.notes = notes
    
    const { data, error } = await supabase
      .from('project_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as ProjectRequest
  },

  // Projektanfragen nach Status filtern
  async getProjectRequestsByStatus(status: ProjectRequest['status']) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('project_requests')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as ProjectRequest[]
  },

  // Vollständige Projektanfrage aktualisieren (für CRM)
  async updateProjectRequest(id: number, updates: Partial<Omit<ProjectRequest, 'id' | 'created_at' | 'updated_at'>>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('project_requests')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as ProjectRequest
  },

  // CRM-spezifische Updates
  async updateCRMFields(id: number, crmData: Partial<ProjectRequest>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('project_requests')
      .update({ ...crmData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as ProjectRequest
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