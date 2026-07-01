import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { booksData } from '../data/books'
import { useTheme } from '../context/ThemeContext'
import BookDetailModal from '../components/BookDetailModal'

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

      {/* Books Table with Glass Effect - Responsive */}
      <section className="section-container" style={{
        padding: '0 40px 60px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {displayedBooks.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="desktop-table" style={{
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              overflow: 'hidden',
              boxShadow: `0 8px 32px ${colors.shadowColor}`,
              backgroundColor: colors.bgSecondary,
              backdropFilter: 'blur(10px)',
              marginTop: '32px'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{
                    borderBottom: `1px solid ${colors.border}`,
                    backgroundColor: colors.bgTertiary,
                    backdropFilter: 'blur(10px)'
                  }}>
                    {['Code', 'Title', 'Author', 'Language', 'Tags', 'Action'].map(header => (
                      <th key={header} style={{
                        padding: '18px 16px',
                        textAlign: 'left',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1.2px',
                        color: colors.accentPrimary,
                        borderRight: header !== 'Action' ? `1px solid ${colors.border}` : 'none'
                      }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayedBooks.map((book) => (
                    <tr
                      key={book.code}
                      style={{
                        borderBottom: `1px solid ${colors.border}`,
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.tableHover
                        e.currentTarget.style.boxShadow = `inset 0 0 10px ${colors.shadowColor}`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <td style={{
                        padding: '16px',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: colors.accentPrimary,
                        borderRight: `1px solid ${colors.border}`
                      }}>
                        {book.code}
                      </td>
                      <td style={{
                        padding: '16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: colors.text,
                        borderRight: `1px solid ${colors.border}`,
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {book.title}
                      </td>
                      <td style={{
                        padding: '16px',
                        fontSize: '14px',
                        color: colors.textSecondary,
                        borderRight: `1px solid ${colors.border}`
                      }}>
                        {book.author}
                      </td>
                      <td style={{
                        padding: '16px',
                        fontSize: '14px',
                        color: colors.textSecondary,
                        borderRight: `1px solid ${colors.border}`
                      }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '6px 10px',
                          backgroundColor: colors.accentLight,
                          color: colors.accentPrimary,
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {book.language}
                        </span>
                      </td>
                      <td style={{
                        padding: '16px',
                        fontSize: '12px',
                        color: colors.textTertiary,
                        borderRight: `1px solid ${colors.border}`
                      }}>
                        {book.tags.slice(0, 2).map(tag => (
                          <span key={tag} style={{
                            display: 'inline-block',
                            marginRight: '6px',
                            marginBottom: '4px'
                          }}>
                            {tag}
                          </span>
                        ))}
                        {book.tags.length > 2 && (
                          <span>+{book.tags.length - 2}</span>
                        )}
                      </td>
                      <td style={{
                        padding: '16px',
                        textAlign: 'center'
                      }}>
                        <button
                          onClick={() => setSelectedBook(book)}
                          style={{
                            padding: '8px 14px',
                            backgroundColor: colors.accentPrimary,
                            color: isDarkMode ? colors.bg : '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            transition: 'all 0.2s ease',
                            boxShadow: `0 4px 12px ${colors.shadowColor}`
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = colors.accentSecondary
                            e.target.style.transform = 'translateY(-2px)'
                            e.target.style.boxShadow = `0 6px 20px ${colors.shadowColor}`
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = colors.accentPrimary
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = `0 4px 12px ${colors.shadowColor}`
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="mobile-cards" style={{ marginTop: '32px' }}>
              {displayedBooks.map((book) => (
                <div
                  key={book.code}
                  style={{
                    backgroundColor: colors.bgSecondary,
                    borderRadius: '12px',
                    border: `1px solid ${colors.border}`,
                    padding: '16px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 4px 12px ${colors.shadowColor}`,
                    transition: 'all 0.2s ease'
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.backgroundColor = colors.tableHover
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.backgroundColor = colors.bgSecondary
                  }}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: colors.accentPrimary
                      }}>
                        {book.code}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        backgroundColor: colors.accentLight,
                        color: colors.accentPrimary,
                        borderRadius: '4px',
                        fontWeight: '600'
                      }}>
                        {book.language}
                      </span>
                    </div>
                    <h3 style={{
                      margin: '0 0 6px 0',
                      fontSize: '15px',
                      fontWeight: '600',
                      color: colors.text,
                      lineHeight: '1.3'
                    }}>
                      {book.title}
                    </h3>
                    <p style={{
                      margin: '0 0 10px 0',
                      fontSize: '13px',
                      color: colors.textSecondary
                    }}>
                      {book.author}
                    </p>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px'
                    }}>
                      {book.tags.map(tag => (
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
                    onTouchStart={(e) => {
                      e.target.style.backgroundColor = colors.accentSecondary
                    }}
                    onTouchEnd={(e) => {
                      e.target.style.backgroundColor = colors.accentPrimary
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </>
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
      {/* Request or donate a book */}
<section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px) 60px' }}>
  <div style={{
    textAlign: 'center',
    padding: '32px 24px',
    borderRadius: '14px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bgSecondary,
    backdropFilter: 'blur(10px)',
    boxShadow: `0 4px 16px ${colors.shadowColor}`
  }}>
    <h3 style={{ margin: '0 0 10px', fontSize: '17px', fontWeight: '700', color: colors.text }}>
      Have a book to donate, or want one archived?
    </h3>
    <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary, lineHeight: '1.6', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
      If you'd like to request a book for the archive, or donate one for archival, email{' '}
      <a href="mailto:misingarchives@gmail.com" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
        misingarchives@gmail.com
      </a>.
    </p>
  </div>
</section>

<BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />

      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  )
}
