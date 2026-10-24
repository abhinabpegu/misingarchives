import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'
import ImageUploadField from '../../components/admin/ImageUploadField'
import { mimangData as legacyData } from '../../data/learn/mimang'

const CATEGORIES = ['Geometric', 'Floral', 'Animal', 'Nature', 'Other']

const EMPTY = {
  code: '',
  gamig_name: '',
  category: '',
  english_desc: '',
  image_url: '',
  cloth_example_url: '',
  published: true,
}

// "0004" -> next free code "0005"
function nextCode(rows) {
  const max = rows.reduce((m, r) => Math.max(m, parseInt(r.code, 10) || 0), 0)
  return String(max + 1).padStart(4, '0')
}

export default function MimangAdmin() {
  usePageTitle('Admin · Mising Motifs')
  useNoIndex()
  const { isDarkMode, colors } = useTheme()
  const { cardBase } = useCardStyle()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [form, setForm] = useState(null) // null = closed, object = open
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')
  const [importing, setImporting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('mimang').select('*').order('code')
    if (error) setListError('Could not load patterns: ' + error.message)
    else { setRows(data); setListError('') }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openNew = () => {
    setFormError('')
    setForm({ ...EMPTY, code: nextCode(rows) })
  }

  const openEdit = (row) => {
    setFormError('')
    setForm({
      id: row.id,
      code: row.code,
      gamig_name: row.gamig_name,
      category: row.category || '',
      english_desc: row.english_desc || '',
      image_url: row.image_url || '',
      cloth_example_url: row.cloth_example_url || '',
      published: row.published,
    })
  }

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const handleSave = async (e) => {
    e.preventDefault()
    setFormError('')

    const code = form.code.trim()
    if (!/^\d{4}$/.test(code)) return setFormError('Code must be exactly 4 digits, e.g. 0012.')
    if (!form.gamig_name.trim()) return setFormError('Gamig name is required.')

    const blankToNull = (v) => (v && v.trim() ? v.trim() : null)
    const payload = {
      code,
      gamig_name: form.gamig_name.trim(),
      category: blankToNull(form.category),
      english_desc: blankToNull(form.english_desc),
      image_url: blankToNull(form.image_url),
      cloth_example_url: blankToNull(form.cloth_example_url),
      published: form.published,
    }

    setSaving(true)
    const query = form.id
      ? supabase.from('mimang').update(payload).eq('id', form.id)
      : supabase.from('mimang').insert(payload)
    const { error } = await query
    setSaving(false)

    if (error) {
      setFormError(error.code === '23505' ? 'That code is already used by another pattern.' : error.message)
      return
    }
    setForm(null)
    load()
  }

  const handleImport = async () => {
    const ok = window.confirm(
      `Import ${legacyData.length} patterns from the old JSON files?\n\n` +
      'Patterns with the same code will be overwritten with the JSON version.'
    )
    if (!ok) return
    setImporting(true)
    setNotice('')
    const payload = legacyData.map((m) => ({
      code: m.code,
      gamig_name: m.gamigName,
      category: m.category || null,
      english_desc: m.englishDesc || null,
      image_url: m.image || null,
      cloth_example_url: m.clothExample || null,
      published: true,
    }))
    const { error } = await supabase.from('mimang').upsert(payload, { onConflict: 'code' })
    setImporting(false)
    if (error) setListError('Import failed: ' + error.message)
    else {
      setListError('')
      setNotice(`Imported ${payload.length} patterns.`)
      load()
    }
  }

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row.gamig_name}" (${row.code}) permanently?`)) return
    const { error } = await supabase.from('mimang').delete().eq('id', row.id)
    if (error) setListError('Could not delete: ' + error.message)
    else load()
  }

  const inputStyle = {
    width: '100%',
    padding: '11px 13px',
    fontSize: '14px',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    backgroundColor: colors.bg,
    color: colors.text,
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
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

  const thumb = (url) => cloudinaryUrl(url, 'w_120,h_120,c_fill,q_auto,f_auto')

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      <Link to="/manage" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: colors.textSecondary, textDecoration: 'none', marginBottom: '20px' }}>
        <ArrowLeft size={15} /> Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '0 0 6px', color: colors.text }}>Mising Motifs</h1>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>{rows.length} patterns</p>
        </div>
        {!form && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={handleImport} disabled={importing} style={ghostBtn}>
              {importing ? 'Importing…' : 'Import from old JSON files'}
            </button>
            <button onClick={openNew} style={primaryBtn}><Plus size={15} /> New pattern</button>
          </div>
        )}
      </div>

      {listError && <p style={{ color: '#c0392b', fontSize: '13px' }}>{listError}</p>}
      {notice && <p style={{ color: colors.accentPrimary, fontSize: '13px', fontWeight: '600' }}>{notice}</p>}

      {form && (
        <form onSubmit={handleSave} style={{ ...cardBase, padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: '18px', color: colors.text }}>
            {form.id ? 'Edit pattern' : 'New pattern'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Code (4 digits)</label>
              <input style={inputStyle} value={form.code} maxLength={4} onChange={(e) => setField('code', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Gamig name</label>
              <input style={inputStyle} value={form.gamig_name} onChange={(e) => setField('gamig_name', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category} onChange={(e) => setField('category', e.target.value)}>
                <option value="">(none)</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>English description (optional)</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.english_desc} onChange={(e) => setField('english_desc', e.target.value)} />
          </div>

          <ImageUploadField label="Pattern image (square works best)" value={form.image_url} folder="misingarchives/mimang" onChange={(url) => setField('image_url', url)} />

          <ImageUploadField label="Cloth example photo" value={form.cloth_example_url} folder="misingarchives/mimang" onChange={(url) => setField('cloth_example_url', url)} />

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, marginBottom: '18px', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.published} onChange={(e) => setField('published', e.target.checked)} />
            Published (untick to keep it as a hidden draft)
          </label>

          {formError && <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#c0392b' }}>{formError}</p>}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={saving} style={{ ...primaryBtn, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={() => setForm(null)} style={ghostBtn}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p style={{ color: colors.textSecondary }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: colors.textSecondary, fontSize: '14px' }}>No patterns yet. Click “New pattern” to add the first one.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rows.map((r) => (
            <div key={r.id} style={{ ...cardBase, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', backgroundColor: colors.accentLight, flexShrink: 0 }}>
                {r.image_url && <img src={thumb(r.image_url)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
              </div>
              <div style={{ flex: 1, minWidth: '160px' }}>
                <p style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: '700', color: colors.text }}>
                  {r.gamig_name}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>
                  {r.code}{r.category ? ` · ${r.category}` : ''}{!r.published ? ' · DRAFT' : ''}
                </p>
              </div>
              <button onClick={() => openEdit(r)} style={ghostBtn}><Pencil size={13} /> Edit</button>
              <button onClick={() => handleDelete(r)} style={{ ...ghostBtn, color: '#c0392b' }}><Trash2 size={13} /> Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}