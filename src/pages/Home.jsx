import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { booksData } from '../data/books'
import { articlesData } from '../data/articles'
import { useTheme } from '../context/ThemeContext'
import { useCardStyle } from '../utils/cardStyle'
import ArticleCard from '../components/ArticleCard'
import DonateButton from '../components/DonateButton'

const CATEGORIES = [
  { tag: 'History', icon: '', desc: 'Chronicles of the Mising people and the Brahmaputra valley.' },
  { tag: 'Culture', icon: '', desc: 'Customs, social life, and community heritage.' },
  { tag: 'Language', icon: '', desc: 'Grammars, vocabulary, and linguistic studies.' },
  { tag: 'Folklore', icon: '', desc: 'Folk literature, songs, and oral traditions.' },
]

const MISSION_PILLARS = [
  { icon: '', title: 'Preserve', desc: 'Cultural knowledge and heritage, before it is lost to time.' },
  { icon: '', title: 'Share', desc: 'Freely, without barriers, paywalls, or gatekeeping.' },
  { icon: '', title: 'Empower', desc: 'Community members, students, and researchers alike.' },
  { icon: '', title: 'Document', desc: 'The richness of Mising culture for future generations.' },
]

export default function Home() {
  const { isDarkMode, colors } = useTheme()
  const { cardBase, hoverIn, hoverOut } = useCardStyle()
  const featuredBook = booksData[0]
  const latestBooks = [...booksData].slice(-3).reverse()

  const sortedArticles = [...articlesData].sort((a, b) => b.date.localeCompare(a.date))
  const featuredArticle = sortedArticles.find(a => a.featured) || sortedArticles[0]
  const otherArticles = sortedArticles.filter(a => a.slug !== featuredArticle?.slug).slice(0, 2)

  const eyebrow = {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.4px',
    color: colors.accentPrimary
  }

  const sectionWrap = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 40px)'
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ ...sectionWrap, padding: '64px clamp(20px, 5vw, 40px) 56px' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          <div>
          
            <h1 style={{
              fontSize: '44px',
              lineHeight: '1.15',
              fontWeight: '800',
              margin: '14px 0 18px',
              color: colors.text
            }}>
              Kumrígsudung
            </h1>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: colors.textSecondary,
              maxWidth: '520px',
              marginBottom: '28px'
            }}>
              Mising Archives is a free, open digital library documenting Mising culture, tradition,
              history, and language, started by community members to preserve knowledge for future generations.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to="/digital-book-library"
                style={{
                  padding: '14px 24px',
                  backgroundColor: colors.accentPrimary,
                  color: isDarkMode ? colors.bg : '#fff',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                  boxShadow: `0 8px 20px ${colors.shadowColor}`,
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Explore the Library →
              </Link>
              <Link
                to="/articles"
                style={{
                  padding: '14px 24px',
                  backgroundColor: 'transparent',
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Read Articles →
              </Link>
            </div>
          </div>

         {/* Featured book card */}
<Link
  to={`/digital-book-library?book=${featuredBook.code}`}
  style={{ ...cardBase, display: 'block', padding: '28px', textDecoration: 'none', color: colors.text }}
  onMouseEnter={hoverIn}
  onMouseLeave={hoverOut}
>
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
    Featured Book · {featuredBook.code}
  </span>
  <div style={{ display: 'flex', gap: '18px' }}>
    {featuredBook.coverImage ? (
      <img
        src={featuredBook.coverImage}
        alt={featuredBook.title}
        style={{
          width: '76px',
          height: '108px',
          flexShrink: 0,
          borderRadius: '8px',
          objectFit: 'cover',
          boxShadow: `0 6px 16px ${colors.shadowColor}`
        }}
      />
    ) : (
      <div style={{
        width: '76px',
        height: '108px',
        flexShrink: 0,
        borderRadius: '8px',
        backgroundColor: colors.accentLight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px'
      }}>
        📖
      </div>
    )}
    <div>
      <h3 style={{ margin: '0 0 8px', fontSize: '17px', fontWeight: '700', lineHeight: '1.3' }}>
        {featuredBook.title}
      </h3>
      <p style={{ margin: '0 0 10px', fontSize: '13px', color: colors.textSecondary }}>
        by {featuredBook.author}
      </p>
      <span style={{ fontSize: '13px', fontWeight: '700', color: colors.accentPrimary }}>
        View Book →
      </span>
    </div>
  </div>
</Link>
        </div>
      </section>

      {/* Stats */}
      <section style={sectionWrap}>
        <div className="stats-grid" style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          padding: '28px 32px',
          borderRadius: '16px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgSecondary,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 4px 16px ${colors.shadowColor}`
        }}>
          {[
            [String(booksData.length), 'Books'],
            [String(articlesData.length), 'Articles'],
            ['3', 'Languages'],
            ['100%', 'Free to Access']
          ].map(([num, label]) => (
            <div key={label} style={{ flex: '1 1 140px' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: colors.accentPrimary }}>{num}</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore by category */}
      <section style={{ ...sectionWrap, padding: '72px clamp(20px, 5vw, 40px) 0' }}>
        <span style={eyebrow}>Explore the Archive</span>
        <h2 style={{ fontSize: '28px', fontWeight: '700', margin: '10px 0 8px', color: colors.text }}>
          Browse by Category
        </h2>
        <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '28px', maxWidth: '520px' }}>
          Jump straight to the part of the collection that matters to you.
        </p>

        <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {CATEGORIES.map(cat => {
            const count = booksData.filter(b => b.tags.includes(cat.tag)).length
            return (
              <Link
                key={cat.tag}
                to={`/digital-book-library?tag=${encodeURIComponent(cat.tag)}`}
                style={{ ...cardBase, display: 'block', padding: '24px', textDecoration: 'none', color: colors.text }}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
              >
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{cat.icon}</div>
                <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700' }}>{cat.tag}</h3>
                <p style={{ margin: '0 0 14px', fontSize: '13px', color: colors.textSecondary, lineHeight: '1.5' }}>{cat.desc}</p>
                <span style={{ fontSize: '12px', fontWeight: '700', color: colors.accentPrimary }}>{count} books →</span>
              </Link>
            )
          })}
          <Link
            to="/digital-book-library"
            style={{
              ...cardBase,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '24px',
              textDecoration: 'none',
              color: isDarkMode ? colors.bg : '#fff',
              backgroundColor: colors.accentPrimary,
              border: 'none'
            }}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            <div style={{ fontSize: '28px', marginBottom: '14px' }}></div>
            <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700' }}>View All Books</h3>
            <p style={{ margin: '0 0 14px', fontSize: '13px', opacity: 0.9, lineHeight: '1.5' }}>The full collection, searchable and sortable.</p>
            <span style={{ fontSize: '12px', fontWeight: '700' }}>Open Library →</span>
          </Link>
        </div>
      </section>

      {/* Recently archived */}
      <section style={{ ...sectionWrap, padding: '72px clamp(20px, 5vw, 40px) 0' }}>
        <span style={eyebrow}>Latest Additions</span>
        <h2 style={{ fontSize: '28px', fontWeight: '700', margin: '10px 0 8px', color: colors.text }}>
          Recently Archived
        </h2>
        <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '28px', maxWidth: '520px' }}>
          The newest books added to the collection.
        </p>

        <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {latestBooks.map(book => (
            <Link
              key={book.code}
              to={`/digital-book-library?book=${book.code}`}
              style={{ ...cardBase, display: 'block', padding: '22px', textDecoration: 'none', color: colors.text }}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: colors.accentPrimary }}>{book.code}</span>
                <span style={{
                  fontSize: '11px',
                  padding: '4px 8px',
                  backgroundColor: colors.accentLight,
                  color: colors.accentPrimary,
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>{book.language}</span>
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '700', lineHeight: '1.35' }}>{book.title}</h3>
              <p style={{ margin: '0 0 14px', fontSize: '13px', color: colors.textSecondary }}>{book.author}</p>
              <span style={{ fontSize: '12px', fontWeight: '700', color: colors.accentPrimary }}>View Book →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* From the Articles */}
      <section style={{ ...sectionWrap, padding: '72px clamp(20px, 5vw, 40px) 0' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div>
            <span style={eyebrow}>Notes & Essays</span>
            <h2 style={{ fontSize: '28px', fontWeight: '700', margin: '10px 0 8px', color: colors.text }}>
              From the Articles
            </h2>
            <p style={{ fontSize: '14px', color: colors.textSecondary, maxWidth: '520px' }}>
              Shorter reads on Mising language, culture, and history.
            </p>
          </div>
          <Link to="/articles" style={{ fontSize: '13px', fontWeight: '700', color: colors.accentPrimary, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View All Articles →
          </Link>
        </div>

        {featuredArticle && (
          <div className="articles-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px' }}>
            <ArticleCard article={featuredArticle} size="featured" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {otherArticles.length > 0 ? (
                otherArticles.map(a => <ArticleCard key={a.slug} article={a} />)
              ) : (
                <div style={{
                  ...cardBase,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '24px',
                  color: colors.textSecondary,
                  fontSize: '13px'
                }}>
                  More articles are on their way.
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      

      {/* Mission */}
      <section id="mission" style={{ ...sectionWrap, padding: '88px clamp(20px, 5vw, 40px) 80px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <span style={eyebrow}>Our Mission</span>
          <h2 style={{ fontSize: '28px', fontWeight: '700', margin: '10px 0 14px', color: colors.text }}>
            Why This Archive Exists
          </h2>
          <p style={{ fontSize: '15px', color: colors.textSecondary, lineHeight: '1.7' }}>
            "Knowledge should be free. Culture should be accessible. History should be preserved."
          </p>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '16px',
          fontStyle: 'italic',
          color: colors.accentPrimary,
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          "Mising Réngam Írroi"
        </p>
      </section>
      {/* Support the Archive */}
      <section style={{ ...sectionWrap, padding: '0 clamp(20px, 5vw, 40px) 88px' }}>
        <div style={{
          ...cardBase,
          padding: '40px clamp(24px, 5vw, 48px)',
          textAlign: 'center'
        }}>
          <span style={eyebrow}>Support the Archive</span>
          <h2 style={{ fontSize: '26px', fontWeight: '700', margin: '10px 0 12px', color: colors.text }}>
            Help Keep This Archive Free
          </h2>
          <p style={{
            fontSize: '14px',
            color: colors.textSecondary,
            maxWidth: '480px',
            margin: '0 auto 28px',
            lineHeight: '1.7'
          }}>
            Mising Archives is community-run and free to access. If it's been useful to you,
            consider supporting the cost of hosting, archiving, and growing the collection.
          </p>

          <DonateButton />

          <p style={{
            fontSize: '12px',
            color: colors.textTertiary,
            maxWidth: '440px',
            margin: '20px auto 0',
            lineHeight: '1.6'
          }}>
            Supports UPI, cards, netbanking, and wallets. This is a community initiative,
            not a registered nonprofit — donations aren't tax-deductible.
          </p>
        </div>
      </section>
    </div>
  )
}