/* ============================================================
   Scheduling / intake provider embed config.

   Booking + the ~15-question health intake are handled entirely by a
   certified provider (Acuity / Square / Calendly) that the CLIENT owns.
   Per CLAUDE.md this is special-category health data under UK GDPR and must
   never be collected by a hand-rolled form or stored in this codebase.

   Our code only *renders* this URL in an iframe — it never reads, stores,
   logs or pre-fills anything inside it. Paste the client's own embed URL
   here once she supplies and authorises it; nothing else needs to change.
   ============================================================ */
/* The client's own Acuity account (owner=39911636). Authorised by her. */
export const PROVIDER_NAME = 'Acuity'
export const BOOKING_EMBED_URL =
  'https://app.acuityscheduling.com/schedule.php?owner=39911636&ref=embedded_csp'
/* Acuity's official embed helper — resizes the iframe; never touches form data. */
export const ACUITY_EMBED_SCRIPT = 'https://embed.acuityscheduling.com/js/embed.js'

// true only once a real https embed URL has been configured
export const isConfigured = (url) => typeof url === 'string' && url.startsWith('https://')
