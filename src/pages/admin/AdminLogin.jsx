import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'

export default function AdminLogin() {
  usePageTitle('Admin Login')
  useNoIndex()
  const { isDarkMode, colors } = useTheme()
  const { configured, session, isStaff, loading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!loading && session && isStaff) return <Navigate to="/manage" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const { error } = await signIn(email.trim(), password)
    setBusy(false)
    if (error) setError('Invalid email or password.')
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    backgroundColor: colors.bg,
    color: colors.text,
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  }
  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: '8px',
  }

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto', padding: '64px clamp(20px, 5vw, 40px) 80px' }}>
      <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.4px', color: colors.accentPrimary }}>
        Administration
      </span>
      <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '10px 0 24px', color: colors.text }}>
        Sign in
      </h1>

      {!configured && (
        <p style={{ fontSize: '13px', color: '#c0392b', marginBottom: '16px' }}>
          Supabase keys are not set up yet (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: colors.bgSecondary,
          border: `1px solid ${colors.border}`,
          borderRadius: '14px',
          padding: '28px',
        }}
      >
        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle} htmlFor="email">Email</label>
          <input id="email" type="email" required autoComplete="email" value={email}
            onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle} htmlFor="password">Password</label>
          <input id="password" type="password" required autoComplete="current-password" value={password}
            onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        </div>

        {error && <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#c0392b' }}>{error}</p>}

        <button
          type="submit"
          disabled={busy || !configured}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: colors.accentPrimary,
            color: isDarkMode ? colors.bg : '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: busy ? 'wait' : 'pointer',
            opacity: busy || !configured ? 0.7 : 1,
          }}
        >
          <LogIn size={15} />
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
