import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen, FileText, ShoppingBag,
  Landmark, Sparkles, Languages, Music, Library,
  Volume2, Grid, BookA, Archive, Globe, Users, Feather
} from 'lucide-react'
import { useBooks } from '../hooks/useBooks'
import { articlesData } from '../data/articles'
import { clansData } from '../data/learn/clans'
import { useMimang } from '../hooks/useMimang'
import { supabase } from '../lib/supabase'
import { useTheme } from '../context/ThemeContext'
import { useCardStyle } from '../utils/cardStyle'
import { cloudinaryUrl } from '../utils/cloudinaryUrl'
import ArticleCard from '../components/ArticleCard'
import ProductCard from '../components/shop/ProductCard'
import DonateButton from '../components/DonateButton'
import InstagramCard from '../components/InstagramCard'
import LazyImage from '../components/LazyImage'
import GamigDivider from '../components/GamigDivider'
import { donationStatus, treasuryPartner } from '../data/donations'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'

const CATEGORIES = [
  { tag: 'History', Icon: Landmark },
  { tag: 'Culture', Icon: Sparkles },
  { tag: 'Language', Icon: Languages },
  { tag: 'Folklore', Icon: Music },
]

const MISSION_PILLARS = [
  { Icon: Archive, title: 'Preserve', desc: 'Keep Mising history and knowledge safe before it is lost.' },
  { Icon: Globe, title: 'Share', desc: 'Make books and writings free to read without paywalls.' },
  { Icon: Users, title: 'Empower', desc: 'Help students, researchers, and community members learn.' },
  { Icon: Feather, title: 'Document', desc: 'Record language, clans, and craft for future generations.' },
]

function motifImageUrl(m, preferCloth = false) {
  if (!m) return null
  const primary = preferCloth ? m.clothExample : m.image
  const fallback = preferCloth ? m.image : m.clothExample
  if (primary && /^https?:\/\//i.test(primary)) return primary
  if (fallback && /^https?:\/\//i.test(fallback)) return fallback
  return primary || fallback || null
}

function HeroStatPill({ to, count, label }) {
  const { colors } = useTheme()
  const animated = useCountUp(count, true, 750)

  return (
    <Link
      to={to}
      className="pill-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '7px 13px',
        borderRadius: '999px',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.bgSecondary,
        textDecoration: 'none',
        fontSize: '12px',
        color: colors.textSecondary,
      }}
    >
      <span style={{ fontWeight: '800', color: colors.accentPrimary, fontVariantNumeric: 'tabular-nums' }}>
        {animated}
      </span>
      <span style={{ fontWeight: '600' }}>{label}</span>
    </Link>
  )
}

