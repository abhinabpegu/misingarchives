import React, { useState, useMemo, useEffect } from 'react'
import { Shirt, LayoutGrid, Maximize2, X, ArrowUpDown } from 'lucide-react'
import { useMimang } from '../../hooks/useMimang'
import { useTheme } from '../../context/ThemeContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import LazyImage from '../../components/LazyImage'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'

function toThumbUrl(path) {
  if (!path) return path
  return cloudinaryUrl(path, 'w_500,q_auto,f_auto')
}

function Lightbox({ src, alt, onClose }) {
  const { isDarkMode } = useTheme()

  useEffect(() => {
    if (!src) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [src, onClose])

  if (!src) return null

  return (
    <div
      className="modal-backdrop-enter"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Expanded motif preview'}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: isDarkMode ? 'rgba(15, 14, 12, 0.9)' : 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '32px'
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          background: 'rgba(255,255,255,0.12)',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          color: '#fff',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={24} />
      </button>
      <img
        src={src}
        alt={alt}
        className="modal-panel-enter"
        style={{
          maxWidth: '100%',
          maxHeight: '90vh',
          borderRadius: '12px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
          objectFit: 'contain'
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

function MimangCard({ mimang, onExpand }) {
  const { colors } = useTheme()
  const [showExample, setShowExample] = useState(false)

  useEffect(() => {
    const other = showExample ? mimang.image : mimang.clothExample
    const otherThumb = toThumbUrl(other)
    if (otherThumb) {
      const img = new Image()
      img.src = otherThumb
    }
  }, [showExample, mimang.image, mimang.clothExample])

  const displayedFull = showExample ? mimang.clothExample : mimang.image
  const displayedThumb = toThumbUrl(displayedFull)
  const displayedAlt = showExample ? `${mimang.gamigName} woven on cloth` : mimang.gamigName
  const hasToggleTarget = Boolean(mimang.image && mimang.clothExample)

  return (
    <div
      className="card-interactive"
      style={{
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: `0 4px 14px ${colors.shadowColor}`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Square swatch */}
      <div
        className="card-media-zoom"
        style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', backgroundColor: colors.accentLight, overflow: 'hidden' }}
      >
        {displayedThumb ? (
          <>
            <LazyImage
              src={displayedThumb}
              alt={displayedAlt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }}
              onClick={() => onExpand(displayedFull, displayedAlt)}
              onError={(e) => {
                if (e.target.dataset.fallback) return
                e.target.dataset.fallback = 'true'
                e.target.src = displayedFull
              }}
            />
            <button
              onClick={() => onExpand(displayedFull, displayedAlt)}
              aria-label="Expand image"
              title="Expand image"
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,0.92)',
                color: '#1A1A1A',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                zIndex: 2
              }}
            >
              <Maximize2 size={14} />
            </button>
          </>
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.textTertiary,
            fontSize: '12px',
            fontStyle: 'italic',
            textAlign: 'center',
            padding: '12px'
          }}>
            {showExample ? 'Cloth example coming soon' : 'Pattern image coming soon'}
          </div>
        )}
      </div>

      {/* Text row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 16px'
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: '400', color: colors.textSecondary }}>
              {mimang.code}
            </p>
            {mimang.category && (
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: colors.accentPrimary,
                backgroundColor: colors.accentLight,
                padding: '2px 7px',
                borderRadius: '5px'
              }}>
                {mimang.category}
              </span>
            )}
          </div>
          <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '700', color: colors.text, lineHeight: '1.3' }}>
            {mimang.gamigName}
          </p>
          <p style={{
            margin: 0,
            fontSize: '12px',
            color: mimang.englishDesc ? colors.textSecondary : colors.textTertiary,
            fontStyle: mimang.englishDesc ? 'normal' : 'italic',
            lineHeight: '1.5'
          }}>
            {mimang.englishDesc || 'Description coming soon'}
          </p>
        </div>

        <button
          onClick={() => setShowExample((s) => !s)}
          disabled={!hasToggleTarget}
          aria-label={showExample ? 'Show pattern' : 'Show cloth example'}
          title={showExample ? 'Show pattern' : 'Show cloth example'}
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
            padding: 0,
            background: hasToggleTarget ? colors.accentLight : 'transparent',
            border: 'none',
            borderRadius: '8px',
            color: hasToggleTarget ? colors.accentPrimary : colors.textTertiary,
            cursor: hasToggleTarget ? 'pointer' : 'not-allowed',
            opacity: hasToggleTarget ? 1 : 0.45,
            transition: 'transform 0.2s ease, background-color 0.2s ease'
          }}
        >
          {showExample ? <LayoutGrid size={16} /> : <Shirt size={16} />}
        </button>
      </div>
    </div>
  )
}

export default function MisingMotifs() {
  usePageTitle('Mising Motifs')
  const { mimang: mimangData } = useMimang()
  const { isDarkMode, colors } = useTheme()
  const [lightbox, setLightbox] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [filterCat, setFilterCat] = useState('All')

  const openLightbox = (src, alt) => setLightbox({ src, alt })

  const categories = useMemo(() => {
    const cats = [...new Set(mimangData.map(m => m.category).filter(Boolean))]
    return cats.length > 1 ? ['All', ...cats] : []
  }, [mimangData])

  const sortedMimang = useMemo(() => {
    const filtered = filterCat === 'All'
      ? mimangData
      : mimangData.filter(m => m.category === filterCat)
    const sorted = [...filtered].sort((a, b) =>
      a.gamigName.localeCompare(b.gamigName, 'en', { sensitivity: 'base' })
    )
    return sortDir === 'asc' ? sorted : sorted.reverse()
  }, [sortDir, mimangData, filterCat])

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
      {/* Page intro */}
      <section style={{ ...sectionWrap, padding: '48px clamp(20px, 5vw, 40px) 0' }}>
        <span style={eyebrow}>Learn</span>
        <h1 style={{ fontSize: '34px', fontWeight: '700', margin: '10px 0 10px', color: colors.text }}>
          Mising Motifs
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', maxWidth: '640px' }}>
          A mimang is a model, or data copy, of a Mising weaving pattern — a detailed
          arrangement of lines, shapes, and colours. The base unit, known as a{' '}
          <em>gai-gamig</em>, is expressed in graphic detail and follows a system
          called <em>alam</em>. Browse the collection below.
        </p>
      </section>

      {/* Controls */}
      <section style={{
        ...sectionWrap,
        padding: '24px clamp(20px, 5vw, 40px) 0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
            className="pill-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: '700',
              color: colors.accentPrimary,
              backgroundColor: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              borderRadius: '999px',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              boxShadow: `0 4px 12px ${colors.shadowColor}`,
              fontFamily: 'inherit'
            }}
          >
            <ArrowUpDown size={14} />
            Sort: {sortDir === 'asc' ? 'A → Z' : 'Z → A'}
          </button>

          {categories.map((cat) => {
            const active = filterCat === cat
            return (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className="pill-btn"
                style={{
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '999px',
                  border: `1px solid ${active ? colors.accentPrimary : colors.border}`,
                  backgroundColor: active ? colors.accentPrimary : colors.bgSecondary,
                  color: active ? (isDarkMode ? colors.bg : '#fff') : colors.textSecondary,
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <span style={{ fontSize: '13px', fontWeight: '600', color: colors.textTertiary }}>
          {sortedMimang.length} {sortedMimang.length === 1 ? 'pattern' : 'patterns'}
        </span>
      </section>

      {/* Pattern grid */}
      <section style={{ ...sectionWrap, padding: '20px clamp(20px, 5vw, 40px) 60px' }}>
        {sortedMimang.length > 0 ? (
          <div
            className="cards-grid stagger-grid is-visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
              gap: '16px'
            }}
          >
            {sortedMimang.map((m) => (
              <MimangCard key={m.code} mimang={m} onExpand={openLightbox} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 40px',
            color: colors.textTertiary,
            backgroundColor: colors.bgSecondary,
            borderRadius: '14px',
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(10px)',
            boxShadow: `0 8px 32px ${colors.shadowColor}`
          }}>
            <p style={{ fontSize: '14px' }}>No patterns added yet.</p>
          </div>
        )}

        <p style={{ fontSize: '12px', color: colors.textTertiary, marginTop: '24px' }}>
          Know a gamig that's missing, or spot an error? Reach us at{' '}
          <a href="mailto:contact@misingarchives.co.in" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
            contact@misingarchives.co.in
          </a>.
        </p>
      </section>

      <Lightbox
        src={lightbox?.src}
        alt={lightbox?.alt}
        onClose={() => setLightbox(null)}
      />
    </div>
  )
}
