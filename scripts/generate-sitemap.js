import { writeFileSync } from 'fs'
import { articlesData } from '../src/data/articles.js'
import { booksData } from '../src/data/books.js'

const SITE_URL = 'https://www.misingarchives.co.in'

const staticRoutes = [
  '/',
  '/digital-book-library',
  '/articles',
  '/donations',
  '/contact',
  '/privacy-policy',
  '/terms-of-use',
  '/copyright-policy',
  '/learn/clans',
  '/learn/mimang',
]
const urls = [
  ...staticRoutes.map((path) => ({ loc: `${SITE_URL}${path}` })),
  ...articlesData.map((article) => ({
    loc: `${SITE_URL}/article/${article.slug}`,
    lastmod: article.date,
  })),
  ...booksData.map((book) => ({
    loc: `${SITE_URL}/book/${book.code}`,
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync('public/sitemap.xml', xml)
console.log(`sitemap.xml generated with ${urls.length} URLs`)