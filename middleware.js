import { articlesData } from './src/data/articles.js'
import { booksData } from './src/data/books.js'

export const config = {
  matcher: [
    '/',
    '/digital-book-library',
    '/articles',
    '/article/:slug',
    '/donations',
    '/contact',
    '/privacy-policy',
    '/terms-of-use',
    '/learn/clans',
  ],
}

const SITE_NAME = 'Mising Archives'
const DEFAULT_DESCRIPTION =
  'Mising Archives is an independent, community-led initiative to preserve and share knowledge about the Mising Tribe.'

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// `image: null` means "don't show a preview image at all" — used for every
// page that doesn't have its own specific cover (the logo used to be used
// as a fallback here, which made link previews for the homepage, library,
// articles list, donations, contact, privacy, terms, and clans pages all
// show the site logo. Only pages with a real, specific image — articles
// and individual books — get an og:image now.
function getMeta(url) {
  const { pathname, searchParams, origin } = url
  const abs = (path) => new URL(path, origin).toString()

  // /article/:slug — per-article title, excerpt, cover
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

  // /digital-book-library — optionally with ?book=CODE for a specific book
  if (pathname === '/digital-book-library') {
    const bookCode = searchParams.get('book')
    const book = bookCode ? booksData.find((b) => b.code === bookCode) : null
    if (book) {
      return {
        title: `${book.title} — ${SITE_NAME}`,
        description: `By ${book.author}. ${book.tags.join(', ')}.`,
        image: book.coverImage ? abs(book.coverImage) : null,
      }
    }
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

  if (pathname === '/learn/clans') {
    return {
      title: `Mising Opín Amin (Clans) — ${SITE_NAME}`,
      description: 'Standard Mising clan spellings alongside their common legal respellings, pronunciation, and IPA.',
      image: null,
    }
  }

  // "/" and anything unmatched — site default
  return {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    image: null,
  }
}

export default async function middleware(request) {
  const url = new URL(request.url)
  const { title, description, image } = getMeta(url)
  const pageUrl = url.toString()

  const res = await fetch(new URL('/index.html', request.url))
  let html = await res.text()

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${pageUrl}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${pageUrl}$2`)

  if (image) {
    // Has a real, specific image (an article or a book) — set it.
    html = html
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`)
  } else {
    // No specific image for this page — strip the tags entirely instead of
    // falling back to the logo, so link previews just show title + text.
    html = html
      .replace(/\s*<meta property="og:image" content="[^"]*">\n?/, '')
      .replace(/\s*<meta name="twitter:image" content="[^"]*">\n?/, '')
      // twitter:card "summary" expects an image; without one, "summary" is fine,
      // but if you had summary_large_image anywhere it'd look broken without an image.
  }

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}