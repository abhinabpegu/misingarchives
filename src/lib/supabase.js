import { createClient } from '@supabase/supabase-js'

// These two values are safe to ship in the browser. The real protection is
// the row-level security rules in the database (see 001_init.sql).
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && key)

// null when env vars are missing, so the public site never crashes because
// of the admin setup. Code that uses it should check supabaseConfigured.
export const supabase = supabaseConfigured ? createClient(url, key) : null
