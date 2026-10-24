// Browser -> Cloudinary direct upload using an UNSIGNED upload preset.
// Big photos are shrunk first (saves your free Cloudinary quota and upload time).

const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const uploadConfigured = Boolean(CLOUD && PRESET)

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
const ALLOWED_EXT = /\.(jpe?g|png|webp|heic|heif)$/i
const MAX_BYTES = 15 * 1024 * 1024 // 15 MB before shrinking
const SKIP_SHRINK_UNDER = 900 * 1024 // already small, upload as-is
const MAX_SIDE = 2000 // px

async function shrink(file) {
  if (file.size < SKIP_SHRINK_UNDER) return file
  try {
    const bmp = await createImageBitmap(file)
    const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height))
    const w = Math.round(bmp.width * scale)
    const h = Math.round(bmp.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff' // JPEG has no transparency
    ctx.fillRect(0, 0, w, h)
    ctx.drawImage(bmp, 0, 0, w, h)
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.85))
    return blob && blob.size < file.size ? blob : file
  } catch {
    return file // if the browser can't shrink it, just send the original
  }
}

// Resolves to the final https image URL.
export async function uploadImage(file, { folder, onProgress } = {}) {
  if (!uploadConfigured) throw new Error('Cloudinary is not configured (check .env.local).')
  // Windows often reports HEIC files with an empty type, so also check the extension.
  if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXT.test(file.name)) {
    throw new Error('Please choose a JPG, PNG, WebP or HEIC image.')
  }
  if (file.size > MAX_BYTES) throw new Error('Image is too large (max 15 MB).')

  const body = await shrink(file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText)
        // Browsers can't show HEIC, so ask Cloudinary to deliver it as JPG.
        if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) {
          resolve(res.secure_url.replace(/\.(heic|heif)$/i, '.jpg'))
        }
        else reject(new Error(res.error?.message || 'Upload failed.'))
      } catch {
        reject(new Error('Upload failed.'))
      }
    }
    xhr.onerror = () => reject(new Error('Network error during upload.'))

    const fd = new FormData()
    fd.append('file', body)
    fd.append('upload_preset', PRESET)
    if (folder) fd.append('folder', folder)
    xhr.send(fd)
  })
}
