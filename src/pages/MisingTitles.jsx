import React from 'react'
import { misingTitlesData } from '../data/misingTitles'
import { useTheme } from '../context/ThemeContext'
import { useCardStyle } from '../utils/cardStyle'
import AudioButton from '../components/AudioButton'

export default function MisingTitles() {
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()

  const eyebrow = {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.4px',
    color: colors.accentPrimary
  }

  const sectionWrap = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 40px)'
  }

  const th = {
    textAlign: 'left',
    padding: '14px 16px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    color: colors.accentPrimary,
    whiteSpace: 'nowrap'
  }

  const td = {
    padding: '16px',
    fontSize: '14px',
    color: colors.text,
    borderTop: `1px solid ${colors.border}`,
    verticalAlign: 'middle'
  }

  return (
    <div>
      {/* Page intro */}
      <section style={{ ...sectionWrap, padding: '48px clamp(20px, 5vw, 40px) 0' }}>
        <span style={eyebrow}>Reference</span>
        <h1 style={{ fontSize: '34px', fontWeight: '700', margin: '10px 0 8px', color: colors.text }}>
          Mising Opín Amin
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', maxWidth: '640px' }}>
          Mising Opín (clan) names are often spelled inconsistently due to historical transliteration practices. Although the Mising language adopted a standardised Roman script in 1972 through a resolution of the Mising Agom Kébang, legal names in India cannot use characters such as é, í, and (:). As a result, many surnames have multiple spellings. The table below lists the standard Mising spellings alongside their common legal respellings, pronunciation, and IPA.
        </p>
      </section>

      {/* Table */}
      <section style={{ ...sectionWrap, padding: '32px clamp(20px, 5vw, 40px) 60px' }}>
        <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: colors.bgTertiary }}>
                  <th style={th} scope="col">Opín Amin (Mising)</th>
                  <th style={th} scope="col">Common Spelling(s)</th>
                  <th style={th} scope="col">IPA</th>
                  <th style={th} scope="col">Pronunciation</th>
                </tr>
              </thead>
              <tbody>
                {misingTitlesData.map((row) => (
                  <tr
                    key={row.misingName}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.tableHover }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    <td style={{ ...td, fontWeight: '700' }}>{row.misingName}</td>
                    <td style={{ ...td, color: colors.textSecondary }}>{row.legalSpelling}</td>
                    <td style={{
                      ...td,
                      color: colors.textSecondary,
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
                    }}>
                      {row.ipa}
                    </td>
                    <td style={td}>
                      <AudioButton src={row.voice} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: colors.textTertiary, marginTop: '16px' }}>
          Know a title name that's missing, or spot an error? Reach us at{' '}
          <a href="mailto:contact@misingarchives.co.in" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
            contact@misingarchives.co.in
          </a>.
        </p>
      </section>
    </div>
  )
}