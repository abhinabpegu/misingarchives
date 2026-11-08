import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Pencil, Trash2, Search } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { useFormStyles } from '../../utils/formStyles'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'
import ImageUploadField from '../../components/admin/ImageUploadField'

const EMPTY = { english_name: '', mising_name: '', image_url: '' }

export default function TermsAdmin() {
  usePageTitle('Admin · Mising Terms')
  useNoIndex()
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()
  const { inputStyle, labelStyle, primaryBtn, ghostBtn, grid } = useFormStyles()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [form, setForm] = useState(null) // null = closed
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')
  const [query, setQuery] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('mising_terms').select('*').order('created_at', { ascending: false })
    if (error) setListError('Could not load terms: ' + error.message)
    else { setRows(data); setListError('') }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      r.english_name.toLowerCase().includes(q) || r.mising_name.toLowerCase().includes(q))
  }, [rows, query])

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const openNew = () => { setFormError(''); setNotice(''); setForm({ ...EMPTY }) }
  const openEdit = (r) => {
    setFormError(''); setNotice('')
    setForm({ id: r.id, english_name: r.english_name, mising_name: r.mising_name, image_url: r.image_url || '' })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setFormError('')
    const english_name = form.english_name.trim()
    const mising_name = form.mising_name.trim()
    if (!english_name) return setFormError('English name is required.')
    if (!mising_name) return setFormError('Mising name is required.')

    const payload = { english_name, mising_name, image_url: form.image_url?.trim() || null }

    setSaving(true)
    const { error } = form.id
      ? await supabase.from('mising_terms').update(payload).eq('id', form.id)
      : await supabase.from('mising_terms').insert(payload)
    setSaving(false)
    if (error) return setFormError(error.message)

    if (form.id) {
      setForm(null)
    } else {
      // stay open for fast data entry
      setNotice(`Added “${english_name}”. Add the next one.`)
      setForm({ ...EMPTY })
    }
    load()
  }

  const handleDelete = async (r) => {
    if (!window.confirm(`Delete “${r.english_name}” permanently?`)) return
    const { error } = await supabase.from('mising_terms').delete().eq('id', r.id)
    if (error) setListError(error.message)
    else load()
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      <Link to="/manage" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: colors.textSecondary, textDecoration: 'none', marginBottom: '20px' }}>
        <ArrowLeft size={15} /> Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '0 0 6px', color: colors.text }}>Mising Terms</h1>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>{rows.length} terms</p>
        </div>
        {!form && <button onClick={openNew} style={primaryBtn}><Plus size={15} /> Add term</button>}
      </div>

      {listError && <p style={{ color: '#c0392b', fontSize: '13px' }}>{listError}</p>}
      {notice && <p style={{ color: colors.accentPrimary, fontSize: '13px', fontWeight: '600' }}>{notice}</p>}

      {form && (
        <form onSubmit={handleSave} style={{ ...cardBase, padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: '18px', color: colors.text }}>
            {form.id ? 'Edit term' : 'New term'}
          </h2>

          <div style={grid}>
            <div>
              <label style={labelStyle}>English name *</label>
              <input style={inputStyle} value={form.english_name} autoFocus
                onChange={(e) => set('english_name', e.target.value)} placeholder="Water" />
            </div>
            <div>
              <label style={labelStyle}>Mising name *</label>
              <input style={inputStyle} value={form.mising_name}
                onChange={(e) => set('mising_name', e.target.value)} placeholder="Ápín" />
            </div>
          </div>

          <ImageUploadField label="Picture (optional)" value={form.image_url}
            folder="misingarchives/terms" onChange={(u) => set('image_url', u)} />

          {formError && <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#c0392b' }}>{formError}</p>}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={saving} style={{ ...primaryBtn, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : form.id ? 'Save changes' : 'Save & add another'}
            </button>
            <button type="button" onClick={() => { setForm(null); setNotice('') }} style={ghostBtn}>
              {form.id ? 'Cancel' : 'Done'}
            </button>
          </div>
        </form>
      )}

      {rows.length > 0 && (
        <div style={{ position: 'relative', maxWidth: '360px', marginBottom: '16px' }}>
          <Search size={16} color={colors.textTertiary} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input style={{ ...inputStyle, paddingLeft: '40px' }} placeholder="Search terms…"
            value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      )}

      {loading ? (
        <p style={{ color: colors.textSecondary }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: colors.textSecondary, fontSize: '14px' }}>No terms yet. Click “Add term” to add the first one.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {shown.map((r) => (
            <div key={r.id} style={{ ...cardBase, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', backgroundColor: colors.accentLight, flexShrink: 0 }}>
                {r.image_url && (
                  <img src={cloudinaryUrl(r.image_url, 'w_120,h_120,c_fill,q_auto,f_auto')} alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: '160px' }}>
                <p style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: '700', color: colors.text }}>{r.mising_name}</p>
                <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>{r.english_name}</p>
              </div>
              <button onClick={() => openEdit(r)} style={ghostBtn}><Pencil size={13} /> Edit</button>
              <button onClick={() => handleDelete(r)} style={{ ...ghostBtn, color: '#c0392b' }}><Trash2 size={13} /> Delete</button>
            </div>
          ))}
          {shown.length === 0 && <p style={{ color: colors.textSecondary, fontSize: '14px' }}>No matches.</p>}
        </div>
      )}
    </div>
  )
}