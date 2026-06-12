import { useState } from 'react'
import Nav from './components/Nav'

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <>
      <Nav currentPage={page} onNavigate={setPage} />
      <main style={{ paddingTop: 'calc(var(--u) * 10)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)' }}>
          Page: <strong>{page}</strong>
        </p>
      </main>
    </>
  )
}
