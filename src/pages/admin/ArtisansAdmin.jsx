import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Key, Trash2, Pause, Play } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'

const CRAFTS = [
  { value: 'weaver', label: 'Weaver' },
  { value: 'ornament-maker', label: 'Ornament maker' },
  { value: 'tailor', label: 'Tailor' },
  { value: 'other', label: 'Other' },
]

const EMPTY = {
  display_name: '', username: '', slug: '', password: '',
  business_name: '', village: '', district: '', state: 'Assam',
  whatsapp: '', phone: '', instagram: '', craft_types: ['weaver'],
}

const slugify = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const suggestUsername = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '').slice(0, 30)

// easy-to-read password: no 0/O, 1/l/I
function genPassword(len = 10) {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = crypto.getRandomValues(new Uint32Array(len))
  return Array.from(bytes, (b) => chars[b % chars.length]).join('')
}

async function callFn(body) {
  const { data, error } = await supabase.functions.invoke('manage-artisan', { body })
  if (error) {
    let msg = error.message
    try {
      const j = await error.context.json()
      if (j?.error) msg = j.error
    } catch { /* keep default message */ }
    throw new Error(msg)
  }
  if (data?.error) throw new Error(data.error)
  return data
}

export default function ArtisansAdmin() {
  usePageTitle('Admin · Artisans')
  useNoIndex()
  const { isDarkMode, colors } = useTheme()
  const { cardBase } = useCardStyle()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [form, setForm] = useState(null)
  const [userEditedUsername, setUserEditedUsername] = useState(false)
  const [userEditedSlug, setUserEditedSlug] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [credentials, setCredentials] = useState(null) // { name, username, password }
  const [copied, setCopied] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('artisans')
      .select('*, artisan_accounts(username)')
      .order('created_at', { ascending: false })
    if (error) setListError('Could not load artisans: ' + error.message)
    else { setRows(data); setListError('') }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const usernameOf = (row) => {
    const a = row.artisan_accounts
    return (Array.isArray(a) ? a[0]?.username : a?.username) || '—'
  }

  const openNew = () => {
    setFormError('')
    setCredentials(null)
    setUserEditedUsername(false)
    setUserEditedSlug(false)
    setForm({ ...EMPTY, password: genPassword() })
  }

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const onNameChange = (value) => {
    setForm((f) => ({
      ...f,
      display_name: value,
      username: userEditedUsername ? f.username : suggestUsername(value),
      slug: userEditedSlug ? f.slug : slugify(value),
    }))
  }

  const toggleCraft = (value) => {
    setForm((f) => ({
      ...f,
      craft_types: f.craft_types.includes(value)
        ? f.craft_types.filter((c) => c !== value)
        : [...f.craft_types, value],
    }))
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!form.display_name.trim()) return setFormError('Name is required.')
    if (!/^[a-z0-9]{3,30}$/.test(form.username)) return setFormError('Username: 3-30 lowercase letters or numbers, no spaces.')
    if (form.password.length < 8) return setFormError('Password must be at least 8 characters.')

    setSaving(true)
    try {
      await callFn({ action: 'create', ...form })
      setCredentials({ name: form.display_name, username: form.username, password: form.password })
      setCopied(false)
      setForm(null)
      load()
    } catch (err) {
      setFormError(err.message)
    }
    setSaving(false)
  }

  const handleReset = async (row) => {
    if (!window.confirm(`Set a NEW password for ${row.display_name}? The old one stops working.`)) return
    const password = genPassword()
    try {
      await callFn({ action: 'reset_password', artisan_id: row.id, password })
      setCredentials({ name: row.display_name, username: usernameOf(row), password })
      setCopied(false)
    } catch (err) {
      setListError(err.message)
    }
  }

  const handleToggle = async (row) => {
    const next = row.status === 'active' ? 'suspended' : 'active'
    const { error } = await supabase.from('artisans').update({ status: next }).eq('id', row.id)
    if (error) setListError(error.message)
    else load()
  }

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete ${row.display_name} and ALL their products and their login? This cannot be undone.`)) return
    try {
      await callFn({ action: 'delete', artisan_id: row.id })
      load()
    } catch (err) {
      setListError(err.message)
    }
  }

  const copyCredentials = async () => {
    const text =
      `Mising Archives artisan login\n` +
      `Website: https://www.misingarchives.co.in/artisan/login\n` +
      `Username: ${credentials.username}\nPassword: ${credentials.password}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch { /* ignore */ }
  }

  const inputStyle = {
    width: '100%', padding: '11px 13px', fontSize: '14px', border: `1px solid ${colors.border}`,
    borderRadius: '8px', backgroundColor: colors.bg, color: colors.text, outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box',
  }
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '700', color: colors.textSecondary, marginBottom: '6px' }
  const primaryBtn = {
    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '13px',
    fontWeight: '700', backgroundColor: colors.accentPrimary, color: isDarkMode ? colors.bg : '#fff',
    border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit',
  }
  const ghostBtn = {
    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 12px', fontSize: '12px',
    fontWeight: '700', color: colors.textSecondary, backgroundColor: colors.bgSecondary,
    border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit',
  }
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      <Link to="/manage" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: colors.textSecondary, textDecoration: 'none', marginBottom: '20px' }}>
        <ArrowLeft size={15} /> Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '0 0 6px', color: colors.text }}>Artisans</h1>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>{rows.length} registered</p>
        </div>
        {!form && <button onClick={openNew} style={primaryBtn}><Plus size={15} /> Add artisan</button>}
      </div>

      {listError && <p style={{ color: '#c0392b', fontSize: '13px' }}>{listError}</p>}

      {credentials && (
        <div style={{ ...cardBase, padding: '20px', marginBottom: '24px', borderColor: colors.accentPrimary }}>
          <p style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: '700', color: colors.text }}>
            Login for {credentials.name}
          </p>
          <p style={{ margin: '0 0 4px', fontSize: '14px', color: colors.text, fontFamily: 'ui-monospace, Menlo, Consolas, monospace' }}>
            Username: {credentials.username}
          </p>
          <p style={{ margin: '0 0 12px', fontSize: '14px', color: colors.text, fontFamily: 'ui-monospace, Menlo, Consolas, monospace' }}>
            Password: {credentials.password}
          </p>
          <p style={{ margin: '0 0 12px', fontSize: '12px', color: colors.textTertiary }}>
            Send these to the artisan now. The password is not stored anywhere you can read it again; you can only set a new one.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={copyCredentials} style={primaryBtn}>{copied ? 'Copied ✓' : 'Copy login message'}</button>
            <button onClick={() => setCredentials(null)} style={ghostBtn}>Done</button>
          </div>
        </div>
      )}

      {form && (
        <form onSubmit={handleCreate} style={{ ...cardBase, padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: '18px', color: colors.text }}>New artisan</h2>

          <div style={grid}>
            <div>
              <label style={labelStyle}>Full name *</label>
              <input style={inputStyle} value={form.display_name} onChange={(e) => onNameChange(e.target.value)} placeholder="Rashmi Taye" />
            </div>
            <div>
              <label style={labelStyle}>Business / brand name</label>
              <input style={inputStyle} value={form.business_name} onChange={(e) => setField('business_name', e.target.value)} />
            </div>
          </div>

          <div style={grid}>
            <div>
              <label style={labelStyle}>Username (for login) *</label>
              <input style={inputStyle} value={form.username} autoCapitalize="none"
                onChange={(e) => { setUserEditedUsername(true); setField('username', e.target.value.toLowerCase()) }} />
            </div>
            <div>
              <label style={labelStyle}>Password * (auto-generated)</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input style={inputStyle} value={form.password} onChange={(e) => setField('password', e.target.value)} />
                <button type="button" style={ghostBtn} onClick={() => setField('password', genPassword())}>New</button>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Page address</label>
              <input style={inputStyle} value={form.slug}
                onChange={(e) => { setUserEditedSlug(true); setField('slug', slugify(e.target.value)) }} />
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: colors.textTertiary }}>/shop/artisan/{form.slug || '…'}</p>
            </div>
          </div>

          <div style={grid}>
            <div>
              <label style={labelStyle}>Village / town</label>
              <input style={inputStyle} value={form.village} onChange={(e) => setField('village', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>District</label>
              <input style={inputStyle} value={form.district} onChange={(e) => setField('district', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>State</label>
              <input style={inputStyle} value={form.state} onChange={(e) => setField('state', e.target.value)} />
            </div>
          </div>

          <div style={grid}>
            <div>
              <label style={labelStyle}>WhatsApp number</label>
              <input style={inputStyle} value={form.whatsapp} placeholder="+91 …" onChange={(e) => setField('whatsapp', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Phone (if different)</label>
              <input style={inputStyle} value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Instagram</label>
              <input style={inputStyle} value={form.instagram} placeholder="username or link" onChange={(e) => setField('instagram', e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>What do they make?</label>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {CRAFTS.map((c) => (
                <label key={c.value} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: colors.textSecondary, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.craft_types.includes(c.value)} onChange={() => toggleCraft(c.value)} />
                  {c.label}
                </label>
              ))}
            </div>
          </div>

          <p style={{ margin: '0 0 14px', fontSize: '12px', color: colors.textTertiary }}>
            Only confirm their phone/WhatsApp can be shown publicly if the artisan agreed to it. They can finish the rest of their profile themselves after logging in.
          </p>

          {formError && <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#c0392b' }}>{formError}</p>}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={saving} style={{ ...primaryBtn, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Creating…' : 'Create artisan & login'}
            </button>
            <button type="button" onClick={() => setForm(null)} style={ghostBtn}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p style={{ color: colors.textSecondary }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: colors.textSecondary, fontSize: '14px' }}>No artisans yet. Click “Add artisan” to register the first one.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rows.map((r) => (
            <div key={r.id} style={{ ...cardBase, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{ margin: '0 0 3px', fontSize: '15px', fontWeight: '700', color: colors.text }}>
                  {r.display_name}
                  <span style={{
                    marginLeft: '10px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
                    letterSpacing: '0.6px', padding: '2px 7px', borderRadius: '5px',
                    color: r.status === 'active' ? colors.accentPrimary : '#c0392b',
                    backgroundColor: r.status === 'active' ? colors.accentLight : 'rgba(192,57,43,0.1)',
                  }}>{r.status}</span>
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>
                  @{usernameOf(r)} · {[r.village, r.district].filter(Boolean).join(', ') || 'location not set'}
                </p>
              </div>
              <button onClick={() => handleReset(r)} style={ghostBtn}><Key size={13} /> New password</button>
              <button onClick={() => handleToggle(r)} style={ghostBtn}>
                {r.status === 'active' ? <><Pause size={13} /> Suspend</> : <><Play size={13} /> Activate</>}
              </button>
              <button onClick={() => handleDelete(r)} style={{ ...ghostBtn, color: '#c0392b' }}><Trash2 size={13} /> Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}