import React, { useState, useMemo } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { clansData } from '../../data/learn/clans'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import AudioButton from '../../components/AudioButton'

export default function Clans() {
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()
  const [sortDir, setSortDir] = useState('asc') // 'asc' | 'desc'

  const sortedClans = useMemo(() => {
    const sorted = [...clansData].sort((a, b) =>
      a.misingName.localeCompare(b.misingName, 'en', { sensitivity: 'base' })
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
        <span style={eyebrow}>Learn</span>
        <h1 style={{ fontSize: '34px', fontWeight: '700', margin: '10px 0 8px', color: colors.text }}>
          Mising Opín Amin 
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', maxWidth: '640px' }}>
                    Mising Opín (clan) names are often spelled inconsistently 
                    due to historical transliteration practices. 
                    Although the Mising language adopted a standardised
                    Roman script through a resolution of the Mising Agom Kébang, 
                    legal names in India cannot use characters such as é, í, and (:).
                     As a result, many surnames have multiple spellings. 
                     The table below lists the standard Mising spellings 
                     alongside their common legal respellings, pronunciation, and IPA.

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

      {/* Desktop: table. Mobile: stacked cards (see .clans-table-wrap /
          .clans-cards in App.css — only one of the two is shown at a time,
          so mobile never needs to scroll sideways). */}
      <section style={{ ...sectionWrap, padding: '20px clamp(20px, 5vw, 40px) 60px' }}>
        <div className="clans-table-wrap" style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: colors.bgTertiary }}>
                  <th style={th} scope="col">Opín Amin </th>
                  <th style={th} scope="col">Common (Legal) Spellings</th>
                  <th style={th} scope="col">IPA</th>
                  <th style={th} scope="col">Pronunciation</th>
                </tr>
              </thead>
              <tbody>
                {sortedClans.map((row) => (
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

        {/* Mobile card list — hidden on desktop via CSS */}
        <div className="clans-cards" style={{ display: 'none', flexDirection: 'column', gap: '10px' }}>
          {sortedClans.map((row) => (
            <div
              key={row.misingName}
              style={{
                ...cardBase,
                padding: '16px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '10px'
              }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: colors.text }}>
                    {row.misingName}
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>
                    {row.legalSpelling}
                  </p>
                </div>
                <span style={{
                  fontSize: '13px',
                  color: colors.textSecondary,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}>
                  {row.ipa}
                </span>
              </div>
              <AudioButton src={row.voice} />
            </div>
          ))}
        </div>

        <p style={{ fontSize: '12px', color: colors.textTertiary, marginTop: '16px' }}>
          Know a clan name that's missing, or spot an error? Reach us at{' '}
          <a href="mailto:contact@misingarchives.co.in" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
            contact@misingarchives.co.in
          </a>.
        </p>
      </section>
    </div>
  )
}