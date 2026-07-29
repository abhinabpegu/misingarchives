// Generates public/llms.txt — a plain-text index for AI systems and LLM
// crawlers, per the llms.txt convention (https://llmstxt.org). Rebuilt on
// every build from the same data that drives the sitemap, so adding a book
// or article shows up here automatically.

import { writeFileSync } from 'fs'
import { articlesData } from '../src/data/articles.js'
import { booksData } from '../src/data/books.js'

const SITE_URL = 'https://www.misingarchives.co.in'
const sortedArticles = [...articlesData].sort((a, b) => b.date.localeCompare(a.date))

const lines = []
lines.push('# Mising Archives')
lines.push('')
lines.push('> Mising Archives is an independent, community-led initiative to preserve and share knowledge about the Mising Tribe — free digitised books, community-written articles, and language reference material.')
lines.push('')
lines.push('Mising Archives is community-funded and non-commercial. Original articles and writing are licensed CC BY-SA 4.0. Books in the library each carry their own copyright status (public domain, partner-archive terms, or direct rights-holder permission) — see /copyright-policy for details.')
lines.push('')
lines.push('## Digital Book Library')
lines.push(`${SITE_URL}/digital-book-library — full collection, searchable and sortable`)
booksData.forEach((b) => {
  lines.push(`- [${b.title}](${SITE_URL}/book/${b.code}): by ${b.author}. ${b.language}. ${b.tags.join(', ')}.`)
})
lines.push('')
lines.push('## Community Writings')
lines.push(`${SITE_URL}/articles — full collection, filterable by category`)
sortedArticles.forEach((a) => {
  lines.push(`- [${a.title}](${SITE_URL}/article/${a.slug}): ${a.excerpt}`)
})
lines.push('')
lines.push('## Learn')
lines.push(`- [Mising Opín Amin — Clan names](${SITE_URL}/learn/clans): standard spellings, legal respellings, IPA, and pronunciation audio for 45 Mising clans.`)
lines.push('')
lines.push('## About & Policies')
lines.push(`- [About Mising Archives](${SITE_URL}/article/About-Mising-Archives)`)
lines.push(`- [Donations & transparency](${SITE_URL}/donations)`)
lines.push(`- [Contact](${SITE_URL}/contact)`)
lines.push(`- [Copyright Policy](${SITE_URL}/copyright-policy)`)
lines.push(`- [Terms of Use](${SITE_URL}/terms-of-use)`)
lines.push(`- [Privacy Policy](${SITE_URL}/privacy-policy)`)
lines.push('')

writeFileSync('public/llms.txt', lines.join('\n'))
console.log(`llms.txt generated with ${booksData.length} books and ${articlesData.length} articles`)