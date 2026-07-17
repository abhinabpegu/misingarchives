import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { articlesData } from '../data/articles'
import { useTheme } from '../context/ThemeContext'
import ArticleCard from '../components/ArticleCard'
import ContributeCard from '../components/ContributeCard'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Articles() {
  usePageTitle('Community Writings')
  const { isDarkMode, colors } = useTheme()
  const [filterCategory, setFilterCategory] = useState('All')

  const categories = ['All', ...new Set(articlesData.map(a => a.category))]

  const sortedArticles = useMemo(() => {
    return [...articlesData].sort((a, b) => b.date.localeCompare(a.date))
  }, [])

  const displayedArticles = useMemo(() => {
    if (filterCategory === 'All') return sortedArticles
    return sortedArticles.filter(a => a.category === filterCategory)
  }, [sortedArticles, filterCategory])

  return (
    <div>
      {/* Page intro */}
      <section style={{
  padding: '48px clamp(20px, 5vw, 40px) 0',
  maxWidth: '1400px',
  margin: '0 auto'
}}>
  <span style={{
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.4px',
    color: colors.accentPrimary
  }}>
    From the Community
  </span>
  <h1 style={{
    fontSize: '34px',
    fontWeight: '700',
    margin: '10px 0 8px',
    color: colors.text
  }}>
    Community Writings
  </h1>
  
</section>
      {/* Contribute an article */}
      <section style={{ padding: '0 clamp(20px, 5vw, 40px)', maxWidth: '1400px', margin: '0 auto' }}>
        <ContributeCard
          title="Want to contribute an original writing of yours?"
          teaser="Send us your writing"
        >
          <p style={{ margin: '0 0 14px', fontSize: '14px', color: colors.textSecondary, lineHeight: '1.6' }}>
            Submit your draft, along with your author details, using our short form:
          </p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfEnOKDzhTOoSyLdSMKrhy6SE87HK0SlTJj_8YOHOrIgt_v2Q/viewform"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 18px',
              backgroundColor: colors.accentPrimary,
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '700',
              marginBottom: '12px'
            }}
          >
            Open the Submission Form →
          </a>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>
            Prefer email? Reach us at{' '}
            <a href="mailto:contact@misingarchives.co.in" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
              contact@misingarchives.co.in
            </a>{' '}
            or on Instagram —{' '}
            <a href="https://instagram.com/misingarchives" target="_blank" rel="noopener noreferrer" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
              @misingarchives
            </a>.
          </p>
        </ContributeCard>
      </section>

      {/* Category filter */}
      <section style={{
        padding: '28px clamp(20px, 5vw, 40px) 0',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories.map(cat => {
            const active = filterCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '999px',
                  border: `1px solid ${active ? colors.accentPrimary : colors.border}`,
                  backgroundColor: active ? colors.accentPrimary : colors.bgSecondary,
                  color: active ? (isDarkMode ? colors.bg : '#fff') : colors.textSecondary,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* Articles grid */}
      <section className="section-container" style={{
        padding: '32px clamp(20px, 5vw, 40px) 60px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {displayedArticles.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {displayedArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
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
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: colors.text }}>No articles found</p>
            <p style={{ fontSize: '14px' }}>Try a different category.</p>
          </div>
        )}
      </section>

     

{/* Quiet pointer to the library for people who landed here looking for books */}
<section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px) 60px' }}>
  <p style={{ fontSize: '13px', color: colors.textTertiary, textAlign: 'center' }}>
    Looking for full books instead? Visit the <Link to="/digital-book-library" style={{ color: colors.accentPrimary, fontWeight: '600' }}>Digital Book Library</Link>.
  </p>
</section>
    </div>
  )
}
