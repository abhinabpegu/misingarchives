import { useEffect, useState } from 'react'
import { supabase } from './supabase'

// ---------------------------------------------------------------------
// Writing: track('book', '0001', 'download')
// Views are counted once per browser session per item, so refreshing the
// page doesn't inflate the number. Downloads count every click.
// ---------------------------------------------------------------------
export function track(kind, slug, event = 'view') {
  if (!supabase || !slug) return
  // Skip obvious automation (headless browsers, crawlers that run JS).
  if (typeof navigator !== 'undefined' && navigator.webdriver) return

  if (event === 'view') {
    const key = `stat:${kind}:${slug}:view`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      /* storage blocked: just count it */
    }
  }

  supabase
    .rpc('track_event', { p_kind: kind, p_slug: slug, p_event: event })
    .then(() => {}, () => {})
}

// ---------------------------------------------------------------------
// Reading: const stats = useStats('book')  ->  { '0001': { views, downloads } }
// One request per kind, shared by every component and cached for 60s, so
// 20 cards on a page still make a single database call.
// ---------------------------------------------------------------------
const CACHE_MS = 60 * 1000
const cache = {}

function loadStats(kind) {
  const hit = cache[kind]
  if (hit && Date.now() - hit.time < CACHE_MS) return hit.promise

  const promise = supabase
    .from('content_stats')
    .select('slug, views, downloads')
    .eq('kind', kind)
    .then(({ data, error }) => {
      if (error || !data) {
        delete cache[kind]
        return {}
      }
      return Object.fromEntries(data.map((r) => [r.slug, r]))
    })

  cache[kind] = { time: Date.now(), promise }
  return promise
}

export function useStats(kind) {
  const [stats, setStats] = useState({})

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    loadStats(kind).then((map) => {
      if (!cancelled) setStats(map)
    })
    return () => { cancelled = true }
  }, [kind])

  return stats
}

export const formatCount = (n) => Number(n || 0).toLocaleString('en-IN')