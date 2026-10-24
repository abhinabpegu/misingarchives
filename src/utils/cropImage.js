// Turns the crop rectangle + rotation chosen in the cropper into a real image.
// Runs entirely in the browser; nothing is sent anywhere until you upload.

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not read this image.'))
    img.src = src
  })
}

function rotatedSize(width, height, degrees) {
  const r = (degrees * Math.PI) / 180
  return {
    width: Math.abs(Math.cos(r) * width) + Math.abs(Math.sin(r) * height),
    height: Math.abs(Math.sin(r) * width) + Math.abs(Math.cos(r) * height),
  }
}

// imageSrc: object URL of the chosen file
// pixelCrop: { x, y, width, height } from react-easy-crop (in rotated-image pixels)
// rotation: degrees
export async function getCroppedFile(imageSrc, pixelCrop, rotation = 0) {
  const image = await loadImage(imageSrc)
  const box = rotatedSize(image.width, image.height, rotation)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = Math.round(box.width)
  canvas.height = Math.round(box.height)

  ctx.fillStyle = '#ffffff' // JPEG has no transparency
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.translate(-image.width / 2, -image.height / 2)
  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(
    Math.round(pixelCrop.x),
    Math.round(pixelCrop.y),
    Math.round(pixelCrop.width),
    Math.round(pixelCrop.height)
  )
  canvas.width = Math.round(pixelCrop.width)
  canvas.height = Math.round(pixelCrop.height)
  ctx.putImageData(data, 0, 0)

  const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.92))
  if (!blob) throw new Error('Could not crop this image.')
  return new File([blob], 'cropped.jpg', { type: 'image/jpeg' })
}