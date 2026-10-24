import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { mimangData as staticData } from '../data/learn/mimang'

// Database row -> the shape MisingMotifs.jsx already uses
const fromRow = (r) => ({
  code: r.code,
  gamigName: r.gamig_name,
  category: r.category,
  englishDesc: r.english_desc,
  image: r.image_url,
  clothExample: r.cloth_example_url,
})

// Starts with the bundled JSON patterns (so the page shows instantly and
// never breaks), then swaps in the live Supabase data when it arrives.
// If Supabase is unreachable (e.g. a paused free project) or has no
// published patterns yet, the bundled JSON stays on screen.
export function useMimang() {
  const [mimang, setMimang] = useState(staticData)
  const [source, setSource] = useState('static')

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    supabase
      .from('mimang')
      .select('*')
      .eq('published', true)
      .order('code')
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return
        setMimang(data.map(fromRow))
        setSource('supabase')
      })
    return () => { cancelled = true }
  }, [])

  return { mimang, source }
}