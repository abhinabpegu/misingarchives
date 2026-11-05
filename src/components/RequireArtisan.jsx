import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const ArtisanContext = createContext(null)

export function useArtisan() {
  const ctx = useContext(ArtisanContext)
  if (!ctx) throw new Error('useArtisan must be used inside RequireArtisan')
  return ctx
}

function Message({ title, children }) {
  const { colors } = useTheme()
  return (
    <div style={{ maxWidth: '520px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '22px', color: colors.text, marginBottom: '10px' }}>{title}</h1>
      <div style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7' }}>{children}</div>
    </div>
  )
}

// Wrap artisan pages in this. Loads the signed-in artisan's profile and
// shares it with the page via useArtisan().
export default function RequireArtisan({ children }) {
  const { configured, loading, session, signOut } = useAuth()
  const { colors } = useTheme()
  const [artisan, setArtisan] = useState(undefined) // undefined = loading, null = none
  const userId = session?.user?.id

  const load = useCallback(async () => {
    if (!userId) return
    const { data: acc } = await supabase
      .from('artisan_accounts').select('artisan_id, username').eq('user_id', userId).maybeSingle()
    if (!acc) return setArtisan(null)
    // RLS only returns this row while the artisan is active.
    const { data: a } = await supabase.from('artisans').select('*').eq('id', acc.artisan_id).maybeSingle()
    setArtisan(a ? { ...a, username: acc.username } : null)
  }, [userId])

  useEffect(() => {
    setArtisan(undefined)
    load()
  }, [load])

  if (!configured) return <Message title="Not configured">The Supabase keys are missing.</Message>
  if (loading) return <Message title="Loading…" />
  if (!session) return <Navigate to="/artisan/login" replace />
  if (artisan === undefined) return <Message title="Loading…" />

  if (artisan === null) {
    return (
      <Message title="No active artisan profile">
        <p style={{ margin: '0 0 16px' }}>
          This login isn't linked to an active artisan profile. If you think this is a mistake, contact Mising Archives.
        </p>
        <button onClick={signOut} style={{
          padding: '10px 18px', borderRadius: '8px', border: `1px solid ${colors.border}`,
          background: colors.bgSecondary, color: colors.text, fontWeight: '700', cursor: 'pointer',
        }}>Sign out</button>
      </Message>
    )
  }

  return (
    <ArtisanContext.Provider value={{ artisan, refresh: load, signOut }}>
      {children}
    </ArtisanContext.Provider>
  )
}