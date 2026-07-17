import React, { useRef, useState, useEffect } from 'react'
import { Volume2, Pause } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

// Small play/pause control for one pronunciation clip. Pass voice: null in
// the data file until a recording exists — it shows a muted "coming soon"
// label instead of a dead button.
export default function AudioButton({ src, label = 'Listen' }) {
  const { isDarkMode, colors } = useTheme()
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    return () => audioRef.current?.pause()
  }, [])

  if (!src) {
    return (
      <span style={{ fontSize: '12px', color: colors.textTertiary, fontStyle: 'italic' }}>
        Audio coming soon
      </span>
    )
  }

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
      audioRef.current.addEventListener('ended', () => setPlaying(false))
    }
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause pronunciation' : 'Play pronunciation'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        fontSize: '12px',
        fontWeight: '700',
        backgroundColor: playing ? colors.accentPrimary : colors.accentLight,
        color: playing ? (isDarkMode ? colors.bg : '#fff') : colors.accentPrimary,
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      {playing ? <Pause size={14} /> : <Volume2 size={14} />}
      {playing ? 'Playing' : label}
    </button>
  )
}