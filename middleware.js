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
const DEFAULT_IMAGE_PATH = '/images/logo.png'

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

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
        image: article.coverImage ? abs(article.coverImage) : abs(DEFAULT_IMAGE_PATH),
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
        image: book.coverImage ? abs(book.coverImage) : abs(DEFAULT_IMAGE_PATH),
      }
    }
    return {
      title: `Digital Book Library — ${SITE_NAME}`,
      description: 'Browse the Mising Archives digital book collection.',
      image: abs(DEFAULT_IMAGE_PATH),
    }
  }

  if (pathname === '/articles') {
    return {
      title: `Community Writings — ${SITE_NAME}`,
      description: 'Community writings on Mising language, culture, history, and poetry.',
      image: abs(DEFAULT_IMAGE_PATH),
    }
  }

  if (pathname === '/donations') {
    return {
      title: `Donations — ${SITE_NAME}`,
      description: 'See how Mising Archives is funded and where donations go.',
      image: abs(DEFAULT_IMAGE_PATH),
    }
  }

  if (pathname === '/contact') {
    return {
      title: `Contact Us — ${SITE_NAME}`,
      description: 'Get in touch with Mising Archives.',
      image: abs(DEFAULT_IMAGE_PATH),
    }
  }

  if (pathname === '/privacy-policy') {
    return {
      title: `Privacy Policy — ${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      image: abs(DEFAULT_IMAGE_PATH),
    }
  }

  if (pathname === '/terms-of-use') {
    return {
      title: `Terms of Use — ${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      image: abs(DEFAULT_IMAGE_PATH),
    }
  }

  if (pathname === '/learn/clans') {
    return {
      title: `Mising Opín Amin (Clans) — ${SITE_NAME}`,
      description: 'Standard Mising clan spellings alongside their common legal respellings, pronunciation, and IPA.',
      image: abs(DEFAULT_IMAGE_PATH),
    }
  }

  // "/" and anything unmatched — site default
  return {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    image: abs(DEFAULT_IMAGE_PATH),
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
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${pageUrl}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${pageUrl}$2`)

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}