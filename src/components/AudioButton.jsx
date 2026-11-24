import React, { useRef, useState, useEffect } from 'react'
import { Volume2, Pause } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

// Small play/pause control for one pronunciation clip.
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
      className="pill-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '6px 12px',
        fontSize: '12px',
        fontWeight: '700',
        backgroundColor: playing ? colors.accentPrimary : colors.accentLight,
        color: playing ? (isDarkMode ? colors.bg : '#fff') : colors.accentPrimary,
        border: `1px solid ${playing ? colors.accentPrimary : 'transparent'}`,
        borderRadius: '8px',
        cursor: 'pointer',
      }}
    >
      {playing ? <Pause size={13} /> : <Volume2 size={14} />}
      <span>{playing ? 'Playing' : label}</span>
      {playing && (
        <span className="audio-bars" aria-hidden="true">
          <span /><span /><span />
        </span>
      )}
    </button>
  )
}
