import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Github, Linkedin } from 'lucide-react'
import { booksData } from '../data/books'
import { articlesData } from '../data/articles'
import { clansData } from '../data/learn/clans'
import { donationsData, treasuryPartner } from '../data/donations'
import { useMimang } from '../hooks/useMimang'
import { supabase } from '../lib/supabase'
import { useTheme } from '../context/ThemeContext'
import { useCardStyle } from '../utils/cardStyle'
import { usePageTitle } from '../hooks/usePageTitle'

// Put your photo at public/images/abhinab.jpg and set this to '/images/abhinab.jpg'.
// While it is null, a placeholder with your initials is shown.
const FOUNDER_PHOTO = '/images/abhinab.jpg'

const FOUNDER = {
  name: 'Abhinab Pegu',
  initials: 'AP',
  role: 'Founder & Maintainer',
  bio: 'An electronics and communication engineering student at the National Institute of Technology (NIT) Silchar.',
  links: [
    { label: 'Instagram', handle: '@ngo.pegu', href: 'https://instagram.com/ngo.pegu', Icon: Instagram },
    { label: 'GitHub', handle: 'abhinabpegu', href: 'https://github.com/abhinabpegu', Icon: Github },
    { label: 'LinkedIn', handle: 'Abhinab Pegu', href: 'https://www.linkedin.com/in/abhinab-pegu-45aa05429/', Icon: Linkedin },
  ],
}

