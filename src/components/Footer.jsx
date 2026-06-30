import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { colors } = useTheme()

  const colStyle = { display: 'flex', flexDirection: 'column', gap: '10px' }
  const headingStyle = {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    color: colors.accentPrimary,
    marginBottom: '4px'
  }
  const linkStyle = {
    color: colors.textSecondary,
    fontSize: '13px',
    textDecoration: 'none'
  }

  return (
    <footer style={{
      borderTop: `1px solid ${colors.border}`,
      backgroundColor: colors.bgTertiary,
      backdropFilter: 'blur(10px)',
      marginTop: '60px'
    }}>
      <div className="footer-grid" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '48px 40px 32px',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr',
        gap: '32px'
      }}>
        <div style={colStyle}>
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: colors.accentPrimary }}>
            🏛️ Mising Archives
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary, lineHeight: '1.6', maxWidth: '320px' }}>
            A community-led initiative to preserve and share knowledge about Mising culture, tradition, history, and language.
          </p>
        </div>

        <div style={colStyle}>
          <span style={headingStyle}>Explore</span>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/digital-book-library" style={linkStyle}>Digital Book Library</Link>
          <Link to="/articles" style={linkStyle}>Articles</Link>
          <a href="#mission" style={linkStyle} onClick={(e) => {
            e.preventDefault()
            document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })
          }}>Our Mission</a>
        </div>

        <div style={colStyle}>
          <span style={headingStyle}>Sources & Thanks</span>
          <a href="https://archive.org" target="_blank" rel="noopener noreferrer" style={linkStyle}>Internet Archive</a>
          <a href="https://pahar.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Pahar.in</a>
          <a href="https://public.resource.org" target="_blank" rel="noopener noreferrer" style={linkStyle}>Public.Resource.Org</a>
        </div>
      </div>

      <div style={{
        borderTop: `1px solid ${colors.border}`,
        padding: '20px 40px',
        textAlign: 'center',
        color: colors.textTertiary,
        fontSize: '12px'
      }}>
        <p style={{ opacity: 0.8 }}>©{new Date().getFullYear()}  Mising Archives. Original articles, documentation, and website content are licensed under CC BY-SA 4.0. The Digital Book Library contains works made available under their respective copyright permissions, licences, or public domain status, as indicated for each item.</p>
      </div>
    </footer>
  )
}
