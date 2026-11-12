import type { ButtonVariant } from '@/components/ui/Button'
import type { TranslationKey } from '@/lib/i18n/translations'
import type { PageRouteId } from '@/lib/routing/routes'

/**
 * The site's navigation, in one place.
 *
 * The navbar, the footer and the 404 page all have to offer the same way
 * around the site; three hand-written lists would be three chances for them
 * to disagree. Items name a route by id and never a path, so the URL stays
 * owned by `src/lib/routing/routes.ts`.
 */
export type NavItem = {
  readonly routeId: PageRouteId
  readonly labelKey: TranslationKey
}

export type NavAction = NavItem & {
  readonly variant: ButtonVariant
}

export const PRIMARY_NAV = [
  { routeId: 'home', labelKey: 'nav.home' },
  { routeId: 'about', labelKey: 'nav.about' },
  /* Services carries the sector menu; it is listed here like any other item. */
  { routeId: 'services', labelKey: 'nav.services' },
  { routeId: 'presence', labelKey: 'nav.presence' },
  { routeId: 'contact', labelKey: 'nav.contact' },
] as const satisfies ReadonlyArray<NavItem>

/**
 * The two standing calls to action, in ascending order of commitment. The
 * accent variant is the project's turquoise button, which carries navy text
 * (4.91:1); `outline` keeps the lower-commitment action from competing with
 * it.
 */
export const NAV_ACTIONS = [
  { routeId: 'requestQuote', labelKey: 'nav.requestQuote', variant: 'outline' },
  {
    routeId: 'bookConsultation',
    labelKey: 'nav.bookConsultation',
    variant: 'secondary',
  },
] as const satisfies ReadonlyArray<NavAction>

/**
 * The footer's quick links, in the storyboard's order.
 *
 * It is its own list rather than the primary navigation plus the actions,
 * because the storyboard orders them differently — the two actions sit in
 * the middle, between Presence and Contact, not at the end — and Home is
 * left out, since the logo above it already goes there. Driving it from a
 * list keeps that decision here instead of as a sort buried in the
 * footer's markup.
 */
export const FOOTER_NAV = [
  { routeId: 'about', labelKey: 'nav.about' },
  { routeId: 'services', labelKey: 'nav.services' },
  { routeId: 'presence', labelKey: 'nav.presence' },
  { routeId: 'bookConsultation', labelKey: 'nav.bookConsultation' },
  { routeId: 'requestQuote', labelKey: 'nav.requestQuote' },
  { routeId: 'contact', labelKey: 'nav.contact' },
] as const satisfies ReadonlyArray<NavItem>
