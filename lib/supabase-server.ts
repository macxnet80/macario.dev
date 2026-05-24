import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function getServerSupabaseClient(): SupabaseClient {
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

export function mapLeadSource(sourceId: string): ProjectRequestLeadSource {
  const mapping: Record<string, ProjectRequestLeadSource> = {
    website: 'website',
    referral: 'referral',
    'social-media': 'social_media',
    google: 'other',
  }

  return mapping[sourceId] ?? 'other'
}

export type ProjectRequestLeadSource =
  | 'website'
  | 'referral'
  | 'social_media'
  | 'direct'
  | 'other'

export interface ProjectRequestInsert {
  project_type: string
  budget: number
  timeline: string
  priority: string
  description: string
  features: string[]
  first_name: string
  last_name: string
  name: string
  email: string
  company: string | null
  phone: string | null
  ai_analysis: string | null
  final_price: number | null
  source: string | null
  lead_source: ProjectRequestLeadSource
  privacy_accepted: boolean
  marketing_accepted: boolean
  status: 'new'
}

export function buildProjectRequestInsert(data: {
  projectType: string
  projectTypeLabel?: string
  budget: number
  timeline: string
  timelineLabel?: string
  priority: string
  priorityLabel?: string
  description: string
  features: string[]
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  source: string
  sourceLabel?: string
  aiAnalysis: string
  finalPrice: number | null
  privacyAccepted: boolean
  marketingAccepted: boolean
}): ProjectRequestInsert {
  const fullName = `${data.firstName} ${data.lastName}`.trim()

  return {
    project_type: data.projectTypeLabel || data.projectType,
    budget: data.budget,
    timeline: data.timelineLabel || data.timeline,
    priority: data.priorityLabel || data.priority,
    description: data.description,
    features: data.features,
    first_name: data.firstName,
    last_name: data.lastName,
    name: fullName,
    email: data.email,
    company: data.company || null,
    phone: data.phone || null,
    ai_analysis: data.aiAnalysis || null,
    final_price: data.finalPrice,
    source: data.sourceLabel || data.source || null,
    lead_source: mapLeadSource(data.source),
    privacy_accepted: data.privacyAccepted,
    marketing_accepted: data.marketingAccepted,
    status: 'new',
  }
}

export async function insertProjectRequest(
  data: ProjectRequestInsert
): Promise<{ id: number | null }> {
  const client = getServerSupabaseClient()
  const usesServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)

  if (usesServiceRole) {
    const { data: inserted, error } = await client
      .from('project_requests')
      .insert(data)
      .select('id')
      .single()

    if (error) {
      throw new Error(`Supabase Insert fehlgeschlagen: ${error.message}`)
    }

    return { id: inserted.id }
  }

  const { error } = await client.from('project_requests').insert(data)

  if (error) {
    throw new Error(`Supabase Insert fehlgeschlagen: ${error.message}`)
  }

  return { id: null }
}
