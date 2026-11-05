import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useTheme } from '../../context/ThemeContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'
import { CRAFT_LABELS, externalLink } from '../../utils/shop'
import ProductCard from '../../components/shop/ProductCard'
import ContactButtons from '../../components/shop/ContactButtons'

export default function ShopArtisan() {
  const { slug } = useParams()
  const { colors } = useTheme()
  const [artisan, setArtisan] = useState(undefined) // undefined = loading, null = not found
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  usePageTitle(artisan?.display_name)

  useEffect(() => {
    if (!supabase) { setArtisan(null); return }
    let cancelled = false
    setArtisan(undefined)
    ;(async () => {
      const { data: a } = await supabase.from('artisans').select('*').eq('slug', slug).maybeSingle()
      if (cancelled) return
      if (!a) return setArtisan(null)
      const [p, c] = await Promise.all([
        supabase.from('shop_products').select('*').eq('artisan_id', a.id).eq('published', true).order('created_at', { ascending: false }),
        supabase.from('shop_categories').select('*'),
      ])
      if (cancelled) return
      setProducts(p.data || [])
      setCategories(c.data || [])
      setArtisan(a)
    })()
    return () => { cancelled = true }
  }, [slug])

  const catName = (s) => categories.find((c) => c.slug === s)?.name || ''
  const backLink = (
    <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: colors.textSecondary, textDecoration: 'none', marginBottom: '28px' }}>
      <ArrowLeft size={15} /> Back to Shop
    </Link>
  )

  if (artisan === undefined) {
    return <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px', textAlign: 'center', color: colors.textSecondary }}>Loading…</div>
  }

  if (artisan === null) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '22px', color: colors.text, marginBottom: '10px' }}>Artisan not found</h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '24px' }}>This page may have been moved or doesn't exist.</p>
        <Link to="/shop" style={{ color: colors.accentPrimary, fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>← Back to Shop</Link>
      </div>
    )
  }

  const location = [artisan.village, artisan.district, artisan.state].filter(Boolean).join(', ')
  const site = externalLink(artisan.website)
  const badge = (t) => (
    <span key={t} style={{ padding: '5px 10px', backgroundColor: colors.accentLight, color: colors.accentPrimary, borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>{t}</span>
  )

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      {backLink}

      <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div style={{ width: '160px', height: '160px', borderRadius: '16px', overflow: 'hidden', backgroundColor: colors.accentLight, flexShrink: 0 }}>
          {artisan.photo_url && (
            <img src={cloudinaryUrl(artisan.photo_url, 'w_400,h_400,c_fill,q_auto,f_auto')} alt={artisan.display_name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          )}
        </div>

        <div style={{ flex: 1, minWidth: '260px' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 34px)', fontWeight: '800', margin: '0 0 4px', color: colors.text }}>{artisan.display_name}</h1>
          {artisan.business_name && <p style={{ margin: '0 0 10px', fontSize: '15px', color: colors.textSecondary }}>{artisan.business_name}</p>}
          {location && (
            <p style={{ margin: '0 0 14px', fontSize: '13px', color: colors.textTertiary, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} /> {location}
            </p>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {(artisan.craft_types || []).map((c) => badge(CRAFT_LABELS[c] || c))}
            {artisan.takes_custom_orders && badge('Takes custom orders')}
            {artisan.ships_across_india && badge('Ships across India')}
            {!artisan.accepting_orders && (
              <span style={{ padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#c0392b', backgroundColor: 'rgba(192,57,43,0.1)' }}>
                Not accepting orders right now
              </span>
            )}
          </div>

          {artisan.bio && <p style={{ margin: '0 0 16px', fontSize: '15px', lineHeight: '1.75', color: colors.text, whiteSpace: 'pre-line' }}>{artisan.bio}</p>}

          {artisan.delivery_notes && (
            <p style={{ margin: '0 0 16px', fontSize: '13px', lineHeight: '1.7', color: colors.textSecondary }}>
              <strong>Delivery:</strong> {artisan.delivery_notes}
            </p>
          )}
          {(artisan.languages || []).length > 0 && (
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: colors.textSecondary }}>
              <strong>Languages:</strong> {artisan.languages.join(', ')}
            </p>
          )}

          <ContactButtons artisan={artisan} message={`Hi ${artisan.display_name}, I found you on Mising Archives and I'm interested in your work.`} />
          {(site || artisan.facebook) && (
            <p style={{ margin: '14px 0 0', fontSize: '13px', color: colors.textSecondary }}>
              {site && <a href={site} target="_blank" rel="noopener noreferrer" style={{ color: colors.accentPrimary, fontWeight: '600', marginRight: '14px' }}>Website</a>}
              {artisan.facebook && <a href={externalLink(artisan.facebook)} target="_blank" rel="noopener noreferrer" style={{ color: colors.accentPrimary, fontWeight: '600' }}>Facebook</a>}
            </p>
          )}
        </div>
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 20px', color: colors.text }}>Products</h2>
      {products.length === 0 ? (
        <p style={{ fontSize: '14px', color: colors.textSecondary }}>No products listed yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {products.map((p) => <ProductCard key={p.id} product={p} categoryName={catName(p.category_slug)} showArtisan={false} />)}
        </div>
      )}
    </div>
  )
}