# Mising Archives

A free, community-led digital archive that preserves and shares knowledge about the **Mising people** of Assam and Arunachal Pradesh: their history, language, culture and craft.

**Live site:** https://www.misingarchives.co.in
**Founded:** 30 June 2026 · **License (original writing):** CC BY-SA 4.0

---

## What's inside

| Section | What it does |
|---|---|
| **Digital Book Library** | Searchable, sortable, filterable collection of Mising books (public domain, partner archives, or with author permission), with per-book view and download counts |
| **Community Writings** | Articles, essays, poetry and peer-style research papers with table of contents, abstract, keywords, PDF download and an APA citation box |
| **Learn → Clans** | 45 Mising clan names (Opín Amin) with standard spelling, legal respellings, IPA and pronunciation audio |
| **Learn → Mising Motifs** | Weaving patterns (*mimang / gamig*) with a pattern ↔ cloth-example toggle and full-resolution lightbox |
| **Learn → Mising Terms** | Everyday Mising words with English meanings and pictures, searchable in both languages |
| **Shop** | A directory of handmade goods from Mising artisans. Buyers contact the maker directly via WhatsApp, email or Instagram. No payments are handled on the site |
| **Artisan Portal** | Username/password login where artisans manage their own profile and products, with crop-and-upload photos |
| **Admin Dashboard** (`/manage`) | Staff tools to manage motifs, artisans (create logins, reset passwords, suspend) and Mising terms |
| **Donations** | Razorpay donate button plus a fully public log of donations and expenses |
| **Site Stats** | Anonymous visitor, view and download counters, with no personal data collected |

---

## Tech stack

**Frontend**
- React 18, React Router 6 (client-side routing, `BrowserRouter`)
- Vite 4 (dev server and build)
- Inline CSS-in-JS driven by a shared `ThemeContext` (light/dark tokens), plus a small `App.css` for media queries and article typography
- `lucide-react` icons, `react-easy-crop` for the image cropper

**Backend (serverless, no custom server)**
- **Supabase**: Postgres with Row Level Security, email/password Auth, RPC functions for analytics, and an Edge Function (`manage-artisan`) for privileged artisan account management
- **Cloudinary**: image hosting, direct unsigned browser uploads, on-the-fly resizing/format transforms
- **Web3Forms**: contact form delivery
- **Razorpay**: donation payment button

**Hosting, SEO and tooling**
- **Vercel**: hosting, SPA rewrites, and **Edge Middleware** (`middleware.js`) that injects per-page meta tags, Open Graph data and JSON-LD, and serves full readable HTML to search and AI crawlers
- Build-time scripts generate `sitemap.xml` and `llms.txt` from the same data that drives the site
- `sharp` for thumbnail generation
- Legacy: Sveltia CMS at `/admin` (GitHub backend), kept for the original motif content

---

## Architecture notes

- **Data in code, data in the database.** Books, articles, clans and donations live in plain JS files (`src/data/`), so contributing content is a one-file edit and a pull request. Dynamic, user-managed content (motifs, shop, terms, stats, auth) lives in Supabase.
- **Graceful degradation.** `useMimang` renders bundled JSON instantly, then swaps in live Supabase data. If Supabase is paused or unreachable, the page still works. The `supabase` client is `null` when env vars are missing, so the public site never crashes because of admin setup.
- **Security model.** The Supabase anon key and Cloudinary preset are safe to ship in the browser; protection comes from Row Level Security. Staff access is gated by a `profiles.role` check (`admin` / `editor`), and artisans are scoped to their own rows. Privileged operations (create user, reset password, delete) go through an Edge Function.
- **Artisan login without email.** Usernames are mapped to a synthetic email (`username@artisan.misingarchives.co.in`) so artisans can sign in with a simple username. Nothing is ever sent to that address.
- **Bot-friendly SEO for an SPA.** Middleware detects crawler user-agents (search and AI bots) and injects article/book content and structured data into the HTML. Real users get the normal React app.
- **Privacy-respecting analytics.** Visitor counting stores only anonymous flags in the browser (session, month, first-visit). No IDs, IPs or personal data are sent. Admin and artisan pages are excluded.
- **Performance.** Cloudinary transforms (`w_500,q_auto,f_auto`), lazy-loaded images with shimmer skeletons, the other motif image preloaded in the background, and a 60-second shared cache for stats queries.

---

## Project structure

