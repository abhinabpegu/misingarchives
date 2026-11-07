import React from 'react'
import { MessageCircle, Phone, Mail, Instagram } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { whatsappLink, telLink, instagramLink } from '../../utils/shop'

// Contact options for an artisan. Only shows what they filled in.
export default function ContactButtons({ artisan, message }) {
  const { isDarkMode, colors } = useTheme()

  const wa = whatsappLink(artisan.whatsapp || artisan.phone, message)
  const tel = telLink(artisan.phone || artisan.whatsapp)
  const ig = instagramLink(artisan.instagram)

  const primary = {
    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 18px', fontSize: '13px',
    fontWeight: '700', backgroundColor: colors.accentPrimary, color: isDarkMode ? colors.bg : '#fff',
    borderRadius: '10px', textDecoration: 'none',
  }
  const ghost = {
    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 16px', fontSize: '13px',
    fontWeight: '700', color: colors.textSecondary, backgroundColor: colors.bgSecondary,
    border: `1px solid ${colors.border}`, borderRadius: '10px', textDecoration: 'none',
  }

  if (!wa && !tel && !artisan.email && !ig) {
    return <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>No contact details added yet.</p>
  }

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {wa && <a href={wa} target="_blank" rel="noopener noreferrer" style={primary}><MessageCircle size={15} /> WhatsApp</a>}
      {artisan.email && <a href={`mailto:${artisan.email}`} style={ghost}><Mail size={15} /> Email</a>}
      {ig && <a href={ig} target="_blank" rel="noopener noreferrer" style={ghost}><Instagram size={15} /> Instagram</a>}
    </div>
  )
}