export default function Home() {
  const { books: booksData } = useBooks()
  const { mimang } = useMimang()
  const [booksRef, booksVisible] = useScrollReveal()
  const [motifsRef, motifsVisible] = useScrollReveal()
  const [articlesRef, articlesVisible] = useScrollReveal()
  const [learnRef, learnVisible] = useScrollReveal()
  const [shopRef, shopVisible] = useScrollReveal()
  const [missionRef, missionVisible] = useScrollReveal()
  const [supportRef, supportVisible] = useScrollReveal()
  const [shopProducts, setShopProducts] = useState([])

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    supabase
      .from('shop_products')
      .select('*, artisans(display_name, slug)')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(4)
      .then(({ data, error }) => {
        if (!cancelled && !error && data) setShopProducts(data)
      })
    return () => { cancelled = true }
  }, [])

  const { isDarkMode, colors } = useTheme()
  const { cardBase } = useCardStyle()

  const previewBooks = useMemo(() => {
    if (!booksData.length) return []
    const first = booksData[0]
    const newest = [...booksData].slice(-4).reverse()
    const seen = new Set([first.code])
    const list = [first]
    for (const b of newest) {
      if (!seen.has(b.code) && list.length < 4) {
        seen.add(b.code)
        list.push(b)
      }
    }
    return list
  }, [booksData])

  const previewMotifs = useMemo(() => {
    return mimang.filter((m) => motifImageUrl(m)).slice(0, 6)
  }, [mimang])

  const sortedArticles = useMemo(
    () => [...articlesData].sort((a, b) => b.date.localeCompare(a.date)),
    []
  )

  const markedFeatured = sortedArticles.filter(a => a.featured).slice(0, 2)
  const featuredSlugs = new Set(markedFeatured.map(a => a.slug))
  const fillerNeeded = 2 - markedFeatured.length
  const featuredArticles = fillerNeeded > 0
    ? [...markedFeatured, ...sortedArticles.filter(a => !featuredSlugs.has(a.slug)).slice(0, fillerNeeded)]
    : markedFeatured

  const heroBookThumbs = booksData.filter(b => b.coverImage).slice(0, 3)
  const heroMotifThumbs = mimang.filter(m => motifImageUrl(m)).slice(0, 3)
  const heroArticleThumb = sortedArticles.find(a => a.coverImage)?.coverImage || null
  const heroShopThumb = shopProducts.find(p => p.images?.[0])?.images?.[0] || motifImageUrl(mimang[0], true)

  const directorySections = [
    {
      to: '/digital-book-library',
      Icon: BookOpen,
      title: 'Book Library',
      meta: `${booksData.length} books`,
      desc: 'Books on Mising history, language, and folk culture.',
      thumbs: heroBookThumbs.map(b => cloudinaryUrl(b.coverImage, 'w_180,q_auto,f_auto')),
    },
    {
      to: '/learn/mising-motifs',
      Icon: Grid,
      title: 'Weaving Motifs',
      meta: `${mimang.length} motifs`,
      desc: 'Traditional Mising gamig patterns and cloth photos.',
      thumbs: heroMotifThumbs.map(m => cloudinaryUrl(motifImageUrl(m), 'w_200,h_200,c_fill,q_auto,f_auto')),
    },
    {
      to: '/articles',
      Icon: FileText,
      title: 'Community Writings',
      meta: `${articlesData.length} writings`,
      desc: 'Essays, poems, and research by community writers.',
      thumbs: heroArticleThumb ? [cloudinaryUrl(heroArticleThumb, 'w_420,q_auto,f_auto')] : [],
    },
    {
      to: '/shop',
      Icon: ShoppingBag,
      title: 'Artisan Shop',
      meta: 'Direct from makers',
      desc: 'Handmade clothes, crafts, and food by Mising artisans.',
      thumbs: heroShopThumb ? [cloudinaryUrl(heroShopThumb, 'w_420,q_auto,f_auto')] : [],
    },
  ]

  const eyebrow = {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.3px',
    color: colors.accentPrimary
  }

  const sectionWrap = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 40px)'
  }

  const iconBadge = {
    width: '36px',
    height: '36px',
    borderRadius: '9px',
    backgroundColor: colors.accentLight,
    color: colors.accentPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px'
  }

  return (
    <div>
      {/* Hero Top Band + Balanced 4-Column Project Showcase */}
      <section style={{ ...sectionWrap, padding: '44px clamp(20px, 5vw, 40px) 44px' }}>
        <div
          className="hero-top-bar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}
        >
          <div style={{ maxWidth: '580px' }}>
            <span
              className="hero-stagger"
              style={{
                '--stagger': 0,
                display: 'inline-block',
                padding: '5px 11px',
                borderRadius: '6px',
                backgroundColor: colors.accentLight,
                color: colors.accentPrimary,
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.1px',
              }}
            >
              Community Digital Archive
            </span>

            <h1
              className="hero-stagger"
              style={{
                '--stagger': 1,
                fontSize: 'clamp(36px, 4.8vw, 48px)',
                lineHeight: '1.12',
                fontWeight: '800',
                margin: '14px 0 12px',
                color: colors.text
              }}
            >
              Kumríksudung
            </h1>

            <p
              className="hero-stagger"
              style={{
                '--stagger': 2,
                fontSize: '15px',
                lineHeight: '1.68',
                color: colors.textSecondary,
                margin: 0
              }}
            >
              Mising Archives is a free digital library for Mising culture, history,
              language, and craft. It is run by community members to keep this knowledge
              open for everyone.
            </p>
          </div>

          <div
            className="hero-stagger"
            style={{
              '--stagger': 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link
                to="/digital-book-library"
                className="btn-fancy"
                style={{
                  padding: '12px 20px',
                  backgroundColor: colors.accentPrimary,
                  color: isDarkMode ? colors.bg : '#fff',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                }}
              >
                Explore Books →
              </Link>
              <Link
                to="/learn/mising-motifs"
                className="btn-ghost-fancy"
                style={{
                  padding: '12px 20px',
                  backgroundColor: colors.bgSecondary,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                }}
              >
                View Motifs →
              </Link>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <HeroStatPill to="/digital-book-library" count={booksData.length} label="Books" />
              <HeroStatPill to="/articles" count={articlesData.length} label="Writings" />
              <HeroStatPill to="/learn/clans" count={clansData.length} label="Clans" />
              <HeroStatPill to="/learn/mising-motifs" count={mimang.length} label="Motifs" />
            </div>
          </div>
        </div>

        {/* 4 Equal-Height Section Cards */}
        <div className="hero-stagger home-grid-4" style={{ '--stagger': 4 }}>
          {directorySections.map((item) => {
            const Icon = item.Icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className="card-interactive"
                style={{
                  ...cardBase,
                  padding: '16px',
                  textDecoration: 'none',
                  color: colors.text,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <div style={{ ...iconBadge, marginBottom: 0, width: '30px', height: '30px', borderRadius: '7px', flexShrink: 0 }}>
                      <Icon size={15} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.title}
                    </h2>
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    color: colors.accentPrimary,
                    backgroundColor: colors.accentLight,
                    padding: '3px 7px',
                    borderRadius: '5px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}>
                    {item.meta}
                  </span>
                </div>

                {/* Fixed 148px image frame so every card aligns across the row */}
                <div
                  className="card-media-zoom"
                  style={{
                    height: '148px',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.max(1, item.thumbs.length)}, 1fr)`,
                    gap: '6px',
                    marginBottom: '12px',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                >
                  {item.thumbs.map((src, idx) => (
                    <div
                      key={idx}
                      style={{
                        height: '100%',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        backgroundColor: colors.accentLight,
                        border: `1px solid ${colors.border}`
                      }}
                    >
                      <LazyImage
                        src={src}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  ))}
                </div>

                <p style={{ margin: '0 0 10px', fontSize: '13px', color: colors.textSecondary, lineHeight: '1.5', flex: 1 }}>
                  {item.desc}
                </p>
                <span style={{ fontSize: '12px', fontWeight: '700', color: colors.accentPrimary, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Open <span className="card-arrow">→</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <GamigDivider />

      {/* Section 1: Digital Book Library (4 books with covers + topics) */}
      <section
        ref={booksRef}
        className={`fade-in-up ${booksVisible ? 'is-visible' : ''}`}
        style={{ ...sectionWrap, padding: '48px clamp(20px, 5vw, 40px) 0' }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <span style={eyebrow}>Digital Book Library</span>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '6px 0 4px', color: colors.text }}>
              Books in the Archive
            </h2>
            <p style={{ fontSize: '14px', color: colors.textSecondary, maxWidth: '540px', margin: 0 }}>
              Read or download scanned books on Mising history, grammar, and folk literature.
            </p>
          </div>
          <Link to="/digital-book-library" style={{ fontSize: '13px', fontWeight: '700', color: colors.accentPrimary, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View all {booksData.length} books →
          </Link>
        </div>

        <div className={`stagger-grid home-grid-4 ${booksVisible ? 'is-visible' : ''}`} style={{ marginBottom: '18px' }}>
          {previewBooks.map((book, idx) => (
            <Link
              key={book.code}
              to={`/digital-book-library?book=${book.code}`}
              className="card-interactive"
              style={{
                ...cardBase,
                padding: '14px',
                textDecoration: 'none',
                color: colors.text,
                display: 'flex',
                gap: '14px',
                alignItems: 'center'
              }}
            >
              <div
                className="card-media-zoom"
                style={{
                  width: '64px',
                  height: '92px',
                  flexShrink: 0,
                  borderRadius: '7px',
                  overflow: 'hidden',
                  backgroundColor: colors.accentLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {book.coverImage ? (
                  <LazyImage
                    src={cloudinaryUrl(book.coverImage, 'w_220,q_auto,f_auto')}
                    alt={book.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <BookOpen size={24} color={colors.accentPrimary} />
                )}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: colors.accentPrimary }}>
                    {idx === 0 ? `Featured · ${book.code}` : book.code}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: colors.accentLight,
                    color: colors.accentPrimary
                  }}>
                    {book.language}
                  </span>
                </div>
                <h3 style={{
                  margin: '0 0 4px',
                  fontSize: '14px',
                  fontWeight: '700',
                  lineHeight: '1.35',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {book.title}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '12px',
                  color: colors.textSecondary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {book.author}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: colors.textTertiary, marginRight: '4px' }}>
            Browse by topic:
          </span>
          {CATEGORIES.map(({ tag, Icon }) => {
            const count = booksData.filter(b => b.tags.includes(tag)).length
            return (
              <Link
                key={tag}
                to={`/digital-book-library?tag=${encodeURIComponent(tag)}`}
                className="pill-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 13px',
                  borderRadius: '999px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.bgSecondary,
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: colors.text
                }}
              >
                <Icon size={14} color={colors.accentPrimary} />
                <span>{tag}</span>
                <span style={{ fontSize: '12px', color: colors.textTertiary }}>{count}</span>
              </Link>
            )
          })}
          <Link
            to="/digital-book-library"
            className="pill-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '7px 13px',
              borderRadius: '999px',
              backgroundColor: colors.accentPrimary,
              color: isDarkMode ? colors.bg : '#fff',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '700'
            }}
          >
            <Library size={14} />
            <span>All Books</span>
          </Link>
        </div>
      </section>

      {/* Section 2: Mising Weaving Motifs Gallery (6 equal columns across) */}
      {previewMotifs.length > 0 && (
        <section
          ref={motifsRef}
          className={`fade-in-up ${motifsVisible ? 'is-visible' : ''}`}
          style={{ ...sectionWrap, padding: '56px clamp(20px, 5vw, 40px) 0' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <span style={eyebrow}>Weaving Heritage</span>
              <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '6px 0 4px', color: colors.text }}>
                Mising Motifs (Mimang)
              </h2>
              <p style={{ fontSize: '14px', color: colors.textSecondary, maxWidth: '540px', margin: 0 }}>
                Traditional Mising weaving patterns and cloth examples from our motif library.
              </p>
            </div>
            <Link to="/learn/mising-motifs" style={{ fontSize: '13px', fontWeight: '700', color: colors.accentPrimary, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              View all {mimang.length} motifs →
            </Link>
          </div>

          <div className={`stagger-grid home-grid-6 ${motifsVisible ? 'is-visible' : ''}`}>
            {previewMotifs.map((m) => {
              const imgUrl = motifImageUrl(m)
              return (
                <Link
                  key={m.code}
                  to="/learn/mising-motifs"
                  className="card-interactive"
                  style={{
                    ...cardBase,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: colors.text,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    className="card-media-zoom"
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      backgroundColor: colors.accentLight,
                      overflow: 'hidden'
                    }}
                  >
                    <LazyImage
                      src={cloudinaryUrl(imgUrl, 'w_420,h_420,c_fill,q_auto,f_auto')}
                      alt={m.gamigName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: colors.textTertiary }}>{m.code}</span>
                      {m.category && (
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: colors.accentLight,
                          color: colors.accentPrimary
                        }}>
                          {m.category}
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: colors.text, lineHeight: '1.3' }}>
                      {m.gamigName}
                    </h3>
                    <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary, lineHeight: '1.4' }}>
                      {m.englishDesc || 'Weaving pattern'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Section 3: Community Writings */}
      <section
        ref={articlesRef}
        className={`fade-in-up ${articlesVisible ? 'is-visible' : ''}`}
        style={{ ...sectionWrap, padding: '56px clamp(20px, 5vw, 40px) 0' }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <span style={eyebrow}>Community Writings</span>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '6px 0 4px', color: colors.text }}>
              Essays, Research, and Poetry
            </h2>
            <p style={{ fontSize: '14px', color: colors.textSecondary, maxWidth: '520px', margin: 0 }}>
              Short reads on Mising language, culture, and history written by community members.
            </p>
          </div>
          <Link to="/articles" style={{ fontSize: '13px', fontWeight: '700', color: colors.accentPrimary, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View all writings →
          </Link>
        </div>

        {featuredArticles.length > 0 && (
          <div
            className={`featured-articles-grid stagger-grid ${articlesVisible ? 'is-visible' : ''}`}
            style={{
              display: 'grid',
              gridTemplateColumns: featuredArticles.length === 2 ? '1fr 1fr' : '1fr',
              gap: '18px'
            }}
          >
            {featuredArticles.map(a => (
              <ArticleCard key={a.slug} article={a} size="featured" />
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Learn Mising (Clans, Motifs, Terms) */}
      <section
        ref={learnRef}
        className={`fade-in-up ${learnVisible ? 'is-visible' : ''}`}
        style={{ ...sectionWrap, padding: '56px clamp(20px, 5vw, 40px) 0' }}
      >
        <span style={eyebrow}>Learn</span>
        <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '6px 0 4px', color: colors.text }}>
          Clans, Weaving, and Words
        </h2>
        <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '20px', maxWidth: '540px' }}>
          Explore Mising clan names with voice audio, traditional weaving patterns, and everyday words.
        </p>

        <div
          className={`cards-grid stagger-grid ${learnVisible ? 'is-visible' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}
        >
          <Link to="/learn/clans" className="card-interactive" style={{ ...cardBase, display: 'flex', flexDirection: 'column', padding: '20px', textDecoration: 'none', color: colors.text }}>
            <div style={iconBadge}><Volume2 size={18} /></div>
            <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700' }}>Mising Opín Amin (Clans)</h3>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textSecondary, lineHeight: '1.55', flex: 1 }}>
              Standard Mising spellings, common legal spellings, IPA, and voice clips.
            </p>
            <span style={{ fontSize: '12px', fontWeight: '700', color: colors.accentPrimary, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              {clansData.length} clans <span className="card-arrow">→</span>
            </span>
          </Link>

          <Link to="/learn/mising-motifs" className="card-interactive" style={{ ...cardBase, display: 'flex', flexDirection: 'column', padding: '20px', textDecoration: 'none', color: colors.text }}>
            <div style={iconBadge}><Grid size={18} /></div>
            <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700' }}>Mising Motifs</h3>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textSecondary, lineHeight: '1.55', flex: 1 }}>
              Traditional weaving patterns (gamig) shown alongside woven cloth photos.
            </p>
            <span style={{ fontSize: '12px', fontWeight: '700', color: colors.accentPrimary, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              {mimang.length} patterns <span className="card-arrow">→</span>
            </span>
          </Link>

          <Link to="/learn/mising-terms" className="card-interactive" style={{ ...cardBase, display: 'flex', flexDirection: 'column', padding: '20px', textDecoration: 'none', color: colors.text }}>
            <div style={iconBadge}><BookA size={18} /></div>
            <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700' }}>Mising Terms</h3>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textSecondary, lineHeight: '1.55', flex: 1 }}>
              A searchable list of everyday Mising words with English meanings.
            </p>
            <span style={{ fontSize: '12px', fontWeight: '700', color: colors.accentPrimary, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Browse words <span className="card-arrow">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Section 5: Artisan Shop */}
      <section
        ref={shopRef}
        className={`fade-in-up ${shopVisible ? 'is-visible' : ''}`}
        style={{ ...sectionWrap, padding: '56px clamp(20px, 5vw, 40px) 0' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <span style={eyebrow}>Artisan Shop</span>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '6px 0 4px', color: colors.text }}>
              Handmade by Mising Artisans
            </h2>
            <p style={{ fontSize: '14px', color: colors.textSecondary, maxWidth: '540px', margin: 0 }}>
              Clothing, ornaments, food, and crafts made by local artisans. Contact the maker directly to order.
            </p>
          </div>
          <Link to="/shop" style={{ fontSize: '13px', fontWeight: '700', color: colors.accentPrimary, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Browse the Shop →
          </Link>
        </div>

        {shopProducts.length > 0 ? (
          <div className={`stagger-grid home-grid-4 ${shopVisible ? 'is-visible' : ''}`}>
            {shopProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <Link
            to="/shop"
            className="card-interactive"
            style={{
              ...cardBase,
              padding: '20px',
              textDecoration: 'none',
              color: colors.text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 280px' }}>
              {mimang[0] && motifImageUrl(mimang[0], true) ? (
                <div style={{ width: '64px', height: '64px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: colors.accentLight }}>
                  <LazyImage
                    src={cloudinaryUrl(motifImageUrl(mimang[0], true), 'w_200,h_200,c_fill,q_auto,f_auto')}
                    alt="Woven Mising cloth"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ) : (
                <div style={{ ...iconBadge, marginBottom: 0 }}>
                  <ShoppingBag size={18} />
                </div>
              )}
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700' }}>Explore the Artisan Directory</h3>
                <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>
                  See handmade Mising garments, ornaments, and food directly from makers.
                </p>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: colors.accentPrimary, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Open Shop <span className="card-arrow">→</span>
            </span>
          </Link>
        )}
      </section>

      {/* Section 6: About & Mission */}
      <section
        id="mission"
        ref={missionRef}
        className={`fade-in-up ${missionVisible ? 'is-visible' : ''}`}
        style={{ ...sectionWrap, padding: '64px clamp(20px, 5vw, 40px) 52px' }}
      >
        <GamigDivider style={{ marginBottom: '44px', padding: 0 }} />

        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 30px' }}>
          <span style={eyebrow}>About &amp; Mission</span>
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '6px 0 10px', color: colors.text }}>
            Why This Archive Exists
          </h2>
          <p style={{ fontSize: '15px', color: colors.textSecondary, lineHeight: '1.7', margin: '0 0 10px' }}>
            Knowledge should be free, culture should be easy to reach, and history should be kept safe.
          </p>
          <p
            style={{
              fontSize: '16px',
              fontStyle: 'italic',
              fontWeight: '600',
              color: colors.accentPrimary,
              margin: '0 0 12px',
              lineHeight: '1.6'
            }}
          >
            "Mising Réngam Írroi"
          </p>
          <Link to="/about" style={{ fontSize: '13px', fontWeight: '700', color: colors.accentPrimary, textDecoration: 'none' }}>
            Read our story on the About page →
          </Link>
        </div>

        <div className={`stagger-grid home-grid-4 ${missionVisible ? 'is-visible' : ''}`}>
          {MISSION_PILLARS.map(({ Icon, title, desc }) => (
            <div key={title} className="card-interactive" style={{ ...cardBase, padding: '20px' }}>
              <div style={{ ...iconBadge, width: '34px', height: '34px', marginBottom: '12px', borderRadius: '8px' }}>
                <Icon size={16} />
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '700', color: colors.text }}>{title}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, lineHeight: '1.55' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Follow on Instagram */}
      <section style={{ ...sectionWrap, padding: '0 clamp(20px, 5vw, 40px) 36px' }}>
        <InstagramCard />
      </section>

      {/* Support & Contact */}
      <section
        id="support"
        ref={supportRef}
        className={`fade-in-up ${supportVisible ? 'is-visible' : ''}`}
        style={{ ...sectionWrap, padding: '0 clamp(20px, 5vw, 40px) 64px' }}
      >
        <div style={{ ...cardBase, padding: '32px clamp(20px, 4vw, 40px)', textAlign: 'center' }}>
          <span style={eyebrow}>Support the Archive</span>
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '6px 0 10px', color: colors.text }}>
            Help Keep the Archive Open
          </h2>
          <p style={{ fontSize: '14px', color: colors.textSecondary, maxWidth: '540px', margin: '0 auto 22px', lineHeight: '1.7' }}>
            Mising Archives is run by core members of{' '}
            <a href={treasuryPartner.url} target="_blank" rel="noopener noreferrer" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
              {treasuryPartner.name} ({treasuryPartner.short})
            </a>
            {' '}and shares a treasury with them. Donations go toward keeping the site and book archive running.
          </p>

          {donationStatus.paused ? (
            <p style={{
              fontSize: '14px',
              color: colors.textSecondary,
              maxWidth: '440px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontStyle: 'italic'
            }}>
              {donationStatus.message}
            </p>
          ) : (
            <>
              <DonateButton />
              <p style={{
                fontSize: '12px',
                color: colors.textTertiary,
                maxWidth: '440px',
                margin: '16px auto 0',
                lineHeight: '1.6'
              }}>
                Supports UPI, cards, netbanking, and wallets. This is a community project,
                so donations are not tax-deductible.
              </p>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '16px' }}>
            <Link to="/donations" style={{ fontSize: '13px', fontWeight: '700', color: colors.accentPrimary, textDecoration: 'none' }}>
              See how donations are used →
            </Link>
            <Link to="/contact" style={{ fontSize: '13px', fontWeight: '700', color: colors.textSecondary, textDecoration: 'none' }}>
              Contact us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
