import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useArtisan } from '../../components/RequireArtisan'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { useFormStyles } from '../../utils/formStyles'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'
import ImageUploadField from '../../components/admin/ImageUploadField'

const CRAFTS = [
  { value: 'weaver', label: 'Weaver' },
  { value: 'ornament-maker', label: 'Ornament maker' },
  { value: 'tailor', label: 'Tailor' },
  { value: 'other', label: 'Other' },
]

const nul = (v) => (v && String(v).trim() ? String(v).trim() : null)
const toList = (s) => s.split(',').map((x) => x.trim()).filter(Boolean)

export default function ArtisanProfile() {
  usePageTitle('My Profile')
  useNoIndex()
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()
  const { inputStyle, labelStyle, primaryBtn, grid } = useFormStyles()
  const { artisan, refresh } = useArtisan()

  const [f, setF] = useState({
    display_name: artisan.display_name || '',
    business_name: artisan.business_name || '',
    bio: artisan.bio || '',
    photo_url: artisan.photo_url || '',
    craft_types: artisan.craft_types || [],
    village: artisan.village || '',
    district: artisan.district || '',
    state: artisan.state || '',
    ships_across_india: artisan.ships_across_india,
    delivery_notes: artisan.delivery_notes || '',
    whatsapp: artisan.whatsapp || '',
    phone: artisan.phone || '',
    email: artisan.email || '',
    instagram: artisan.instagram || '',
    facebook: artisan.facebook || '',
    website: artisan.website || '',
    languages: (artisan.languages || []).join(', '),
    accepting_orders: artisan.accepting_orders,
    takes_custom_orders: artisan.takes_custom_orders,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const set = (name, value) => { setSaved(false); setF((x) => ({ ...x, [name]: value })) }
  const toggleCraft = (v) =>
    set('craft_types', f.craft_types.includes(v) ? f.craft_types.filter((c) => c !== v) : [...f.craft_types, v])

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    if (!f.display_name.trim()) return setError('Name is required.')
    setSaving(true)
    const { error } = await supabase.from('artisans').update({
      display_name: f.display_name.trim(),
      business_name: nul(f.business_name),
      bio: nul(f.bio),
      photo_url: nul(f.photo_url),
      craft_types: f.craft_types,
      village: nul(f.village),
      district: nul(f.district),
      state: nul(f.state),
      ships_across_india: f.ships_across_india,
      delivery_notes: nul(f.delivery_notes),
      whatsapp: nul(f.whatsapp),
      phone: nul(f.phone),
      email: nul(f.email),
      instagram: nul(f.instagram),
      facebook: nul(f.facebook),
      website: nul(f.website),
      languages: toList(f.languages),
      accepting_orders: f.accepting_orders,
      takes_custom_orders: f.takes_custom_orders,
    }).eq('id', artisan.id)
    setSaving(false)
    if (error) return setError(error.message)
    setSaved(true)
    refresh()
  }

  const check = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, cursor: 'pointer' }
  const text = (name, label, props = {}) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} value={f[name]} onChange={(e) => set(name, e.target.value)} {...props} />
    </div>
  )

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      <Link to="/artisan" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: colors.textSecondary, textDecoration: 'none', marginBottom: '20px' }}>
        <ArrowLeft size={15} /> Dashboard
      </Link>
      <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '0 0 6px', color: colors.text }}>My profile</h1>
      <p style={{ margin: '0 0 24px', fontSize: '13px', color: colors.textTertiary }}>
        Your page address is <strong>/shop/artisan/{artisan.slug}</strong>. Only Mising Archives can change it.
      </p>

      <form onSubmit={handleSave} style={{ ...cardBase, padding: '24px' }}>
        <ImageUploadField label="Your photo (or logo)" value={f.photo_url} folder="misingarchives/artisans" onChange={(u) => set('photo_url', u)} />

        <div style={grid}>
          {text('display_name', 'Full name *')}
          {text('business_name', 'Business / brand name')}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>About you</label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={5} value={f.bio} onChange={(e) => set('bio', e.target.value)}
            placeholder="Your story, how you learned the craft, what makes your work special" />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>What do you make?</label>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {CRAFTS.map((c) => (
              <label key={c.value} style={check}>
                <input type="checkbox" checked={f.craft_types.includes(c.value)} onChange={() => toggleCraft(c.value)} />
                {c.label}
              </label>
            ))}
          </div>
        </div>

        <div style={grid}>
          {text('village', 'Village / town')}
          {text('district', 'District')}
          {text('state', 'State')}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          <label style={check}><input type="checkbox" checked={f.accepting_orders} onChange={(e) => set('accepting_orders', e.target.checked)} /> I am accepting orders</label>
          <label style={check}><input type="checkbox" checked={f.takes_custom_orders} onChange={(e) => set('takes_custom_orders', e.target.checked)} /> I take custom orders</label>
          <label style={check}><input type="checkbox" checked={f.ships_across_india} onChange={(e) => set('ships_across_india', e.target.checked)} /> I ship across India</label>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Delivery notes</label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={f.delivery_notes} onChange={(e) => set('delivery_notes', e.target.value)}
            placeholder="e.g. Ships in 5-7 days by speed post. Buyer pays shipping." />
        </div>

        <div style={grid}>
          {text('whatsapp', 'WhatsApp number', { placeholder: '+91 …' })}
          {text('phone', 'Phone (if different)')}
          {text('email', 'Email', { type: 'email' })}
        </div>
        <div style={grid}>
          {text('instagram', 'Instagram', { placeholder: 'username or link' })}
          {text('facebook', 'Facebook')}
          {text('website', 'Website')}
        </div>

        <div style={{ marginBottom: '18px' }}>
          {text('languages', 'Languages you speak (comma separated)', { placeholder: 'Mising, Assamese, English' })}
        </div>

        <p style={{ margin: '0 0 14px', fontSize: '12px', color: colors.textTertiary }}>
          Your phone, WhatsApp and email are shown publicly in the shop. Leave blank anything you don't want shown.
        </p>

        {error && <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#c0392b' }}>{error}</p>}
        {saved && <p style={{ margin: '0 0 14px', fontSize: '13px', color: colors.accentPrimary, fontWeight: '600' }}>Saved ✓</p>}

        <button type="submit" disabled={saving} style={{ ...primaryBtn, opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : 'Save profile'}
        </button>
      </form>
    </div>
  )
}