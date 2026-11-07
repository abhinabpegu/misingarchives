import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useCardStyle } from '../../utils/cardStyle'
import { cloudinaryUrl } from '../../utils/cloudinaryUrl'
import { priceLabel } from '../../utils/shop'
import LazyImage from '../LazyImage'

export default function ProductCard({ product, categoryName, showArtisan = true }) {
  const { colors } = useTheme()
  const { cardBase, hoverIn, hoverOut } = useCardStyle()
  const soldOut = product.availability === 'sold_out'
  const img = product.images?.[0]
  const artisan = product.artisans

  return (
    <Link
      to={`/shop/product/${product.id}`}
      style={{ ...cardBase, display: 'flex', flexDirection: 'column', textDecoration: 'none', color: colors.text, overflow: 'hidden', height: '100%' }}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', backgroundColor: colors.accentLight, flexShrink: 0 }}>
        {img ? (
          <LazyImage
src={cloudinaryUrl(img, 'w_500,h_500,c_pad,b_auto,q_auto,f_auto')}
  alt={product.title}
  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', opacity: soldOut ? 0.55 : 1 }}
/>
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontStyle: 'italic', color: colors.textTertiary }}>
            No photo yet
          </div>
        )}
        {soldOut && (
          <span style={{
            position: 'absolute', top: '10px', left: '10px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
            letterSpacing: '0.6px', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff',
          }}>
            Sold out
          </span>
        )}
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {categoryName && (
          <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: colors.accentPrimary }}>
            {categoryName}
          </span>
        )}
        <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', lineHeight: '1.35', color: colors.text }}>{product.title}</p>
        <div style={{ flex: 1 }} />
        <p style={{ margin: '6px 0 0', fontSize: '15px', fontWeight: '800', color: colors.text }}>{priceLabel(product)}</p>
        {showArtisan && artisan?.display_name && (
          <p style={{ margin: 0, fontSize: '12px', color: colors.textTertiary }}>by {artisan.display_name}</p>
        )}
      </div>
    </Link>
  )
}