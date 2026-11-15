import { useEffect } from 'react'
import { Analytics as VercelAnalytics, track as vercelTrack } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useIsClient } from '@/lib/useIsClient'

/*
 * The site's only link to an analytics provider: Vercel Web Analytics
 * (page views and custom events) and Speed Insights (real-visitor Core
 * Web Vitals). Both are anonymous and cookieless, so there is no consent
 * banner; the privacy page says so. Moving host means changing this file
 * only.
 *
 * Off in development and whenever the page was opened with ?preview=
 * (the forms' success-dialog previews), so neither is ever counted.
 */

/** Every custom event and its properties. None carries personal data. */
type AnalyticsEvents = {
  form_submitted: { form: 'booking' | 'quote' | 'contact'; lang: string }
  whatsapp_click: { page: string }
  phone_click: { page: string }
  email_click: { page: string }
}

/** Decided once per visit, on the URL it opened with (false on the server). */
const ENABLED =
  import.meta.env.PROD && typeof window !== 'undefined' && !new URLSearchParams(window.location.search).has('preview')

/** Sends one custom event; does nothing where analytics is off. */
/* Kept beside <Analytics /> on purpose (one file per provider); this file is never edited while the dev server runs, so fast refresh does not matter. */
// eslint-disable-next-line react/only-export-components
export function track<Name extends keyof AnalyticsEvents>(name: Name, props: AnalyticsEvents[Name]) {
  if (ENABLED) vercelTrack(name, props)
}

/* Which links count as a contact click, by where they lead. */
const CONTACT_LINKS = [
  { event: 'whatsapp_click', matches: (href: string) => href.startsWith('https://wa.me/') },
  { event: 'phone_click', matches: (href: string) => href.startsWith('tel:') },
  { event: 'email_click', matches: (href: string) => href.startsWith('mailto:') },
] as const

/**
 * One click listener for the whole site: any WhatsApp, phone or email link,
 * wherever it sits (floating button, footer, menu, contact page, offices),
 * reports its event with the page path only, never the number or address.
 */
function useContactClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.('a[href]')
      const href = link?.getAttribute('href') ?? ''
      const kind = CONTACT_LINKS.find((candidate) => candidate.matches(href))
      if (kind) track(kind.event, { page: window.location.pathname })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
}

/**
 * Mount once, in the root layout. Rendered only after hydration, so the
 * prerendered HTML and the first client render stay identical. The Vercel
 * script follows client-side navigation itself (it watches the history),
 * sending a page view for every route change.
 */
export function Analytics() {
  const isClient = useIsClient()
  useContactClicks()

  if (!isClient || !ENABLED) return null

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  )
}
