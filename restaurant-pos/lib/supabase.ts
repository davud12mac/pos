import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseAnonKey || 'example-key'
)

export function checkSupabaseConnection() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing. Using placeholder values.')
    return false
  }
  return true
}

