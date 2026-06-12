import './App.css'

function App() {
  return (
    <main style={{ padding: 'var(--space-12)', textAlign: 'center' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--rose-2)',
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--weight-light)',
          letterSpacing: '0.02em',
        }}
      >
        Fitt With T
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--muted)',
          fontSize: 'var(--text-lg)',
          marginTop: 'var(--space-4)',
        }}
      >
        Design tokens active · Cormorant Garamond + Outfit loaded
      </p>
    </main>
  )
}

export default App
