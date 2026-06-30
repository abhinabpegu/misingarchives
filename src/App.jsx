import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DigitalBookLibrary from './pages/DigitalBookLibrary'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import './styles/App.css'

function Layout() {
  const { colors } = useTheme()

  return (
    <div style={{
      backgroundColor: colors.bg,
      color: colors.text,
      minHeight: '100vh',
      transition: 'all 0.5s ease',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/digital-book-library" element={<DigitalBookLibrary />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}
