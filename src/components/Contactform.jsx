import React from 'react'
import { Send } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const TOPICS = [
  'General Inquiry',
  'Book Request / Permission',
  'Article Submission',
  'Donation Question',
  'Copyright / Takedown Request',
  'Report an Issue',
  'Other',
]

// Public by design — this key only routes submissions, it doesn't grant
// account access. Safe to hardcode here the same way the Web3Forms docs do.
const ACCESS_KEY = 'f1f850b8-beea-4c0a-a6a2-eb6ccce5bae9'

export default function ContactForm() {
  const { isDarkMode, colors } = useTheme()

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    backgroundColor: colors.bg,
    color: colors.text,
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: '8px',
  }

  return (
    <form action="https://api.web3forms.com/submit" method="POST">
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New message from Mising Archives contact form" />
      {/* honeypot spam trap — real users never fill this, bots often do */}
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

      <div style={{ marginBottom: '18px' }}>
        <label style={labelStyle}>Your Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '18px' }}>
        <label style={labelStyle}>Topic</label>
        <select name="topic" style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="General Inquiry">
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <label style={labelStyle}>What is your question or comment?</label>
        <textarea
          name="message"
          placeholder="Enter your message... (for takedown requests, please include the book title/code and proof of copyright ownership)"
          rows={5}
          required
          maxLength={1000}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ marginBottom: '18px' }}>
        <label style={labelStyle}>Your Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Phone Number (optional)</label>
        <input
          type="tel"
          name="phone"
          placeholder="+91 XXXXX XXXXX"
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px 16px',
          backgroundColor: colors.accentPrimary,
          color: isDarkMode ? colors.bg : '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '700',
          cursor: 'pointer',
        }}
      >
        <Send size={15} />
        Send Message
      </button>
    </form>
  )
}