import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download } from 'lucide-react'
import { booksData } from '../data/books'
import { useTheme } from '../context/ThemeContext'
import { usePageTitle } from '../hooks/usePageTitle'

export default function BookDetail() {
  const { code } = useParams()
  const { isDarkMode, colors } = useTheme()
  const book = booksData.find(b => b.code === code)
  usePageTitle(book?.title)

  if (!book) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
        <h1 style={{ fontSize: '22px', color: colors.text, marginBottom: '10px' }}>Book not found</h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '24px' }}>
          This book may have been moved or doesn't exist.
        </p>
        <Link to="/digital-book-library" style={{ color: colors.accentPrimary, fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
          ← Back to Digital Book Library
        </Link>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: { '@type': 'Person', name: book.author },
    inLanguage: book.language,
    genre: book.tags,
    isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: 'Mising Archives', url: 'https://www.misingarchives.co.in' },
  }

  return (
    <article style={{ maxWidth: '760px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <Link to="/digital-book-library" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        fontWeight: '600',
        color: colors.textSecondary,
        textDecoration: 'none',
        marginBottom: '28px'
      }}>
        <ArrowLeft size={15} /> Back to Digital Book Library
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
        Book · {book.code}
      </span>

      <h1 style={{
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontWeight: '800',
        lineHeight: '1.2',
        margin: '0 0 16px',
        color: colors.text
      }}>
        {book.title}
      </h1>

      <p style={{ fontSize: '13px', color: colors.textTertiary, marginBottom: '32px' }}>
        By {book.author} · {book.language}
      </p>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            style={{
              width: '200px',
              height: '280px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: `0 12px 32px ${colors.shadowColor}`
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
            fontSize: '48px'
          }}>
            📖
          </div>
        )}

        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
              letterSpacing: '1px', color: colors.accentPrimary, marginBottom: '10px'
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

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
              letterSpacing: '1px', color: colors.accentPrimary, marginBottom: '8px'
            }}>
              Archived By
            </label>
            <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary, fontStyle: 'italic' }}>
              {book.archivedBy}
            </p>
          </div>

          
            <a href={book.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 24px',
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

      {book.archivedBy === 'Mising Archives' && (
        <div style={{
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
    </article>
  )
}