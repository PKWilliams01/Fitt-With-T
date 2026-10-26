import useReveal from '../hooks/useReveal'
import usePageMeta from '../hooks/usePageMeta'
import './Privacy.css'   // shared long-form legal typography (.privacy classes)

/* Finalised Website Terms of Use. Copy is the client's verbatim wording.
   Kept free of dashes/hyphens except the single "PAR-Q". */
export default function TermsPage({ onNavigate }) {
  const revealRef = useReveal()
  usePageMeta(
    'Website Terms of Use for Fitt With T',
    'The terms for using the Fitt With T website, including fitness disclaimer, booking, liability and governing law.'
  )

  return (
    <main className="privacy-page" ref={revealRef}>
      <header className="page-head">
        <div className="wrap">
          <span className="eyebrow center reveal">Legal</span>
          <h1 className="display reveal d1">Website <em>Terms of Use</em></h1>
          <p className="reveal d2">The terms for using the Fitt With T website.</p>
        </div>
      </header>

      <section>
        <div className="wrap privacy">
          <p className="privacy__updated">Last updated: 26 October 2026</p>

          <h2>1. Who runs this website</h2>
          <p>
            This website (fittwitht.co.uk) is run by Tommera Hendricks, trading as
            Fitt With T, a personal training business based in London. Contact:{' '}
            <a href="mailto:Fittwitht.1@gmail.com">Fittwitht.1@gmail.com</a>
          </p>

          <h2>2. About these terms</h2>
          <p>
            Using this website means agreeing to these terms. Anyone who
            doesn&rsquo;t agree with them shouldn&rsquo;t use the site. These terms
            may be updated from time to time, and the &ldquo;last updated&rdquo;
            date above shows when they last changed.
          </p>

          <h2>3. Using this website</h2>
          <p>
            This website is for personal, lawful use: to learn about the coaching,
            get in touch, and book a consultation. It must not be used to:
          </p>
          <ul className="privacy__list">
            <li>break the law or act in any way that could damage the site or harm other users;</li>
            <li>copy, reproduce or reuse the content, images or branding on this site without permission;</li>
            <li>interfere with how the site works.</li>
          </ul>

          <h2>4. The information on this site</h2>
          <p>
            Everything on this site is aimed to be kept accurate and up to date. It
            isn&rsquo;t guaranteed to always be complete or free of errors. The
            content is for general information. It isn&rsquo;t a substitute for
            professional or medical advice.
          </p>
          <p>
            <strong>Important: health and fitness.</strong> Nothing on this website
            is medical advice. Before starting any new exercise programme, it&rsquo;s
            important to be sure you&rsquo;re healthy enough to do so, and to speak to
            a doctor if you&rsquo;re unsure. Any coaching only begins after the PAR-Q
            (Physical Activity Readiness Questionnaire) has been completed and talked
            through together.
          </p>

          <h2>5. Booking a consultation</h2>
          <p>
            Booking a consultation through this site happens through the booking
            provider (Acuity Scheduling). Booking a consultation is the first step.
            It isn&rsquo;t a coaching contract. The terms of any coaching that follows
            are set out separately in the Fitt With T coaching agreement that clients
            sign before starting.
          </p>

          <h2>6. Links and third party services</h2>
          <p>
            This site uses and links to trusted third party services (for example the
            booking system and contact form). This site isn&rsquo;t responsible for
            the content or practices of those third parties. Their own terms and
            privacy policies apply when they&rsquo;re used.
          </p>

          <h2>7. Liability</h2>
          <p>
            This website is provided on an &ldquo;as is&rdquo; basis. It&rsquo;s
            maintained as carefully as possible, but can&rsquo;t be guaranteed to
            always be available or completely free of errors. As far as the law
            allows, no liability is accepted for any loss arising from use of (or
            inability to use) this website. Nothing in these terms limits liability
            where it wouldn&rsquo;t be legal to do so.
          </p>

          <h2>8. Privacy</h2>
          <p>
            How personal information is handled is set out in the{' '}
            <button className="privacy__inline-btn" onClick={() => onNavigate('privacy')}>
              Privacy and Cookies Policy
            </button>{' '}
            (linked in the footer). It&rsquo;s worth reading alongside these terms.
          </p>

          <h2>9. Governing law</h2>
          <p>
            These terms are governed by the law of England and Wales, and any disputes
            will be dealt with by the courts of England and Wales.
          </p>

          <h2>10. Contact</h2>
          <p>
            Any questions about these terms? Get in touch at{' '}
            <a href="mailto:Fittwitht.1@gmail.com">Fittwitht.1@gmail.com</a>.
          </p>

          <button className="btn btn-ghost privacy__back" onClick={() => onNavigate('home')}>
            <span aria-hidden="true">&larr;</span> Back to home
          </button>
        </div>
      </section>
    </main>
  )
}
