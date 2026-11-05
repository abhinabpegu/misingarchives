import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useArtisan } from '../../components/RequireArtisan'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { useFormStyles } from '../../utils/formStyles'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'

export default function ArtisanHome() {
  usePageTitle('Artisan Dashboard')
  useNoIndex()
  const { colors } = useTheme()
  const { cardBase, hoverIn, hoverOut } = useCardStyle()
  const { ghostBtn } = useFormStyles()
  const { artisan, signOut } = useArtisan()

  const card = { ...cardBase, display: 'block', padding: '24px', textDecoration: 'none' }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px clamp(20px, 5vw, 40px) 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.4px', color: colors.accentPrimary }}>
            Artisan Portal
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '10px 0 6px', color: colors.text }}>
            Welcome, {artisan.display_name}
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>@{artisan.username}</p>
        </div>
        <button onClick={signOut} style={ghostBtn}><LogOut size={14} /> Sign out</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <Link to="/artisan/profile" style={card} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: colors.text }}>My profile</h3>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, lineHeight: '1.6' }}>
            Your photo, story, location, contact details and delivery info.
          </p>
        </Link>
        <Link to="/artisan/products" style={card} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: colors.text }}>My products</h3>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, lineHeight: '1.6' }}>
            Add, edit and remove the things you sell, with photos.
          </p>
        </Link>
      </div>
    </div>
  )
}