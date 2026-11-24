import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

// Drop-in replacement for a plain <img> that shows a shimmering skeleton
// until the image finishes loading, then cross-fades it in. Handles cached
// images immediately via imgRef.current.complete and forwards onError safely.
export default function LazyImage({ src, alt, style = {}, onClick, onError, className, ...rest }) {
  const { colors } = useTheme()
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true)
    } else {
      setLoaded(false)
    }
  }, [src])

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
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(true)
          if (onError) onError(e)
        }}
        onClick={onClick}
        style={{
          ...style,
          opacity: loaded ? (style.opacity ?? 1) : 0,
          transition: 'opacity 0.4s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        {...rest}
      />
    </div>
  )
}
