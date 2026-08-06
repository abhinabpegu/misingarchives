// Inserts a Cloudinary transformation into an existing delivery URL.
// Safe no-op for anything that isn't a Cloudinary URL (e.g. a future
// non-Cloudinary source), so it's safe to wrap every image call site with.
//
// Usage: cloudinaryUrl(url, 'w_500,q_auto,f_auto')
export function cloudinaryUrl(url, transform) {
  if (!url) return url
  if (!/^https?:\/\/res\.cloudinary\.com\//i.test(url)) return url
  return url.replace('/upload/', `/upload/${transform}/`)
}