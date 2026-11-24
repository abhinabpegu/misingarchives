import React from 'react'
import { Instagram } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function InstagramCard() {
  const { isDarkMode, colors } = useTheme()

  return (
    <a
      href="https://instagram.com/misingarchives"
      target="_blank"
      rel="noopener noreferrer"
      className="card-interactive"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
        padding: '26px clamp(20px, 4vw, 36px)',
        borderRadius: '12px',
        textDecoration: 'none',
        backgroundColor: colors.accentPrimary,
        border: `1px solid ${colors.accentPrimary}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          backgroundColor: isDarkMode ? 'rgba(15, 14, 12, 0.14)' : 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Instagram size={22} color={isDarkMode ? colors.bg : '#fff'} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: '700', color: isDarkMode ? colors.bg : '#fff' }}>
            Follow us on Instagram
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: isDarkMode ? colors.bg : 'rgba(255,255,255,0.92)' }}>
            New archives, writings, and community updates on @misingarchives
          </p>
        </div>
      </div>

      <span style={{
        padding: '10px 18px',
        borderRadius: '8px',
        backgroundColor: isDarkMode ? colors.bg : '#fff',
        color: colors.accentPrimary,
        fontSize: '13px',
        fontWeight: '700',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        Follow <span className="card-arrow">→</span>
      </span>
    </a>
  )
}
