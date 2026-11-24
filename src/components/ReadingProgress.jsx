import React, { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = null
    const update = () => {
      raf = null
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 80 ? Math.min(1, Math.max(0, scrollTop / max)) : 0)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="reading-progress"
      aria-hidden="true"
      style={{
        width: '100%',
        transform: `scaleX(${progress})`,
        opacity: progress > 0.01 ? 1 : 0,
      }}
    />
  )
}
