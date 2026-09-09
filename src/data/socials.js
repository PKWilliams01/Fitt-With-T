/* Single source of truth for Fitt With T's social / contact links.
   Used by both the nav drawer and the footer. */
export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/_fittwitht_' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@_fittwitht_' },
  { label: 'Email',     href: 'mailto:Fittwitht.1@gmail.com' },
]

export const isMail = (href) => href.startsWith('mailto:')

/* Public "follow" platforms for the dedicated social section (FIT-75).
   Handles confirmed — these match the live nav/footer accounts. */
export const SOCIAL_PLATFORMS = [
  { label: 'Instagram', href: 'https://www.instagram.com/_fittwitht_' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@_fittwitht_' },
]
