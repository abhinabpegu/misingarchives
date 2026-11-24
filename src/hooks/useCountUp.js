import { useEffect, useState } from 'react'

/**
 * Smoothly animates a numeric value from 0 to `target` when `active` is true.
 * Respects `prefers-reduced-motion` by jumping straight to `target`.
 */
export function useCountUp(target, active = true, duration = 700) {
  const numericTarget = Number(target) || 0
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (numericTarget <= 0) {
      setValue(numericTarget)
      return
    }
    const reduced = typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(numericTarget)
      return
    }

    let rafId = null
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * numericTarget))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [numericTarget, active, duration])

  return value
}
