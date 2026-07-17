import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { articlesData } from '../data/articles'
import { useTheme } from '../context/ThemeContext'
import { formatDate } from '../utils/formatDate'
import { usePageTitle } from '../hooks/usePageTitle'

export default function ArticleDetail() {
  const { slug } = useParams()
  const { colors } = useTheme()
  const article = articlesData.find(a => a.slug === slug)
  usePageTitle(article?.title)  
  if (!article) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
        <h1 style={{ fontSize: '22px', color: colors.text, marginBottom: '10px' }}>Article not found</h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '24px' }}>
          This article may have been moved or doesn't exist.
        </p>
        <Link to="/articles" style={{ color: colors.accentPrimary, fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
          ← Back to Articles
        </Link>
      </div>
    )
  }

  return (
    <article style={{ maxWidth: '760px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      <Link to="/articles" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        fontWeight: '600',
        color: colors.textSecondary,
        textDecoration: 'none',
        marginBottom: '28px'
      }}>
        <ArrowLeft size={15} /> Back to Articles
      </Link>

      <span style={{
        display: 'inline-block',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: colors.accentPrimary,
        backgroundColor: colors.accentLight,
        padding: '5px 10px',
        borderRadius: '6px',
        marginBottom: '16px'
      }}>
        {article.category}
      </span>

      <h1 style={{
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontWeight: '800',
        lineHeight: '1.2',
        margin: '0 0 16px',
        color: colors.text
      }}>
        {article.title}
      </h1>

      <p style={{ fontSize: '13px', color: colors.textTertiary, marginBottom: '32px' }}>
        By {article.author} · {formatDate(article.date)}
      </p>

      {article.coverImage && (
  article.category === 'Poetry' ? (
    <img
      src={article.coverImage}
      alt={article.title}
      style={{
        width: '100%',
        maxHeight: '220px',
        objectFit: article.coverFit || 'cover',
        marginBottom: '36px',
        filter: 'saturate(0.85) contrast(0.95)',
        maskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
        display: 'block'

      }}
    />
  ) : (
    <img
      src={article.coverImage}
      alt={article.title}
      style={{
        width: '100%',
        maxHeight: '420px',
        objectFit: article.coverFit || 'cover',
        backgroundColor: colors.bgTertiary,
        borderRadius: '14px',
        marginBottom: '36px',
        boxShadow: `0 12px 32px ${colors.shadowColor}`
      }}
    />
  )
)}

      {/* Article body: raw HTML from src/data/articles.js, styled by the
          .article-body rules in src/styles/App.css. CSS custom properties
          below let those rules follow the current light/dark theme. */}
      <div
  className={article.category === 'Poetry' ? 'article-body poem-body' : 'article-body'}
        style={{
          '--accent': colors.accentPrimary,
          '--text': colors.text,
          '--text-secondary': colors.textSecondary,
          '--border': colors.border,
          '--bg-secondary': colors.bgSecondary,
        }}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.sourceUrl && (
        <div style={{
          marginTop: '48px',
          padding: '16px 20px',
          borderRadius: '10px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          fontSize: '13px',
          color: colors.textSecondary,
          lineHeight: '1.6'
        }}>
          {article.sourceLabel || 'Source'}
          {': '}
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.accentPrimary, fontWeight: '600' }}
          >
            {article.sourceUrl}
          </a>
        </div>
      )}
    </article>
  )
}
