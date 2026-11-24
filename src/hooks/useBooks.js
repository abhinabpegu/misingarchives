import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { booksData as staticBooks } from '../data/books'

const fromRow = (r) => ({
  code: r.code,
  title: r.title,
  author: r.author,
  language: r.language,
  tags: r.tags || [],
  driveLink: r.drive_link,
  archivedBy: r.archived_by || '',
  coverImage: r.cover_image_url || null,
})

// Shows the bundled books instantly, then merges in database books.
// A database row with the same code replaces the bundled one.
export function useBooks() {
  const [books, setBooks] = useState(staticBooks)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    supabase.from('books').select('*').eq('published', true).then(({ data, error }) => {
      if (cancelled) return
      if (!error && data && data.length) {
        const map = new Map(staticBooks.map((b) => [b.code, b]))
        data.forEach((r) => map.set(r.code, fromRow(r)))
        setBooks([...map.values()].sort((a, b) => a.code.localeCompare(b.code)))
      }
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  return { books, loading }
}