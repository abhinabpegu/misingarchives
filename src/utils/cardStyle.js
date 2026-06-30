import { useTheme } from '../context/ThemeContext'

// Shared "card" look used by Home.jsx and Articles.jsx so both pages
// stay visually consistent without copy-pasting the same style block.
export function useCardStyle() {
  const { colors } = useTheme()

  const cardBase = {
    backgroundColor: colors.bgSecondary,
    border: `1px solid ${colors.border}`,
    borderRadius: '14px',
    backdropFilter: 'blur(10px)',
    boxShadow: `0 4px 16px ${colors.shadowColor}`,
    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
  }

  const hoverIn = (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)'
    e.currentTarget.style.boxShadow = `0 12px 28px ${colors.shadowColor}`
  }
  const hoverOut = (e) => {
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.boxShadow = `0 4px 16px ${colors.shadowColor}`
  }

  return { cardBase, hoverIn, hoverOut }
}
