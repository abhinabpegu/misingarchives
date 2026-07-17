import React from 'react'
import { useTheme } from '../context/ThemeContext'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  const { colors } = useTheme()

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '48px clamp(20px, 5vw, 40px) 80px' }}>
      <span style={{
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1.4px',
        color: colors.accentPrimary,
      }}>
        Get in Touch
      </span>
      <h1 style={{ fontSize: '34px', fontWeight: '700', margin: '10px 0 12px', color: colors.text }}>
        Contact Us
      </h1>
      <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', marginBottom: '32px' }}>
        Questions, book requests, article submissions, or anything else — send us a message
        and we'll get back to you. You can also reach us directly at{' '}
        <a href="mailto:contact@misingarchives.co.in" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
          contact@misingarchives.co.in
        </a>{' '}
        or on Instagram —{' '}
        <a href="https://instagram.com/misingarchives" target="_blank" rel="noopener noreferrer" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
          @misingarchives
        </a>.
      </p>

      <div style={{
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
        borderRadius: '14px',
        padding: '28px',
      }}>
        <ContactForm />
      </div>
    </div>
  )
}