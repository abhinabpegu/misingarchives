import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { useFormStyles } from '../../utils/formStyles'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useNoIndex } from '../../hooks/useNoIndex'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'
import ImageUploadField from '../../components/admin/ImageUploadField'
import { booksData as staticBooks } from '../../data/books'

const LANGUAGES = ['English', 'Mising', 'Assamese', 'Multilingual']
const TAG_SUGGESTIONS = ['History', 'Culture', 'Language', 'Folklore', 'Grammar', 'Reference', 'Literature', 'Biography']

const EMPTY = {
  code: '', title: '', author: '', language: 'English', tags: '',
  drive_link: '', archived_by: '', cover_image_url: '', published: true,
}

const toTags = (s) => s.split(',').map((t) => t.trim()).filter(Boolean)
const nul = (v) => (v && v.trim() ? v.trim() : null)

export default function BooksAdmin() {
  usePageTitle('Admin · Books')
  useNoIndex()
  const { colors } = useTheme()
  const { cardBase } = useCardStyle()
  const { inputStyle, labelStyle, primaryBtn, ghostBtn, grid } = useFormStyles()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [importing, setImporting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('books').select('*').order('code')
    if (error) setListError('Could not load books: ' + error.message)
    else { setRows(data); setListError('') }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  // next free code across BOTH the database and books.js
  const nextCode = () => {
    const all = [...rows.map((r) => r.code), ...staticBooks.map((b) => b.code)]
    const max = all.reduce((m, c) => Math.max(m, parseInt(c, 10) || 0), 0)
    return String(max + 1).padStart(4, '0')
  }

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }))
  const openNew = () => { setFormError(''); setNotice(''); setForm({ ...EMPTY, code: nextCode() }) }
  const openEdit = (r) => {
    setFormError(''); setNotice('')
    setForm({
      id: r.id, code: r.code, title: r.title, author: r.author, language: r.language,
      tags: (r.tags || []).join(', '), drive_link: r.drive_link || '',
      archived_by: r.archived_by || '', cover_image_url: r.cover_image_url || '', published: r.published,
    })
  }

  const addTag = (t) => {
    const list = toTags(form.tags)
    if (!list.includes(t)) set('tags', [...list, t].join(', '))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setFormError('')
    const code = form.code.trim()
    if (!/^\d{4}$/.test(code)) return setFormError('Code must be exactly 4 digits, e.g. 0015.')
    if (!form.title.trim()) return setFormError('Title is required.')
    if (!form.author.trim()) return setFormError('Author is required.')
    if (!form.drive_link.trim()) return setFormError('Download link is required.')

    const payload = {
      code,
      title: form.title.trim(),
      author: form.author.trim(),
      language: form.language.trim(),
      tags: toTags(form.tags),
      drive_link: form.drive_link.trim(),
      archived_by: nul(form.archived_by),
      cover_image_url: nul(form.cover_image_url),
      published: form.published,
    }

    setSaving(true)
    const { error } = form.id
      ? await supabase.from('books').update(payload).eq('id', form.id)
      : await supabase.from('books').insert(payload)
    setSaving(false)

    if (error) {
      setFormError(error.code === '23505' ? 'That code is already used by another book.' : error.message)
      return
    }
    setNotice(`Saved “${payload.title}”.`)
    setForm(null)
    load()
  }

  const handleDelete = async (r) => {
    if (!window.confirm(`Delete “${r.title}” (${r.code}) permanently?`)) return
    const { error } = await supabase.from('books').delete().eq('id', r.id)
    if (error) setListError(error.message)
    else load()
  }

  const handleImport = async () => {
    if (!window.confirm(`Copy the ${staticBooks.length} books from books.js into the database?\nBooks with the same code will be overwritten.`)) return
    setImporting(true)
    const payload = staticBooks.map((b) => ({
      code: b.code, title: b.title, author: b.author, language: b.language, tags: b.tags,
      drive_link: b.driveLink, archived_by: b.archivedBy || null, cover_image_url: b.coverImage || null,
      published: true,
    }))
    const { error } = await supabase.from('books').upsert(payload, { onConflict: 'code' })
    setImporting(false)
    if (error) setListError('Import failed: ' + error.message)
    else { setNotice(`Imported ${payload.length} books.`); load() }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      <Link to="/manage" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: colors.textSecondary, textDecoration: 'none', marginBottom: '20px' }}>
        <ArrowLeft size={15} /> Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '700', margin: '0 0 6px', color: colors.text }}>Books</h1>
          <p style={{ margin: 0, fontSize: '13px', color: colors.textTertiary }}>
            {rows.length} in the database · {staticBooks.length} in books.js
          </p>
        </div>
        {!form && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={handleImport} disabled={importing} style={ghostBtn}>
              {importing ? 'Importing…' : 'Import from books.js'}
            </button>
            <button onClick={openNew} style={primaryBtn}><Plus size={15} /> Add book</button>
          </div>
        )}
      </div>

      {listError && <p style={{ color: '#c0392b', fontSize: '13px' }}>{listError}</p>}
      {notice && <p style={{ color: colors.accentPrimary, fontSize: '13px', fontWeight: '600' }}>{notice}</p>}

      {form && (
        <form onSubmit={handleSave} style={{ ...cardBase, padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: '18px', color: colors.text }}>{form.id ? 'Edit book' : 'New book'}</h2>

          <div style={grid}>
            <div>
              <label style={labelStyle}>Code (4 digits) *</label>
              <input style={inputStyle} value={form.code} maxLength={4} onChange={(e) => set('code', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Language *</label>
              <select style={inputStyle} value={form.language} onChange={(e) => set('language', e.target.value)}>
                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Title *</label>
            <input style={inputStyle} value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Author(s) *</label>
            <input style={inputStyle} value={form.author} onChange={(e) => set('author', e.target.value)} placeholder="Separate several authors with commas" />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Tags (comma separated)</label>
            <input style={inputStyle} value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="History, Culture" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
              {TAG_SUGGESTIONS.map((t) => (
                <button type="button" key={t} onClick={() => addTag(t)} style={{ ...ghostBtn, padding: '4px 10px', fontSize: '11px' }}>+ {t}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Download link (Google Drive) *</label>
            <input style={inputStyle} value={form.drive_link} onChange={(e) => set('drive_link', e.target.value)} placeholder="https://drive.google.com/file/d/…/view" />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Archived by</label>
            <input style={inputStyle} value={form.archived_by} onChange={(e) => set('archived_by', e.target.value)} placeholder="Author, Pahar.in, Public.Resource.Org, Mising Archives…" />
          </div>

          <ImageUploadField label="Cover image (portrait works best)" value={form.cover_image_url}
            folder="misingarchives" aspect={3 / 4} onChange={(u) => set('cover_image_url', u)} />

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, margin: '0 0 18px', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
            Published (untick to keep as a hidden draft)
          </label>

          {formError && <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#c0392b' }}>{formError}</p>}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={saving} style={{ ...primaryBtn, opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving…' : 'Save book'}</button>
            <button type="button" onClick={() => setForm(null)} style={ghostBtn}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p style={{ color: colors.textSecondary }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: colors.textSecondary, fontSize: '14px' }}>
          No books in the database yet. Click “Add book”, or “Import from books.js” to copy your existing ones in.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rows.map((r) => (
            <div key={r.id} style={{ ...cardBase, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ width: '42px', height: '60px', borderRadius: '6px', overflow: 'hidden', backgroundColor: colors.accentLight, flexShrink: 0 }}>
                {r.cover_image_url && <img src={cloudinaryUrl(r.cover_image_url, 'w_120,h_170,c_fill,q_auto,f_auto')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
              </div>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <p style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: '700', color: colors.text }}>{r.title}</p>
                <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>
                  {r.code} · {r.author} · {r.language}{!r.published ? ' · DRAFT' : ''}
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