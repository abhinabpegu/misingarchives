// Donation transparency log for Mising Archives.
//
// HOW THIS WORKS
// Add one object to `donationsData` for each donation received, and one
// object to `expensesData` for each thing the money was spent on. The
// Donations page reads both lists and shows running totals automatically —
// same pattern as src/data/books.js and src/data/articles.js.
//
// DONATION FIELDS
// name        donor's name, shown as given
// anonymous   true hides the name and shows "Anonymous" instead —
//             set this if a donor asks not to be named
// amount      number, in INR (no symbols/commas)
// date        'YYYY-MM-DD'
// note        optional short note, e.g. "For book archival"
//
// EXPENSE FIELDS
// description  what the money was spent on
// amount       number, in INR
// date         'YYYY-MM-DD'
// category     'Infrastructure' | 'Archival' | 'Other' (or your own)

export const donationsData = [
  {
    name: 'Nabajit Pamegam',
    anonymous: false,
    amount: 50,
    date: '2026-07-01', 
    note: '',
  },
  {
    name: 'Bikash Mili',
    anonymous: false,
    amount: 200,
    date: '2026-07-01', 
    note: '',
  },

  {
    name: 'Oyir Patir',
    anonymous: false,
    amount: 200,
    date: '2026-07-04', 
  },
  {
    name: 'Runaway Lady',
    anonymous: false,
    amount: 1000,
    date: '2026-07-04', 
  }
  
]

export const expensesData = [
  {
    description: 'Domain registration — misingarchives.co.in (Year 1)',
    amount: 116.82,
    date: '2026-07-02', // TODO: replace with actual registration date
    category: 'Infrastructure',
  },
]