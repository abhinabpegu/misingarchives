// Generates compressed preview copies of mimang pattern/cloth images.
//
// HOW THIS WORKS
// Runs as part of `prebuild`, same as generate-sitemap.js and
// generate-llms.js. For every image in public/images/mimang/, it writes a
// resized, compressed copy into public/images/mimang/thumbs/ with the SAME
// filename — so the frontend can derive a thumb URL just by inserting
// "/thumbs" into the path, no new data fields needed.
//
// The original full-resolution files are left untouched and still get
// served — the lightbox / "view full size" path always points at them.
// Thumbnails are skipped (not regenerated) if they're already newer than
// the source file, so repeat builds stay fast.

import { readdirSync, existsSync, mkdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import sharp from 'sharp'

const SOURCE_DIR = 'public/images/mimang'
const THUMB_DIR = join(SOURCE_DIR, 'thumbs')
const THUMB_WIDTH = 500   // plenty for a grid card; original stays full-res
const JPEG_QUALITY = 68
const PNG_QUALITY = 68

if (!existsSync(SOURCE_DIR)) {
  console.log('No public/images/mimang folder found — skipping thumbnail generation.')
  process.exit(0)
}

if (!existsSync(THUMB_DIR)) {
  mkdirSync(THUMB_DIR, { recursive: true })
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const files = readdirSync(SOURCE_DIR).filter((f) => {
  const full = join(SOURCE_DIR, f)
  return IMAGE_EXTENSIONS.has(extname(f).toLowerCase()) && statSync(full).isFile()
})

let generated = 0
let skipped = 0
let failed = 0

for (const file of files) {
  const srcPath = join(SOURCE_DIR, file)
  const thumbPath = join(THUMB_DIR, file)
  const ext = extname(file).toLowerCase()

  try {
    if (existsSync(thumbPath)) {
      const srcMtime = statSync(srcPath).mtimeMs
      const thumbMtime = statSync(thumbPath).mtimeMs
      if (thumbMtime >= srcMtime) {
        skipped++
        continue
      }
    }

    let pipeline = sharp(srcPath).resize({
      width: THUMB_WIDTH,
      withoutEnlargement: true,
    })

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 })
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: JPEG_QUALITY })
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    }

    await pipeline.toFile(thumbPath)
    generated++
  } catch (err) {
    console.error(`Failed to generate thumbnail for ${file}:`, err.message)
    failed++
  }
}

console.log(`Thumbnails: ${generated} generated, ${skipped} up to date, ${failed} failed (of ${files.length} images).`)