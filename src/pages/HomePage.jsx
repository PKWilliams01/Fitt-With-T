import Hero from '../components/Hero'

export default function HomePage({ onNavigate }) {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
    </main>
  )
}
