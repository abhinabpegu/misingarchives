import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't reset scroll position between route changes on its
// own — this isn't caching, it's just default SPA behavior (unlike a
// normal multi-page site, where each new page load starts at the top).
// useLayoutEffect (not useEffect) so this runs before the browser paints,
// avoiding a flash at the old scroll position.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}