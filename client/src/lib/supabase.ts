import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type AuthUser = {
  id: string
  email?: string
  firstName?: string
  lastName?: string
  profileImageUrl?: string
  role?: string
}

// Helper to convert Supabase user to our User type
export const mapSupabaseUser = (user: any): AuthUser => ({
  id: user.id,
  email: user.email,
  firstName: user.user_metadata?.first_name,
  lastName: user.user_metadata?.last_name,
  profileImageUrl: user.user_metadata?.avatar_url,
  role: user.user_metadata?.role || 'client'
})