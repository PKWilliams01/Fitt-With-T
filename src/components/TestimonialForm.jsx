import { useState } from 'react'
import './TestimonialForm.css'

/* Client testimonial submission. Submissions are emailed to Tommera via the
   certified provider (Basin) — never stored on this site — and only appear on
   the site after she reviews and approves them. The consent checkbox records
   the client's permission to publish their first name + words. */
const BASIN_ENDPOINT = 'https://usebasin.com/f/460af029a90e'
const EMPTY = { name: '', testimonial: '', consent: false }

export default function TestimonialForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  function validate(v) {
    const e = {}
    if (!v.name.trim()) e.name = 'Please add your first name.'
    if (!v.testimonial.trim()) e.testimonial = 'Please write a few words about your experience.'
    if (!v.consent) e.consent = 'Please tick the box so T can share your words.'
    return e
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    setSending(true)
    setSubmitError(null)
    try {
      const res = await fetch(BASIN_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error(`Basin responded ${res.status}`)
      setSent(true)
      setValues(EMPTY)
    } catch {
      setSubmitError('Sorry, that didn’t send. Please try again in a moment.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <p className="tform__sent" role="status">
        Thank you for sharing! T will read every word and, with your permission,
        may add it to the wall soon.
      </p>
    )
  }

  return (
    <form className="tform" onSubmit={handleSubmit} noValidate
          action={BASIN_ENDPOINT} method="POST">
      {/* labels the email so Tommera can tell testimonials from contact messages */}
      <input type="hidden" name="_subject" value="New testimonial for the website" />

      <div className="field">
        <label htmlFor="tf-name">Your first name</label>
        <input id="tf-name" name="name" type="text" value={values.name}
          onChange={handleChange} autoComplete="given-name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'tf-name-err' : undefined} />
        {errors.name && <p className="field-err" id="tf-name-err" role="alert">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="tf-testimonial">Your experience</label>
        <textarea id="tf-testimonial" name="testimonial" rows="5" value={values.testimonial}
          onChange={handleChange}
          aria-invalid={!!errors.testimonial}
          aria-describedby={errors.testimonial ? 'tf-testimonial-err' : undefined} />
        {errors.testimonial && <p className="field-err" id="tf-testimonial-err" role="alert">{errors.testimonial}</p>}
      </div>

      <div className="field field--check">
        <label className="tform__consent">
          <input type="checkbox" name="consent" checked={values.consent}
            onChange={handleChange}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'tf-consent-err' : undefined} />
          <span>I’m happy for Fitt With T to publish this, with my first name, on the website.</span>
        </label>
        {errors.consent && <p className="field-err" id="tf-consent-err" role="alert">{errors.consent}</p>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Share your experience'} <span aria-hidden="true">→</span>
      </button>
      {submitError && <p className="field-err" role="alert">{submitError}</p>}

      <p className="tform__note">
        Nothing is published automatically. T reads every submission and only adds
        it to the wall with your permission.
      </p>
    </form>
  )
}
