import { useState } from 'react'
import './App.css'
import Nav          from './components/Nav'
import Footer       from './components/Footer'
import IntroLogo    from './components/IntroLogo'
import HomePage     from './pages/HomePage'
import AboutPage    from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ResultsPage  from './pages/ResultsPage'
import ContactPage  from './pages/ContactPage'
import BookPage     from './pages/BookPage'

const PAGES = {
  home:     HomePage,
  about:    AboutPage,
  packages: ServicesPage,
  results:  ResultsPage,
  contact:  ContactPage,
  book:     BookPage,
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
    <>
      <IntroLogo onDone={() => setIntroActive(false)} />
      <Nav currentPage={page} onNavigate={navigate} />
      <Page onNavigate={navigate} introActive={introActive} />
      <Footer onNavigate={navigate} />
    </>
  )
}
