import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

// Drop-in replacement for a plain <img> that shows a shimmering skeleton
// until the image finishes loading, then cross-fades it in. Works for any
// image on the site — mimang thumbnails, book covers, article covers —
// without needing per-page loading state.
//
// Usage: <LazyImage src={...} alt={...} style={{...}} /> — same props as
// a normal <img>, plus everything just works.
export default function LazyImage({ src, alt, style = {}, onClick, className, ...rest }) {
  const { colors } = useTheme()
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style.wrapper }}
    >
      {!loaded && (
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: colors.accentLight,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onClick={onClick}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
        {...rest}
      />
    </div>
  )
}