export default function About() {
  usePageTitle('About')
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()
  const { mimang } = useMimang()
  const [shopCounts, setShopCounts] = useState({ products: null, artisans: null })

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    Promise.all([
      supabase.from('shop_products').select('*', { count: 'exact', head: true }).eq('published', true),
      supabase.from('artisans').select('*', { count: 'exact', head: true }),
    ]).then(([p, a]) => {
      if (cancelled) return
      setShopCounts({
        products: p.error ? null : p.count,
        artisans: a.error ? null : a.count,
      })
    })
    return () => { cancelled = true }
  }, [])

  // The old About article is replaced by this page, so don't count it.
  const articleCount = articlesData.filter((a) => a.slug !== 'About-Mising-Archives').length

  const stats = [
    { value: booksData.length, label: 'Books in the library', to: '/digital-book-library' },
    { value: articleCount, label: 'Community writings', to: '/articles' },
    { value: clansData.length, label: 'Clan names documented', to: '/learn/clans' },
    { value: mimang.length, label: 'Weaving motifs', to: '/learn/mising-motifs' },
    shopCounts.artisans != null && { value: shopCounts.artisans, label: 'Shop artisans', to: '/shop' },
    shopCounts.products != null && { value: shopCounts.products, label: 'Shop products', to: '/shop' },
    { value: donationsData.length, label: 'Community donors', to: '/donations' },
  ].filter(Boolean)

  const wrap = { maxWidth: '900px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }
  const eyebrow = {
    fontSize: '12px', fontWeight: '700', textTransform: 'uppercase',
    letterSpacing: '1.4px', color: colors.accentPrimary,
  }
  const h2 = { fontSize: '24px', fontWeight: '700', margin: '10px 0 14px', color: colors.text }
  const p = { fontSize: '15px', lineHeight: '1.8', color: colors.textSecondary, margin: '0 0 16px' }
  const link = { color: colors.accentPrimary, fontWeight: '600' }

  return (
    <div>
      {/* Intro */}
      <section style={{ ...wrap, padding: '48px clamp(20px, 5vw, 40px) 0' }}>
        <span style={eyebrow}>About</span>
        <h1 style={{ fontSize: '34px', fontWeight: '700', margin: '10px 0 14px', color: colors.text }}>
          About Mising Archives
        </h1>
        <p style={{ ...p, fontSize: '16px', maxWidth: '700px' }}>
          Mising Archives is an independent, community-led initiative to preserve and share
          knowledge about the Mising people — their history, language, culture and craft —
          through a freely accessible digital platform.
        </p>
      </section>

      {/* Stats */}
      <section style={{ ...wrap, padding: '24px clamp(20px, 5vw, 40px) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
          {stats.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              style={{ ...cardBase, padding: '20px 16px', textAlign: 'center', textDecoration: 'none' }}
            >
              <p style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '800', color: colors.accentPrimary }}>
                {s.value}
              </p>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: colors.textSecondary }}>
                {s.label}
              </p>
            </Link>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: colors.textTertiary, margin: '12px 0 0' }}>
          Founded 30 June 2026 · these numbers update automatically as the archive grows.
        </p>
      </section>

      {/* Story */}
      <section style={{ ...wrap, padding: '56px clamp(20px, 5vw, 40px) 0' }}>
        <span style={eyebrow}>Our Story</span>
        <h2 style={h2}>How it started</h2>
        <p style={p}>
          The project began as a book archival effort. As an active editor on English Wikipedia,
          focused on creating and improving articles about the Mising community, the founder kept
          running into the same problem: reliable, easily accessible sources were hard to find, and
          without them it is nearly impossible to improve well-established encyclopaedias. The goal
          became a digital repository of valuable books and resources on the Mising community.
        </p>
        <p style={p}>
          Many important books had never been digitised, so a proper website was built to hold
          them and make them discoverable. Whenever possible, digitised books are shared only after
          permission from the relevant copyright holders. The idea was supported early on by
          Hemchandra Mili, an Assistant Professor at a college in Assam.
        </p>
        <p style={p}>
          The first version of the website was deployed on <strong>30 June 2026</strong>, and the{' '}
          <strong>misingarchives.co.in</strong> domain was registered on 2 July 2026. The whole
          codebase is open source on{' '}
          <a href="https://github.com/abhinabpegu/misingarchives" target="_blank" rel="noopener noreferrer" style={link}>
            GitHub
          </a>.
        </p>
      </section>

      {/* What's here */}
      <section style={{ ...wrap, padding: '40px clamp(20px, 5vw, 40px) 0' }}>
        <span style={eyebrow}>What You'll Find</span>
        <h2 style={h2}>Across the site</h2>
        <ul style={{ margin: 0, paddingLeft: '22px' }}>
          {[
            ['/digital-book-library', 'Digital Book Library', 'books with permission, in the public domain, or via partner archives.'],
            ['/articles', 'Community Writings', 'research, essays, opinion and poetry. Anyone can submit; all submissions are reviewed. Original writing is licensed CC BY-SA 4.0.'],
            ['/learn/clans', 'Learn', 'Mising clan names with legal spellings, IPA and audio, plus a library of weaving motifs.'],
            ['/shop', 'Shop', 'a directory of handmade goods from Mising artisans, ordered directly from the maker.'],
          ].map(([to, title, desc]) => (
            <li key={to} style={{ ...p, marginBottom: '10px' }}>
              <Link to={to} style={link}>{title}</Link> — {desc}
            </li>
          ))}
        </ul>
      </section>

      {/* Founder */}
      <section style={{ ...wrap, padding: '56px clamp(20px, 5vw, 40px) 0' }}>
        <span style={eyebrow}>The Person Behind It</span>
        <h2 style={h2}>Founder &amp; Maintainer</h2>

        <div style={{ ...cardBase, padding: '28px', display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{
            width: '140px', height: '140px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0,
            backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {FOUNDER_PHOTO ? (
              <img src={FOUNDER_PHOTO} alt={FOUNDER.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <span style={{ fontSize: '40px', fontWeight: '800', color: colors.accentPrimary }}>{FOUNDER.initials}</span>
            )}
          </div>

          <div style={{ flex: 1, minWidth: '240px' }}>
            <h3 style={{ margin: '0 0 2px', fontSize: '22px', fontWeight: '800', color: colors.text }}>{FOUNDER.name}</h3>
            <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '700', color: colors.accentPrimary }}>{FOUNDER.role}</p>
            <p style={{ ...p, margin: '0 0 16px', fontSize: '14px' }}>{FOUNDER.bio}</p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {FOUNDER.links.map(({ label, handle, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={handle}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 14px',
                    fontSize: '13px', fontWeight: '700', textDecoration: 'none',
                    color: colors.accentPrimary, backgroundColor: colors.accentLight, borderRadius: '8px',
                  }}
                >
                  <Icon size={15} /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Funding + contact */}
      <section style={{ ...wrap, padding: '56px clamp(20px, 5vw, 40px) 60px' }}>
        <span style={eyebrow}>Get Involved</span>
        <h2 style={h2}>Funding &amp; contributions</h2>
        <p style={p}>
          Mising Archives is non-commercial and community-funded. It is run by core members of{' '}
          <a href={treasuryPartner.url} target="_blank" rel="noopener noreferrer" style={link}>
            {treasuryPartner.name} ({treasuryPartner.short})
          </a>{' '}
          and shares {treasuryPartner.short}'s treasury. Every donation and expense is logged on the{' '}
          <Link to="/donations" style={link}>Donations</Link> page.
        </p>
        <p style={p}>
          Want to contribute a writing, donate a book, or report an error? See the{' '}
          <Link to="/contact" style={link}>contact page</Link>, email{' '}
          <a href="mailto:contact@misingarchives.co.in" style={link}>contact@misingarchives.co.in</a>, or find us on{' '}
          <a href="https://instagram.com/misingarchives" target="_blank" rel="noopener noreferrer" style={link}>@misingarchives</a>.
        </p>
      </section>
    </div>
  )
}