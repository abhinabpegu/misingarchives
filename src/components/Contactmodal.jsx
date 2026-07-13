import React, { useState } from 'react'
import { HelpCircle, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import ContactForm from './ContactForm'

export default function ContactModal() {
  const { isDarkMode, colors } = useTheme()
  const [open, setOpen] = useState(false)
  const [formKey, setFormKey] = useState(0) // bump to reset ContactForm's internal state

  const close = () => {
    setOpen(false)
    setTimeout(() => setFormKey((k) => k + 1), 200)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Contact us"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: colors.accentPrimary,
          color: isDarkMode ? colors.bg : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: `0 8px 20px ${colors.shadowColor}`,
          zIndex: 150,
        }}
      >
        <HelpCircle size={24} />
      </button>

      {!open ? null : (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: isDarkMode ? 'rgba(15, 14, 12, 0.7)' : 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={close}
        >
          <div
            style={{
              backgroundColor: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              borderRadius: '14px',
              maxWidth: '440px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: `0 20px 60px ${colors.shadowColor}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: colors.text }}>
                Contact Us
              </h3>
              <button
                onClick={close}
                aria-label="Close"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.textSecondary }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <ContactForm key={formKey} onSent={() => {}} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}