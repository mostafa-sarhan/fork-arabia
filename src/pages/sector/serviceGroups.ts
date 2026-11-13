import { COUNTRY_ORDER, type CountryCode } from '@/data/sectors/countries'
import type { SectorService } from '@/data/sectors/types'

/** A service with its two-digit position on the page: "01", "02"… */
export type NumberedService = SectorService & { readonly number: string }

export type CountryGroup = {
  readonly country: CountryCode
  readonly services: readonly NumberedService[]
}

export type ServiceGroups = {
  /** True when the sector spans two countries or more: filter and groups. */
  readonly grouped: boolean
  /** Grouped: the services with no country. Otherwise: every service, in order. */
  readonly general: readonly NumberedService[]
  /** One group per country, in COUNTRY_ORDER; empty when not grouped. */
  readonly groups: readonly CountryGroup[]
}

/** The countries a sector's services name, in COUNTRY_ORDER. */
export function countriesOf(services: readonly SectorService[]): CountryCode[] {
  return COUNTRY_ORDER.filter((country) =>
    services.some((service) => service.country === country),
  )
}

/**
 * How a sector page lays out its services. With two countries or more, the
 * services without a country come first and each country follows as its
 * own group; otherwise the list stays in the data's order. Numbers follow
 * the order on the page, so they read 01, 02, 03… top to bottom.
 */
export function groupServices(services: readonly SectorService[]): ServiceGroups {
  const countries = countriesOf(services)
  const grouped = countries.length >= 2

  let position = 0
  const numbered = (service: SectorService): NumberedService => {
    position += 1
    return { ...service, number: String(position).padStart(2, '0') }
  }

  if (!grouped) {
    return { grouped, general: services.map(numbered), groups: [] }
  }

  const general = services.filter((service) => !service.country).map(numbered)
  const groups = countries.map((country) => ({
    country,
    services: services.filter((service) => service.country === country).map(numbered),
  }))

  return { grouped, general, groups }
}
