import { createClient, SupabaseClient } from '@supabase/supabase-js'

export function createAdminSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('Supabase URL ist nicht konfiguriert.')
  }

  const key = serviceRoleKey || anonKey
  if (!key) {
    throw new Error('Supabase API-Key ist nicht konfiguriert.')
  }

  return createClient(supabaseUrl, key)
}
