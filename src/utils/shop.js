export const CRAFT_LABELS = {
  weaver: 'Weaver',
  'ornament-maker': 'Ornament maker',
  tailor: 'Tailor',
  other: 'Other',
}

export const AVAILABILITY_LABELS = {
  in_stock: 'In stock',
  made_to_order: 'Made to order',
  sold_out: 'Sold out',
}

export const money = (n) => `₹${Number(n).toLocaleString('en-IN')}`

export function priceLabel(p) {
  if (p.price_type === 'on_request' || p.price == null) return 'Price on request'
  return `${p.price_type === 'starting_from' ? 'From ' : ''}${money(p.price)}`
}

// Indian numbers: 10 digits -> add 91; 11 digits starting 0 -> swap 0 for 91.
function normalisePhone(raw) {
  let d = (raw || '').replace(/\D/g, '')
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  if (d.length === 10) d = '91' + d
  return d
}

export function whatsappLink(number, text) {
  const d = normalisePhone(number)
  if (!d) return null
  return `https://wa.me/${d}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export function telLink(number) {
  const d = normalisePhone(number)
  return d ? `tel:+${d}` : null
}

// Accepts "name", "@name" or a full instagram.com link.
export function instagramLink(value) {
  const v = (value || '').trim()
  if (!v) return null
  if (/^https?:\/\//i.test(v)) return v
  return `https://instagram.com/${v.replace(/^@/, '')}`
}

export function externalLink(value) {
  const v = (value || '').trim()
  if (!v) return null
  return /^https?:\/\//i.test(v) ? v : `https://${v}`
}