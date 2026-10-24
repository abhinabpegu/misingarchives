import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

function Message({ title, children }) {
  const { colors } = useTheme()
  return (
    <div style={{ maxWidth: '520px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '22px', color: colors.text, marginBottom: '10px' }}>{title}</h1>
      <div style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7' }}>{children}</div>
    </div>
  )
}

// Wrap any admin page in this. Only logged-in admins/editors get through.
export default function RequireStaff({ children }) {
  const { configured, loading, session, isStaff, signOut } = useAuth()
  const { colors } = useTheme()

  if (!configured) {
    return (
      <Message title="Admin not configured">
        The Supabase keys are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
        to your environment variables and rebuild.
      </Message>
    )
  }

  if (loading) return <Message title="Loading…" />

  if (!session) return <Navigate to="/manage/login" replace />

  if (!isStaff) {
    return (
      <Message title="No access">
        <p style={{ margin: '0 0 16px' }}>This account doesn't have permission to manage the archive.</p>
        <button
          onClick={signOut}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            background: colors.bgSecondary,
            color: colors.text,
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </Message>
    )
  }

  return children
}
