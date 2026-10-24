import React, { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import { RotateCcw, RotateCw } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { getCroppedFile } from '../../utils/cropImage'

const ASPECTS = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:4', value: 3 / 4 },
  { label: '16:9', value: 16 / 9 },
]

// wraps degrees into -180..180
const wrap = (r) => ((r + 540) % 360) - 180

export default function CropModal({ file, initialAspect = 1, onCancel, onSkip, onDone }) {
  const { isDarkMode, colors } = useTheme()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspect, setAspect] = useState(initialAspect)
  const [areaPixels, setAreaPixels] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // Create the preview link inside the effect (not during render) so it is
  // never revoked before the cropper has loaded it. React's StrictMode runs
  // effects twice in development, which broke the old approach (black box).
  const [url, setUrl] = useState(null)
  useEffect(() => {
    const u = URL.createObjectURL(file)
    setUrl(u)
    return () => URL.revokeObjectURL(u)
  }, [file])

  const apply = async () => {
    if (!areaPixels || !url) return
    setBusy(true)
    setError('')
    try {
      const cropped = await getCroppedFile(url, areaPixels, rotation)
      onDone(cropped)
    } catch (e) {
      setError(e.message)
      setBusy(false)
    }
  }

  const chip = (active) => ({
    padding: '7px 12px',
    fontSize: '12px',
    fontWeight: '700',
    borderRadius: '999px',
    border: `1px solid ${active ? colors.accentPrimary : colors.border}`,
    backgroundColor: active ? colors.accentPrimary : colors.bgSecondary,
    color: active ? (isDarkMode ? colors.bg : '#fff') : colors.textSecondary,
    cursor: 'pointer',
    fontFamily: 'inherit',
  })
  const btn = {
    padding: '10px 16px', fontSize: '13px', fontWeight: '700', borderRadius: '10px',
    cursor: busy ? 'wait' : 'pointer', fontFamily: 'inherit',
  }
  const rowLabel = { fontSize: '12px', fontWeight: '700', color: colors.textSecondary, width: '64px', flexShrink: 0 }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2000, padding: '20px',
        backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: '560px', maxHeight: '95vh', overflowY: 'auto',
          backgroundColor: isDarkMode ? '#1b1a17' : '#fff', borderRadius: '16px',
          border: `1px solid ${colors.border}`, padding: '20px',
        }}
      >
        <h3 style={{ margin: '0 0 14px', fontSize: '17px', color: colors.text }}>Crop &amp; rotate</h3>

        <div style={{ position: 'relative', width: '100%', height: '340px', backgroundColor: '#111', borderRadius: '10px', overflow: 'hidden' }}>
          {url && <Cropper
            image={url}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={(_area, pixels) => setAreaPixels(pixels)}
          />}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '16px 0' }}>
          {ASPECTS.map((a) => (
            <button key={a.label} type="button" style={chip(aspect === a.value)} onClick={() => setAspect(a.value)}>
              {a.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={rowLabel}>Zoom</span>
          <input type="range" min={1} max={4} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} style={{ flex: 1 }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <span style={rowLabel}>Rotate</span>
          <button type="button" aria-label="Rotate left 90 degrees" style={chip(false)} onClick={() => setRotation((r) => wrap(r - 90))}><RotateCcw size={14} /></button>
          <input type="range" min={-180} max={180} step={1} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} style={{ flex: 1 }} />
          <button type="button" aria-label="Rotate right 90 degrees" style={chip(false)} onClick={() => setRotation((r) => wrap(r + 90))}><RotateCw size={14} /></button>
        </div>

        {error && <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#c0392b' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="button" disabled={busy} onClick={apply}
            style={{ ...btn, border: 'none', backgroundColor: colors.accentPrimary, color: isDarkMode ? colors.bg : '#fff' }}>
            {busy ? 'Preparing…' : 'Crop & upload'}
          </button>
          <button type="button" disabled={busy} onClick={onSkip}
            style={{ ...btn, border: `1px solid ${colors.border}`, backgroundColor: colors.bgSecondary, color: colors.text }}>
            Upload original
          </button>
          <button type="button" disabled={busy} onClick={onCancel}
            style={{ ...btn, border: 'none', backgroundColor: 'transparent', color: colors.textSecondary }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}