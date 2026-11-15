import { PATHS, sectorPath, type SectorPath, type SitePath } from '@/config/paths'
import { SECTOR_INDEX, type SectorSlug } from '@/data/sectorIndex'
import { LANGUAGES, type Language } from '@/lib/i18n/languageConfig'
import { localizePath } from '@/lib/i18n/localizePath'

/*
 * Every public page of the site, once. The router (App.tsx) draws its
 * routes from this list, the prerender (scripts/prerender.mjs) writes one
 * HTML file per entry and language, and the sitemap will list them.
 * Paths are the Arabic ones; English is the same under /en.
 */
export type SiteRoute =
  | { page: Exclude<PageName, 'sector'>; path: SitePath }
  | { page: 'sector'; path: SectorPath; slug: SectorSlug }

export type PageName =
  | 'home'
  | 'about'
  | 'services'
  | 'sector'
  | 'presence'
  | 'bookConsultation'
  | 'requestQuote'
  | 'contact'
  | 'privacy'

export const SITE_ROUTES: readonly SiteRoute[] = [
  { page: 'home', path: PATHS.home },
  { page: 'about', path: PATHS.about },
  { page: 'services', path: PATHS.services },
  ...SECTOR_INDEX.map((sector) => ({ page: 'sector' as const, path: sectorPath(sector.slug), slug: sector.slug })),
  { page: 'presence', path: PATHS.presence },
  { page: 'bookConsultation', path: PATHS.bookConsultation },
  { page: 'requestQuote', path: PATHS.requestQuote },
  { page: 'contact', path: PATHS.contact },
  { page: 'privacy', path: PATHS.privacy },
]

/** One page in one language, at its URL ("/about", "/en/about"). */
export type LocalizedRoute = { route: SiteRoute; language: Language; url: string }

/** Every page in every language: what the prerender writes, one file each. */
export function localizedRoutes(): LocalizedRoute[] {
  return LANGUAGES.flatMap((language) =>
    SITE_ROUTES.map((route) => ({ route, language, url: localizePath(route.path, language) })),
  )
}
