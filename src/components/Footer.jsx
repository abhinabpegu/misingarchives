import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import SiteStats from './SiteStats'

export default function Footer() {
  const { colors } = useTheme()

  const colStyle = { display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }
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
      backdropFilter: 'blur(12px)',
      marginTop: '60px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="footer-grid" style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '48px 40px 32px',
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr 1fr 1fr 1fr',
        gap: '32px',
        boxSizing: 'border-box'
      }}>
        <div style={colStyle}>
          <h3 style={{
            margin: 0,
            fontSize: '17px',
            fontWeight: '700',
            color: colors.accentPrimary,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <img
              src="/images/logo.png"
              alt=""
              style={{ height: '24px', width: '24px', objectFit: 'contain', borderRadius: '5px' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            Mising Archives
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary, lineHeight: '1.6', maxWidth: '320px' }}>
            A community-led initiative to preserve and share knowledge about Mising culture, tradition, history, and language.
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>
            Jorhat, Assam, India
          </p>
        </div>

        <div style={colStyle}>
          <span style={headingStyle}>Explore</span>
          <Link to="/" className="footer-link" style={linkStyle}>Home</Link>
          <Link to="/digital-book-library" className="footer-link" style={linkStyle}>Digital Book Library</Link>
          <Link to="/articles" className="footer-link" style={linkStyle}>Community Writings</Link>
          <Link to="/shop" className="footer-link" style={linkStyle}>Shop</Link>
          <a href="#mission" className="footer-link" style={linkStyle} onClick={(e) => {
            e.preventDefault()
            document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })
          }}>Our Mission</a>
        </div>

        <div style={colStyle}>
          <span style={headingStyle}>Sources & Thanks</span>
          <a href="https://archive.org" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>Internet Archive</a>
          <a href="https://pahar.in" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>Pahar.in</a>
          <a href="https://public.resource.org" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>Public.Resource.Org</a>
          <a href="https://sisangkebang.in" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>Takam Mising Sisang Kebang</a>
        </div>

        <div style={colStyle}>
          <span style={headingStyle}>Legal</span>
          <Link to="/privacy-policy" className="footer-link" style={linkStyle}>Privacy Policy</Link>
          <Link to="/terms-of-use" className="footer-link" style={linkStyle}>Terms of Use</Link>
          <Link to="/copyright-policy" className="footer-link" style={linkStyle}>Copyright Policy</Link>
        </div>

        <div style={colStyle}>
          <span style={headingStyle}>Contact</span>
          <a href="mailto:contact@misingarchives.co.in" className="footer-link" style={linkStyle}>contact@misingarchives.co.in</a>
          <a href="https://instagram.com/misingarchives" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>@misingarchives on Instagram</a>
        </div>
      </div>

      <SiteStats />

      <div style={{
        borderTop: `1px solid ${colors.border}`,
        padding: '20px 40px',
        textAlign: 'center',
        color: colors.textTertiary,
        fontSize: '12px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <p style={{ margin: 0, opacity: 0.8 }}>
          ©{new Date().getFullYear()} Mising Archives
        </p>
      </div>
    </footer>
  )
}
