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
    excerpt: 'Who the Mising are, where their name comes from, and how centuries of migration, Ahom-era history, and festival traditions shaped the community as it stands today.',
    author: 'Contributors of English Wikipedia',
    date: '2026-06-30',
    coverImage: null,
    featured: true,
    sourceUrl: 'https://en.wikipedia.org/wiki/Mising_people',
    sourceLabel: 'Adapted from the Wikipedia article "Mising people" (CC BY-SA 4.0)',
    content: `
<p>The <strong>Mising</strong> (also written Mishing, and historically recorded as <strong>Miri</strong>) are a Tibeto-Burman-speaking community native to the Brahmaputra Valley, numbering well over half a million people across Assam and Arunachal Pradesh. They are the second-largest tribal community in Assam after the Bodo, and their language belongs to the Tani branch of the Tibeto-Burman family — the same linguistic family shared by the Adi, Apatani, Galo, and several other communities of the eastern Himalayan foothills.</p>

<h2>A Name Rooted in the Land</h2>
<p>"Mising" is the community's own name for itself, generally understood to mean something close to "people of the soil." "Miri," by contrast, was an outside name once used by Assamese speakers, and remains the term recorded in India's official Scheduled Tribes list even though the community itself prefers Mising. Scholars still debate exactly how the name Miri came about; one long-standing theory ties it to religious functionaries among the Tani hill peoples, whose reputation eventually attached itself to anyone descending from the same hills.</p>

<h2>From the Hills to the Brahmaputra Plains</h2>
<p>Mising oral tradition and early colonial-era records point to origins in the hills of present-day Arunachal Pradesh, with a gradual migration down into the plains beginning somewhere around the 13th or 14th century. Because the Mising were an oral society until the early twentieth century, much of this history survives not in documents but in folk songs and stories passed down through generations. What written evidence exists comes mostly from outside observers — Assamese literature from the Vaishnavite era, the Ahom court chronicles known as Buranjis, and British accounts beginning in the 1800s.</p>
<p>Relations with the Ahom kingdom shifted between conflict and cooperation. Mising communities near Sadiya rebelled against Ahom authority more than once during the seventeenth century, but were eventually folded into the kingdom's administration and army, and some Mising families were elevated to noble status at the Ahom court. By the time the British annexed Upper Assam in the late 1830s, Mising settlements were already well established along the northern bank of the Brahmaputra.</p>

<h2>Language and Education</h2>
<p>For most of their history, the Mising had no written script of their own. That changed with the arrival of Christian missionaries in the late nineteenth century, who began recording the Mising language in the Roman alphabet — a choice the community formally settled on, after years of debate, over the Assamese script during the 1970s and 80s. Many Mising speakers today are bilingual in Mising and Assamese, moving between the two depending on context.</p>

<h2>Belief and Festivals</h2>
<p>Most Mising are Hindu, with a strong historical influence from the Vaishnavite movement associated with the saint Sankardev, though the community has retained many of its own customary practices rather than fully adopting caste Hindu traditions. A revival movement called Donyi-Polo, centered on reverence for the sun and moon, has also gained followers, particularly in Arunachal Pradesh, alongside a smaller Christian population.</p>
<p>The Mising calendar turns on two major agricultural festivals. Ali-Aye-Ligang, held over five days starting the first Wednesday of February, marks the beginning of the sowing season with ceremonial planting, music, and nightly dancing from house to house. Po:rag, by contrast, is a harvest festival, traditionally celebrated once the rice crop is in. Both are marked by distinctive music and dance — Gumrag, performed in circles to drums and cymbals, is among the best known — and by communal feasting that turns a farming calendar into a shared cultural identity.</p>

<h2>A Riverine Life</h2>
<p>Agriculture and animal husbandry remain the backbone of the Mising economy, and weaving is a near-universal household skill among Mising women, producing the distinctive striped ege, ri:bi, and gaseng garments still worn today. But the Mising are also, by geography, a riverine people: many villages sit close to the Brahmaputra and its tributaries, which makes seasonal flooding and erosion a constant pressure on farmland and settlement. Since 1995, the community has had a degree of political self-governance through the Mising Autonomous Council, even as migration to towns and cities for work has become increasingly common among younger generations.</p>
    `,
  },
  {
    slug: 'welcome-to-the-articles-section',
    title: 'Welcome to the Articles Section',
    category: 'General',
    excerpt: 'A short note on what this part of the archive holds, and how it works.',
    author: 'Mising Archives',
    date: '2026-06-29',
    coverImage: null,
    featured: false,
    content: `
<p>Alongside the Digital Book Library, this corner of the archive holds shorter, standalone articles — notes on language, culture, history, and tradition that don't need a full book to tell.</p>
<p>Some articles here will be original writing from community members. Others, like the overview of the Mising people linked from this page, are adapted from open, freely reusable sources such as Wikipedia, with the source credited at the bottom of the page.</p>
<p>If you'd like to contribute an article, it can be about anything connected to Mising culture, tradition, history, or language — long or short, formal or personal.</p>
    `,
  },
]
