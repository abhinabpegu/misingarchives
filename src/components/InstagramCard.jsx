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
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
        padding: '28px clamp(24px, 5vw, 40px)',
        borderRadius: '14px',
        textDecoration: 'none',
        background: `linear-gradient(135deg, ${colors.accentPrimary}, ${colors.accentSecondary})`,
        boxShadow: `0 8px 24px ${colors.shadowColor}`,
        transition: 'transform 0.25s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Instagram size={24} color="#fff" />
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: '700', color: '#fff' }}>
            Follow us on Instagram
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
            New archives, articles, and community updates — @misingarchives
          </p>
        </div>
      </div>

      <span style={{
        padding: '10px 20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        color: isDarkMode ? colors.bg : colors.accentPrimary,
        fontSize: '13px',
        fontWeight: '700',
        whiteSpace: 'nowrap'
      }}>
        Follow →
      </span>
    </a>
  )
}