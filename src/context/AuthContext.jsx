import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

const STAFF_ROLES = ['admin', 'editor']

export function AuthProvider({ children }) {
  // undefined = still checking, null = nobody logged in
  const [session, setSession] = useState(undefined)
  const [profile, setProfile] = useState(undefined)

  // 1. Track the login session
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  // 2. Load the person's role whenever the logged-in user changes
  const userId = session?.user?.id
  useEffect(() => {
    if (!supabase || session === undefined) return
    if (!session) {
      setProfile(null)
      return
    }
    let cancelled = false
    supabase
      .from('profiles')
      .select('id, email, display_name, role')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setProfile(data ?? null)
      })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, session === undefined])

  const loading =
    supabaseConfigured && (session === undefined || (session !== null && profile === undefined))

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    configured: supabaseConfigured,
    session: session ?? null,
    profile: profile ?? null,
    isStaff: Boolean(profile && STAFF_ROLES.includes(profile.role)),
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
