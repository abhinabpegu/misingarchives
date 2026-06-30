import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCardStyle } from '../utils/cardStyle'
import { formatDate } from '../utils/formatDate'

// size: 'featured' (image/placeholder block + larger title) or 'normal' (compact)
export default function ArticleCard({ article, size = 'normal' }) {
  const { colors } = useTheme()
  const { cardBase, hoverIn, hoverOut } = useCardStyle()
  const isFeatured = size === 'featured'

  return (
    <Link
      to={`/article/${article.slug}`}
      style={{
        ...cardBase,
        display: 'block',
        textDecoration: 'none',
        color: colors.text,
        overflow: 'hidden'
      }}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {(article.coverImage || isFeatured) && (
        article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            style={{
              width: '100%',
              height: isFeatured ? '260px' : '160px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: isFeatured ? '260px' : '160px',
            backgroundColor: colors.accentLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isFeatured ? '40px' : '28px'
          }}>
            ✍️
          </div>
        )
      )}

      <div style={{ padding: isFeatured ? '26px' : '20px' }}>
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
          marginBottom: '12px'
        }}>
          {article.category}
        </span>

        <h3 style={{
          margin: '0 0 10px',
          fontSize: isFeatured ? '20px' : '15px',
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
          lineHeight: '1.55',
          display: '-webkit-box',
          WebkitLineClamp: isFeatured ? 3 : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {article.excerpt}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: colors.textTertiary
        }}>
          <span>{article.author} · {formatDate(article.date)}</span>
        </div>

        <span style={{
          display: 'inline-block',
          marginTop: '12px',
          fontSize: '12px',
          fontWeight: '700',
          color: colors.accentPrimary
        }}>
          Read article →
        </span>
      </div>
    </Link>
  )
}
