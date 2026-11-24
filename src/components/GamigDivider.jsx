import React from 'react'
import { useTheme } from '../context/ThemeContext'

// Minimal hairline divider inspired by traditional Mising gamig geometric diamonds.
export default function GamigDivider({ maxWidth = '1400px', style = {} }) {
  const { colors } = useTheme()

  return (
    <div
      aria-hidden="true"
      style={{
        maxWidth,
        width: '100%',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 40px)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${colors.borderHover})` }} />
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none" style={{ flexShrink: 0, opacity: 0.8 }}>
        <path d="M2 6L7 1L12 6L7 11L2 6Z" stroke={colors.accentPrimary} strokeWidth="1.2" />
        <path d="M10 6L14 2L18 6L14 10L10 6Z" fill={colors.accentPrimary} fillOpacity="0.22" stroke={colors.accentPrimary} strokeWidth="1.2" />
        <path d="M16 6L21 1L26 6L21 11L16 6Z" stroke={colors.accentPrimary} strokeWidth="1.2" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${colors.borderHover}, transparent)` }} />
    </div>
  )
}