```
├── index.html                  # Shell + site-wide Organization JSON-LD
├── middleware.js               # Vercel Edge Middleware (meta tags, bot content)
├── vercel.json                 # SPA rewrites
├── vite.config.js
├── scripts/
│   ├── generate-sitemap.js     # → public/sitemap.xml  (runs on prebuild)
│   ├── generate-llms.js        # → public/llms.txt     (runs on prebuild)
│   └── generate-thumbnails.js  # sharp thumbnails for motifs
├── content/mimang/*.json       # Legacy motif data (Sveltia CMS)
├── public/
│   ├── admin/                  # Sveltia CMS entry + config
│   ├── images/  audio/  papers/
│   └── robots.txt  sitemap.xml  llms.txt
└── src/
    ├── App.jsx  main.jsx
    ├── context/                # ThemeContext, AuthContext
    ├── lib/                    # supabase client, stats, siteStats, artisanAuth
    ├── hooks/                  # usePageTitle, useMimang, useScrollReveal, useNoIndex
    ├── utils/                  # cardStyle, formStyles, formatDate, cloudinaryUrl/Upload, cropImage, shop
    ├── components/             # Header, Footer, cards, modals, LazyImage, AudioButton, ...
    │   ├── admin/              # ImageUploadField, CropModal
    │   └── shop/               # ProductCard, ContactButtons
    ├── data/                   # books.js, articles.js, donations.js, learn/, articleContent/
    ├── pages/
    │   ├── Home, About, Articles, ArticleDetail, DigitalBookLibrary, BookDetail,
    │   │   Donations, Contact, PrivacyPolicy, TermsOfUse, CopyrightPolicy
    │   ├── learn/              # Clans, MisingMotifs, MisingTerms
    │   ├── shop/               # Shop, ShopArtisan, ShopProduct
    │   ├── artisan/            # ArtisanLogin, ArtisanHome, ArtisanProfile, ArtisanProducts
    │   └── admin/              # AdminLogin, AdminHome, MimangAdmin, ArtisansAdmin, TermsAdmin
    └── styles/App.css
```

### Routes

| Public | Protected |
|---|---|
| `/` `/about` `/digital-book-library` `/book/:code` | `/manage`, `/manage/mimang`, `/manage/artisans`, `/manage/terms` (staff) |
| `/articles` `/article/:slug` | `/artisan`, `/artisan/profile`, `/artisan/products` (artisans) |
| `/learn/clans` `/learn/mising-motifs` `/learn/mising-terms` | Login pages: `/manage/login`, `/artisan/login` |
| `/shop` `/shop/artisan/:slug` `/shop/product/:id` | |
| `/donations` `/contact` `/privacy-policy` `/terms-of-use` `/copyright-policy` | |

---

## Getting started

**Requirements:** Node.js 22+ (required by the current `@supabase/supabase-js`) and npm.

```bash
git clone https://github.com/abhinabpegu/misingarchives.git
cd misingarchives
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (admin/artisan uploads) |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary **unsigned** upload preset |
| `VITE_SITE_TITLE`, `VITE_SITE_DESCRIPTION` | Optional site metadata |

The public site (books, articles, clans) runs without Supabase or Cloudinary. Only the shop, terms, stats, motifs live data and the admin/artisan tools need them.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Generate sitemap and `llms.txt` (prebuild), then build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run thumbnails` | Generate motif thumbnails with `sharp` |

### Backend setup (Supabase)

You need these tables, with Row Level Security enabled and policies matching the roles above:
`profiles`, `mimang`, `artisans`, `artisan_accounts`, `shop_categories`, `shop_products`, `mising_terms`, `content_stats`

And these RPC functions: `track_event`, `track_site`, `get_site_stats`.

Deploy the `manage-artisan` Edge Function (create / reset_password / delete). Its `EMAIL_DOMAIN` must match `ARTISAN_EMAIL_DOMAIN` in `src/lib/artisanAuth.js`.

---

## Contributing content

### Add a book
Edit `src/data/books.js`:

```js
{
  code: '0015',
  title: 'Book Title',
  author: 'Author Name',
  language: 'English',            // English | Mising | Assamese | Multilingual
  tags: ['Culture', 'History'],
  driveLink: 'https://drive.google.com/file/d/FILE_ID/view',
  archivedBy: 'Source or Organization',
  coverImage: 'https://res.cloudinary.com/.../book0015.png',
}
```

### Add an article
Add an object to `articlesData` in `src/data/articles.js`. The `content` field is raw HTML and is styled automatically by `.article-body`. Set `type: 'research'` (with `abstract`, `keywords`, `authors`, `pdfUrl`) for a research-style page. Long articles can live in `src/data/articleContent/` and be imported.

```js
{
  slug: 'your-article-slug',
  title: 'Your Article Title',
  category: 'Culture',
  excerpt: 'One or two sentences for cards.',
  author: 'Your Name',
  date: '2026-11-01',             // YYYY-MM-DD, used for sorting
  coverImage: null,
  featured: false,
  content: `<p>Write here as HTML.</p>`,
}
```

### Add a clan, motif, term, product
- **Clans:** add a line to `src/data/learn/clans.js` (name, legal spellings, IPA, audio path)
- **Motifs, terms, artisans, products:** use the admin dashboard (`/manage`) or the artisan portal. No code change needed.

Sitemap, `llms.txt` and social/SEO metadata update automatically on the next build.

---

## Licensing and copyright

- **Original articles, writing and site text:** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Library books:** each carries its own status (public domain, partner-archive terms, or direct permission from the rights holder). They are **not** CC-licensed.
- **Shop content:** remains the property of each artisan.
- **Takedown requests:** contact@misingarchives.co.in. See `/copyright-policy`.

## Funding

Community-funded and non-commercial, run by core members of [Takam Mising Sisang Kebang (TMSK)](https://sisangkebang.in) with a shared treasury. Every donation and expense is public at `/donations`.

## Acknowledgments

- **Archivists** who digitised and preserved these works
- **Sources:** [Internet Archive](https://archive.org), [Pahar.in](https://pahar.in), [Public.Resource.Org](https://public.resource.org)
- **Community:** built for and by the Mising community

## Contact

contact@misingarchives.co.in · [@misingarchives](https://instagram.com/misingarchives)

> Knowledge should be free. Culture should be accessible. History should be preserved.
