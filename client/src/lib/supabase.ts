import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wdtojssqamfbhqflqclx.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdG9qc3NxYW1mYmhxZmxxY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDY4NjgsImV4cCI6MjA2MDIyMjg2OH0.-FT2vwUyNnsgh6mh_cJolVcR1vY5DVWEu1GqgCVfvIg'

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