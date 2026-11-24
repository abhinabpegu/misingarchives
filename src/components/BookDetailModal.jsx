import React, { useEffect } from 'react'
import { X, Download, BookOpen } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { track, useStats, formatCount } from '../lib/stats'
import { cloudinaryUrl } from '../utils/cloudinaryUrl'

export default function BookDetailModal({ book, onClose }) {
  const { isDarkMode, colors } = useTheme()
  const stats = useStats('book')
  const bookStats = book ? stats[book.code] : null

  // Count one view per session each time a book is opened
  useEffect(() => {
    if (book) track('book', book.code, 'view')
  }, [book?.code])

  // Close on Escape and prevent background scrolling while open
  useEffect(() => {
    if (!book) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [book, onClose])

  if (!book) return null

  return (
    <div
      className="modal-backdrop-enter"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: isDarkMode ? 'rgba(15, 14, 12, 0.72)' : 'rgba(16, 18, 28, 0.5)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="modal-panel-enter"
        role="dialog"
        aria-modal="true"
        aria-label={book.title}
        style={{
          backgroundColor: colors.bgSecondary,
          borderRadius: '18px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: `0 24px 64px ${colors.shadowColor}`,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(16px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '22px 28px',
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 2
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: 0,
            color: colors.text
          }}>
            Book Details
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: colors.accentLight,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              color: colors.accentPrimary,
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(90deg)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0deg)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '28px' }}>
          {/* Book Cover */}
          <div style={{ marginBottom: '28px', textAlign: 'center' }}>
            {book.coverImage ? (
              <img
                src={cloudinaryUrl(book.coverImage, 'w_500,q_auto,f_auto')}
                alt={book.title}
                style={{
                  width: '190px',
                  height: '270px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  boxShadow: `0 16px 36px ${colors.shadowColor}`,
                  marginBottom: '14px'
                }}
              />
            ) : (
              <div style={{
                width: '190px',
                height: '270px',
                backgroundColor: colors.accentLight,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.accentPrimary,
                margin: '0 auto 14px'
              }}>
                <BookOpen size={44} />
              </div>
            )}

            {bookStats && (
              <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>
                {formatCount(bookStats.views)} views · {formatCount(bookStats.downloads)} downloads
              </p>
            )}
          </div>

          {/* Book Info */}
          {[
            { label: 'Code', value: book.code, isBold: true },
            { label: 'Title', value: book.title, isLarge: true },
            { label: 'Author', value: book.author },
            { label: 'Language', value: book.language }
          ].map((item, idx) => (
            <div key={idx} style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: colors.accentPrimary,
                marginBottom: '6px'
              }}>
                {item.label}
              </label>
              <p style={{
                margin: 0,
                fontSize: item.isLarge ? '18px' : '15px',
                fontWeight: item.isBold ? '700' : '500',
                color: colors.text,
                lineHeight: '1.4'
              }}>
                {item.value}
              </p>
            </div>
          ))}

          {/* Tags */}
          <div style={{ marginBottom: '22px' }}>
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
              {(book.tags || []).map(tag => (
                <span key={tag} style={{
                  display: 'inline-block',
                  padding: '6px 12px',
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
              marginBottom: '6px'
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

          {/* Takedown notice */}
          {book.archivedBy === 'Mising Archives' && (
            <div style={{
              marginBottom: '24px',
              padding: '14px 16px',
              borderRadius: '10px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bgTertiary,
              fontSize: '12px',
              color: colors.textSecondary,
              lineHeight: '1.6'
            }}>
              Copyright holder? If you'd like this book taken down, email{' '}
              <a href="mailto:contact@misingarchives.co.in" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
                contact@misingarchives.co.in
              </a>.
            </div>
          )}

          {/* Download Button */}
          <a
            href={book.driveLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('book', book.code, 'download')}
            className="btn-fancy"
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
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: `0 8px 24px ${colors.shadowColor}`
            }}
          >
            <Download size={16} />
            Download Book
          </a>
        </div>
      </div>
    </div>
  )
}
