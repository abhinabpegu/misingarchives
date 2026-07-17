import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

// Add future /learn pages here — nothing else in this file needs to change.
const LEARN_LINKS = [
  { to: '/learn/clans', label: 'Clans' },
  // { to: '/learn/numerals', label: 'Numerals' },
  // { to: '/learn/kinshipterms', label: 'Kinship Terms' },
]

export default function Header() {
  const { isDarkMode, setIsDarkMode, colors } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [learnOpen, setLearnOpen] = useState(false)
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false)
  const learnRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const isLearnActive = location.pathname.startsWith('/learn')

  useEffect(() => {
    function handleClickOutside(e) {
      if (learnRef.current && !learnRef.current.contains(e.target)) {
        setLearnOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  const learnButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    color: isLearnActive ? colors.accentPrimary : colors.textSecondary,
    fontWeight: isLearnActive ? '700' : '600',
    fontSize: '14px',
    padding: '8px 4px',
    borderBottom: isLearnActive ? `2px solid ${colors.accentPrimary}` : '2px solid transparent',
    transition: 'all 0.2s ease'
  }

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
          <NavLink to="/articles" style={navLinkStyle}>Community Writings</NavLink>

          {/* Learn dropdown */}
          <div ref={learnRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setLearnOpen((o) => !o)}
              style={learnButtonStyle}
              aria-expanded={learnOpen}
              aria-haspopup="true"
            >
              Learn more
              <ChevronDown
                size={14}
                style={{ transition: 'transform 0.2s ease', transform: learnOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {learnOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                left: 0,
                minWidth: '170px',
                backgroundColor: colors.bgSecondary,
                border: `1px solid ${colors.border}`,
                borderRadius: '10px',
                boxShadow: `0 12px 28px ${colors.shadowColor}`,
                backdropFilter: 'blur(10px)',
                padding: '6px',
                zIndex: 200
              }}>
                {LEARN_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setLearnOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: isActive ? '700' : '600',
                      color: isActive ? colors.accentPrimary : colors.text,
                      backgroundColor: isActive ? colors.accentLight : 'transparent',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    })}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/article/About-Mising-Archives" style={navLinkStyle}>About</NavLink>
          <NavLink to="/contact" style={navLinkStyle}>Contact</NavLink>
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
          <NavLink to="/articles" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Community Writings</NavLink>

          {/* Learn - expandable on mobile instead of a dropdown */}
          <div>
            <button
              onClick={() => setMobileLearnOpen((o) => !o)}
              aria-expanded={mobileLearnOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: '8px 4px',
                color: isLearnActive ? colors.accentPrimary : colors.textSecondary,
                fontWeight: isLearnActive ? '700' : '600',
                fontSize: '14px'
              }}
            >
              Learn
              <ChevronDown
                size={16}
                style={{ transition: 'transform 0.2s ease', transform: mobileLearnOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {mobileLearnOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '16px', marginTop: '10px' }}>
                {LEARN_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => { setMenuOpen(false); setMobileLearnOpen(false) }}
                    style={navLinkStyle}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/article/About-Mising-Archives" onClick={() => setMenuOpen(false)} style={navLinkStyle}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Contact</NavLink>
        </nav>
      )}
    </header>
  )
}