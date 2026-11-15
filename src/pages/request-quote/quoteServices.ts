import { SECTOR_INDEX, type SectorEntry } from '@/data/sectorIndex'
import { getSectorDetail } from '@/data/sectors'
import { COUNTRIES, type CountryCode } from '@/data/sectors/countries'
import { matchesSearch } from '@/lib/forms/search'
import type { Language } from '@/lib/i18n/languageConfig'
import { resolveCopy, type Localized } from '@/lib/i18n/localized'

/**
 * One choice in the quote form's service list: a sector's sub-service, or
 * — for a sector with no sub-services (premium residency) — the sector
 * itself. `value` is the service id (the sector slug for a whole sector);
 * ids are unique across sectors, so `?service=<id>` names one alone.
 */
export type QuoteService = {
  readonly value: string
  readonly title: Localized
  readonly country?: CountryCode
  readonly sector: SectorEntry
  /** The choice is the sector itself, not a service in it. */
  readonly wholeSector: boolean
}

/** Every service, sector by sector, in the order of the services page. */
export const QUOTE_SERVICES: readonly QuoteService[] = SECTOR_INDEX.flatMap<QuoteService>((sector) => {
  const { services } = getSectorDetail(sector.slug)
  return services.length
    ? services.map((service) => ({
        value: service.id,
        title: service.title,
        country: service.country,
        sector,
        wholeSector: false,
      }))
    : [{ value: sector.slug, title: sector.title, sector, wholeSector: true }]
})

/** The last choice: a service not in the list. */
export const OTHER_SERVICE = 'other'

export function findQuoteService(value: string) {
  return QUOTE_SERVICES.find((service) => service.value === value)
}

/**
 * A service's name as listed: its title, and its country in brackets when
 * the service is tied to one and the title does not already name it
 * ("Incorporation Procedures (Saudi Arabia)"). The sector pages show the
 * country as a group heading instead; the list has no such heading.
 */
export function serviceLabel(service: QuoteService, language: Language) {
  const title = resolveCopy(service.title, language)
  if (!service.country) {
    return title
  }
  const country = resolveCopy(COUNTRIES[service.country].name, language)
  return matchesSearch(title, country) ? title : `${title} (${country})`
}
