import { useEffect, useState } from 'react'
import { supabase } from './supabase'

// Visitor counting started on this date (shown in the footer).
export const TRACKING_SINCE = '2026-11-18'
// The day the site first went live (for the "days online" stat).
export const FOUNDED = '2026-06-30'

// Today's date / month in Indian Standard Time, as 'YYYY-MM-DD' / 'YYYY-MM'.
export const istDate = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
export const istMonth = () => istDate().slice(0, 7)

// Whole days between two 'YYYY-MM-DD' strings.
export const daysBetween = (from, to) =>
  Math.floor((Date.parse(to) - Date.parse(from)) / 86400000)

// ---------------------------------------------------------------------
// Call once when the site loads. Three anonymous flags decide what to add:
//  - visit: first page load in this browser session
//  - month: first visit from this browser this calendar month
//  - new:   first visit ever from this browser
// Only flags are stored in the browser; no ID, IP or personal data is sent.
// ---------------------------------------------------------------------
export function trackSiteVisit() {
  if (!supabase) return
  if (typeof navigator !== 'undefined' && navigator.webdriver) return

  let visit = false
  let month = false
  let isNew = false

  try {
    if (!sessionStorage.getItem('ma:session')) {
      sessionStorage.setItem('ma:session', '1')
      visit = true
    }
    const ym = istMonth()
    if (localStorage.getItem('ma:month') !== ym) {
      localStorage.setItem('ma:month', ym)
      month = true
    }
    if (!localStorage.getItem('ma:seen')) {
      localStorage.setItem('ma:seen', '1')
      isNew = true
    }
    // Local-only counter for the "your visits" stat. Never sent anywhere.
    if (visit) {
      const n = parseInt(localStorage.getItem('ma:myvisits') || '0', 10) || 0
      localStorage.setItem('ma:myvisits', String(n + 1))
    }
  } catch {
    return // storage blocked: skip rather than count every page load
  }

  if (!visit) return
  supabase
    .rpc('track_site', { p_visit: visit, p_month: month, p_new: isNew })
    .then(() => {}, () => {})
}

export function myVisitCount() {
  try {
    return parseInt(localStorage.getItem('ma:myvisits') || '0', 10) || 0
  } catch {
    return 0
  }
}

// ---------------------------------------------------------------------
// Reads all the numbers in one request. null until loaded (or if the
// database is unreachable, in which case the footer hides those tiles).
// ---------------------------------------------------------------------
export function useSiteStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    supabase.rpc('get_site_stats').then(({ data, error }) => {
      if (!cancelled && !error && data) setStats(data)
    })
    return () => { cancelled = true }
  }, [])

  return stats
}