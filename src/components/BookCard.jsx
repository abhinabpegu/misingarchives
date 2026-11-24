import React from 'react'
import { BookOpen } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useCardStyle } from '../utils/cardStyle'
import { track, formatCount } from '../lib/stats'
import { cloudinaryUrl } from '../utils/cloudinaryUrl'
import LazyImage from './LazyImage'

// Portrait cover, uppercase serif title (max 2 lines), author, "Read PDF" button.
// Clicking the cover or title opens the details modal.
export default function BookCard({ book, stats, onOpen }) {
  const { isDarkMode, colors } = useTheme()
  const { cardBase } = useCardStyle()
  const thumbSrc = book.coverImage ? cloudinaryUrl(book.coverImage, 'w_450,q_auto,f_auto') : null

  return (
    <div
      className="card-interactive"
      style={{ ...cardBase, padding: '10px 10px 14px', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Cover */}
      <div
        onClick={() => onOpen(book)}
        className="card-media-zoom"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '2 / 3',
          borderRadius: '9px',
          overflow: 'hidden',
          backgroundColor: colors.accentLight,
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        {thumbSrc ? (
          <LazyImage
            src={thumbSrc}
            alt={book.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={34} color={colors.accentPrimary} />
          </div>
        )}
        <span style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          fontSize: '10px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          padding: '4px 8px',
          borderRadius: '5px',
          backgroundColor: colors.accentPrimary,
          color: isDarkMode ? colors.bg : '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          zIndex: 2
        }}>
          {book.language}
        </span>
      </div>

      {/* Text */}
      <div style={{ padding: '14px 6px 0', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          onClick={() => onOpen(book)}
          title={book.title}
          style={{
            margin: '0 0 6px',
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '15px',
            fontWeight: '700',
            lineHeight: '1.3',
            textTransform: 'uppercase',
            color: colors.text,
            cursor: 'pointer',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '40px'
          }}
        >
          {book.title}
        </h3>

        <p style={{
          margin: '0 0 6px',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.4px',
          color: colors.textSecondary,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {book.author}
        </p>

        <p style={{ margin: '0 0 12px', fontSize: '11px', color: colors.textTertiary, minHeight: '16px' }}>
          {stats ? `${formatCount(stats.views)} views · ${formatCount(stats.downloads)} downloads` : ''}
        </p>

        <div style={{ flex: 1 }} />

        <a
          href={book.driveLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('book', book.code, 'download')}
          className="btn-fancy"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '10px 14px',
            backgroundColor: colors.accentPrimary,
            color: isDarkMode ? colors.bg : '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '700'
          }}
        >
          Read PDF
        </a>
      </div>
    </div>
  )
}
