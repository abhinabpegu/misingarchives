import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useArtisan } from '../../components/RequireArtisan'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { useFormStyles } from '../../utils/formStyles'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'
import { fieldsFor } from '../../utils/shop'
import ImageUploadField from '../../components/admin/ImageUploadField'

const MAX_IMAGES = 6

const EMPTY = {
  title: '', category_slug: '', description: '',
  price_type: 'fixed', price: '',
  availability: 'in_stock', lead_time_days: '', customisable: false,
  material: '', technique: '', size_info: '', colors: '', motif_codes: '', care_instructions: '',
  images: [], published: true,
}

const nul = (v) => (v && String(v).trim() ? String(v).trim() : null)
const money = (n) => `₹${Number(n).toLocaleString('en-IN')}`

export default function ArtisanProducts() {
  usePageTitle('My Products')
  useNoIndex()
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()
  const { inputStyle, labelStyle, primaryBtn, ghostBtn, grid } = useFormStyles()
  const { artisan } = useArtisan()

  const [rows, setRows] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const [p, c] = await Promise.all([
      supabase.from('shop_products').select('*').eq('artisan_id', artisan.id).order('created_at', { ascending: false }),
      supabase.from('shop_categories').select('*').order('group_name').order('sort_order'),
    ])
    if (p.error) setListError('Could not load products: ' + p.error.message)
    else { setRows(p.data); setListError('') }
    if (!c.error) setCategories(c.data)
    setLoading(false)
  }, [artisan.id])

  useEffect(() => { load() }, [load])

  const catName = (slug) => categories.find((c) => c.slug === slug)?.name || slug
  const groupOf = (slug) => categories.find((c) => c.slug === slug)?.group_name
  const groups = [...new Set(categories.map((c) => c.group_name))]

  const openNew = () => { setFormError(''); setForm({ ...EMPTY }) }
  const openEdit = (r) => {
    setFormError('')
    setForm({
      id: r.id, title: r.title, category_slug: r.category_slug, description: r.description || '',
      price_type: r.price_type, price: r.price ?? '',
      availability: r.availability, lead_time_days: r.lead_time_days ?? '', customisable: r.customisable,
      material: r.material || '', technique: r.technique || '', size_info: r.size_info || '',
      colors: r.colors || '', motif_codes: (r.motif_codes || []).join(', '),
      care_instructions: r.care_instructions || '', images: r.images || [], published: r.published,
    })
  }

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }))
  const setImage = (i, url) =>
    setForm((f) => {
      const images = [...f.images]
      if (url) images[i] = url
      else images.splice(i, 1)
      return { ...f, images }
    })

  const handleSave = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!form.title.trim()) return setFormError('Title is required.')
    if (!form.category_slug) return setFormError('Please choose a category.')
    if (form.price_type !== 'on_request' && (form.price === '' || Number(form.price) < 0)) {
      return setFormError('Please enter a price, or choose "Price on request".')
    }

    // Only save the fields that apply to this category; clear the rest.
    const saveFields = fieldsFor(groupOf(form.category_slug))
    const motifs = saveFields.motif_codes
      ? form.motif_codes.split(',').map((x) => x.trim()).filter(Boolean)
      : []
    if (motifs.some((m) => !/^\d{4}$/.test(m))) return setFormError('Motif codes must be 4 digits each, e.g. 0004, 0006.')

    const payload = {
      title: form.title.trim(),
      category_slug: form.category_slug,
      description: nul(form.description),
      price_type: form.price_type,
      price: form.price_type === 'on_request' || form.price === '' ? null : Number(form.price),
      availability: form.availability,
      lead_time_days: form.lead_time_days === '' ? null : parseInt(form.lead_time_days, 10),
      customisable: saveFields.customisable ? form.customisable : false,
      material: saveFields.material ? nul(form.material) : null,
      technique: saveFields.technique ? nul(form.technique) : null,
      size_info: saveFields.size_info ? nul(form.size_info) : null,
      colors: saveFields.colors ? nul(form.colors) : null,
      motif_codes: motifs,
      care_instructions: saveFields.care_instructions ? nul(form.care_instructions) : null,
      images: form.images.filter(Boolean),
      published: form.published,
    }

    setSaving(true)
    const { error } = form.id
      ? await supabase.from('shop_products').update(payload).eq('id', form.id)
      : await supabase.from('shop_products').insert({ ...payload, artisan_id: artisan.id })
    setSaving(false)
    if (error) return setFormError(error.message)
    setForm(null)
    load()
  }

  const handleDelete = async (r) => {
    if (!window.confirm(`Delete "${r.title}" permanently?`)) return
    const { error } = await supabase.from('shop_products').delete().eq('id', r.id)
    if (error) setListError(error.message)
    else load()
  }

  const handleToggle = async (r) => {
    const { error } = await supabase.from('shop_products').update({ published: !r.published }).eq('id', r.id)
    if (error) setListError(error.message)
    else load()
  }

  const check = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, cursor: 'pointer' }

  // Which fields to show for the currently selected category
  const fields = fieldsFor(groupOf(form?.category_slug))

  const field = (name, label, props = {}) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} value={form[name]} onChange={(e) => set(name, e.target.value)} {...props} />
    </div>
  )

  const cfgField = (name) =>
    fields[name] && (
      <div key={name}>
        <label style={labelStyle}>{fields[name].label}</label>
        <input
          style={inputStyle}
          value={form[name]}
          placeholder={fields[name].placeholder}
          onChange={(e) => set(name, e.target.value)}
        />
      </div>
    )

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      <Link to="/artisan" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: colors.textSecondary, textDecoration: 'none', marginBottom: '20px' }}>
        <ArrowLeft size={15} /> Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '0 0 6px', color: colors.text }}>My products</h1>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>{rows.length} products</p>
        </div>
        {!form && <button onClick={openNew} style={primaryBtn}><Plus size={15} /> Add product</button>}
      </div>

      {listError && <p style={{ color: '#c0392b', fontSize: '13px' }}>{listError}</p>}

      {form && (
        <form onSubmit={handleSave} style={{ ...cardBase, padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: '18px', color: colors.text }}>{form.id ? 'Edit product' : 'New product'}</h2>

          <div style={grid}>
            {field('title', 'Title *', { placeholder: 'Handwoven Ege Gasor set' })}
            <div>
              <label style={labelStyle}>Category *</label>
              <select style={inputStyle} value={form.category_slug} onChange={(e) => set('category_slug', e.target.value)}>
                <option value="">Choose…</option>
                {groups.map((g) => (
                  <optgroup key={g} label={g}>
                    {categories.filter((c) => c.group_name === g).map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </div>

          <div style={grid}>
            <div>
              <label style={labelStyle}>Price type</label>
              <select style={inputStyle} value={form.price_type} onChange={(e) => set('price_type', e.target.value)}>
                <option value="fixed">Fixed price</option>
                <option value="starting_from">Starting from</option>
                <option value="on_request">Price on request</option>
              </select>
            </div>
            {form.price_type !== 'on_request' && field('price', 'Price (₹)', { type: 'number', min: 0, step: '0.01' })}
            <div>
              <label style={labelStyle}>Availability</label>
              <select style={inputStyle} value={form.availability} onChange={(e) => set('availability', e.target.value)}>
                <option value="in_stock">In stock</option>
                <option value="made_to_order">Made to order</option>
                <option value="sold_out">Sold out</option>
              </select>
            </div>
            {field('lead_time_days', fields.lead_time_days.label, { type: 'number', min: 0 })}
          </div>

          <div style={grid}>
            {cfgField('material')}
            {cfgField('technique')}
            {cfgField('colors')}
          </div>

          <div style={grid}>
            {cfgField('size_info')}
            {cfgField('motif_codes')}
          </div>

          {fields.care_instructions && (
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>{fields.care_instructions.label}</label>
              <textarea
                style={{ ...inputStyle, resize: 'vertical' }}
                rows={2}
                value={form.care_instructions}
                placeholder={fields.care_instructions.placeholder}
                onChange={(e) => set('care_instructions', e.target.value)}
              />
            </div>
          )}

          <p style={{ ...labelStyle, marginBottom: '10px' }}>Photos (up to {MAX_IMAGES}; the first one is the main photo)</p>
          {form.images.map((url, i) => (
            <ImageUploadField key={i} label={`Photo ${i + 1}`} value={url} folder="misingarchives/shop" aspect={1}
              onChange={(u) => setImage(i, u)} />
          ))}
          {form.images.length < MAX_IMAGES && (
            <ImageUploadField key={`new-${form.images.length}`} label={`Photo ${form.images.length + 1}`} value="" folder="misingarchives/shop" aspect={1}
              onChange={(u) => u && setImage(form.images.length, u)} />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '4px 0 18px' }}>
            {fields.customisable && (
              <label style={check}>
                <input type="checkbox" checked={form.customisable} onChange={(e) => set('customisable', e.target.checked)} /> {fields.customisable.label}
              </label>
            )}
            <label style={check}><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} /> Published (untick to keep as a hidden draft)</label>
          </div>

          {formError && <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#c0392b' }}>{formError}</p>}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={saving} style={{ ...primaryBtn, opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving…' : 'Save product'}</button>
            <button type="button" onClick={() => setForm(null)} style={ghostBtn}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p style={{ color: colors.textSecondary }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: colors.textSecondary, fontSize: '14px' }}>No products yet. Click “Add product” to list your first one.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rows.map((r) => (
            <div key={r.id} style={{ ...cardBase, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', backgroundColor: colors.accentLight, flexShrink: 0 }}>
               {r.images?.[0] && <img src={cloudinaryUrl(r.images[0], 'w_120,h_120,c_fit,q_auto,f_auto')} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />}
              </div>
              <div style={{ flex: 1, minWidth: '160px' }}>
                <p style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: '700', color: colors.text }}>{r.title}</p>
                <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>
                  {catName(r.category_slug)} · {r.price_type === 'on_request' ? 'Price on request' : `${r.price_type === 'starting_from' ? 'From ' : ''}${money(r.price)}`}
                  {r.availability === 'sold_out' ? ' · SOLD OUT' : ''}{!r.published ? ' · DRAFT' : ''}
                </p>
              </div>
              <button onClick={() => handleToggle(r)} style={ghostBtn}>{r.published ? <><EyeOff size={13} /> Hide</> : <><Eye size={13} /> Publish</>}</button>
              <button onClick={() => openEdit(r)} style={ghostBtn}><Pencil size={13} /> Edit</button>
              <button onClick={() => handleDelete(r)} style={{ ...ghostBtn, color: '#c0392b' }}><Trash2 size={13} /> Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}