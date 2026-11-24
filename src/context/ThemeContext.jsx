import React, { createContext, useContext, useEffect, useState } from 'react'

export const themeColors = {
  light: {
    bg: '#f5f6f8',
    bgSecondary: '#ffffff',
    bgTertiary: 'rgba(255, 255, 255, 0.78)',
    text: '#1A1A1A',
    textSecondary: '#5A6C7D',
    textTertiary: '#8B9BAC',
    border: 'rgba(107, 117, 193, 0.16)',
    borderHover: 'rgba(107, 117, 193, 0.38)',
    accentPrimary: '#6b76c1',
    accentSecondary: '#6fa3d1',
    accentLight: 'rgba(110, 107, 193, 0.1)',
    tableHover: 'rgba(140, 107, 193, 0.05)',
    shadowColor: 'rgba(25, 32, 72, 0.08)',
    glowPrimary: 'rgba(107, 118, 193, 0.12)',
    glowSecondary: 'rgba(111, 163, 209, 0.10)',
  },
  dark: {
    bg: '#0F0E0C',
    bgSecondary: 'rgba(30, 28, 25, 0.72)',
    bgTertiary: 'rgba(24, 22, 19, 0.72)',
    text: '#F5F3F0',
    textSecondary: '#C8B9A8',
    textTertiary: '#8B9BAC',
    border: 'rgba(232, 168, 159, 0.16)',
    borderHover: 'rgba(232, 168, 159, 0.4)',
    accentPrimary: '#E8A89F',
    accentSecondary: '#F0B8B0',
    accentLight: 'rgba(232, 168, 159, 0.15)',
    tableHover: 'rgba(232, 168, 159, 0.08)',
    shadowColor: 'rgba(0, 0, 0, 0.36)',
    glowPrimary: 'rgba(232, 168, 159, 0.09)',
    glowSecondary: 'rgba(240, 184, 176, 0.06)',
  }
}

const ThemeContext = createContext(null)

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('mising-theme')
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false
  } catch {
    return false
  }
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme)
  const colors = isDarkMode ? themeColors.dark : themeColors.light

  useEffect(() => {
    try {
      localStorage.setItem('mising-theme', isDarkMode ? 'dark' : 'light')
    } catch {
      /* ignore storage errors */
    }

    const root = document.documentElement
    root.dataset.theme = isDarkMode ? 'dark' : 'light'
    root.style.setProperty('--bg', colors.bg)
    root.style.setProperty('--bg-secondary', colors.bgSecondary)
    root.style.setProperty('--bg-tertiary', colors.bgTertiary)
    root.style.setProperty('--text', colors.text)
    root.style.setProperty('--text-secondary', colors.textSecondary)
    root.style.setProperty('--text-tertiary', colors.textTertiary)
    root.style.setProperty('--border', colors.border)
    root.style.setProperty('--border-hover', colors.borderHover)
    root.style.setProperty('--accent', colors.accentPrimary)
    root.style.setProperty('--accent-primary', colors.accentPrimary)
    root.style.setProperty('--accent-secondary', colors.accentSecondary)
    root.style.setProperty('--accent-light', colors.accentLight)
    root.style.setProperty('--shadow', colors.shadowColor)
    root.style.setProperty('--glow-primary', colors.glowPrimary)
    root.style.setProperty('--glow-secondary', colors.glowSecondary)

    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) metaTheme.setAttribute('content', colors.bg)
  }, [isDarkMode, colors])

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
