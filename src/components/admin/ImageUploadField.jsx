import React, { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { uploadImage, uploadConfigured } from '../../utils/cloudinaryUpload'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'
import CropModal from './CropModal'

const isHeic = (file) => /heic|heif/i.test(file.type) || /\.(heic|heif)$/i.test(file.name)

// Upload button + crop/rotate step + preview.
// value = current image URL ('' if none); onChange(newUrl)
// aspect = starting crop shape (1 = square)
export default function ImageUploadField({ label, value, onChange, folder, aspect = 1 }) {
  const { colors } = useTheme()
  const inputRef = useRef(null)
  const [progress, setProgress] = useState(null) // null = idle
  const [error, setError] = useState('')
  const [pending, setPending] = useState(null) // file waiting in the cropper

  const startUpload = async (file) => {
    setPending(null)
    setError('')
    setProgress(0)
    try {
      const url = await uploadImage(file, { folder, onProgress: setProgress })
      onChange(url)
    } catch (err) {
      setError(err.message)
    }
    setProgress(null)
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // lets you pick the same file again later
    if (!file) return
    setError('')
    // Browsers can't open HEIC for cropping, so those upload as-is.
    // Anything that isn't an image goes straight to the upload check,
    // which shows a clear error message.
    if (file.type.startsWith('image/') && !isHeic(file)) setPending(file)
    else startUpload(file)
  }

  const uploading = progress !== null

  const btn = {
    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 14px', fontSize: '13px',
    fontWeight: '700', color: colors.accentPrimary, backgroundColor: colors.accentLight,
    border: 'none', borderRadius: '8px', cursor: uploading ? 'wait' : 'pointer', fontFamily: 'inherit',
  }

  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colors.textSecondary, marginBottom: '8px' }}>
        {label}
      </label>

      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: '88px', height: '88px', borderRadius: '10px', overflow: 'hidden', backgroundColor: colors.accentLight, flexShrink: 0, border: `1px solid ${colors.border}` }}>
          {value && (
            <img
              src={cloudinaryUrl(value, 'w_200,h_200,c_fill,q_auto,f_auto')}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>

        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button type="button" style={btn} disabled={uploading || !uploadConfigured} onClick={() => inputRef.current?.click()}>
              <Upload size={14} />
              {uploading ? `Uploading ${progress}%` : value ? 'Replace image' : 'Upload image'}
            </button>
            {value && !uploading && (
              <button type="button" onClick={() => onChange('')}
                style={{ ...btn, color: colors.textSecondary, backgroundColor: colors.bgSecondary, border: `1px solid ${colors.border}` }}>
                <X size={14} /> Remove
              </button>
            )}
          </div>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif" onChange={handleFile} style={{ display: 'none' }} />

          {!uploadConfigured && (
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#c0392b' }}>
              Upload isn't set up: add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.
            </p>
          )}
          {error && <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#c0392b' }}>{error}</p>}
        </div>
      </div>

      {pending && (
        <CropModal
          file={pending}
          initialAspect={aspect}
          onCancel={() => setPending(null)}
          onSkip={() => startUpload(pending)}
          onDone={startUpload}
        />
      )}
    </div>
  )
}