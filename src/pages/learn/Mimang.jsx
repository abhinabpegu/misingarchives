import React, { useState } from 'react'
import { Shirt, LayoutGrid, Maximize2, X } from 'lucide-react'
import { mimangData } from '../../data/learn/mimang'
import { useTheme } from '../../context/ThemeContext'
import { usePageTitle } from '../../hooks/usePageTitle'

// Fullscreen lightbox for viewing the currently displayed image at full
// size. Shared by every card via the page-level `lightboxImage` state
// below, rather than each card managing its own overlay.
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
// overlaid in its corner (opens the fullscreen lightbox), then a text row
// underneath with a separate pattern/cloth-example toggle icon.
function MimangCard({ mimang, onExpand }) {
  const { colors } = useTheme()
  const [showExample, setShowExample] = useState(false)

  const displayedImage = showExample ? mimang.clothExample : mimang.image
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
        {displayedImage ? (
          <>
            <img
              src={displayedImage}
              alt={displayedAlt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <button
              onClick={() => onExpand(displayedImage, displayedAlt)}
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
          <p style={{ margin: '0 0 2px', fontSize: '12px', fontWeight: '400', color: colors.textSecondary }}>
            {mimang.code}
          </p>
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

export default function Mimang() {
  usePageTitle('Mimang')
  const { colors } = useTheme()
  const [lightbox, setLightbox] = useState(null) // { src, alt } | null

  const openLightbox = (src, alt) => setLightbox({ src, alt })

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
          Mimang
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', maxWidth: '640px' }}>
          A mimang is a model, or data copy, of a Mising weaving pattern — a detailed
          arrangement of lines, shapes, and colours. The base unit, known as a{' '}
          <em>gai-gamig</em>, is expressed in graphic detail and follows a system
          called <em>alam</em>. Browse the collection below.
        </p>
      </section>

      {/* Pattern grid */}
      <section style={{ ...sectionWrap, padding: '32px clamp(20px, 5vw, 40px) 60px' }}>
        {mimangData.length > 0 ? (
          <div
            className="cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '14px'
            }}
          >
            {mimangData.map((m) => (
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