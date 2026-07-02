import React, { useState } from 'react'
import { ChevronDown, Mail } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ContributeCard({ title, teaser, children }) {
  const { colors } = useTheme()
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      borderRadius: '14px',
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.bgSecondary,
      backdropFilter: 'blur(10px)',
      boxShadow: `0 4px 16px ${colors.shadowColor}`,
      overflow: 'hidden',
      marginBottom: '32px'
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '20px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: colors.accentLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Mail size={18} color={colors.accentPrimary} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '700', color: colors.text }}>
              {title}
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>
              {teaser}
            </p>
          </div>
        </div>
        <ChevronDown
          size={20}
          color={colors.accentPrimary}
          style={{
            flexShrink: 0,
            transition: 'transform 0.25s ease',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </button>

      {expanded && (
        <div style={{
          padding: '0 24px 24px',
          borderTop: `1px solid ${colors.border}`,
          paddingTop: '20px'
        }}>
          {children}
        </div>
      )}
    </div>
  )
}