import React, { useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { isDarkMode, setIsDarkMode, colors } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToMission = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? colors.accentPrimary : colors.textSecondary,
    fontWeight: isActive ? '700' : '600',
    fontSize: '14px',
    textDecoration: 'none',
    padding: '8px 4px',
    borderBottom: isActive ? `2px solid ${colors.accentPrimary}` : '2px solid transparent',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  })

  return (
    <header style={{
      borderBottom: `1px solid ${colors.border}`,
      backgroundColor: colors.bgTertiary,
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px'
      }} className="header-inner">
        <Link to="/" onClick={() => setMenuOpen(false)} style={{
          fontSize: '22px',
          fontWeight: '700',
          margin: 0,
          color: colors.accentPrimary,
          textDecoration: 'none',
          textShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
          whiteSpace: 'nowrap'
        }}>
          Mising Archives
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          flex: 1,
          justifyContent: 'center'
        }}>
          <NavLink to="/" style={navLinkStyle} end>Home</NavLink>
          <NavLink to="/digital-book-library" style={navLinkStyle}>Digital Book Library</NavLink>
          <NavLink to="/articles" style={navLinkStyle}>Articles</NavLink>
          <NavLink to="/article/About-Mising-Archives" style={navLinkStyle}>About</NavLink>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
            style={{
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '8px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: colors.accentPrimary,
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 12px ${colors.shadowColor}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.accentLight
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.bgSecondary
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span className="toggle-label">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>

          <button
            className="menu-toggle-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              borderRadius: '10px',
              padding: '8px',
              cursor: 'pointer',
              color: colors.accentPrimary
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <nav className="nav-links-mobile" style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 24px 20px',
          gap: '14px',
          borderTop: `1px solid ${colors.border}`
        }}>
          <NavLink to="/" onClick={() => setMenuOpen(false)} style={navLinkStyle} end>Home</NavLink>
          <NavLink to="/digital-book-library" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Digital Book Library</NavLink>
          <NavLink to="/articles" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Articles</NavLink>
          <NavLink to="/article/About-Mising-Archives" onClick={() => setMenuOpen(false)} style={navLinkStyle}>About</NavLink>
      
        </nav>
      )}
    </header>
  )
}
