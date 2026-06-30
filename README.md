#  Mising Archives

> **Preserving Knowledge. Sharing Culture. Community-Led.**

A beautiful, open-source web platform dedicated to archiving and making freely accessible books about Mising culture, tradition, history, and language. Built by the community, for the community.


![License](https://img.shields.io/badge/license-Open%20Source-brightgreen)
![Built with React](https://img.shields.io/badge/built%20with-React-61dafb)

---

----

##  Live Website

 **Visit:** [mising-archives.vercel.app](https://mising-archives.vercel.app)

The site now has three parts:
- **Home** (`/`) — an introduction to the archive, browse-by-category shortcuts, featured content, and the project's mission.
- **Digital Book Library** (`/#/digital-book-library`) — the full searchable, filterable book collection (this was the whole site before).
- **Articles** (`/#/articles`) — shorter standalone reads on Mising language, culture, history, and tradition.

---

## 📚 Current Collection

**12 Books** spanning:
- Mising Grammar & Linguistics
- History & Culture
- Folk Literature & Traditions
- Biographies & Essays

All books are **freely downloadable** and include information about who archived/digitized each one.

---

##  Project Structure

```
src/
├── App.jsx                      # Routing shell (Home, Digital Book Library, Articles)
├── main.jsx                     # React entry point (wraps App in HashRouter)
├── context/
│   └── ThemeContext.jsx         # Shared dark/light mode + color tokens
├── components/
│   ├── Header.jsx                # Site nav: Home, Library, Articles, dark mode toggle
│   ├── Footer.jsx                 # Site footer: links + acknowledgments
│   ├── BookDetailModal.jsx       # Book detail popup (cover, tags, download link)
│   └── ArticleCard.jsx            # Reusable article card (used on Home + Articles)
├── pages/
│   ├── Home.jsx                  # Landing page: hero, stats, categories, articles, mission
│   ├── DigitalBookLibrary.jsx     # Searchable/sortable book table & cards (the old homepage)
│   ├── Articles.jsx               # Article listing, filterable by category
│   └── ArticleDetail.jsx          # Single article page — renders HTML from articles.js
├── data/
│   ├── books.js                  # Book collection (edit to add books)
│   └── articles.js                # Article collection (edit to add articles — see below)
├── utils/
│   ├── cardStyle.js               # Shared hover-card style used across pages
│   └── formatDate.js              # 'YYYY-MM-DD' → 'Month D, YYYY'
└── styles/
    └── App.css                  # Responsive + shared styles, incl. .article-body typography

public/
└── images/                      # Book cover images (add here)
    └── articles/                 # Article cover images (add here)

.github/
└── workflows/
    └── deploy.yml                # GitHub Actions auto-deployment
```

Routing uses `react-router-dom` with a `HashRouter`, so subpages (e.g. `/#/digital-book-library`) work on any static host — including GitHub Pages — without extra server configuration. If you deploy exclusively to a host that handles SPA rewrites for you (like Vercel), you can switch to `BrowserRouter` in `src/main.jsx` for cleaner URLs.

---

##  Adding Books

Edit `src/data/books.js` and follow this format:

```javascript
{
  code: '0013',
  title: 'Book Title Here',
  author: 'Author Name',
  language: 'English',  // English, Mising, Assamese
  tags: ['Culture', 'History', 'Language'],
  driveLink: 'https://drive.google.com/file/d/FILE_ID/view',
  archivedBy: 'Your Name or Organization',
  coverImage: null,  // Add '/images/book-0013.jpg' when you have images
}
```

The website automatically updates! No need to restart anything. The homepage's "Browse by Category" cards and "Recently Archived" section also update automatically — they're computed from this same file.

---

##  Adding Articles

Open `src/data/articles.js` and add an object to the `articlesData` array:

```javascript
{
  slug: 'your-article-slug',           // becomes the URL: /article/your-article-slug
  title: 'Your Article Title',
  category: 'Culture',                  // General, History, Culture, Language, Folklore — or your own
  excerpt: 'One or two sentences shown on article cards.',
  author: 'Your Name',
  date: '2026-07-01',                   // YYYY-MM-DD — controls "latest" sorting
  coverImage: null,                     // or '/images/articles/your-file.jpg'
  featured: false,                      // true puts it in the larger homepage slot (keep this on just one article)
  content: `
    <p>Write your article here as HTML.</p>
    <h2>A Section Heading</h2>
    <p>You can paste in HTML you already have — exported from Word or
    Google Docs, copied from somewhere else, or hand-written — and it will
    be styled to match the site automatically (see <code>.article-body</code>
    in <code>src/styles/App.css</code> if you want to change how headings,
    links, quotes, or images look).</p>
  `,
}
```

That's the whole process — no other file needs to change. The article immediately appears on the **Articles** page, becomes filterable by its `category`, and (if `featured: true`, or if it's the most recent article) shows up in the homepage's "From the Articles" section.

A couple of notes:
- Since `content` is rendered directly as HTML, only paste in markup you trust (i.e. your own writing, or content you're choosing to include) — this isn't a public submission form, it's part of the source code.
- For articles adapted from another source, add `sourceUrl` and `sourceLabel` fields (see the `mising-people` example already in the file) — they'll show as a small credit box at the bottom of the article page.
- To add a cover image, drop the file in `public/images/articles/` and point `coverImage` at it, the same way book covers work (see below).

---

##  Adding Book Cover Images

1. **Save images** in `public/images/` folder
2. **Name them** like: `book-0001.jpg`, `book-0002.jpg`, etc.
3. **Update** the `coverImage` field in `src/data/books.js`:
   ```javascript
   coverImage: '/images/book-0013.jpg'
   ```
4. **Update the display** component in `src/components/BookDetailModal.jsx` to use actual images instead of placeholders

See `IMAGE_GUIDE.md` in the docs folder for detailed instructions.

---


##  Customization

### Change Colors
Edit `src/context/ThemeContext.jsx`:
```javascript
export const themeColors = {
  light: {
    accentPrimary: '#C17A6B',  // Change this
    // ... other colors
  }
}
```
Both `Home.jsx` and `DigitalBookLibrary.jsx` read from this shared theme, so a color change here updates the whole site.

### Change Site Text
- Homepage copy (hero, mission, category descriptions) lives in `src/pages/Home.jsx`.
- Library page copy lives in `src/pages/DigitalBookLibrary.jsx`.
- Nav links and footer links live in `src/components/Header.jsx` and `src/components/Footer.jsx`.

### Article Typography
How pasted HTML renders inside an article (heading sizes, link color, quote styling, image rounding, etc.) is controlled by the `.article-body` rules in `src/styles/App.css`. Edit those rules to change the look of every article at once.

### Modify Layout
All styling is inline CSS-in-JS inside each component, with a small `src/styles/App.css` for responsive rules that need real media queries (mobile nav, table-vs-cards, grid columns).

---


##  Acknowledgments

- **Archivists:** Thank you to everyone who has digitized and preserved these valuable resources
- **Sources:** [Internet Archive](https://archive.org), [Pahar.in](https://pahar.in), [Public.Resource.Org](https://public.resource.org)
- **Community:** Built for and by the Mising community

---

##  Vision

**Mising Archives** exists to:
1. **Preserve** cultural knowledge and heritage
2. **Share** freely without barriers or paywalls
3. **Empower** community members and researchers
4. **Document** the richness of Mising culture for future generations

> Knowledge should be free. Culture should be accessible. History should be preserved.

---


**Made with ❤️ for the Mising community**
