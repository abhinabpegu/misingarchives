// Generates public/sitemap.xml from the site's static routes plus every
// article slug in src/data/articles.js. Runs automatically before each
// build via the "prebuild" script below — add an article, get a sitemap
// entry, no manual step required.

import { writeFileSync } from 'fs'
import { articlesData } from '../src/data/articles.js'

const SITE_URL = 'https://www.misingarchives.co.in'

// Keep this list in sync with the routes in src/App.jsx / middleware.js.
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
]

const urls = [
  ...staticRoutes.map((path) => ({ loc: `${SITE_URL}${path}` })),
  ...articlesData.map((article) => ({
    loc: `${SITE_URL}/article/${article.slug}`,
    lastmod: article.date,
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