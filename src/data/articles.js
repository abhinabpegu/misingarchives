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
    slug: 'A-Brief-Introduction-to-the-Mising-Community',
    title: 'A Brief Introduction to the Mising Community',
    category: 'Community',
    excerpt: 'The Mising community is one of the largest indigenous tribal communities of Assam. Today, Misings mainly live in the districts of Lakhimpur, Dhemaji, Dibrugarh,Sivasagar, Jorhat, Golaghat, Sonitpur, and Tinsukia, though they are also found in other parts of Assam',
    author: 'Nepoleon Pegu',
    date: '2026-07-06',
    coverImage: '/images/articles/misingpeople.png',
    coverFit: 'cover',
    featured: true,
    sourceUrl: null,
    sourceLabel: null,
    content: `

  <h1>A Brief Introduction to the Mising Community</h1>

  <h2>Preface</h2>
  <p>
    The Mising community is one of the largest indigenous tribal communities of Assam.
  </p>

  <h2>Origin and History</h2>
  <p>
    The Misings are believed to have migrated from the hilly regions of present-day
    Arunachal Pradesh and Tibet. Earlier, they were known as <strong>"Miri."</strong>
    Over time, they gradually came down to the plains of Assam and settled permanently.
  </p>

  <p>
    Many historians believe that the Misings belong to the Tibeto-Burman (Tani)
    ethnic group. Historical records indicate that they entered Assam centuries ago
    and eventually established themselves along the banks of the Brahmaputra River.
  </p>

  <p>
    Today, Misings mainly live in the districts of Lakhimpur, Dhemaji, Dibrugarh,
    Sivasagar, Jorhat, Golaghat, Sonitpur, and Tinsukia, though they are also found
    in other parts of Assam.
  </p>

  <p>
    Their traditional occupation has been agriculture, along with fishing and weaving.
  </p>

  <h2>Society and Culture</h2>

  <p>
    The Mising people have a rich cultural heritage.
  </p>

  <ul>
    <li>
      Their traditional language is <strong>Mising</strong>, which belongs to the
      Tibeto-Burman language family.
    </li>
    <li>
      Most families traditionally live in <strong>Chang Ghar</strong> (stilt houses),
      which protect them from floods.
    </li>
    <li>
      Their society is organized into several clans and follows traditional village
      administration.
    </li>
    <li>
      Village affairs are managed collectively by elders.
    </li>
  </ul>

  <p>
    Traditional music, dance, and festivals are important parts of Mising culture.
  </p>

  <p><strong>Major festivals include:</strong></p>

  <ul>
    <li><strong>Ali-Aye-Ligang</strong> – celebrated before sowing crops.</li>
    <li><strong>Po:rag</strong> – a harvest festival.</li>
    <li>Other traditional religious and cultural ceremonies.</li>
  </ul>

  <p>
    Traditional weaving is an important skill among Mising women, who weave
    beautiful handloom clothes.
  </p>

  <h2>Religion</h2>

  <p>
    Traditionally, the Misings worshipped nature and ancestral deities. They believed
    in various spirits and performed rituals through priests.
  </p>

  <p>
    Over time, many Misings adopted Hinduism, while some later embraced Christianity.
    Even today, many traditional customs and beliefs continue alongside modern
    religious practices.
  </p>

  <h2>Education and Modern Development</h2>

  <p>
    In earlier times, educational opportunities were limited. Today, the Mising
    community has made remarkable progress in education.
  </p>

  <p>
    Many schools and colleges have been established in Mising areas, and increasing
    numbers of Mising students are pursuing higher education.
  </p>

  <p>Members of the community now serve as:</p>

  <ul>
    <li>Teachers</li>
    <li>Doctors</li>
    <li>Engineers</li>
    <li>Scientists</li>
    <li>Civil servants</li>
    <li>Politicians</li>
    <li>Businesspeople</li>
  </ul>

  <p>
    They have made valuable contributions to Assam's social, cultural, and economic
    development.
  </p>

  <h2>Contribution to Assam</h2>

  <p>
    The Mising community has enriched Assam through:
  </p>

  <ul>
    <li>Agriculture</li>
    <li>Literature</li>
    <li>Folk songs and dances</li>
    <li>Traditional weaving</li>
    <li>Art and culture</li>
    <li>Public service</li>
    <li>Politics</li>
    <li>Education</li>
  </ul>

  <p>
    Many distinguished Mising personalities have served Assam and India with distinction.
  </p>

  <h2>Conclusion</h2>

  <p>
    The Mising community has preserved its unique identity while contributing
    significantly to the progress of Assam. Their language, traditions, festivals,
    and cultural heritage continue to strengthen the diverse cultural fabric of the state.
  </p>

`
  },
{
    slug: 'Is-Assam-Losing-Its-Linguistic-Diversity',
    title: 'Is Assam Losing Its Linguistic Diversity? The Hindi Language Move in the Assembly and the Fight for Indigenous Identity',
    category: 'Language',
    excerpt: 'The decision of the Assam Legislative Assembly in July 2026 to introduce Hindi as an official language for Assembly proceedings has triggered one of the most emotionally charged debates in recent Assamese public discourse. On the surface, the decision was presented as an administrative and practical step meant to make legislative functioning more inclusive and accessible. Hindi, after all, is widely understood across India and is spoken or understood by a considerable section of Assam’s population either as a first, second, or third language. Supporters of the decision therefore argued that allowing legislators to use Hindi inside the Assembly was merely an expansion of linguistic convenience and should not be interpreted as a threat to Assamese identity or to indigenous cultures. However, the reaction across large sections of Assamese society, especially among indigenous and tribal communities, revealed that the issue was never simply about communication. For many people in Assam, the move symbolized a deeper and long-growing anxiety regarding demographic change, cultural assimilation, institutional imbalance, and the fear that the political and cultural space of indigenous communities is slowly shrinking under the pressure of migration and centralization.',

    author: 'Somyo Doley',
    date: '2026-07-06',
    coverImage: '/images/articles/sumyodoley-06july26.png',
    featured: true,
    coverFit: 'contain',
    content: `
    <p>The decision of the Assam Legislative Assembly in July 2026 to introduce Hindi as an official language for Assembly proceedings has triggered one of the most emotionally charged debates in recent Assamese public discourse. On the surface, the decision was presented as an administrative and practical step meant to make legislative functioning more inclusive and accessible. Hindi, after all, is widely understood across India and is spoken or understood by a considerable section of Assam’s population either as a first, second, or third language. Supporters of the decision therefore argued that allowing legislators to use Hindi inside the Assembly was merely an expansion of linguistic convenience and should not be interpreted as a threat to Assamese identity or to indigenous cultures. However, the reaction across large sections of Assamese society, especially among indigenous and tribal communities, revealed that the issue was never simply about communication. For many people in Assam, the move symbolized a deeper and long-growing anxiety regarding demographic change, cultural assimilation, institutional imbalance, and the fear that the political and cultural space of indigenous communities is slowly shrinking under the pressure of migration and centralization. </p>

<p>To understand why the controversy became so intense, one must first understand Assam’s historical and demographic context. Assam has never been a linguistically homogeneous region. The state is home to dozens of communities with distinct ethnic, linguistic, and cultural identities, including Assamese, Bodo, Mising, Karbi, Dimasa, Rabha, Tiwa, Deori, Bengali, Nepali, tea tribe communities, Hindi-speaking migrants, and many others. Unlike many Indian states where one language overwhelmingly dominates the demographic landscape, Assam has historically experienced constant negotiation over identity, land, language, and political representation. Census trends over decades have shown significant demographic shifts caused by multiple waves of migration during colonial rule, partition, post-partition movement, labor migration, economic migration, and cross-border population flow. Because of this history, questions relating to language in Assam carry emotional and political weight far beyond ordinary administrative policy. Every institutional recognition of a language is interpreted not merely as a technical decision, but as a statement about power, legitimacy, and belonging.<p>

<p>The strongest criticism of the Hindi decision emerged from the fact that several indigenous languages of Assam still do not enjoy equivalent institutional recognition despite being historically rooted in the land. Among these communities, the case of the Mising people has become one of the most discussed examples. The Misings are one of the largest indigenous tribal communities in Assam, concentrated mainly in Upper Assam districts such as Dhemaji, Lakhimpur, Majuli, Jorhat, Dibrugarh, and Tinsukia. Their language belongs to the Tani branch of the Sino-Tibetan family and possesses a long cultural history connected deeply to the Brahmaputra Valley. According to census-based data, the Mising-speaking population numbers more than six lakh people, making it one of the significant indigenous linguistic communities of the state. Yet despite this demographic presence, the language remains institutionally marginalized in major areas of governance, higher administration, legislative functioning, and mainstream media. For many Mising youths and indigenous activists, this contrast lies at the center of the present anger. Their argument is simple but emotionally powerful: if the state can introduce Hindi into the Assembly in the name of representation and accessibility, why do indigenous languages that originated in Assam continue to remain absent from the same institution?</p>

<p>This feeling becomes even more sensitive when people compare the treatment of indigenous cultures with the recognition received by migrant-associated traditions. A frequently cited example is the contrast between Chhath Puja and Ali-Aye-Ligang. Chhath, strongly associated with Hindi-speaking and Bihari-origin communities, has long enjoyed visible official recognition in Assam’s public holiday structure. Meanwhile, Ali-Aye-Ligang, the most important cultural festival of the Mising community, received broader district-level holiday recognition only recently. To many indigenous observers, this sequence creates the impression that communities with stronger political influence or demographic expansion receive faster institutional accommodation than native tribal cultures. Whether this perception is entirely accurate or not, politically it has become deeply influential because it reinforces an existing narrative among many Assamese and tribal groups that indigenous communities are slowly losing symbolic priority within their own homeland.</p>

<p>The anxiety surrounding Hindi is therefore not merely about a language itself. The fear is tied to the broader phenomenon of cultural assimilation. Across the world, smaller indigenous languages often weaken gradually rather than disappearing suddenly. Linguists describe this process as “language shift,” where younger generations increasingly adopt dominant languages because those languages provide better access to education, employment, administration, media, and social mobility. Over time, indigenous languages become restricted to ceremonial use, festivals, or conversations among older generations. Eventually, children stop learning the language naturally at home, which marks the beginning of long-term decline. Many tribal intellectuals in Assam fear that this process is already affecting communities like the Misings. In rural areas the language remains relatively vibrant, but urbanization, migration, mixed-language environments, and educational pressure increasingly push younger generations toward Assamese, Hindi, and English. Once institutional power also begins favoring larger languages, communities fear the process of assimilation accelerates further.</p>

<p>The debate surrounding the Assembly decision became even more intense because of Assam’s long history of demographic insecurity. The Assam Movement of 1979–1985 itself emerged largely from fears that indigenous communities and Assamese speakers could eventually become minorities in their own state due to migration and demographic transformation. This historical memory remains deeply alive within Assamese political consciousness. Therefore, every demographic or linguistic development is viewed through the lens of survival and representation. When people see Hindi expanding institutionally while smaller indigenous languages continue struggling for recognition, many interpret it not as neutral multilingualism but as part of a broader shift in cultural power. The concern is amplified by the fact that Assamese speakers themselves constitute less than half of Assam’s total population according to census data. In such a context, many Assamese nationalists believe both Assamese and tribal languages are vulnerable to gradual erosion under the combined pressures of migration, economic change, and national linguistic centralization.</p>

<p>Supporters of the Hindi decision reject the idea that multilingualism automatically threatens local identity. They argue that Hindi serves as a practical link language understood by many communities across India and by a substantial section of Assam’s population. According to this perspective, allowing Hindi in the Assembly simply increases participation and administrative convenience. They also point out that Assamese remains the principal official language of the state and that Hindi’s inclusion does not legally remove Assamese or indigenous identities from the Assembly framework. Some argue that India’s multilingual character naturally requires flexibility and that learning or using Hindi does not necessarily mean abandoning local culture. However, critics respond that the issue is not about banning Hindi or opposing multilingualism. Their concern is about unequal institutional hierarchy. In their view, when nationally dominant languages continue receiving official expansion while indigenous languages remain structurally weak, the result over time is not balanced multilingualism but gradual cultural centralization.</p>

<p>The emotional intensity of the debate ultimately comes from a deeper philosophical question: who gets institutional recognition first, and what does that reveal about the priorities of the state? Many indigenous communities in Assam feel that their languages and cultures are acknowledged symbolically during festivals or elections but remain absent from real administrative power structures. The Assembly controversy therefore became symbolic of a larger dissatisfaction. To many people, especially among indigenous youth, the issue represented not only a language policy decision but also a reflection of whose identity is considered politically important enough to be institutionally preserved.</p>

<p>Whether one calls the current situation a “demographic threat” depends largely on political perspective. Critics of the Assembly decision argue that demographic change and institutional prioritization together create long-term cultural pressure capable of weakening indigenous identities over generations. They believe that if current trends continue unchecked, many tribal languages may survive only as cultural artifacts rather than living everyday languages. Supporters of multilingual expansion, on the other hand, argue that societies naturally evolve and that cultural survival ultimately depends on communities continuing to transmit their language and traditions internally. Yet even many moderates acknowledge that smaller indigenous languages require stronger institutional support if they are to survive in a rapidly modernizing and multilingual environment.</p>

<p>The controversy surrounding Hindi in the Assam Legislative Assembly therefore represents something much larger than a dispute over administrative language. It reflects the collision between national integration and regional identity, between demographic change and indigenous insecurity, between practical governance and cultural symbolism. At its core lies a fear shared by many indigenous communities across the world: the fear that once institutional space begins shifting away from native languages, cultural erosion follows slowly but steadily. In Assam, where history, migration, and identity are deeply intertwined, this fear carries enormous emotional power. For communities like the Misings, the question is not simply whether Hindi should exist in the Assembly. The deeper question is whether indigenous languages and cultures will continue to hold meaningful political space in the future Assam that is gradually emerging.</p>
`

  },
  
  {
    slug: 'The-Mising-Tribe-Between-Assimilation-and-Preservation',
    title: 'The Mising Tribe: Between Assimilation and Preservation',
    category: 'Culture',
    excerpt: 'The Mising tribe, one of the prominent indigenous groups of Northeast India and part of the broader Tani cultural family, possesses a rich cultural heritage shaped by language, traditions, and close ties to nature.',
    author: 'Sumyo Doley',
    date: '2026-07-05',
    coverImage: '/images/articles/sumyodoley-05july26.png',
    featured: false,
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
    featured: false,
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
