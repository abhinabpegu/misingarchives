import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download } from 'lucide-react'
import { articlesData } from '../data/articles'
import { useTheme } from '../context/ThemeContext'
import { formatDate } from '../utils/formatDate'
import { usePageTitle } from '../hooks/usePageTitle'
import { cloudinaryUrl } from '../utils/cloudinaryUrl'

const SITE_URL = 'https://www.misingarchives.co.in'

const slugify = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Adds id="..." to every <h2> and returns the list for the contents box.
function withHeadingIds(html) {
  const toc = []
  const out = html.replace(/<h2>(.*?)<\/h2>/g, (_, inner) => {
    const text = inner.replace(/<[^>]+>/g, '')
    const id = slugify(text)
    toc.push({ id, text })
    return `<h2 id="${id}">${inner}</h2>`
  })
  return { html: out, toc }
}

// ["Navajit Pamegam", "Dishan Doley"] -> "Pamegam, N., & Doley, D."
function apaAuthors(names) {
  const list = names.map((n) => {
    const parts = n.trim().split(/\s+/)
    const last = parts[parts.length - 1]
    const initials = parts.slice(0, -1).map((p) => `${p[0].toUpperCase()}.`).join(' ')
    return initials ? `${last}, ${initials}` : last
  })
  if (list.length === 1) return list[0]
  return `${list.slice(0, -1).join(', ')}, & ${list[list.length - 1]}`
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const { isDarkMode, colors } = useTheme()
  const article = articlesData.find(a => a.slug === slug)
  const isResearch = article?.type === 'research'
  const authorNames = article?.authors || (article ? [article.author.trim()] : [])

  const jsonLd = article ? {
    '@context': 'https://schema.org',
    '@type': isResearch ? 'ScholarlyArticle' : (article.category === 'Poetry' ? 'CreativeWork' : 'Article'),
    headline: article.title,
    description: isResearch && article.abstract ? article.abstract : article.excerpt,
    author: authorNames.map(n => ({ '@type': 'Person', name: n })),
    datePublished: article.date,
    inLanguage: 'en',
    keywords: article.keywords ? article.keywords.join(', ') : undefined,
    publisher: { '@type': 'Organization', name: 'Mising Archives', url: SITE_URL },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/',
  } : null

  usePageTitle(article?.title)

  if (!article) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
        <h1 style={{ fontSize: '22px', color: colors.text, marginBottom: '10px' }}>Article not found</h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '24px' }}>
          This article may have been moved or doesn't exist.
        </p>
        <Link to="/articles" style={{ color: colors.accentPrimary, fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
          ← Back to Articles
        </Link>
      </div>
    )
  }

  // Research articles get heading ids + a contents list; others render as-is.
  let bodyHtml = article.content
  let toc = []
  if (isResearch) {
    const processed = withHeadingIds(article.content)
    bodyHtml = processed.html
    toc = processed.toc
  }

  // Cloudinary URLs need fl_attachment to force a download; same-origin
  // files use the HTML download attribute instead. No-op for other URLs.
  const pdfHref = article.pdfUrl ? cloudinaryUrl(article.pdfUrl, 'fl_attachment') : null

  const citation = `${apaAuthors(authorNames)} (${article.date.slice(0, 4)}). ${article.title}. Mising Archives. ${SITE_URL}/article/${article.slug}`

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: colors.accentPrimary,
    marginBottom: '10px'
  }

  const boxStyle = {
    padding: '22px 24px',
    borderRadius: '12px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bgSecondary,
    marginBottom: '28px'
  }

  const bodyClass = article.category === 'Poetry'
    ? 'article-body poem-body'
    : isResearch
      ? 'article-body research-body'
      : 'article-body'

  return (
    <article style={{ maxWidth: '760px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      <Link to="/articles" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        fontWeight: '600',
        color: colors.textSecondary,
        textDecoration: 'none',
        marginBottom: '28px'
      }}>
        <ArrowLeft size={15} /> Back to Articles
      </Link>

      <span style={{
        display: 'inline-block',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: colors.accentPrimary,
        backgroundColor: colors.accentLight,
        padding: '5px 10px',
        borderRadius: '6px',
        marginBottom: '16px'
      }}>
        {isResearch ? 'Research Article' : article.category}
      </span>

      <h1 style={{
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontWeight: '800',
        lineHeight: '1.2',
        margin: '0 0 16px',
        color: colors.text
      }}>
        {article.title}
      </h1>

      <p style={{ fontSize: '13px', color: colors.textTertiary, marginBottom: isResearch ? '20px' : '32px' }}>
        By {article.author}
        {article.affiliation ? ` · ${article.affiliation}` : ''}
        {' · '}{formatDate(article.date)}
      </p>

      {isResearch && pdfHref && (
        <a
          href={pdfHref}
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 18px',
            marginBottom: '32px',
            fontSize: '13px',
            fontWeight: '700',
            backgroundColor: colors.accentPrimary,
            color: isDarkMode ? colors.bg : '#fff',
            borderRadius: '10px',
            textDecoration: 'none',
            boxShadow: `0 6px 18px ${colors.shadowColor}`
          }}
        >
          <Download size={15} />
          Download PDF
        </a>
      )}

      {isResearch && article.abstract && (
        <div style={boxStyle}>
          <span style={labelStyle}>Abstract</span>
          <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.75', color: colors.text }}>
            {article.abstract}
          </p>
          {article.keywords && article.keywords.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
              {article.keywords.map(k => (
                <span key={k} style={{
                  padding: '5px 10px',
                  backgroundColor: colors.accentLight,
                  color: colors.accentPrimary,
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {isResearch && toc.length > 0 && (
        <nav aria-label="Contents" style={boxStyle}>
          <span style={labelStyle}>Contents</span>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            {toc.map(t => (
              <li key={t.id} style={{ fontSize: '14px', lineHeight: '1.9' }}>
                <a href={`#${t.id}`} style={{ color: colors.accentPrimary, fontWeight: '600', textDecoration: 'none' }}>
                  {t.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {article.coverImage && (
        article.category === 'Poetry' ? (
          <img
            src={article.coverImage}
            alt={article.title}
            style={{
              width: '100%',
              maxHeight: '220px',
              objectFit: article.coverFit || 'cover',
              marginBottom: '36px',
              filter: 'saturate(0.85) contrast(0.95)',
              maskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
              display: 'block'
            }}
          />
        ) : (
          <img
            src={article.coverImage}
            alt={article.title}
            style={{
              width: '100%',
              maxHeight: '420px',
              objectFit: article.coverFit || 'cover',
              backgroundColor: colors.bgTertiary,
              borderRadius: '14px',
              marginBottom: '36px',
              boxShadow: `0 12px 32px ${colors.shadowColor}`
            }}
          />
        )
      )}

      {/* Article body: raw HTML from the data files, styled by the
          .article-body rules in src/styles/App.css. CSS custom properties
          below let those rules follow the current light/dark theme. */}
      <div
        className={bodyClass}
        style={{
          '--accent': colors.accentPrimary,
          '--text': colors.text,
          '--text-secondary': colors.textSecondary,
          '--border': colors.border,
          '--bg-secondary': colors.bgSecondary,
        }}
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      {isResearch && (
        <div style={{ ...boxStyle, marginTop: '48px', marginBottom: 0 }}>
          <span style={labelStyle}>Cite this article</span>
          <p style={{ margin: '0 0 12px', fontSize: '14px', lineHeight: '1.7', color: colors.textSecondary, overflowWrap: 'anywhere' }}>
            {citation}
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>
            Licensed under{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: colors.accentPrimary, fontWeight: '600' }}>
              CC BY-SA 4.0
            </a>
            . See our <Link to="/copyright-policy" style={{ color: colors.accentPrimary, fontWeight: '600' }}>Copyright Policy</Link>.
          </p>
        </div>
      )}

      {article.sourceUrl && (
        <div style={{
          marginTop: '48px',
          padding: '16px 20px',
          borderRadius: '10px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          fontSize: '13px',
          color: colors.textSecondary,
          lineHeight: '1.6'
        }}>
          {article.sourceLabel || 'Source'}
          {': '}
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.accentPrimary, fontWeight: '600' }}
          >
            {article.sourceUrl}
          </a>
        </div>
      )}
    </article>
  )
}