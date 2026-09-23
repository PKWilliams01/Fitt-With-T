import { useEffect, useState } from 'react'
import { TESTIMONIALS as FALLBACK_ALL, HOME_TESTIMONIALS as FALLBACK_HOME } from '../data/testimonials'
import { TESTIMONIALS_CSV_URL } from '../config/testimonialsSheet'

/* Parse CSV into rows of fields. Handles quoted fields containing commas,
   newlines and escaped ("") quotes — testimonials are full of commas. */
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQuotes = false
      } else field += c
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field); field = ''
    } else if (c === '\n') {
      row.push(field); rows.push(row); row = []; field = ''
    } else if (c !== '\r') {
      field += c
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  return rows.filter((r) => r.some((f) => f.trim() !== ''))
}

const truthy = (v) => /^(y|yes|true|x|1|✓)$/i.test((v || '').trim())

/* Turn the sheet's rows into testimonial objects. Row 1 must be headers
   containing at least "Name" and "Quote"; an optional "Home" column marks which
   ones also appear on the home page. */
function rowsToTestimonials(rows) {
  if (rows.length < 2) return null
  const headers = rows[0].map((h) => h.trim().toLowerCase())
  const nameIdx = headers.indexOf('name')
  const quoteIdx = headers.indexOf('quote')
  const homeIdx = headers.indexOf('home')
  if (nameIdx === -1 || quoteIdx === -1) return null

  const items = rows
    .slice(1)
    .map((r) => ({
      name: (r[nameIdx] || '').trim(),
      quote: (r[quoteIdx] || '').trim(),
      home: homeIdx >= 0 ? truthy(r[homeIdx]) : false,
    }))
    .filter((t) => t.name && t.quote)

  return items.length ? items : null
}

/* Testimonials for the site. Reads Tommera's published Google Sheet when a URL
   is configured; otherwise (or on any error) uses the built-in list so the wall
   never renders empty. Returns { all, home }. */
export default function useTestimonials() {
  const [data, setData] = useState({ all: FALLBACK_ALL, home: FALLBACK_HOME })

  useEffect(() => {
    if (!TESTIMONIALS_CSV_URL) return
    let cancelled = false

    fetch(TESTIMONIALS_CSV_URL)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`sheet ${r.status}`))))
      .then((text) => {
        if (cancelled) return
        const items = rowsToTestimonials(parseCsv(text))
        if (!items) return // keep fallback if the sheet is empty/misformatted
        const home = items.filter((t) => t.home)
        setData({ all: items, home: home.length ? home : items.slice(0, 3) })
      })
      .catch(() => { /* network/parse error — keep the built-in fallback */ })

    return () => { cancelled = true }
  }, [])

  return data
}
