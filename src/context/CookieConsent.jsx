import { createContext, useContext, useState } from 'react'

/* Cookie consent state for the whole app: 'unknown' | 'accepted' | 'rejected'.
   The single first-party record below is the consent choice itself, which is
   essential/necessary under PECR — so storing it pre-consent is allowed.
   Nothing else is stored, and this site sets no trackers of its own. */
const STORAGE_KEY = 'fwt_cookie_consent'

const CookieConsentContext = createContext(null)

function readStored() {
  const v = localStorage.getItem(STORAGE_KEY)
  return v === 'accepted' || v === 'rejected' ? v : 'unknown'
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(readStored)

  function choose(value) { // 'accepted' | 'rejected'
    localStorage.setItem(STORAGE_KEY, value)
    setConsent(value)
  }

  /* Re-opens the banner (e.g. footer "Manage cookies"). The stored choice is
     kept until they actively re-choose — but while the banner is open the
     embed is treated as unconsented, which is the safe direction. */
  function reopen() {
    setConsent('unknown')
  }

  return (
    <CookieConsentContext.Provider value={{ consent, choose, reopen }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  return useContext(CookieConsentContext)
}
