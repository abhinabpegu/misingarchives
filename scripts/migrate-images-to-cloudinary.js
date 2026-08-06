// scripts/migrate-images-to-cloudinary.js
//
// One-time migration: finds every image path referenced from
// src/data/articles.js, src/data/books.js, and content/mimang/*.json,
// uploads each one (from public/images/...) to Cloudinary, then rewrites
// those files to point at the new Cloudinary URLs instead of local paths.
//
// Any file over ~9.5MB (Cloudinary's free-plan limit is 10MB) is
// automatically downscaled/recompressed with sharp before uploading —
// common with unedited phone photos (WhatsApp Image..., IMG_....jpg etc).
//
// Drop this file into your project's scripts/ folder before running.
//
// SETUP
//   Requires Node 18+ (uses native fetch/FormData/Blob — no extra deps
//   beyond sharp, which this project already has as a devDependency).
//   Set these three environment variables first (find them in your
//   Cloudinary dashboard → Account Details / API Keys):
//
//     Windows (cmd.exe):
//       set CLOUDINARY_CLOUD_NAME=your_cloud_name
//       set CLOUDINARY_API_KEY=your_api_key
//       set CLOUDINARY_API_SECRET=your_api_secret
//
//     Mac/Linux (bash):
//       export CLOUDINARY_CLOUD_NAME=your_cloud_name
//       export CLOUDINARY_API_KEY=your_api_key
//       export CLOUDINARY_API_SECRET=your_api_secret
//
//   The API secret is only used here, server-side, to sign the upload
//   request. Never put it in config.yml, .env files you commit, or any
//   client-side code.
//
// USAGE
//   node scripts/migrate-images-to-cloudinary.js              # do it for real
//   node scripts/migrate-images-to-cloudinary.js --dry-run     # preview only
//
// Safe to re-run: already-migrated paths are remembered in
// scripts/.cloudinary-migration-map.json and skipped on later runs, so if
// an upload fails partway through you can just run it again.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { createHash } from 'crypto'
import { join, extname, basename } from 'path'
import sharp from 'sharp'

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET
const DRY_RUN = process.argv.includes('--dry-run')

if (!DRY_RUN && (!CLOUD_NAME || !API_KEY || !API_SECRET)) {
  console.error(
    'Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET env vars.\n' +
    'Set them first, or run with --dry-run to preview without uploading.'
  )
  process.exit(1)
}

const MAP_FILE = 'scripts/.cloudinary-migration-map.json'
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp'])
const CLOUDINARY_FOLDER = 'misingarchives' // change if you'd prefer a different folder name
const MAX_SAFE_BYTES = 9.5 * 1024 * 1024 // stay comfortably under Cloudinary's 10MB cap

// ---------------------------------------------------------------------
// 1. Collect every image path referenced from the data files
// ---------------------------------------------------------------------

function extractQuotedPaths(text, fieldNames) {
  const paths = new Set()
  for (const field of fieldNames) {
    const re = new RegExp(`${field}\\s*:\\s*['"]([^'"]+)['"]`, 'g')
    let m
    while ((m = re.exec(text))) {
      if (/^\/images\//.test(m[1]) && IMAGE_EXT.has(extname(m[1]).toLowerCase())) {
        paths.add(m[1])
      }
    }
  }
  return paths
}

const referenced = new Set()

// articles.js + books.js are JS source, not JSON — scan as text
for (const file of ['src/data/articles.js', 'src/data/books.js']) {
  if (!existsSync(file)) continue
  const text = readFileSync(file, 'utf8')
  for (const p of extractQuotedPaths(text, ['coverImage'])) referenced.add(p)
}

// content/mimang/*.json is real JSON — parse it properly
const mimangDir = 'content/mimang'
const mimangFiles = existsSync(mimangDir)
  ? readdirSync(mimangDir).filter((f) => f.endsWith('.json'))
  : []

