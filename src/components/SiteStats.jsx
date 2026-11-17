import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { booksData } from '../data/books'
import { articlesData } from '../data/articles'
import { clansData } from '../data/learn/clans'
import { formatDate } from '../utils/formatDate'
import {
  useSiteStats, myVisitCount, istDate, daysBetween, TRACKING_SINCE, FOUNDED,
} from '../lib/siteStats'

const fmt = (n) => Number(n || 0).toLocaleString('en-IN')

// Counted once when the module loads: total words across all articles.
const WORDS_ARCHIVED = articlesData.reduce(
  (sum, a) => sum + a.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
  0
)

// Live clock in Indian Standard Time
function useIstClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return {
    time: now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
    date: now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }),
  }
}

export default function SiteStats() {
  const { colors } = useTheme()
  const stats = useSiteStats()
  const clock = useIstClock()

  const today = istDate()
  const monthName = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', month: 'long' })
  const daysOnline = daysBetween(FOUNDED, today)
  const daysTracked = Math.max(1, daysBetween(TRACKING_SINCE, today) + 1)
  const myVisits = myVisitCount()

  const topBook = useMemo(
    () => (stats?.top_book ? booksData.find((b) => b.code === stats.top_book)?.title : null),
    [stats]
  )
  const topArticle = useMemo(
    () => (stats?.top_article ? articlesData.find((a) => a.slug === stats.top_article)?.title : null),
    [stats]
  )

  // [label, value, small note]. Tiles with no value yet are skipped.
  const tiles = [
    stats && [`Visitors in ${monthName}`, fmt(stats.visitors_month)],
    stats && [`Visitors since ${formatDate(TRACKING_SINCE)}`, fmt(stats.visitors_total)],
    stats && ['Total visits', fmt(stats.visits_total), `${(stats.visits_total / daysTracked).toFixed(1)} per day`],
    stats && ['Visits today', fmt(stats.visits_today)],
    stats?.busiest_day && ['Busiest day', `${fmt(stats.busiest_visits)} visits`, formatDate(stats.busiest_day)],
    stats && ['Book downloads', fmt(stats.book_downloads), `${fmt(stats.book_views)} book views`],
    stats && ['Article reads', fmt(stats.article_reads)],
    topBook && ['Most downloaded', topBook],
    topArticle && ['Most read', topArticle],
    ['Words archived', fmt(WORDS_ARCHIVED), `across ${articlesData.length} writings`],
    ['In the library', `${booksData.length} books`, `${clansData.length} clan names`],
    ['Days online', fmt(daysOnline), `since ${formatDate(FOUNDED)}`],
    myVisits > 0 && ['Your visits', fmt(myVisits), 'counted only on this device'],
  ].filter(Boolean)

  return (
    <div style={{
      borderTop: `1px solid ${colors.border}`,
      padding: '28px 40px',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          flexWrap: 'wrap', gap: '8px 24px', marginBottom: '16px',
        }}>
          <span style={{
            fontSize: '12px', fontWeight: '700', textTransform: 'uppercase',
            letterSpacing: '1.2px', color: colors.accentPrimary,
          }}>
            Site Stats
          </span>
          <span
            style={{
              fontSize: '13px', color: colors.textSecondary,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            }}
            title="Indian Standard Time"
          >
            {clock.date} · {clock.time} IST
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
        }}>
          {tiles.map(([label, value, note]) => (
            <div key={label} style={{
              padding: '12px 14px',
              borderRadius: '10px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bgSecondary,
              minWidth: 0,
            }}>
              <p style={{
                margin: '0 0 4px', fontSize: '10px', fontWeight: '700',
                textTransform: 'uppercase', letterSpacing: '0.8px', color: colors.textTertiary,
              }}>
                {label}
              </p>
              <p style={{
                margin: 0, fontSize: String(value).length > 14 ? '13px' : '19px',
                fontWeight: '800', color: colors.text, lineHeight: '1.3', overflowWrap: 'anywhere',
              }}>
                {value}
              </p>
              {note && (
                <p style={{ margin: '3px 0 0', fontSize: '11px', color: colors.textTertiary }}>{note}</p>
              )}
            </div>
          ))}
        </div>

        <p style={{ margin: '14px 0 0', fontSize: '11px', color: colors.textTertiary, lineHeight: '1.6' }}>
          A visitor is a unique browser, counted anonymously with no personal data. Counting started on{' '}
          {formatDate(TRACKING_SINCE)}. Figures are approximate: clearing browser data or using a second
          device counts again.
        </p>
      </div>
    </div>
  )
}