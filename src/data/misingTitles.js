// Mising Opín Amin (title names) for Mising Archives.
//
// HOW THIS WORKS
// Add one object per name. The page at /MisingTitles reads this list
// directly — same pattern as src/data/books.js and src/data/articles.js.
//
// FIELD REFERENCE
// misingName      the name in Mising orthography, including diacritics
//                  (e.g. 'Pe:gu')
// legalSpelling   the spelling commonly used in legal/official names,
//                  since Mising diacritics can't be used there. Comma-
//                  separate multiple common variants.
// ipa             IPA pronunciation, e.g. '/pe:gu/'
// voice           root-relative path to an mp3 in public/audio/titles/,
//                  e.g. '/audio/titles/pegu.mp3' — or null until recorded

export const misingTitlesData = [
  {
    misingName: 'Pe:gu',
    legalSpelling: 'Pegu, Pegoo',
    ipa: '/pe:gu/',
    voice: '/audio/titles/pegu.ogg', // add '/audio/titles/pegu.mp3' once recorded
  },
  {
    misingName: 'Dole:',
    legalSpelling: 'Doley',
    ipa: '/dole:/',
    voice: null, // add '/audio/titles/doley.mp3' once recorded
  },
  {
    misingName: 'Pa:tír',
    legalSpelling: 'Patir',
    ipa: '/pa:tɨr/',
    voice: null, // add '/audio/titles/patir.mp3' once recorded
  },
]