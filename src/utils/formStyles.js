import { useTheme } from '../context/ThemeContext'

// Shared form look for the artisan pages.
export function useFormStyles() {
  const { isDarkMode, colors } = useTheme()
  return {
    inputStyle: {
      width: '100%', padding: '11px 13px', fontSize: '14px', border: `1px solid ${colors.border}`,
      borderRadius: '8px', backgroundColor: colors.bg, color: colors.text, outline: 'none',
      fontFamily: 'inherit', boxSizing: 'border-box',
    },
    labelStyle: { display: 'block', fontSize: '12px', fontWeight: '700', color: colors.textSecondary, marginBottom: '6px' },
    primaryBtn: {
      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', fontSize: '13px',
      fontWeight: '700', backgroundColor: colors.accentPrimary, color: isDarkMode ? colors.bg : '#fff',
      border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit',
    },
    ghostBtn: {
      display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 12px', fontSize: '12px',
      fontWeight: '700', color: colors.textSecondary, backgroundColor: colors.bgSecondary,
      border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit',
    },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' },
  }
}