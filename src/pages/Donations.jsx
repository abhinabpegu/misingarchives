import React from 'react'
import { Link } from 'react-router-dom'
import { donationsData, expensesData } from '../data/donations'
import { useTheme } from '../context/ThemeContext'
import { useCardStyle } from '../utils/cardStyle'
import { formatDate } from '../utils/formatDate'
import { usePageTitle } from '../hooks/usePageTitle'

function formatRupees(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export default function Donations() {
  usePageTitle('Donations')
  const { colors } = useTheme()
  const { cardBase, hoverIn, hoverOut } = useCardStyle()

  const totalRaised = donationsData.reduce((sum, d) => sum + d.amount, 0)
  const totalSpent = expensesData.reduce((sum, e) => sum + e.amount, 0)
  const balance = totalRaised - totalSpent

  const sortedDonations = [...donationsData].sort((a, b) => b.date.localeCompare(a.date))
  const sortedExpenses = [...expensesData].sort((a, b) => b.date.localeCompare(a.date))

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

  const statCard = {
    ...cardBase,
    padding: '24px',
    textAlign: 'center'
  }

  return (
    <div>
      {/* Page intro */}
      <section style={{ ...sectionWrap, padding: '48px clamp(20px, 5vw, 40px) 0' }}>
        <span style={eyebrow}>Transparency</span>
        <h1 style={{ fontSize: '34px', fontWeight: '700', margin: '10px 0 8px', color: colors.text }}>
          Donations
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', maxWidth: '640px' }}>
          Mising Archives is entirely community-funded. Every donation and every expense is logged
          here, so anyone can see exactly what's come in and where it's gone.
        </p>
      </section>

      {/* Summary stats */}
      <section style={{ ...sectionWrap, padding: '32px clamp(20px, 5vw, 40px) 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          <div style={statCard}>
            <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: colors.textTertiary }}>
              Total Raised
            </p>
            <p style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colors.accentPrimary }}>
              {formatRupees(totalRaised)}
            </p>
          </div>
          <div style={statCard}>
            <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: colors.textTertiary }}>
              Total Spent
            </p>
            <p style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colors.text }}>
              {formatRupees(totalSpent)}
            </p>
          </div>
          <div style={statCard}>
            <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: colors.textTertiary }}>
              Current Balance
            </p>
            <p style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colors.text }}>
              {formatRupees(balance)}
            </p>
          </div>
        </div>
      </section>

      {/* Donations list */}
      <section style={{ ...sectionWrap, padding: '56px clamp(20px, 5vw, 40px) 0' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 20px', color: colors.text }}>
          Donations Received
        </h2>

        {sortedDonations.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sortedDonations.map((d, idx) => (
              <div
                key={idx}
                style={{
                  ...cardBase,
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700', color: colors.text }}>
                    {d.anonymous ? 'Anonymous' : d.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>
                    {formatDate(d.date)}{d.note ? ` · ${d.note}` : ''}
                  </p>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '700', color: colors.accentPrimary, whiteSpace: 'nowrap' }}>
                  {formatRupees(d.amount)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '14px', color: colors.textSecondary }}>No donations logged yet.</p>
        )}
      </section>

      {/* Where funds went */}
      <section style={{ ...sectionWrap, padding: '56px clamp(20px, 5vw, 40px) 0' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 20px', color: colors.text }}>
          Where the Funds Went
        </h2>

        {sortedExpenses.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sortedExpenses.map((e, idx) => (
              <div
                key={idx}
                style={{
                  ...cardBase,
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700', color: colors.text }}>
                    {e.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: colors.textTertiary }}>{formatDate(e.date)}</span>
                    <span style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      backgroundColor: colors.accentLight,
                      color: colors.accentPrimary,
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>
                      {e.category}
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '700', color: colors.text, whiteSpace: 'nowrap' }}>
                  {formatRupees(e.amount)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '14px', color: colors.textSecondary }}>No expenses logged yet.</p>
        )}
      </section>

      
    </div>
  )
}