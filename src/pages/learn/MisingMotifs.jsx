import React, { useState, useMemo } from 'react'
import { Shirt, LayoutGrid, Maximize2, X, ArrowUpDown } from 'lucide-react'
import { mimangData } from '../../data/learn/mimang'
import { useTheme } from '../../context/ThemeContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import LazyImage from '../../components/LazyImage'
// Given '/images/mimang/0001.jpeg', returns '/images/mimang/thumbs/0001.jpeg'
// — the compressed preview generated at build time by
// scripts/generate-thumbnails.js. Falls back to the original path if the
// thumb doesn't exist yet (e.g. local dev before a build has run) via the
// onError handler on each <img>, rather than failing to load at all.
function toThumbUrl(path) {
  if (!path) return path
  const idx = path.lastIndexOf('/')
  if (idx === -1) return path
  return `${path.slice(0, idx)}/thumbs${path.slice(idx)}`
}

// Fullscreen lightbox for viewing the currently displayed image at full
// size. Always shown at ORIGINAL resolution, not the compressed preview —
// shared by every card via the page-level `lightboxImage` state below,
// rather than each card managing its own overlay.
function Lightbox({ src, alt, onClose }) {
  const { isDarkMode } = useTheme()
  if (!src) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: isDarkMode ? 'rgba(15, 14, 12, 0.9)' : 'rgba(0, 0, 0, 0.85)',
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
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
          padding: '6px'
        }}
      >
        <X size={28} />
      </button>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          maxHeight: '90vh',
          borderRadius: '10px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          objectFit: 'contain'
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

// One pattern card — image flush at the top with an expand button
// overlaid in its corner (opens the fullscreen lightbox at FULL
// resolution), then a text row underneath with a category tag,
// name/description, and a separate pattern/cloth-example toggle icon.
//
// The card itself always displays the COMPRESSED thumb, not the original
// 5-6MB upload — that's what keeps the grid fast to load.
function MimangCard({ mimang, onExpand }) {
  const { colors } = useTheme()
  const [showExample, setShowExample] = useState(false)

  const displayedFull = showExample ? mimang.clothExample : mimang.image
  const displayedThumb = toThumbUrl(displayedFull)
  const displayedAlt = showExample ? `${mimang.gamigName} woven on cloth` : mimang.gamigName
  const hasToggleTarget = Boolean(mimang.image && mimang.clothExample)

  return (
    <div style={{
      backgroundColor: colors.bgSecondary,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: `0 4px 14px ${colors.shadowColor}`
    }}>
      {/* Square swatch — flush with the top of the card, no border */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', backgroundColor: colors.accentLight }}>
        {displayedThumb ? (
          <>
            <LazyImage
              src={displayedThumb}
              alt={displayedAlt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                // Thumb missing (e.g. build hasn't generated it yet) —
                // fall back to the original once, rather than a broken image.
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
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '7px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,0.92)',
                color: '#1A1A1A',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
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

      {/* Text row — label on the left, pattern/cloth toggle on the right */}
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
            width: '22px',
            height: '22px',
            padding: 0,
            background: 'none',
            border: 'none',
            color: hasToggleTarget ? colors.textSecondary : colors.textTertiary,
            cursor: hasToggleTarget ? 'pointer' : 'not-allowed',
            opacity: hasToggleTarget ? 1 : 0.5
          }}
        >
          {showExample ? <LayoutGrid size={17} /> : <Shirt size={17} />}
        </button>
      </div>
    </div>
  )
}

export default function MisingMotifs() {
  usePageTitle('Mising Motifs')
  const { colors } = useTheme()
  const [lightbox, setLightbox] = useState(null) // { src, alt } | null
  const [sortDir, setSortDir] = useState('asc') // 'asc' | 'desc'

  const openLightbox = (src, alt) => setLightbox({ src, alt })

  const sortedMimang = useMemo(() => {
    const sorted = [...mimangData].sort((a, b) =>
      a.gamigName.localeCompare(b.gamigName, 'en', { sensitivity: 'base' })
    )
    return sortDir === 'asc' ? sorted : sorted.reverse()
  }, [sortDir])

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
        <h1 style={{ fontSize: '34px', fontWeight: '700', margin: '10px 0 8px', color: colors.text }}>
          Mising Motifs
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', maxWidth: '640px' }}>
          A mimang is a model, or data copy, of a Mising weaving pattern — a detailed
          arrangement of lines, shapes, and colours. The base unit, known as a{' '}
          <em>gai-gamig</em>, is expressed in graphic detail and follows a system
          called <em>alam</em>. Browse the collection below.
        </p>
      </section>

      {/* Sort control */}
      <section style={{ ...sectionWrap, padding: '28px clamp(20px, 5vw, 40px) 0' }}>
        <button
          onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            fontSize: '13px',
            fontWeight: '700',
            color: colors.accentPrimary,
            backgroundColor: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            boxShadow: `0 4px 12px ${colors.shadowColor}`,
            fontFamily: 'inherit'
          }}
        >
          <ArrowUpDown size={14} />
          Sort: {sortDir === 'asc' ? 'A → Z' : 'Z → A'}
        </button>
      </section>

      {/* Pattern grid */}
      <section style={{ ...sectionWrap, padding: '20px clamp(20px, 5vw, 40px) 60px' }}>
        {sortedMimang.length > 0 ? (
          <div
            className="cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '14px'
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
            borderRadius: '12px',
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