/* ============================================================
   Certified booking-provider embed config — PLACEHOLDERS.
   The client supplies the real embed URLs from her OWN provider account
   (e.g. Acuity / Square / Calendly). Until then they point nowhere.
   Our code only *renders* these URLs in an iframe — it never reads, stores,
   logs, pre-fills or forwards anything inside them. Replace when authorised.
   ============================================================ */
export const PROVIDER_NAME = 'her secure booking provider' // placeholder — client to confirm

// PLACEHOLDER embed URLs — do NOT point these anywhere until authorised.
export const INTAKE_EMBED_URL = 'about:blank'
export const BOOKING_EMBED_URL = 'about:blank'

// true once a real https embed URL is configured (not the placeholder)
export const isConfigured = (url) => typeof url === 'string' && url.startsWith('https://')
