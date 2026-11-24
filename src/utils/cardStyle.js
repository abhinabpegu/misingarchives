import { useTheme } from '../context/ThemeContext'

// Shared flat card look used across the site.
// Hover lift and border highlight are handled in CSS via `.card-interactive`.
export function useCardStyle() {
  const { colors } = useTheme()

  const cardBase = {
    backgroundColor: colors.bgSecondary,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    boxShadow: 'none',
  }

  const hoverIn = () => {}
  const hoverOut = () => {}

  return { cardBase, hoverIn, hoverOut }
}
