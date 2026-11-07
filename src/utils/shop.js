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

// Which product fields apply to each category group, how the artisan form labels
// them, and how the public product page labels them. Columns are shared, so Food
// reuses `material` as "Ingredients", etc. A field missing here is hidden.
const f = (label, show, placeholder = '') => ({ label, show, placeholder })

export const PRODUCT_FIELDS = {
  Clothing: {
    material: f('Material', 'Material', 'cotton, eri silk, muga'),
    technique: f('Technique', 'Technique', 'handloom'),
    colors: f('Colours', 'Colours'),
    size_info: f('Size / measurements', 'Size', 'Free size'),
    motif_codes: f('Motif codes (optional)', 'Motif codes', '0004, 0006'),
    care_instructions: f('Care instructions', 'Care'),
    customisable: f('Can be customised (size, colour, motif)', 'Customisable'),
    lead_time_days: f('Days to make / dispatch', 'Ready in'),
  },
  Ornaments: {
    material: f('Material', 'Material', 'silver, beads, brass'),
    technique: f('Technique', 'Technique', 'hand-made'),
    colors: f('Colours', 'Colours'),
    size_info: f('Size / length', 'Size'),
    care_instructions: f('Care instructions', 'Care'),
    customisable: f('Can be customised (size, design)', 'Customisable'),
    lead_time_days: f('Days to make / dispatch', 'Ready in'),
  },
  Food: {
    material: f('Ingredients', 'Ingredients', 'rice, herbs, ...'),
    technique: f('How it is made', 'How it is made', 'traditional, sun-dried'),
    size_info: f('Weight / quantity', 'Quantity', '500 g pack'),
    care_instructions: f('Storage & shelf life', 'Storage', 'Keep dry. Best within 3 months.'),
    lead_time_days: f('Days to prepare / dispatch', 'Ready in'),
  },
  Handicrafts: {
    material: f('Material', 'Material', 'bamboo, cane, wood'),
    technique: f('Technique', 'Technique', 'hand-woven'),
    colors: f('Colours', 'Colours'),
    size_info: f('Size / dimensions', 'Size'),
    care_instructions: f('Care instructions', 'Care'),
    customisable: f('Can be customised', 'Customisable'),
    lead_time_days: f('Days to make / dispatch', 'Ready in'),
  },
  Others: {
    material: f('Material', 'Material'),
    technique: f('Technique', 'Technique'),
    colors: f('Colours', 'Colours'),
    size_info: f('Size / measurements', 'Size'),
    care_instructions: f('Care / storage', 'Care'),
    customisable: f('Can be customised', 'Customisable'),
    lead_time_days: f('Days to make / dispatch', 'Ready in'),
  },
}

export const fieldsFor = (group) => PRODUCT_FIELDS[group] || PRODUCT_FIELDS.Others