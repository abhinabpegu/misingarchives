import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { X, Heart } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { donationStatus } from '../data/donations'

export default function DonationBanner() {
  const { isDarkMode, colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('donationBannerDismissed')
    if (!wasDismissed) setDismissed(false)
  }, [])

  if (donationStatus.paused) return null

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('donationBannerDismissed', 'true')
  }

  const handleDonateClick = () => {
    handleDismiss()
    if (location.pathname === '/') {
      document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })
      }, 200)
    }
  }

  if (dismissed) return null

  return (
    <div style={{
      backgroundColor: colors.accentPrimary,
      color: isDarkMode ? colors.bg : '#fff',
      padding: '14px 20px',
      position: 'relative',
      zIndex: 200
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        textAlign: 'center'
      }}>
        <p style={{
          margin: 0,
          fontSize: '13px',
          lineHeight: '1.6',
          maxWidth: '760px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Heart size={15} style={{ flexShrink: 0 }} />
          The Mising Archive Project doesn't run free of cost. It is run through donations like you.
          Even as little as ₹20 helps develop this project. Donations go toward the website domain,
          and the rest into book archival, because we sometimes need to obtain a physical book when
          a direct PDF isn't available.
        </p>

        <button
          onClick={handleDonateClick}
          style={{
            padding: '8px 16px',
            backgroundColor: isDarkMode ? colors.bg : '#fff',
            color: colors.accentPrimary,
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          Donate →
        </button>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: isDarkMode ? colors.bg : '#fff',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            opacity: 0.85
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}