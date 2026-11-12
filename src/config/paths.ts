import type { SectorSlug } from '@/data/sectorIndex'

/**
 * Every page of this site, by name.
 *
 * These are the Arabic paths, which are the site's canonical ones. English
 * lives under `/en`, and `localizePath` is the only place that adds it — so
 * nothing else has to know that the prefix exists.
 */
export const PATHS = {
  home: '/',
  about: '/about',
  services: '/services',
  presence: '/presence',
  contact: '/contact',
  bookConsultation: '/book-consultation',
  requestQuote: '/request-quote',
  designSystem: '/design-system',
} as const

/** A sector's own page, one per slug in the sectors data. */
export type SectorPath = `/services/${SectorSlug}`

export function sectorPath(slug: SectorSlug): SectorPath {
  return `/services/${slug}`
}

/**
 * Every path a link may point at. Typed, so a link to a page that does not
 * exist — or a typo in a sector slug — fails to compile.
 */
export type SitePath = (typeof PATHS)[keyof typeof PATHS] | SectorPath