for (const f of mimangFiles) {
  const full = join(mimangDir, f)
  const data = JSON.parse(readFileSync(full, 'utf8'))
  for (const field of ['image', 'clothExample']) {
    if (data[field] && /^\/images\//.test(data[field])) referenced.add(data[field])
  }
}

console.log(`Found ${referenced.size} referenced image path(s).`)

// ---------------------------------------------------------------------
// 2. Upload each one to Cloudinary (skipping anything already migrated)
// ---------------------------------------------------------------------

let migrationMap = {}
if (existsSync(MAP_FILE)) {
  migrationMap = JSON.parse(readFileSync(MAP_FILE, 'utf8'))
}

function signParams(params) {
  const sorted = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join('&')
  return createHash('sha1').update(sorted + API_SECRET).digest('hex')
}

// Returns the bytes to upload — the original file, or a resized/recompressed
// version if the original is too large for Cloudinary's free-plan limit.
async function getUploadBuffer(localPath) {
  const size = statSync(localPath).size
  if (size <= MAX_SAFE_BYTES) return readFileSync(localPath)

  console.log(`  Compressing (${(size / 1024 / 1024).toFixed(1)}MB, over the limit)...`)
  const ext = extname(localPath).toLowerCase()
  let pipeline = sharp(localPath).resize({ width: 2500, withoutEnlargement: true })
  pipeline = ext === '.png'
    ? pipeline.png({ quality: 80, compressionLevel: 9 })
    : pipeline.jpeg({ quality: 80, mozjpeg: true })
  return pipeline.toBuffer()
}

async function uploadToCloudinary(localPath, publicId) {
  const timestamp = Math.floor(Date.now() / 1000)
  const signature = signParams({ folder: CLOUDINARY_FOLDER, public_id: publicId, timestamp })

  const fileBuffer = await getUploadBuffer(localPath)
  const form = new FormData()
  form.append('file', new Blob([fileBuffer]), basename(localPath))
  form.append('api_key', API_KEY)
  form.append('timestamp', String(timestamp))
  form.append('signature', signature)
  form.append('folder', CLOUDINARY_FOLDER)
  form.append('public_id', publicId)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: form,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error?.message || `Upload failed for ${localPath}`)
  return json.secure_url
}

for (const refPath of referenced) {
  if (migrationMap[refPath]) {
    console.log(`Skipping (already migrated): ${refPath}`)
    continue
  }

  const localPath = join('public', refPath) // '/images/x.jpg' -> 'public/images/x.jpg'
  if (!existsSync(localPath)) {
    console.warn(`Skipping — file not found on disk: ${localPath}`)
    continue
  }

  const publicId = refPath
    .replace(/^\/images\//, '')
    .replace(extname(refPath), '')
    .replace(/[^a-zA-Z0-9/_-]/g, '_')

  if (DRY_RUN) {
    console.log(`[dry-run] would upload ${localPath} -> folder "${CLOUDINARY_FOLDER}", public_id "${publicId}"`)
    continue
  }

  try {
    console.log(`Uploading ${localPath}...`)
    const url = await uploadToCloudinary(localPath, publicId)
    migrationMap[refPath] = url
    writeFileSync(MAP_FILE, JSON.stringify(migrationMap, null, 2))
    console.log(`  -> ${url}`)
  } catch (err) {
    console.error(`  Failed: ${err.message}`)
  }
}

if (DRY_RUN) {
  console.log('\nDry run complete — nothing was uploaded or modified.')
  process.exit(0)
}

// ---------------------------------------------------------------------
// 3. Rewrite the data files to point at the new Cloudinary URLs
// ---------------------------------------------------------------------

function rewriteTextFile(file) {
  if (!existsSync(file)) return
  let text = readFileSync(file, 'utf8')
  let changed = false
  for (const [oldPath, newUrl] of Object.entries(migrationMap)) {
    if (text.includes(oldPath)) {
      text = text.split(oldPath).join(newUrl)
      changed = true
    }
  }
  if (changed) {
    writeFileSync(file, text)
    console.log(`Updated ${file}`)
  }
}

rewriteTextFile('src/data/articles.js')
rewriteTextFile('src/data/books.js')

for (const f of mimangFiles) {
  const full = join(mimangDir, f)
  const data = JSON.parse(readFileSync(full, 'utf8'))
  let changed = false
  for (const field of ['image', 'clothExample']) {
    if (data[field] && migrationMap[data[field]]) {
      data[field] = migrationMap[data[field]]
      changed = true
    }
  }
  if (changed) {
    writeFileSync(full, JSON.stringify(data, null, 2) + '\n')
    console.log(`Updated ${full}`)
  }
}

console.log('\nDone. Review the diffs (git diff), then commit.')