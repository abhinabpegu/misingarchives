import React, { useState, useEffect } from 'react'
import { X, Shirt } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function MimangDetailModal({ mimang, onClose }) {
  const { isDarkMode, colors } = useTheme()
  const [showExample, setShowExample] = useState(false)

  // Reset the reveal state each time a different pattern is opened.
  useEffect(() => {
    setShowExample(false)
  }, [mimang])

  if (!mimang) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDarkMode ? 'rgba(15, 14, 12, 0.7)' : 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: colors.bgSecondary,
          borderRadius: '16px',
          maxWidth: '520px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: `0 20px 60px ${colors.shadowColor}`,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)',
          animation: 'slideUp 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 28px',
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          backdropFilter: 'blur(10px)'
        }}>
          <div>
            <span style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              color: colors.accentPrimary,
              marginBottom: '4px'
            }}>
              {mimang.code}
            </span>
            <h3 style={{ fontSize: '19px', fontWeight: '700', margin: 0, color: colors.text }}>
              {mimang.gamigName}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: colors.accentPrimary,
              padding: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(90deg)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0deg)' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '28px' }}>
          {/* Pattern image (1:1) */}
          <div style={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: colors.accentLight,
            marginBottom: '20px',
            boxShadow: `0 8px 24px ${colors.shadowColor}`
          }}>
            {mimang.image ? (
              <img
                src={mimang.image}
                alt={mimang.gamigName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.textTertiary,
                fontSize: '13px',
                fontStyle: 'italic'
              }}>
                Pattern image coming soon
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: colors.accentPrimary,
              marginBottom: '8px'
            }}>
              Description
            </label>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: mimang.englishDesc ? colors.text : colors.textTertiary,
              fontStyle: mimang.englishDesc ? 'normal' : 'italic',
              lineHeight: '1.6'
            }}>
              {mimang.englishDesc || 'Description coming soon'}
            </p>
          </div>

          {/* Cloth example — hidden behind a button until requested */}
          <div>
            {!showExample ? (
              <button
                onClick={() => setShowExample(true)}
                disabled={!mimang.clothExample}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '13px',
                  fontWeight: '700',
                  backgroundColor: mimang.clothExample ? colors.accentLight : colors.bgTertiary,
                  color: mimang.clothExample ? colors.accentPrimary : colors.textTertiary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '10px',
                  cursor: mimang.clothExample ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease'
                }}
              >
                <Shirt size={16} />
                {mimang.clothExample ? 'Show Cloth Example' : 'Cloth example coming soon'}
              </button>
            ) : (
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: colors.accentPrimary,
                  marginBottom: '8px'
                }}>
                  Cloth Example
                </label>
                <img
                  src={mimang.clothExample}
                  alt={`${mimang.gamigName} woven on cloth`}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    display: 'block',
                    boxShadow: `0 8px 24px ${colors.shadowColor}`
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}