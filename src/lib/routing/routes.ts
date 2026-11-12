import {
  DEFAULT_LANGUAGE,
  isLanguage,
  LANGUAGE_PATH_PREFIXES,
  LANGUAGE_QUERY_PARAM,
  LANGUAGES,
  type Language,
} from '@/lib/i18n/languageConfig'
import type { SectorSlug } from '@/data/sectorIndex'
import type { TranslationKey } from '@/lib/i18n/translations'

/**
 * The project's URL architecture.
 *
 * The path is the only source of truth for the language. Arabic is the
 * default and lives at the root, English lives under `/en`:
 *
 *   /               ->  Arabic home          /en               ->  English home
 *   /design-system  ->  Arabic design system /en/design-system ->  English …
 *
 * A route is therefore declared once, by its canonical (unprefixed) path, and
 * both language variants are generated from it. Nothing else may assemble a
 * URL by hand: `localizedPath` and `languagePathname` are the only places
 * that know about the prefix.
 *
 * To add a route, add one entry to `ROUTES` and one element to
 * `ROUTE_ELEMENTS` in `src/App.tsx`. That map is keyed by `RouteId`, so a
 * missing element is a type error rather than a blank page.
 */

/** What every route, including the catch-all, has to declare. */
export type RouteMeta = {
  readonly id: string
  readonly titleKey: TranslationKey
  /**
   * Whether the route may be indexed. An unindexable route gets `noindex`
   * and no canonical or alternate links — a URL that does not exist has no
   * canonical form.
   */
  readonly indexable?: boolean
}

export const ROUTES = [
  { id: 'home', path: '/', titleKey: 'soon.eyebrow' },
  /*
   * Placeholder pages. They are declared now so that every navigation
   * target resolves and the information architecture is fixed, and they are
   * kept out of the index until the real content ships: a thin page that
   * ranks is worse than no page at all. Drop `indexable` when the real page
   * replaces the placeholder.
   */
  { id: 'about', path: '/about', titleKey: 'nav.about', indexable: false },
  { id: 'services', path: '/services', titleKey: 'nav.services', indexable: false },
  { id: 'presence', path: '/presence', titleKey: 'nav.presence', indexable: false },
  { id: 'contact', path: '/contact', titleKey: 'nav.contact', indexable: false },
  {
    id: 'bookConsultation',
    path: '/book-consultation',
    titleKey: 'nav.bookConsultation',
    indexable: false,
  },
  {
    id: 'requestQuote',
    path: '/request-quote',
    titleKey: 'nav.requestQuote',
    indexable: false,
  },
  /* Internal reference material, deliberately not indexed. */
  {
    id: 'designSystem',
    path: '/design-system',
    titleKey: 'ds.title',
    indexable: false,
  },
] as const satisfies ReadonlyArray<RouteMeta & { readonly path: string }>

/** A sector's own page, one per slug in the sectors data. */
export type SectorPath = `/services/${SectorSlug}`

/**
 * Every path a `LocalizedLink` may point at: the declared routes plus the
 * nine sector pages, which are one pattern but nine real URLs. A typo in a
 * slug fails to compile.
 */
export type CanonicalPath = (typeof ROUTES)[number]['path'] | SectorPath

/** The id of a route that has a path — everything except the catch-all. */
export type PageRouteId = (typeof ROUTES)[number]['id']

export type RouteId =
  | PageRouteId
  | typeof SECTOR_ROUTE.id
  | typeof NOT_FOUND_ROUTE.id

/** The path of each route, by id, so a path is written exactly once. */
export const ROUTE_PATHS = Object.fromEntries(
  ROUTES.map((route) => [route.id, route.path]),
) as Record<PageRouteId, CanonicalPath>

/** The title key of each route, by id. */
export const ROUTE_TITLE_KEYS = Object.fromEntries(
  ROUTES.map((route) => [route.id, route.titleKey]),
) as Record<PageRouteId, TranslationKey>

