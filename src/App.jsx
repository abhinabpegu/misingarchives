import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ReadingProgress from './components/ReadingProgress'
import BackToTop from './components/BackToTop'
import RequireStaff from './components/RequireStaff'
import RequireArtisan from './components/RequireArtisan'
import Home from './pages/Home'
import { trackSiteVisit } from './lib/siteStats'
import './styles/App.css'

const DigitalBookLibrary = lazy(() => import('./pages/DigitalBookLibrary'))
const Articles = lazy(() => import('./pages/Articles'))
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'))
const BookDetail = lazy(() => import('./pages/BookDetail'))
const About = lazy(() => import('./pages/About'))
const Donations = lazy(() => import('./pages/Donations'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'))
const CopyrightPolicy = lazy(() => import('./pages/CopyrightPolicy'))
const Clans = lazy(() => import('./pages/learn/Clans'))
const MisingMotifs = lazy(() => import('./pages/learn/MisingMotifs'))
const MisingTerms = lazy(() => import('./pages/learn/MisingTerms'))
const Shop = lazy(() => import('./pages/shop/Shop'))
const ShopArtisan = lazy(() => import('./pages/shop/ShopArtisan'))
const ShopProduct = lazy(() => import('./pages/shop/ShopProduct'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminHome = lazy(() => import('./pages/admin/AdminHome'))
const MimangAdmin = lazy(() => import('./pages/admin/MimangAdmin'))
const ArtisansAdmin = lazy(() => import('./pages/admin/ArtisansAdmin'))
const TermsAdmin = lazy(() => import('./pages/admin/TermsAdmin'))
const BooksAdmin = lazy(() => import('./pages/admin/BooksAdmin'))

const ArtisanLogin = lazy(() => import('./pages/artisan/ArtisanLogin'))
const ArtisanHome = lazy(() => import('./pages/artisan/ArtisanHome'))
const ArtisanProfile = lazy(() => import('./pages/artisan/ArtisanProfile'))
const ArtisanProducts = lazy(() => import('./pages/artisan/ArtisanProducts'))

function RouteFallback() {
  const { colors } = useTheme()
  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '72px clamp(20px, 5vw, 40px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div className="skeleton-shimmer" style={{ width: '120px', height: '14px', borderRadius: '6px', backgroundColor: colors.accentLight }} />
      <div className="skeleton-shimmer" style={{ width: '280px', maxWidth: '80%', height: '34px', borderRadius: '10px', backgroundColor: colors.accentLight }} />
      <div className="skeleton-shimmer" style={{ width: '100%', maxWidth: '540px', height: '18px', borderRadius: '8px', backgroundColor: colors.accentLight }} />
    </div>
  )
}

function Layout() {
  const { colors } = useTheme()
  const location = useLocation()
  useEffect(() => {
    // don't count admin/artisan logins as visitors
    if (!/^\/(manage|artisan|admin)/.test(window.location.pathname)) trackSiteVisit()
  }, [])

  return (
    <div
      className="theme-root"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ReadingProgress />
      <ScrollToTop />
      <Header />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div key={location.pathname} className="page-transition">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/digital-book-library" element={<DigitalBookLibrary />} />
              <Route path="/book/:code" element={<BookDetail />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/article/About-Mising-Archives" element={<Navigate to="/about" replace />} />
              <Route path="/article/:slug" element={<ArticleDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/copyright-policy" element={<CopyrightPolicy />} />
              <Route path="/learn/clans" element={<Clans />} />
              <Route path="/learn/mising-motifs" element={<MisingMotifs />} />
              <Route path="/learn/mising-terms" element={<MisingTerms />} />

              {/* Public shop */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/artisan/:slug" element={<ShopArtisan />} />
              <Route path="/shop/product/:id" element={<ShopProduct />} />

              {/* Admin (new Supabase-based). /admin is still the old Sveltia CMS. */}
              <Route path="/manage/login" element={<AdminLogin />} />
              <Route path="/manage" element={<RequireStaff><AdminHome /></RequireStaff>} />
              <Route path="/manage/mimang" element={<RequireStaff><MimangAdmin /></RequireStaff>} />
              <Route path="/manage/artisans" element={<RequireStaff><ArtisansAdmin /></RequireStaff>} />
              <Route path="/manage/terms" element={<RequireStaff><TermsAdmin /></RequireStaff>} />
              <Route path="/manage/books" element={<RequireStaff><BooksAdmin /></RequireStaff>} />

              {/* Artisan portal */}
              <Route path="/artisan/login" element={<ArtisanLogin />} />
              <Route path="/artisan" element={<RequireArtisan><ArtisanHome /></RequireArtisan>} />
              <Route path="/artisan/profile" element={<RequireArtisan><ArtisanProfile /></RequireArtisan>} />
              <Route path="/artisan/products" element={<RequireArtisan><ArtisanProducts /></RequireArtisan>} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </ThemeProvider>
  )
}
