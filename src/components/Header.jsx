import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X, ChevronDown, Heart } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { donationStatus } from '../data/donations'

// Add future /learn pages here — nothing else in this file needs to change.
const LEARN_LINKS = [
  { to: '/learn/clans', label: 'Clans' },
  { to: '/learn/mising-motifs', label: 'Mising Motifs' },
  { to: '/learn/mising-terms', label: 'Mising Terms' },
]

export default function Header() {
  const { isDarkMode, setIsDarkMode, colors } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [learnOpen, setLearnOpen] = useState(false)
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const learnRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const isLearnActive = location.pathname.startsWith('/learn')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setLearnOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function handleClickOutside(e) {
      if (learnRef.current && !learnRef.current.contains(e.target)) {
        setLearnOpen(false)
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') {
        setLearnOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const goToSupport = () => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })
      }, 200)
    }
  }

  const navLinkClass = ({ isActive }) => `nav-link-fancy ${isActive ? 'is-active' : ''}`

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? colors.accentPrimary : colors.textSecondary,
    fontWeight: isActive ? '700' : '600',
    fontSize: '14px',
    textDecoration: 'none',
    padding: '8px 4px',
    whiteSpace: 'nowrap',
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
  }

  return (
    <header
      className={`header-glass ${scrolled ? 'is-scrolled' : ''}`}
      style={{
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.bgTertiary,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px'
      }} className="header-inner">
        <Link to="/" onClick={() => setMenuOpen(false)} style={{
          fontSize: '21px',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          margin: 0,
          color: colors.accentPrimary,
          textDecoration: 'none',
          whiteSpace: 'nowrap'
        }}>
          Mising Archives
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '26px',
          flex: 1,
          justifyContent: 'center'
        }}>
          <NavLink to="/" className={navLinkClass} style={navLinkStyle} end>Home</NavLink>
          <NavLink to="/digital-book-library" className={navLinkClass} style={navLinkStyle}>Digital Book Library</NavLink>
          <NavLink to="/articles" className={navLinkClass} style={navLinkStyle}>Community Writings</NavLink>
          <NavLink to="/shop" className={navLinkClass} style={navLinkStyle}>Shop</NavLink>

          {/* Learn dropdown */}
          <div ref={learnRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setLearnOpen((o) => !o)}
              className={`nav-link-fancy ${isLearnActive ? 'is-active' : ''}`}
              style={learnButtonStyle}
              aria-expanded={learnOpen}
              aria-haspopup="true"
            >
              Learn more
              <ChevronDown
                size={14}
                style={{ transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)', transform: learnOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {learnOpen && (
              <div
                className="dropdown-enter"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  left: 0,
                  minWidth: '185px',
                  backgroundColor: colors.bgSecondary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                  boxShadow: `0 16px 36px ${colors.shadowColor}`,
                  backdropFilter: 'blur(16px)',
                  padding: '6px',
                  zIndex: 200
                }}
              >
                {LEARN_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setLearnOpen(false)}
                    className="pill-btn"
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: '10px 12px',
                      borderRadius: '8px',
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

          <NavLink to="/about" className={navLinkClass} style={navLinkStyle}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass} style={navLinkStyle}>Contact</NavLink>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!donationStatus.paused && (
            <button
              onClick={goToSupport}
              aria-label="Donate to the project"
              className="btn-fancy"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: colors.accentPrimary,
                color: isDarkMode ? colors.bg : '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: `0 4px 12px ${colors.shadowColor}`,
                whiteSpace: 'nowrap'
              }}
            >
              <Heart size={15} />
              <span className="toggle-label">Donate</span>
            </button>
          )}

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
            className="btn-ghost-fancy"
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
              boxShadow: `0 4px 12px ${colors.shadowColor}`
            }}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span className="toggle-label">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>

          <button
            className="menu-toggle-mobile btn-ghost-fancy"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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
        <nav className="nav-links-mobile mobile-menu-enter" style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 24px 20px',
          gap: '14px',
          borderTop: `1px solid ${colors.border}`
        }}>
          <NavLink to="/" onClick={() => setMenuOpen(false)} style={navLinkStyle} end>Home</NavLink>
          <NavLink to="/digital-book-library" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Digital Book Library</NavLink>
          <NavLink to="/articles" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Community Writings</NavLink>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Shop</NavLink>

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

          <NavLink to="/about" onClick={() => setMenuOpen(false)} style={navLinkStyle}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} style={navLinkStyle}>Contact</NavLink>
        </nav>
      )}
    </header>
  )
}
