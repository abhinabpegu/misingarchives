import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useTheme } from '../../context/ThemeContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'
import { priceLabel, AVAILABILITY_LABELS, fieldsFor } from '../../utils/shop'
import ContactButtons from '../../components/shop/ContactButtons'

export default function ShopProduct() {
  const { id } = useParams()
  const { colors } = useTheme()
  const [product, setProduct] = useState(undefined) // undefined = loading, null = not found
  const [categoryName, setCategoryName] = useState('')
  const [categoryGroup, setCategoryGroup] = useState('')
  const [active, setActive] = useState(0)

  usePageTitle(product?.title)

  useEffect(() => {
    if (!supabase) { setProduct(null); return }
    let cancelled = false
    setProduct(undefined)
    setActive(0)
    ;(async () => {
      const { data, error } = await supabase.from('shop_products').select('*, artisans(*)').eq('id', id).maybeSingle()
      if (cancelled) return
      if (error || !data || !data.artisans) return setProduct(null)
      const { data: c } = await supabase.from('shop_categories').select('name, group_name').eq('slug', data.category_slug).maybeSingle()
      if (cancelled) return
      setCategoryName(c?.name || '')
      setCategoryGroup(c?.group_name || '')
      setProduct(data)
    })()
    return () => { cancelled = true }
  }, [id])

  if (product === undefined) {
    return <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px', textAlign: 'center', color: colors.textSecondary }}>Loading…</div>
  }

  if (product === null) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '22px', color: colors.text, marginBottom: '10px' }}>Product not found</h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '24px' }}>It may have been removed or is no longer available.</p>
        <Link to="/shop" style={{ color: colors.accentPrimary, fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>← Back to Shop</Link>
      </div>
    )
  }

  const artisan = product.artisans
  const images = product.images || []
  const soldOut = product.availability === 'sold_out'

  // Labels depend on the category group (e.g. Food shows "Ingredients")
  const fields = fieldsFor(categoryGroup)
  const raw = {
    material: product.material,
    technique: product.technique,
    colors: product.colors,
    size_info: product.size_info,
    lead_time_days: product.lead_time_days != null ? `${product.lead_time_days} days` : null,
    customisable: product.customisable ? 'Yes: ask the artisan about size, colour or motif' : null,
    motif_codes: (product.motif_codes || []).length ? product.motif_codes.join(', ') : null,
    care_instructions: product.care_instructions,
  }
  const details = Object.entries(raw)
    .filter(([k, v]) => v && fields[k])
    .map(([k, v]) => [fields[k].show, v])

  const message = `Hi ${artisan.display_name}, I saw "${product.title}" on Mising Archives and I'm interested. ${window.location.href}`

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 80px' }}>
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: colors.textSecondary, textDecoration: 'none', marginBottom: '28px' }}>
        <ArrowLeft size={15} /> Back to Shop
      </Link>

      <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Photos */}
        <div style={{ flex: '1 1 340px', minWidth: 0 }}>
          <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '14px', overflow: 'hidden', backgroundColor: colors.accentLight, boxShadow: `0 12px 32px ${colors.shadowColor}` }}>
            {images[active] ? (
              <img src={cloudinaryUrl(images[active], 'w_900,q_auto,f_auto')} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontStyle: 'italic', color: colors.textTertiary }}>No photo yet</div>
            )}
          </div>
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
              {images.map((url, i) => (
                <button key={url + i} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} style={{
                  width: '64px', height: '64px', padding: 0, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                  border: `2px solid ${i === active ? colors.accentPrimary : 'transparent'}`, background: 'none',
                }}>
                  <img src={cloudinaryUrl(url, 'w_140,h_140,c_fill,q_auto,f_auto')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div style={{ flex: '1 1 340px', minWidth: 0 }}>
          {categoryName && (
            <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: colors.accentPrimary, backgroundColor: colors.accentLight, padding: '5px 10px', borderRadius: '6px', marginBottom: '14px' }}>
              {categoryName}
            </span>
          )}
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', lineHeight: '1.25', margin: '0 0 12px', color: colors.text }}>{product.title}</h1>
          <p style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: '800', color: colors.text }}>{priceLabel(product)}</p>
          <p style={{ margin: '0 0 20px', fontSize: '13px', fontWeight: '600', color: soldOut ? '#c0392b' : colors.textSecondary }}>
            {AVAILABILITY_LABELS[product.availability]}
          </p>

          {product.description && (
            <p style={{ margin: '0 0 22px', fontSize: '15px', lineHeight: '1.75', color: colors.text, whiteSpace: 'pre-line' }}>{product.description}</p>
          )}

          {details.length > 0 && (
            <dl style={{ margin: '0 0 24px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 18px', fontSize: '13px' }}>
              {details.map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt style={{ fontWeight: '700', color: colors.textSecondary }}>{k}</dt>
                  <dd style={{ margin: 0, color: colors.text, lineHeight: '1.6' }}>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
          )}

          {/* Artisan + contact */}
          <div style={{ padding: '20px', borderRadius: '12px', border: `1px solid ${colors.border}`, backgroundColor: colors.bgSecondary }}>
            <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: colors.accentPrimary }}>Made by</p>
            <Link to={`/shop/artisan/${artisan.slug}`} style={{ fontSize: '17px', fontWeight: '700', color: colors.text, textDecoration: 'none' }}>
              {artisan.display_name}
            </Link>
            {[artisan.village, artisan.district].filter(Boolean).length > 0 && (
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textTertiary }}>{[artisan.village, artisan.district].filter(Boolean).join(', ')}</p>
            )}
            {artisan.delivery_notes && (
              <p style={{ margin: '12px 0 0', fontSize: '13px', lineHeight: '1.6', color: colors.textSecondary }}><strong>Delivery:</strong> {artisan.delivery_notes}</p>
            )}
            {!artisan.accepting_orders && (
              <p style={{ margin: '12px 0 0', fontSize: '13px', color: '#c0392b', fontWeight: '600' }}>This artisan isn't accepting orders right now. You can still send a message.</p>
            )}
            <div style={{ marginTop: '16px' }}>
              <ContactButtons artisan={artisan} message={message} />
            </div>
          </div>

          <p style={{ margin: '14px 0 0', fontSize: '12px', lineHeight: '1.6', color: colors.textTertiary }}>
            Mising Archives introduces buyers to artisans. Price, payment and delivery are agreed directly with the artisan.
          </p>
        </div>
      </div>
    </div>
  )
}