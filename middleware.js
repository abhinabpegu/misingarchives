import { articlesData } from './src/data/articles.js'
import { booksData } from './src/data/books.js'

export const config = {
  matcher: [
    '/',
    '/digital-book-library',
    '/articles',
    '/article/:slug',
    '/book/:code',
    '/donations',
    '/contact',
    '/privacy-policy',
    '/terms-of-use',
    '/copyright-policy',
    '/learn/clans',
  ],
}

const SITE_NAME = 'Mising Archives'
const SITE_URL = 'https://www.misingarchives.co.in'
const DEFAULT_DESCRIPTION =
  'Mising Archives is an independent, community-led initiative to preserve and share knowledge about the Mising Tribe.'

// Crawlers that either don't execute JavaScript, or shouldn't have to spend
// render budget doing so, get full content + JSON-LD injected directly into
// the HTML below. Everyone else gets the meta-tag swap only, same as
// before — real users never see the injected markup, since main.jsx uses
// createRoot().render() (not hydrateRoot()), which wipes #root and renders
// fresh on load either way.
const BOT_UA_REGEX = new RegExp(
  [
    'googlebot', 'bingbot', 'duckduckbot', 'baiduspider', 'yandexbot',
    'facebookexternalhit', 'twitterbot', 'linkedinbot', 'slackbot', 'whatsapp',
    'telegrambot', 'discordbot', 'applebot',
    // AI / LLM crawlers
    'gptbot', 'chatgpt-user', 'oai-searchbot', 'google-extended', 'ccbot',
    'claudebot', 'claude-web', 'anthropic-ai', 'perplexitybot', 'perplexity-user',
    'bytespider', 'diffbot', 'cohere-ai', 'youbot', 'amazonbot',
    'meta-externalagent', 'meta-externalfetcher', 'imagesiftbot', 'timpibot',
    'omgili', 'webzio-extended',
  ].join('|'),
  'i'
)

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ---------------------------------------------------------------------
// Per-page meta (title/description/og:image) — same as before, applies to
// every matched request regardless of bot or not.
// ---------------------------------------------------------------------
function getMeta(url) {
  const { pathname, searchParams, origin } = url
  const abs = (path) => new URL(path, origin).toString()

  if (pathname.startsWith('/article/')) {
    const slug = decodeURIComponent(pathname.split('/article/')[1] || '')
    const article = articlesData.find((a) => a.slug === slug)
    if (article) {
      return {
        title: `${article.title} — ${SITE_NAME}`,
        description: article.excerpt || DEFAULT_DESCRIPTION,
        image: article.coverImage ? abs(article.coverImage) : null,
      }
    }
  }

  if (pathname.startsWith('/book/')) {
    const code = decodeURIComponent(pathname.split('/book/')[1] || '')
    const book = booksData.find((b) => b.code === code)
    if (book) {
      return {
        title: `${book.title} — ${SITE_NAME}`,
        description: `By ${book.author}. ${book.tags.join(', ')}.`,
        image: book.coverImage ? abs(book.coverImage) : null,
      }
    }
  }

  if (pathname === '/digital-book-library') {
    return {
      title: `Digital Book Library — ${SITE_NAME}`,
      description: 'Browse the Mising Archives digital book collection.',
      image: null,
    }
  }

  if (pathname === '/articles') {
    return {
      title: `Community Writings — ${SITE_NAME}`,
      description: 'Community writings on Mising language, culture, history, and poetry.',
      image: null,
    }
  }

  if (pathname === '/donations') {
    return {
      title: `Donations — ${SITE_NAME}`,
      description: 'See how Mising Archives is funded and where donations go.',
      image: null,
    }
  }

  if (pathname === '/contact') {
    return {
      title: `Contact Us — ${SITE_NAME}`,
      description: 'Get in touch with Mising Archives.',
      image: null,
    }
  }

  if (pathname === '/privacy-policy') {
    return {
      title: `Privacy Policy — ${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      image: null,
    }
  }

  if (pathname === '/terms-of-use') {
    return {
      title: `Terms of Use — ${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      image: null,
    }
  }

  if (pathname === '/copyright-policy') {
    return {
      title: `Copyright Policy — ${SITE_NAME}`,
      description: 'How copyright works across Mising Archives — original site content, and books in the Digital Book Library.',
      image: null,
    }
  }

  if (pathname === '/learn/clans') {
    return {
      title: `Mising Opín Amin (Clans) — ${SITE_NAME}`,
      description: 'Standard Mising clan spellings alongside their common legal respellings, pronunciation, and IPA.',
      image: null,
    }
  }

  if (pathname === '/learn/mising-motifs') {
    return {
      title: `Mising Motifs (Weaving Patterns) — ${SITE_NAME}`,
      description: 'A library of Mising weaving patterns (Gamig) — arrangements of lines, shapes, and colours used in traditional Mising textiles.',
      image: null,
    }
  }

  return {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    image: null,
  }
}

// ---------------------------------------------------------------------
// Full readable content + JSON-LD — bots only.
// ---------------------------------------------------------------------
function getBotContent(url) {
  const { pathname, origin } = url
  const abs = (path) => new URL(path, origin).toString()

  if (pathname.startsWith('/article/')) {
    const slug = decodeURIComponent(pathname.split('/article/')[1] || '')
    const article = articlesData.find((a) => a.slug === slug)
    if (article) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': article.category === 'Poetry' ? 'CreativeWork' : 'Article',
        headline: article.title,
        description: article.excerpt,
        author: { '@type': 'Person', name: article.author },
        datePublished: article.date,
        image: article.coverImage ? abs(article.coverImage) : undefined,
        inLanguage: 'en',
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: abs('/images/logo.png') },
        },
        mainEntityOfPage: url.toString(),
        license: 'https://creativecommons.org/licenses/by-sa/4.0/',
      }
      const html = `
        <article>
          <p><a href="/articles">← Back to Community Writings</a></p>
          <p><em>${escapeHtml(article.category)}</em></p>
          <h1>${escapeHtml(article.title)}</h1>
          <p>By ${escapeHtml(article.author)} · ${escapeHtml(article.date)}</p>
          ${article.content}
          ${article.sourceUrl ? `<p>${escapeHtml(article.sourceLabel || 'Source')}: <a href="${escapeHtml(article.sourceUrl)}">${escapeHtml(article.sourceUrl)}</a></p>` : ''}
          <p>Published by <a href="${SITE_URL}">Mising Archives</a>, a community-led archive of Mising language, history, and culture. Licensed CC BY-SA 4.0 unless noted otherwise.</p>
        </article>
      `
      return { html, jsonLd }
    }
  }

  if (pathname.startsWith('/book/')) {
    const code = decodeURIComponent(pathname.split('/book/')[1] || '')
    const book = booksData.find((b) => b.code === code)
    if (book) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: book.title,
        author: { '@type': 'Person', name: book.author },
        inLanguage: book.language,
        genre: book.tags,
        image: book.coverImage ? abs(book.coverImage) : undefined,
        url: url.toString(),
        isAccessibleForFree: true,
        provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      }
      const html = `
        <article>
          <p><a href="/digital-book-library">← Back to Digital Book Library</a></p>
          <p>Book ${escapeHtml(book.code)} · ${escapeHtml(book.language)}</p>
          <h1>${escapeHtml(book.title)}</h1>
          <p>By ${escapeHtml(book.author)}</p>
          <p>Tags: ${book.tags.map(escapeHtml).join(', ')}</p>
          <p>Archived by: ${escapeHtml(book.archivedBy)}</p>
          <p><a href="${escapeHtml(book.driveLink)}">Download this book</a></p>
          <p>Freely available from <a href="${SITE_URL}">Mising Archives</a>, a community-led digital library of Mising books, articles, and language resources.</p>
        </article>
      `
      return { html, jsonLd }
    }
  }

  if (pathname === '/digital-book-library') {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Digital Book Library',
      url: url.toString(),
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      about: 'Books on Mising language, history, culture, and folklore.',
    }
    const html = `
      <div>
        <h1>Digital Book Library</h1>
        <p>${booksData.length} freely downloadable books on Mising language, history, culture, and folklore.</p>
        <ul>
          ${booksData.map((b) => `<li><a href="/book/${escapeHtml(b.code)}">${escapeHtml(b.title)}</a> — ${escapeHtml(b.author)} (${escapeHtml(b.language)})</li>`).join('')}
        </ul>
      </div>
    `
    return { html, jsonLd }
  }

  if (pathname === '/articles') {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Community Writings',
      url: url.toString(),
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    }
    const sorted = [...articlesData].sort((a, b) => b.date.localeCompare(a.date))
    const html = `
      <div>
        <h1>Community Writings</h1>
        <ul>
          ${sorted.map((a) => `<li><a href="/article/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a> — ${escapeHtml(a.author)}, ${escapeHtml(a.date)} (${escapeHtml(a.category)})</li>`).join('')}
        </ul>
      </div>
    `
    return { html, jsonLd }
  }

  if (pathname === '/') {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    }
    const html = `
      <div>
        <h1>Mising Archives</h1>
        <p>${DEFAULT_DESCRIPTION}</p>
        <ul>
          <li><a href="/digital-book-library">Digital Book Library</a> — ${booksData.length} free books</li>
          <li><a href="/articles">Community Writings</a> — original articles, essays, and poetry</li>
          <li><a href="/learn/clans">Mising Opín Amin (Clans)</a> — clan names, spellings, and pronunciation</li>
          <li><a href="/donations">Donations</a> — funding transparency</li>
        </ul>
      </div>
    `
    return { html, jsonLd }
  }

  return null
}

export default async function middleware(request) {
  const url = new URL(request.url)
  const { title, description, image } = getMeta(url)
  const pageUrl = url.toString()
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = BOT_UA_REGEX.test(userAgent)

  const res = await fetch(new URL('/index.html', request.url))
  let html = await res.text()

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${pageUrl}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${pageUrl}$2`)

  if (image) {
    html = html
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`)
  } else {
    html = html
      .replace(/\s*<meta property="og:image" content="[^"]*">\n?/, '')
      .replace(/\s*<meta name="twitter:image" content="[^"]*">\n?/, '')
  }

  if (isBot) {
    const botContent = getBotContent(url)
    if (botContent) {
      const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(botContent.jsonLd)}</script>`
      html = html
        .replace('</head>', `${jsonLdScript}\n</head>`)
        .replace('<div id="root"></div>', `<div id="root">${botContent.html}</div>`)
    }
  }

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}