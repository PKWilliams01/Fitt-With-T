import { useState } from 'react'
import './App.css'
import { CookieConsentProvider } from './context/CookieConsent'
import ConsentBanner from './components/ConsentBanner'
import Nav          from './components/Nav'
import Footer       from './components/Footer'
import IntroLogo    from './components/IntroLogo'
import HomePage     from './pages/HomePage'
import AboutPage    from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ResultsPage  from './pages/ResultsPage'
import ContactPage  from './pages/ContactPage'
import BookPage     from './pages/BookPage'
import PrivacyPage  from './pages/PrivacyPage'

const PAGES = {
  home:     HomePage,
  about:    AboutPage,
  packages: ServicesPage,
  results:  ResultsPage,
  contact:  ContactPage,
  book:     BookPage,
  privacy:  PrivacyPage,
}

function shouldPlayIntro() {
  return (
    sessionStorage.getItem('introPlayed') !== '1' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  const [introActive, setIntroActive] = useState(shouldPlayIntro)

  function navigate(to) {
    setPage(to)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const Page = PAGES[page]

  return (
    <CookieConsentProvider>
      <IntroLogo onDone={() => setIntroActive(false)} />
      <Nav currentPage={page} onNavigate={navigate} />
      <Page onNavigate={navigate} introActive={introActive} />
      <Footer onNavigate={navigate} />
      <ConsentBanner onNavigate={navigate} />
    </CookieConsentProvider>
  )
}
