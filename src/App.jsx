import { useState } from 'react'
import Nav          from './components/Nav'
import Footer       from './components/Footer'
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

export default function App() {
  const [page, setPage] = useState('home')

  function navigate(to) {
    setPage(to)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const Page = PAGES[page]

  return (
    <>
      <Nav currentPage={page} onNavigate={navigate} />
      <Page onNavigate={navigate} />
      <Footer onNavigate={navigate} />
    </>
  )
}
