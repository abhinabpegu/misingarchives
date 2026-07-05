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
    slug: 'The-Mising-Tribe-Between-Assimilation-and-Preservation',
    title: 'The Mising Tribe: Between Assimilation and Preservation',
    category: 'Culture',
    excerpt: 'The Mising tribe, one of the prominent indigenous groups of Northeast India and part of the broader Tani cultural family, possesses a rich cultural heritage shaped by language, traditions, and close ties to nature.',
    author: 'Sumyo Doley',
    date: '2026-07-05',
    coverImage: '/images/articles/sumyodoley-05july26.png',
    featured: true,
    sourceUrl: null,
    sourceLabel: null,
    content: `
    <p>
The Mising tribe, one of the prominent indigenous groups of Northeast India and part of the broader Tani cultural family, possesses a rich cultural heritage shaped by language, traditions, and close ties to nature. In recent decades, like many indigenous societies, the Misings have experienced significant cultural transformation due to increased interaction with surrounding communities, education systems, and urban lifestyles.
</p>

<p>
One visible aspect of this change is in traditional attire and cultural adoption. Alongside traditional Mising clothing, many in the community have also embraced the <em>mekhela sador</em> or <em>ege-gasor</em>, a widely worn Assamese traditional dress, especially in formal and social settings. This reflects the blending of cultural identities that has taken place over time through everyday interaction and shared regional life.
</p>

<p>
Language and terminology have also evolved in some contexts. Certain traditional terms, such as <em>Rutum Ui/Uyu</em>, have in some cases been replaced or reinterpreted in modern usage, with terms like <em>Dangoriya Hokam</em> becoming more common in specific cultural or organizational settings. Such shifts often reflect broader changes in how traditions are expressed in contemporary environments.
</p>

<p>
Religious and ritual practices have also seen adaptation. Some members of the Mising community now participate in or observe rituals influenced by Assamese traditions, including practices such as <em>Satjonia Puja</em>. These developments highlight the ongoing cultural exchange between communities living in close geographical and social proximity.
</p>

<p>
At the same time, this process raises important questions about cultural continuity. While assimilation and cultural blending can foster unity and shared identity within a region, they can also lead to concerns about the gradual weakening of distinct indigenous traditions, language usage, and ancestral practices.
</p>

<p>
In this context, many feel that strengthening connections with related Tani groups—such as the Adi, Galo, and others in Arunachal Pradesh—can play a meaningful role in cultural preservation. Shared ancestry and similarities in traditional practices provide a foundation for cultural exchange that reinforces indigenous identity while still allowing engagement with broader society.
</p>

<p>
Ultimately, the future of the Mising identity lies in balance: preserving language, traditions, and cultural memory while navigating a changing social landscape shaped by interaction, adaptation, and modern influences.
</p>

    `,
  },
  {
    slug: 'About-Mising-Archives',
    title: 'About Mising Archives',
    category: 'General',
    excerpt: 'A brief introduction to Mising Archives, its purpose, and how to contribute.',
    author: 'Abhinab Pegu',
    date: '2026-07-03',
    coverImage: '/images/articles/welcome.jpg',
    featured: true,
    content: `
<p> This project is an independent archival initiative led by the Mising tribal community to preserve and promote its heritage through a freely accessible digital platform.
 </p> <p> The idea originally developed from a book archival initiative.
  I have been an active editor on the English Wikipedia, where I have primarily
   focused on creating and improving articles about the Mising community.
    However, I soon realised that we lacked resources that were easily accessible.
     Without access to reliable sources, it is nearly impossible to improve well established 
     encyclopaedias such as the English Wikipedia.
      My original goal was therefore to create a digital repository 
      for valuable books and other resources relating to the Mising community. </p>
 <p> 
 However, many important books had yet to be digitised, 
 and there was no organised process for carrying this work forward. 
 I believed that creating a proper website for
 the repository would provide a suitable place to 
 keep these resources and make them easier to discover. 
 Whenever possible, the digitised books would first be uploaded
  to the Internet Archive (But only after obtaining permission 
  from the relevant copyright holders) </p> 
  <p> 
  Later, The idea was discussed with Hemchandra Mili, currently an Assistant Professor in a college in Assam,
   who expressed his support for the initiative. I began developing the project's infrastructure, that was mainly 
  the website that would serve as the platform for the archive.

I decided to keep the entire codebase open source. It is publicly available on GitHub at 
      <a href="https://github.com/abhinabpegu/misingarchives" target="_blank" rel="noopener noreferrer"> github.com/abhinabpegu/misingarchives </a>.
       </p> <p> On  30 June 2026, 
       the initial version of the website was deployed,
       <i> technically </i> marking the beginning of Mising Archives.
         On 2 July 2026, 
        I registered the misingarchives.co.in domain,
          which serves as the project's official website.
           </p> <h2>Website Sections</h2> <h3>The Digital Book Library</h3> <p> A collection of books for which we have obtained the necessary copyright permissions to make them publicly available, with books digitised and archived by Mising Archives and other publicly available sources. </p> <h3>The Articles Section</h3> <p> A space dedicated to articles related to Mising culture, traditions, history, language, and other relevant topics. Submissions may include research articles, essays, or opinion pieces. Anyone may submit a draft for consideration. All submissions undergo a review process before publication. </p> <p> At present, all original articles published on the website are licensed under the <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer"> Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) </a> licence. </p> </article>
    `,
  },
]
