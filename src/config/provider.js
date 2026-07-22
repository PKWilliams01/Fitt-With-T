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
export const BOOKING_EMBED_URL = null

// true only once a real https embed URL has been configured
export const isConfigured = (url) => typeof url === 'string' && url.startsWith('https://')