/**
 * The sector pages. A pattern rather than a path, so it is declared beside
 * the catch-all instead of in `ROUTES`: it cannot be linked to directly,
 * only through `sectorPath(slug)`.
 */
export const SECTOR_ROUTE = {
  id: 'sector',
  path: '/services/:slug',
  titleKey: 'nav.services',
  indexable: false,
} as const satisfies RouteMeta & { readonly path: string }

export function sectorPath(slug: SectorSlug): SectorPath {
  return `/services/${slug}`
}

/** Rendered for every path that no route claims, in either language. */
export const NOT_FOUND_ROUTE = {
  id: 'notFound',
  titleKey: 'notFound.title',
  indexable: false,
} as const satisfies RouteMeta

/** `''`, `'/foo/'` and `'/foo'` all normalise to the same comparable value. */
function normalizePathname(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '')

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

function withLanguagePrefix(canonical: string, language: Language): string {
  const prefix = LANGUAGE_PATH_PREFIXES[language]

  if (!prefix) {
    return canonical
  }

  return canonical === '/' ? prefix : `${prefix}${canonical}`
}

/**
 * The language a URL belongs to.
 *
 * `src/boot/languageBoot.ts` repeats this rule in the pre-paint script, so
 * the document is in the right language and direction before first paint —
 * keep the two in step.
 */
export function languageFromPathname(pathname: string): Language {
  const normalized = normalizePathname(pathname)

  for (const language of LANGUAGES) {
    const prefix = LANGUAGE_PATH_PREFIXES[language]

    if (
      prefix &&
      (normalized === prefix || normalized.startsWith(`${prefix}/`))
    ) {
      return language
    }
  }

  return DEFAULT_LANGUAGE
}

/** The same URL with its language prefix removed. */
export function canonicalPathname(pathname: string): string {
  const normalized = normalizePathname(pathname)
  const prefix = LANGUAGE_PATH_PREFIXES[languageFromPathname(normalized)]

  if (!prefix) {
    return normalized
  }

  return normalizePathname(normalized.slice(prefix.length))
}

/** Where a declared route lives in a given language. */
export function localizedPath(
  path: CanonicalPath,
  language: Language,
): string {
  return withLanguagePrefix(normalizePathname(path), language)
}

/**
 * The same, for a route *pattern* rather than a real path. Only the router
 * declaration uses it; links go through `localizedPath`, which will not
 * accept a pattern.
 */
export function localizedPattern(
  pattern: string,
  language: Language,
): string {
  return withLanguagePrefix(normalizePathname(pattern), language)
}

/**
 * The current URL's equivalent in another language, for any path — including
 * ones no route claims, so the switcher still works on a 404.
 */
export function languagePathname(
  pathname: string,
  language: Language,
): string {
  return withLanguagePrefix(canonicalPathname(pathname), language)
}

/**
 * Whether a URL is "on" a route, for marking navigation. A section owns its
 * children: `/services/legal` keeps Services marked. Home is the exception —
 * it is a prefix of everything, so it matches exactly.
 */
export function isRouteActive(
  pathname: string,
  routeId: PageRouteId,
): boolean {
  const canonical = canonicalPathname(pathname)
  const path = ROUTE_PATHS[routeId]

  if (path === '/') {
    return canonical === '/'
  }

  return canonical === path || canonical.startsWith(`${path}/`)
}

export type PartialLocation = {
  pathname: string
  search: string
  hash: string
}

/**
 * Backward compatibility for the retired `?lang=` parameter: returns the
 * path-based equivalent to redirect to, or `null` when the URL is already
 * canonical. Any other query parameter is preserved, as is the hash.
 */
export function legacyLanguageRedirect(
  location: PartialLocation,
): string | null {
  const params = new URLSearchParams(location.search)
  const requested = params.get(LANGUAGE_QUERY_PARAM)

  if (!isLanguage(requested)) {
    return null
  }

  params.delete(LANGUAGE_QUERY_PARAM)

  const query = params.toString()

  return `${languagePathname(location.pathname, requested)}${
    query ? `?${query}` : ''
  }${location.hash}`
}
