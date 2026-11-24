import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCardStyle } from '../utils/cardStyle'
import { formatDate } from '../utils/formatDate'
import { useStats, formatCount } from '../lib/stats'
import { cloudinaryUrl } from '../utils/cloudinaryUrl'
import LazyImage from './LazyImage'

// size: 'featured' (image/placeholder block + larger title) or 'normal' (compact)
export default function ArticleCard({ article, size = 'normal' }) {
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()
  const stats = useStats('article')
  const reads = stats[article.slug]?.views
  const isFeatured = size === 'featured'
  const coverSrc = article.coverImage
    ? cloudinaryUrl(article.coverImage, isFeatured ? 'w_900,q_auto,f_auto' : 'w_600,q_auto,f_auto')
    : null

  return (
    <Link
      to={`/article/${article.slug}`}
      className="card-interactive"
      style={{
        ...cardBase,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        color: colors.text,
        overflow: 'hidden'
      }}
    >
      {(coverSrc || isFeatured) && (
        coverSrc ? (
          <div
            className="card-media-zoom"
            style={{
              width: '100%',
              height: isFeatured ? '260px' : '165px',
              backgroundColor: colors.bgTertiary,
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <LazyImage
              src={coverSrc}
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: article.coverFit || 'cover',
                display: 'block'
              }}
            />
          </div>
        ) : (
          <div style={{
            width: '100%',
            height: isFeatured ? '260px' : '165px',
            flexShrink: 0,
            background: `linear-gradient(135deg, ${colors.accentLight}, transparent)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isFeatured ? '40px' : '28px'
          }} />
        )
      )}

      <div style={{
        padding: isFeatured ? '26px' : '20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: colors.accentPrimary,
          backgroundColor: colors.accentLight,
          padding: '4px 10px',
          borderRadius: '6px',
          marginBottom: '12px',
          alignSelf: 'flex-start'
        }}>
          {article.category}
        </span>

        <h3 style={{
          margin: '0 0 10px',
          fontSize: isFeatured ? '20px' : '16px',
          fontWeight: '700',
          lineHeight: '1.35',
          color: colors.text
        }}>
          {article.title}
        </h3>

        <p style={{
          margin: '0 0 14px',
          fontSize: '13px',
          color: colors.textSecondary,
          lineHeight: '1.6',
          display: '-webkit-box',
          WebkitLineClamp: isFeatured ? 3 : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {article.excerpt}
        </p>

        <div style={{ flex: 1 }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: colors.textTertiary
        }}>
          <span>{article.author} · {formatDate(article.date)}</span>
          {reads != null && <span>{formatCount(reads)} reads</span>}
        </div>

        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '12px',
          fontSize: '12px',
          fontWeight: '700',
          color: colors.accentPrimary
        }}>
          Read full text <span className="card-arrow">→</span>
        </span>
      </div>
    </Link>
  )
}
