import React, { createContext, useContext, useState } from 'react'

export const themeColors = {
  light: {
    bg: '#F8F7F5',
    bgSecondary: '#FFFFFF',
    bgTertiary: 'rgba(255, 255, 255, 0.7)',
    text: '#1A1A1A',
    textSecondary: '#5A6C7D',
    textTertiary: '#8B9BAC',
    border: 'rgba(193, 122, 107, 0.15)',
    accentPrimary: '#6b76c1',
    accentSecondary: '#6fa3d1',
    accentLight: 'rgba(193, 122, 107, 0.1)',
    tableHover: 'rgba(193, 122, 107, 0.05)',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
  },
  dark: {
    bg: '#0F0E0C',
    bgSecondary: 'rgba(30, 28, 25, 0.6)',
    bgTertiary: 'rgba(30, 28, 25, 0.4)',
    text: '#F5F3F0',
    textSecondary: '#C8B9A8',
    textTertiary: '#8B9BAC',
    border: 'rgba(232, 168, 159, 0.15)',
    accentPrimary: '#E8A89F',
    accentSecondary: '#F0B8B0',
    accentLight: 'rgba(232, 168, 159, 0.15)',
    tableHover: 'rgba(232, 168, 159, 0.08)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
  }
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const colors = isDarkMode ? themeColors.dark : themeColors.light

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
