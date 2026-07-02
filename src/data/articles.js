// Articles for Mising Archives.
//
// HOW THIS WORKS
// Add one object to the array below to publish a new article. Every place
// articles show up on the site — this list, the homepage's "From the
// Articles" section, and the article's own page — all read from this one
// file, the same way src/data/books.js drives the book library.
//
// `content` is raw HTML, written as a JS template literal. That means you
// can write plain <p> paragraphs by hand, or paste in HTML you already have
// (exported from Word/Google Docs, copied from a CMS, hand-marked-up notes,
// etc.) and it will render styled to match the site — see the `.article-body`
// rules in src/styles/App.css if you want to adjust how headings, links,
// images, quotes, lists, etc. look.
//
// Because this file is part of the source code (not a public submission
// form), pasting HTML here is safe — it's the same trust model as writing
// HTML in any static site. Only people who can edit this repo can add
// content this way.
//
// FIELD REFERENCE
// slug         url-safe id, becomes the page at /article/<slug>
// title        article title
// category     'General' | 'History' | 'Culture' | 'Language' | 'Folklore'
//              (or add your own — categories on the Articles page are
//              generated automatically from whatever shows up here)
// excerpt      1-2 sentences shown on article cards
// author       who wrote it (a person, or a credit like a source name)
// date         'YYYY-MM-DD', used to sort "latest"
// coverImage   '/images/articles/your-file.jpg', or null for no image
//              (drop the file in public/images/articles/ first)
// featured     true puts it in the homepage's larger "featured" slot —
//              keep this true on at most one article at a time
// sourceUrl    optional — link credited at the bottom of the article page,
//              for pieces adapted from an outside source
// sourceLabel  optional — text shown next to sourceUrl, e.g. how it's licensed
// content      the article body, as HTML

export const articlesData = [
  {
    slug: 'mising-people',
    title: 'The Mising People: An Overview',
    category: 'Culture',
    excerpt: 'The Mising people or Miri people are a Tibeto-Burman ethnic group living mostly in the Northeast Indian states of Assam and Arunachal Pradesh.',
    author: 'Contributors of English Wikipedia',
    date: '2026-06-30',
    coverImage: '/images/articles/misingpeople.png',
    featured: true,
    sourceUrl: 'https://en.wikipedia.org/wiki/Mising_people',
    sourceLabel: 'An excerpt from the Wikipedia article "Mising people" (CC BY-SA 4.0)',
    content: `
<p>The Mising people or Miri people (/ˈmiːsɪŋ/ or /ˈmɪsɪŋ/) are
 a Tibeto-Burman ethnic group living mostly in the Northeast Indian
  states of Assam and Arunachal Pradesh. Their Mising language is a part
   of the Tani languages and the Tibeto-Burman language group. The Misings
    are a major ethnic group of Assam, the second largest tribe after the Bodos.
     15.4% of Assam's tribal population speaks Mising, but many more speak Assamese
      (24.7%) and Mising organisations estimate that the unofficial Mising population
       is 1.2 million rather than the 587,310 declared by the 2001 census of India</p>

<h2>Ethymology</h2>
<p>The Misings are officially listed as
 Miri in the Constitution of India's order
  of Scheduled Tribes, but they prefer to known as Mising.
   Mising is an endonym and demonym which literally means 
   'man of the soil'. Miri, on the other hand, is an
    exonym once applied by the Assamese.
     There is still much scholarly debate
      on the origin of Miri as an ethnonym.
 The Misings also use the endonym Tani, 'man', for identifying themselves</p>

<h2>Language</h2>
<p>Educated Misings are bilingual in Assamese and Mising,
 but some speak only Assamese and a minority speak only Mising.
  The Misings practice code switching, depending on the degree of their 
  interactions with the non-tribal Assamese, the dominant community in the
   Brahmaputra Valley.</p>

<h2>Religion</h2>
<p>The neo-Vaishnavite cult of Sankardev had a significant 

influence on the Mising people, and stimulated a process of Sanskritisation.
 There are many neo-Vaishnavite monasteries, or xatras, in the Mising populated 
 areas of Assam. However, the Misings later perceived
  that the xatras had become instruments perpetuating the
   interest of non-tribal Assamese speaking elites, which led
    to the weakening of neo-Vaishnavism by the 1970s.
     Although the Misings are reckoned amongst the Hinduized
      peoples, they have retained many of their customary practices.
       This is in contrast to other Hinduized tribal groups in Assam,
        which have relinquished many of their traditional customs and
         embraced the Assamese caste Hindu system. A new identity-centric cultural movement called Donyi-Polo has gained
          some following among the Mising people,
           with a point of origin in Arunachal Pradesh, where it has a wider following.
            Christianity has been embraced by some of the Mising population,
             which has led to some sectarian tensions.</p>
    `,
  },
  {
    slug: 'welcome-to-the-articles-section',
    title: 'Welcome to the Articles Section',
    category: 'General',
    excerpt: 'A short note on what this part of the archive holds, and how it works.',
    author: 'Mising Archives',
    date: '2026-06-29',
    coverImage: '/images/articles/welcome.jpg',
    featured: false,
    content: `
<p>
  Every story, memory, and perspective helps preserve our heritage.
  We welcome articles on any aspect of Mising life, our culture, traditions,
  language, history, folklore, customs, and the experiences of our people today.
  Whether you are writing a researched article, sharing a personal reflection,
  or expressing an opinion, your contribution is valuable. <b> Accepted languages include Mising and English. </b>
</p>

<p>
  To submit an article, please send it in a suitable document format
  (DOCX, ODT, or PDF) together with your name and contact details to
  <a href="mailto:contact@misingarchives.co.in">contact@misingarchives.co.in</a>.

</p>
    `,
  },
]
