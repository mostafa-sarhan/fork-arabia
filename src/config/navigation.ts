import type { ButtonVariant } from '@/components/ui/Button'
import { PATHS, type SitePath } from '@/config/paths'
import type { TranslationKey } from '@/lib/i18n/translations'

/**
 * The site's navigation, in one place.
 *
 * The navbar, the footer and the 404 page all have to offer the same way
 * around the site; three hand-written lists would be three chances for them
 * to disagree.
 */
export type NavItem = {
  readonly path: SitePath
  readonly labelKey: TranslationKey
}

export type NavAction = NavItem & {
  readonly variant: ButtonVariant
}

/** The links in the bar, in order. Services also opens the sector menu. */
export const PRIMARY_NAV: readonly NavItem[] = [
  { path: PATHS.home, labelKey: 'nav.home' },
  { path: PATHS.about, labelKey: 'nav.about' },
  { path: PATHS.services, labelKey: 'nav.services' },
  { path: PATHS.presence, labelKey: 'nav.presence' },
  { path: PATHS.contact, labelKey: 'nav.contact' },
]

/**
 * The two standing calls to action, in ascending order of commitment. The
 * secondary variant is the project's turquoise button, which carries navy
 * text (4.91:1); `outline` keeps the quote from competing with it.
 */
export const NAV_ACTIONS: readonly NavAction[] = [
  { path: PATHS.requestQuote, labelKey: 'nav.requestQuote', variant: 'outline' },
  {
    path: PATHS.bookConsultation,
    labelKey: 'nav.bookConsultation',
    variant: 'secondary',
  },
]

/**
 * The footer's links: the primary navigation without Home, which the logo
 * beside them already goes to. They sit on one inline row, so the list is
 * kept to the four pages rather than repeating the calls to action the
 * header already carries.
 */
export const FOOTER_NAV: readonly NavItem[] = [
  { path: PATHS.about, labelKey: 'nav.about' },
  { path: PATHS.services, labelKey: 'nav.services' },
  { path: PATHS.presence, labelKey: 'nav.presence' },
  { path: PATHS.contact, labelKey: 'nav.contact' },
]
