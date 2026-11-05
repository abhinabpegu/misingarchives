import React, { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useTheme } from '../../context/ThemeContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import ProductCard from '../../components/shop/ProductCard'

export default function Shop() {
  usePageTitle('Shop')
  const { isDarkMode, colors } = useTheme()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!supabase) { setLoading(false); setError('The shop is not available right now.'); return }
    let cancelled = false
    Promise.all([
      supabase.from('shop_products').select('*, artisans(display_name, slug)').eq('published', true).order('created_at', { ascending: false }),
      supabase.from('shop_categories').select('*').order('group_name').order('sort_order'),
    ]).then(([p, c]) => {
      if (cancelled) return
      if (p.error) setError('Could not load the shop. Please try again later.')
      else setProducts(p.data)
      if (!c.error) setCategories(c.data)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  const catName = (slug) => categories.find((c) => c.slug === slug)?.name || ''

  // Only offer filters for categories that actually have products.
  const usedCategories = useMemo(
    () => categories.filter((c) => products.some((p) => p.category_slug === c.slug)),
    [categories, products]
  )

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (cat !== 'all' && p.category_slug !== cat) return false
      if (!q) return true
      return [p.title, p.material, p.description, p.artisans?.display_name].some((v) => (v || '').toLowerCase().includes(q))
    })
  }, [products, cat, query])

  const wrap = { maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }

  return (
    <div>
      <section style={{ ...wrap, padding: '48px clamp(20px, 5vw, 40px) 0' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.4px', color: colors.accentPrimary }}>
          Mising Artisans
        </span>
        <h1 style={{ fontSize: '34px', fontWeight: '700', margin: '10px 0 8px', color: colors.text }}>Shop</h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: '1.7', maxWidth: '640px', margin: 0 }}>
          Handmade clothing, ornaments and accessories from Mising artisans. Orders and payment are arranged
          directly with the artisan: open a product and use the contact buttons.
        </p>
      </section>

      <section style={{ ...wrap, padding: '28px clamp(20px, 5vw, 40px) 0' }}>
        <div style={{ position: 'relative', maxWidth: '420px', marginBottom: '20px' }}>
          <Search size={18} color={colors.textTertiary} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text" placeholder="Search products or artisans..." value={query} onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%', padding: '13px 16px 13px 44px', fontSize: '14px', border: `1px solid ${colors.border}`,
              borderRadius: '12px', backgroundColor: colors.bgSecondary, color: colors.text, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[{ slug: 'all', name: 'All' }, ...usedCategories].map((c) => {
            const active = cat === c.slug
            return (
              <button key={c.slug} onClick={() => setCat(c.slug)} style={{
                padding: '9px 16px', fontSize: '13px', fontWeight: '600', borderRadius: '999px', cursor: 'pointer',
                border: `1px solid ${active ? colors.accentPrimary : colors.border}`,
                backgroundColor: active ? colors.accentPrimary : colors.bgSecondary,
                color: active ? (isDarkMode ? colors.bg : '#fff') : colors.textSecondary,
              }}>
                {c.name}
              </button>
            )
          })}
        </div>
      </section>

      <section style={{ ...wrap, padding: '28px clamp(20px, 5vw, 40px) 60px' }}>
        {loading ? (
          <p style={{ color: colors.textSecondary }}>Loading…</p>
        ) : error ? (
          <p style={{ color: '#c0392b', fontSize: '14px' }}>{error}</p>
        ) : shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px', color: colors.textTertiary, backgroundColor: colors.bgSecondary, borderRadius: '12px', border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 6px', color: colors.text }}>
              {products.length === 0 ? 'No products yet' : 'No products found'}
            </p>
            <p style={{ fontSize: '14px', margin: 0 }}>
              {products.length === 0 ? 'Check back soon.' : 'Try a different category or search.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {shown.map((p) => <ProductCard key={p.id} product={p} categoryName={catName(p.category_slug)} />)}
          </div>
        )}
      </section>
    </div>
  )
}