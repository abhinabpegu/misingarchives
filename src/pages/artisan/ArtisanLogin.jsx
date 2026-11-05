import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'
import { useFormStyles } from '../../utils/formStyles'
import { usernameToEmail } from '../../lib/artisanAuth'

export default function ArtisanLogin() {
  usePageTitle('Artisan Login')
  useNoIndex()
  const { colors } = useTheme()
  const { inputStyle, labelStyle, primaryBtn } = useFormStyles()
  const { configured, session, loading, signIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!loading && session) return <Navigate to="/artisan" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const { error } = await signIn(usernameToEmail(username), password)
    setBusy(false)
    if (error) setError('Invalid username or password.')
  }

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto', padding: '64px clamp(20px, 5vw, 40px) 80px' }}>
      <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.4px', color: colors.accentPrimary }}>
        Artisan Portal
      </span>
      <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '10px 0 24px', color: colors.text }}>Sign in</h1>

      {!configured && <p style={{ fontSize: '13px', color: '#c0392b' }}>Supabase keys are not set up.</p>}

      <form onSubmit={handleSubmit} style={{
        backgroundColor: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: '14px', padding: '28px',
      }}>
        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle} htmlFor="username">Username</label>
          <input id="username" required autoCapitalize="none" autoComplete="username" value={username}
            onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle} htmlFor="password">Password</label>
          <input id="password" type="password" required autoComplete="current-password" value={password}
            onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        </div>
        {error && <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#c0392b' }}>{error}</p>}
        <button type="submit" disabled={busy || !configured}
          style={{ ...primaryBtn, width: '100%', justifyContent: 'center', padding: '12px 16px', opacity: busy ? 0.7 : 1 }}>
          <LogIn size={15} /> {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}