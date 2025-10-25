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

// Projektmanagement Typen
export interface Company {
  id: string
  name: string
  description: string | null
  email: string | null
  phone: string | null
  website: string | null
  street: string | null
  postal_code: string | null
  city: string | null
  country: string | null
  industry: string | null
  company_size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise' | null
  status: 'active' | 'inactive' | 'prospect' | 'archived'
  hourly_rate: number | null
  currency: string
  notes: string | null
  tags: string[] | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PMProject {
  id: string
  company_id: string | null
  name: string
  description: string | null
  project_type: 'website' | 'webapp' | 'ecommerce' | 'automation' | 'ai' | 'custom' | null
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  start_date: string | null
  end_date: string | null
  estimated_hours: number | null
  budget: number | null
  hourly_rate: number | null
  fixed_price: number | null
  billing_type: 'hourly' | 'fixed' | 'milestone'
  progress_percentage: number
  tags: string[] | null
  color: string
  notes: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  project_id: string
  parent_task_id: string | null
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  estimated_hours: number | null
  due_date: string | null
  completed_at: string | null
  assigned_to: string | null
  order_index: number
  category: string | null
  tags: string[] | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface TimeEntry {
  id: string
  project_id: string
  task_id: string | null
  start_time: string
  end_time: string | null
  duration_minutes: number | null
  description: string | null
  activity_type: 'development' | 'design' | 'meeting' | 'research' | 'testing' | 'other' | null
  is_billable: boolean
  hourly_rate: number | null
  user_name: string
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
      companies: {
        Row: Company
        Insert: Omit<Company, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>
      }
      pm_projects: {
        Row: PMProject
        Insert: Omit<PMProject, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<PMProject, 'id' | 'created_at' | 'updated_at'>>
      }
      tasks: {
        Row: Task
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>
      }
      time_entries: {
        Row: TimeEntry
        Insert: Omit<TimeEntry, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<TimeEntry, 'id' | 'created_at' | 'updated_at'>>
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

  // Admin-Funktion entfernt

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

// ===== PROJEKTMANAGEMENT APIs =====

// Companies API
export const companiesApi = {
  // Alle Unternehmen abrufen
  async getAllCompanies() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as Company[]
  },

  // Aktive Unternehmen abrufen
  async getActiveCompanies() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data as Company[]
  },

  // Unternehmen erstellen
  async createCompany(company: Omit<Company, 'id' | 'created_at' | 'updated_at'>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single()
    
    if (error) throw error
    return data as Company
  },

  // Unternehmen aktualisieren
  async updateCompany(id: string, updates: Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Company
  },

  // Unternehmen löschen
  async deleteCompany(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Unternehmen nach ID abrufen
  async getCompany(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Company
  }
}

// PM Projects API
export const pmProjectsApi = {
  // Alle Projekte abrufen
  async getAllProjects() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('pm_projects')
      .select(`
        *,
        companies (
          id,
          name,
          email,
          hourly_rate
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as (PMProject & { companies?: Company })[]
  },

  // Projekte nach Unternehmen abrufen
  async getProjectsByCompany(companyId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('pm_projects')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as PMProject[]
  },

  // Aktive Projekte abrufen
  async getActiveProjects() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('pm_projects')
      .select(`
        *,
        companies (
          id,
          name,
          email
        )
      `)
      .eq('is_active', true)
      .in('status', ['planning', 'active'])
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as (PMProject & { companies?: Company })[]
  },

  // Projekt erstellen
  async createProject(project: Omit<PMProject, 'id' | 'created_at' | 'updated_at'>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('pm_projects')
      .insert(project)
      .select()
      .single()
    
    if (error) throw error
    return data as PMProject
  },

  // Projekt aktualisieren
  async updateProject(id: string, updates: Partial<Omit<PMProject, 'id' | 'created_at' | 'updated_at'>>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('pm_projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as PMProject
  },

  // Projekt löschen
  async deleteProject(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('pm_projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Projekt nach ID abrufen
  async getProject(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('pm_projects')
      .select(`
        *,
        companies (
          id,
          name,
          email,
          hourly_rate
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as PMProject & { companies?: Company }
  }
}

// Tasks API
export const tasksApi = {
  // Alle Aufgaben abrufen
  async getAllTasks() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        pm_projects (
          id,
          name,
          company_id,
          companies (
            name
          )
        )
      `)
      .order('order_index')
    
    if (error) throw error
    return data as (Task & { pm_projects?: PMProject & { companies?: Company } })[]
  },

  // Aufgaben nach Projekt abrufen
  async getTasksByProject(projectId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('order_index')
    
    if (error) throw error
    return data as Task[]
  },

  // Aufgabe erstellen
  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  },

  // Aufgabe aktualisieren
  async updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  },

  // Aufgabe löschen
  async deleteTask(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Aufgaben-Status aktualisieren
  async updateTaskStatus(id: string, status: Task['status']) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const updates: any = { status }
    if (status === 'completed') {
      updates.completed_at = new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  }
}

// Time Entries API
export const timeEntriesApi = {
  // Alle Zeiteinträge abrufen
  async getAllTimeEntries() {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('time_entries')
      .select(`
        *,
        pm_projects (
          id,
          name,
          companies (
            name
          )
        ),
        tasks (
          id,
          title
        )
      `)
      .order('start_time', { ascending: false })
    
    if (error) throw error
    return data as (TimeEntry & { 
      pm_projects?: PMProject & { companies?: Company }
      tasks?: Task 
    })[]
  },

  // Zeiteinträge nach Projekt abrufen
  async getTimeEntriesByProject(projectId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('time_entries')
      .select(`
        *,
        tasks (
          id,
          title
        )
      `)
      .eq('project_id', projectId)
      .order('start_time', { ascending: false })
    
    if (error) throw error
    return data as (TimeEntry & { tasks?: Task })[]
  },

  // Zeiteintrag erstellen
  async createTimeEntry(entry: Omit<TimeEntry, 'id' | 'created_at' | 'updated_at'>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('time_entries')
      .insert(entry)
      .select()
      .single()
    
    if (error) throw error
    return data as TimeEntry
  },

  // Zeiteintrag aktualisieren
  async updateTimeEntry(id: string, updates: Partial<Omit<TimeEntry, 'id' | 'created_at' | 'updated_at'>>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('time_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as TimeEntry
  },

  // Zeiteintrag löschen
  async deleteTimeEntry(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { error } = await supabase
      .from('time_entries')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Aktiven Timer starten
  async startTimer(projectId: string, taskId?: string, description?: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const entry: Omit<TimeEntry, 'id' | 'created_at' | 'updated_at'> = {
      project_id: projectId,
      task_id: taskId || null,
      start_time: new Date().toISOString(),
      end_time: null,
      duration_minutes: null,
      description: description || null,
      activity_type: 'development',
      is_billable: true,
      hourly_rate: null,
      user_name: 'User'
    }
    
    return this.createTimeEntry(entry)
  },

  // Timer stoppen
  async stopTimer(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const endTime = new Date().toISOString()
    
    // Erst den aktuellen Eintrag abrufen
    const { data: currentEntry, error: fetchError } = await supabase
      .from('time_entries')
      .select('start_time')
      .eq('id', id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Dauer berechnen
    const startTime = new Date(currentEntry.start_time)
    const endTimeDate = new Date(endTime)
    const durationMinutes = Math.round((endTimeDate.getTime() - startTime.getTime()) / (1000 * 60))
    
    return this.updateTimeEntry(id, {
      end_time: endTime,
      duration_minutes: durationMinutes
    })
  },

  // Zeiteinträge nach Zeitraum abrufen
  async getTimeEntriesByDateRange(startDate: string, endDate: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('time_entries')
      .select(`
        *,
        pm_projects (
          id,
          name,
          companies (
            name
          )
        ),
        tasks (
          id,
          title
        )
      `)
      .gte('start_time', startDate)
      .lte('start_time', endDate)
      .order('start_time', { ascending: false })
    
    if (error) throw error
    return data as (TimeEntry & { 
      pm_projects?: PMProject & { companies?: Company }
      tasks?: Task 
    })[]
  }
} 