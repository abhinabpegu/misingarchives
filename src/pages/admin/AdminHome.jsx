import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'

export default function AdminHome() {
  usePageTitle('Admin')
  useNoIndex()
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()
  const { profile, signOut } = useAuth()

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px clamp(20px, 5vw, 40px) 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.4px', color: colors.accentPrimary }}>
            Administration
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '10px 0 6px', color: colors.text }}>
            Dashboard
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>
            Signed in as {profile?.email} · {profile?.role}
          </p>
        </div>
        <button
          onClick={signOut}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            fontSize: '13px',
            fontWeight: '700',
            color: colors.textSecondary,
            backgroundColor: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div style={{ ...cardBase, padding: '24px', opacity: 0.7 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: colors.text }}>Mising Motifs</h3>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, lineHeight: '1.6' }}>
            Add, edit and remove weaving patterns. Coming in the next step.
          </p>
        </div>
      </div>
    </div>
  )
}
