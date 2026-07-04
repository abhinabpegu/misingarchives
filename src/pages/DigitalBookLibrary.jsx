import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { booksData } from '../data/books'
import { useTheme } from '../context/ThemeContext'
import BookDetailModal from '../components/BookDetailModal'
import ContributeCard from '../components/ContributeCard'

export default function DigitalBookLibrary() {
  const { isDarkMode, colors } = useTheme()
  const [searchParams] = useSearchParams()

  const [sortBy, setSortBy] = useState('code')
  const [filterLanguage, setFilterLanguage] = useState('All')
  const [filterTag, setFilterTag] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)

  // Support deep links from the homepage, e.g. /digital-book-library?tag=History or ?book=0001
  useEffect(() => {
    const tagParam = searchParams.get('tag')
    const langParam = searchParams.get('lang')
    const bookParam = searchParams.get('book')

    if (tagParam) setFilterTag(tagParam)
    if (langParam) setFilterLanguage(langParam)
    if (bookParam) {
      const match = booksData.find(b => b.code === bookParam)
      if (match) setSelectedBook(match)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const languages = ['All', ...new Set(booksData.map(book => book.language))]
  const tags = ['All', ...new Set(booksData.flatMap(book => book.tags))]

  const displayedBooks = useMemo(() => {
    let filtered = booksData.filter(book => {
      const langMatch = filterLanguage === 'All' || book.language === filterLanguage
      const tagMatch = filterTag === 'All' || book.tags.includes(filterTag)
      const searchMatch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.code.includes(searchQuery)
      return langMatch && tagMatch && searchMatch
    })

    filtered.sort((a, b) => {
      if (sortBy === 'code') return a.code.localeCompare(b.code)
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'author') return a.author.localeCompare(b.author)
      if (sortBy === 'language') return a.language.localeCompare(b.language)
      return 0
    })

    return filtered
  }, [sortBy, filterLanguage, filterTag, searchQuery])

  return (
    <div>
      {/* Page intro */}
      <section style={{
        padding: '48px clamp(20px, 5vw, 40px) 0',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1.4px',
          color: colors.accentPrimary
        }}>
          The Collection
        </span>
        <h1 style={{
          fontSize: '34px',
          fontWeight: '700',
          margin: '10px 0 8px',
          color: colors.text
        }}>
           Digital Book Library
        </h1>
      
      </section>
      {/* Request or donate a book */}
<section style={{ padding: '0 clamp(20px, 5vw, 40px)', maxWidth: '1400px', margin: '0 auto' }}>
  <ContributeCard
    title="Have a book to donate, or want one archived?"
    teaser="Request a title, or give permission to archive one you hold the rights to."
  >
    <p style={{ margin: '0 0 14px', fontSize: '14px', color: colors.textSecondary, lineHeight: '1.6' }}>
      Whether you're requesting a book for the archive, or you're a copyright holder/author
      giving permission for your book to be archived, fill out our short form:
    </p>

    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLScahQG34BhG6t03j8lXFSNiqpmnlHhdvWIe8UpisYbBFrOqpg/viewform"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        padding: '10px 18px',
        backgroundColor: colors.accentPrimary,
        color: '#fff',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: '700',
        marginBottom: '12px'
      }}
    >
      Open the Book Archival Form →
    </a>
    <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>
      Prefer email? Reach us at{' '}
      <a href="mailto:contact@misingarchives.co.in" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
        contact@misingarchives.co.in
      </a>{' '}
      or on Instagram —{' '}
      <a href="https://instagram.com/misingarchives" target="_blank" rel="noopener noreferrer" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
        @misingarchives
      </a>.
    </p>
  </ContributeCard>
</section>

      {/* Filters with Glass Effect */}
      <section style={{
        padding: '32px clamp(20px, 5vw, 40px) 0',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ position: 'relative', maxWidth: '450px' }}>
            <Search
              size={18}
              color={colors.textTertiary}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            <input
              type="text"
              placeholder="Search by title, author, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 44px',
                fontSize: '14px',
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                backgroundColor: colors.bgSecondary,
                backdropFilter: 'blur(10px)',
                color: colors.text,
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 12px ${colors.shadowColor}`
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.accentPrimary
                e.target.style.boxShadow = `0 0 0 3px ${colors.accentLight}, 0 4px 12px ${colors.shadowColor}`
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border
                e.target.style.boxShadow = `0 4px 12px ${colors.shadowColor}`
              }}
            />
          </div>
        </div>

        {/* Filter Controls with Glass */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {[
            { label: 'Sort By', value: sortBy, onChange: setSortBy, options: [
              ['code', 'Book Code'], ['title', 'Title'], ['author', 'Author'], ['language', 'Language']
            ]},
            { label: 'Language', value: filterLanguage, onChange: setFilterLanguage, options:
              languages.map(l => [l, l])
            },
            { label: 'Tag', value: filterTag, onChange: setFilterTag, options:
              tags.map(t => [t, t])
            }
          ].map((filter, idx) => (
            <div key={idx}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                marginBottom: '10px',
                color: colors.accentPrimary
              }}>
                {filter.label}
              </label>
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '14px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '10px',
                  backgroundColor: colors.bgSecondary,
                  backdropFilter: 'blur(10px)',
                  color: colors.text,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 4px 12px ${colors.shadowColor}`
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accentPrimary
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border
                }}
              >
                {filter.options.map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* Books Grid — unified card layout, 2 columns on desktop, 1 on mobile */}
      <section className="section-container" style={{
        padding: '0 40px 60px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {displayedBooks.length > 0 ? (
          <div className="books-grid" style={{ marginTop: '32px' }}>
            {displayedBooks.map((book) => (
              <div
                key={book.code}
                className="book-card"
                style={{
                  backgroundColor: colors.bgSecondary,
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  padding: '20px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 4px 12px ${colors.shadowColor}`,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.tableHover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.bgSecondary
                }}
              >
                <div style={{ display: 'flex', gap: '14px', marginBottom: '12px', flex: 1 }}>
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      style={{
                        width: '64px',
                        height: '92px',
                        flexShrink: 0,
                        objectFit: 'cover',
                        borderRadius: '6px',
                        boxShadow: `0 4px 10px ${colors.shadowColor}`
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '64px',
                        height: '92px',
                        flexShrink: 0,
                        borderRadius: '6px',
                        backgroundColor: colors.accentLight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px'
                      }}
                    >
                      📖
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '8px'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: '700',
                          color: colors.accentPrimary
                        }}
                      >
                        {book.code}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '4px 8px',
                          backgroundColor: colors.accentLight,
                          color: colors.accentPrimary,
                          borderRadius: '4px',
                          fontWeight: '600'
                        }}
                      >
                        {book.language}
                      </span>
                    </div>
                    <h3
                      style={{
                        margin: '0 0 6px 0',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: colors.text,
                        lineHeight: '1.35'
                      }}
                    >
                      {book.title}
                    </h3>
                    <p
                      style={{
                        margin: '0 0 12px 0',
                        fontSize: '13px',
                        color: colors.textSecondary
                      }}
                    >
                      {book.author}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        backgroundColor: colors.accentLight,
                        color: colors.accentPrimary,
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedBook(book)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: colors.accentPrimary,
                    color: isDarkMode ? colors.bg : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    boxShadow: `0 4px 12px ${colors.shadowColor}`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.accentSecondary
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = colors.accentPrimary
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 40px',
            color: colors.textTertiary,
            backgroundColor: colors.bgSecondary,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)',
            boxShadow: `0 8px 32px ${colors.shadowColor}`,
            marginTop: '32px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: colors.text }}>No books found</p>
            <p style={{ fontSize: '14px' }}>Try adjusting your filters or search terms.</p>
          </div>
        )}
      </section>

      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  )
}
