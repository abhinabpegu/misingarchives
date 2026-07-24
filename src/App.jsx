import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import DigitalBookLibrary from './pages/DigitalBookLibrary'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import './styles/App.css'
import DonationBanner from './components/DonationBanner'
import Donations from './pages/Donations'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import CopyrightPolicy from './pages/CopyrightPolicy'
import Clans from './pages/learn/Clans'

function Layout() {
  const { colors } = useTheme()
  const location = useLocation()

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
      <ScrollToTop />
      <DonationBanner />
      <Header />
      <main style={{ flex: 1 }}>
        <div key={location.pathname} className="page-transition">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/digital-book-library" element={<DigitalBookLibrary />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/copyright-policy" element={<CopyrightPolicy />} />
            <Route path="/learn/clans" element={<Clans />} />
          </Routes>
        </div>
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