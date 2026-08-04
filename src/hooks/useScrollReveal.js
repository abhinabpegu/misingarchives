import { useEffect, useRef, useState } from 'react'

// Tiny scroll-reveal hook — returns a ref to attach to any element, and
// whether it's currently visible. Pair with the .fade-in-up CSS class:
//
//   const [ref, visible] = useScrollReveal()
//   <div ref={ref} className={`fade-in-up ${visible ? 'is-visible' : ''}`}>
//
// Uses IntersectionObserver (native, no library) and only fires once per
// element — sections don't re-animate every time you scroll past them.
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}