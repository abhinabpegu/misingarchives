import { useEffect, useRef, useState } from 'react'

// Scroll-reveal hook — returns a ref to attach to any element, and whether
// it has entered the viewport. Pair with .fade-in-up or .stagger-grid.
export function useScrollReveal(threshold = 0.06) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return true
    }
    return false
  })

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -32px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, visible])

  return [ref, visible]
}
