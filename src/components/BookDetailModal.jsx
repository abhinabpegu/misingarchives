import React from 'react'
import { X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function BookDetailModal({ book, onClose }) {
  const { isDarkMode, colors } = useTheme()

  if (!book) return null

  return (
    <div style={{
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
          maxWidth: '600px',
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
          padding: '28px',
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            margin: 0,
            color: colors.text
          }}>
            Book Details
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: colors.accentPrimary,
              padding: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(90deg)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg)'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '28px' }}>
          {/* Book Cover */}
          <div style={{
            marginBottom: '28px',
            textAlign: 'center'
          }}>
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                style={{
                  width: '200px',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  boxShadow: `0 12px 32px ${colors.shadowColor}`,
                  marginBottom: '16px'
                }}
              />
            ) : (
              <div style={{
                width: '200px',
                height: '280px',
                backgroundColor: colors.accentLight,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.textTertiary,
                fontSize: '48px',
                margin: '0 auto 16px',
                boxShadow: `0 8px 24px ${colors.shadowColor}`
              }}>
                📖
              </div>
            )}
          </div>

          {/* Book Info */}
          {[
            { label: 'Code', value: book.code, isBold: true },
            { label: 'Title', value: book.title, isLarge: true },
            { label: 'Author', value: book.author },
            { label: 'Language', value: book.language }
          ].map((item, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: colors.accentPrimary,
                marginBottom: '8px'
              }}>
                {item.label}
              </label>
              <p style={{
                margin: 0,
                fontSize: item.isLarge ? '18px' : '16px',
                fontWeight: item.isBold ? '600' : '400',
                color: colors.text,
                lineHeight: '1.4'
              }}>
                {item.value}
              </p>
            </div>
          ))}

          {/* Tags */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: colors.accentPrimary,
              marginBottom: '10px'
            }}>
              Tags
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {book.tags.map(tag => (
                <span key={tag} style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  backgroundColor: colors.accentLight,
                  color: colors.accentPrimary,
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Archived By */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: colors.accentPrimary,
              marginBottom: '8px'
            }}>
              Archived By
            </label>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: colors.textSecondary,
              fontStyle: 'italic'
            }}>
              {book.archivedBy}
            </p>
          </div>

          {/* Download Button */}
          <a
            href={book.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '14px 16px',
              fontSize: '14px',
              fontWeight: '700',
              backgroundColor: colors.accentPrimary,
              color: isDarkMode ? colors.bg : '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: `0 8px 24px ${colors.shadowColor}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.accentSecondary
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = `0 12px 32px ${colors.shadowColor}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.accentPrimary
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = `0 8px 24px ${colors.shadowColor}`
            }}
          >
            ⬇️ Download Book
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
