/* Published Google Sheet (CSV) that Tommera maintains as the testimonial wall.
   She adds a row to publish a testimonial and deletes a row to remove one.

   Set the URL via the VITE_TESTIMONIALS_CSV_URL environment variable (in Vercel),
   not in the repo. Until it is set, the site falls back to the built-in list in
   src/data/testimonials.js, so testimonials always render. */
export const TESTIMONIALS_CSV_URL = import.meta.env.VITE_TESTIMONIALS_CSV_URL || ''
