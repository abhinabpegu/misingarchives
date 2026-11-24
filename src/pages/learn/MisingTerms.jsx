import React, { useEffect, useMemo, useState } from 'react'
import { Search, ArrowUpDown } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { usePageTitle } from '../../hooks/usePageTitle'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'
import LazyImage from '../../components/LazyImage'

export default function MisingTerms() {
  usePageTitle('Mising Terms')
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()
  const [terms, setTerms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [sortDir, setSortDir] = useState('asc')

  useEffect(() => {
    if (!supabase) { setLoading(false); setError('This page is not available right now.'); return }
    let cancelled = false
    supabase.from('mising_terms').select('*').then(({ data, error }) => {
      if (cancelled) return
      if (error) setError('Could not load terms. Please try again later.')
      else setTerms(data)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = terms.filter((t) =>
      !q || t.english_name.toLowerCase().includes(q) || t.mising_name.toLowerCase().includes(q))
    const sorted = filtered.sort((a, b) =>
      a.english_name.localeCompare(b.english_name, 'en', { sensitivity: 'base' }))
    return sortDir === 'asc' ? sorted : sorted.reverse()
  }, [terms, query, sortDir])

  const wrap = { maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }

  return (
    <div>
      <section style={{ ...wrap, padding: '48px clamp(20px, 5vw, 40px) 0' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.4px', color: colors.accentPrimary }}>
          Learn
        </span>
        <h1 style={{ fontSize: '34px', fontWeight: '700', margin: '10px 0 10px', color: colors.text }}>Mising Terms</h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', maxWidth: '640px' }}>
          Common everyday words in Mising, with their English meanings.
        </p>
      </section>

      <section style={{ ...wrap, padding: '24px clamp(20px, 5vw, 40px) 0', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', flex: '1 1 320px' }}>
          <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '400px' }}>
            <Search size={18} color={colors.textTertiary} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text" placeholder="Search in English or Mising…" value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px 12px 44px', fontSize: '14px', border: `1px solid ${colors.border}`,
                borderRadius: '12px', backgroundColor: colors.bgSecondary, color: colors.text, outline: 'none', boxSizing: 'border-box',
                boxShadow: `0 4px 12px ${colors.shadowColor}`
              }}
              onFocus={(e) => { e.target.style.borderColor = colors.accentPrimary }}
              onBlur={(e) => { e.target.style.borderColor = colors.border }}
            />
          </div>
          <button
            onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
            className="pill-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 16px', fontSize: '13px', fontWeight: '700',
              color: colors.accentPrimary, backgroundColor: colors.bgSecondary, border: `1px solid ${colors.border}`,
              borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 12px ${colors.shadowColor}`
            }}
          >
            <ArrowUpDown size={14} /> Sort: {sortDir === 'asc' ? 'A → Z' : 'Z → A'}
          </button>
        </div>

        {!loading && !error && (
          <span style={{ fontSize: '13px', fontWeight: '600', color: colors.textTertiary }}>
            {shown.length} of {terms.length} terms
          </span>
        )}
      </section>

      <section style={{ ...wrap, padding: '24px clamp(20px, 5vw, 40px) 60px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-shimmer" style={{ height: '240px', borderRadius: '14px', backgroundColor: colors.accentLight }} />
            ))}
          </div>
        ) : error ? (
          <p style={{ color: '#c0392b', fontSize: '14px' }}>{error}</p>
        ) : shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px', color: colors.textTertiary, backgroundColor: colors.bgSecondary, borderRadius: '14px', border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: '14px', margin: 0 }}>{terms.length === 0 ? 'No terms added yet.' : 'No terms found.'}</p>
          </div>
        ) : (
          <div className="stagger-grid is-visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {shown.map((t) => (
              <div key={t.id} className="card-interactive" style={{ ...cardBase, overflow: 'hidden' }}>
                {t.image_url && (
                  <div className="card-media-zoom" style={{ width: '100%', aspectRatio: '1 / 1', backgroundColor: colors.accentLight, overflow: 'hidden' }}>
                    <LazyImage
                      src={cloudinaryUrl(t.image_url, 'w_400,h_400,c_fill,q_auto,f_auto')}
                      alt={t.english_name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}
                <div style={{ padding: '14px 16px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: '800', color: colors.accentPrimary }}>{t.mising_name}</p>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>{t.english_name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
