/* Published Google Sheet (CSV) that Tommera maintains as the testimonial wall.
   She adds a row to publish a testimonial and deletes a row to remove one.

   Set the URL via the VITE_TESTIMONIALS_CSV_URL environment variable (in Vercel),
   not in the repo. Until it is set, the site falls back to the built-in list in
   src/data/testimonials.js, so testimonials always render. */
const DEFAULT_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQawCHeK8lNdXTiDFtNjzuRUO5AXgAHwUspNS_6FTJ-Gh8Rq6gTeA2vp-uDUUhVHxGbOlIt6hjCjPm/pub?output=csv'

export const TESTIMONIALS_CSV_URL = import.meta.env.VITE_TESTIMONIALS_CSV_URL || DEFAULT_CSV_URL
