import type { SectorEntry } from '@/data/sectorIndex'
import type { Localized } from '@/lib/i18n/localized'
import type { CountryCode } from './countries'

/**
 * One sub-service of a sector.
 *
 * `id` is a kebab-case slug, unique inside its sector: it is the block's
 * HTML id, so `/services/<slug>#<id>` scrolls to it. `country` is set only
 * where the storyboard ties the service to one country; the title is then
 * stored without its "(country)" suffix, because the page shows the
 * country as a group heading or a tag instead.
 */
export type SectorService = {
  readonly id: string
  readonly title: Localized
  readonly body: Localized
  readonly country?: CountryCode
}

/** One premium-residency track: a short tag, its name and its terms. */
export type ResidencyTrack = {
  readonly tag: Localized
  readonly title: Localized
  readonly body: Localized
}

/** The blocks only the premium-residency page has. */
export type SectorExtras = {
  readonly tracks: {
    readonly title: Localized
    readonly intro: Localized
    readonly items: readonly ResidencyTrack[]
  }
  readonly steps: {
    readonly title: Localized
    readonly items: readonly Localized[]
  }
  readonly benefits: {
    readonly title: Localized
    readonly items: readonly Localized[]
  }
  readonly disclaimer: Localized
}

/** What a sector page adds to the light index entry. */
export type SectorContent = {
  /** The long description under the sector page's title. */
  readonly lead: Localized
  /** The sector's own question on its booking cards. */
  readonly ctaTitle: Localized
  readonly services: readonly SectorService[]
  readonly extras?: SectorExtras
}

/** Everything a sector page renders: the index entry plus its content. */
export type SectorDetail = SectorEntry & SectorContent
