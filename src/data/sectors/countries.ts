import { copy, type Localized } from '@/lib/i18n/localized'

/**
 * The four countries a sub-service can be tied to, in the order the
 * sector pages list them: the filter pills and the country groups both
 * follow it.
 */
export const COUNTRY_ORDER = ['sa', 'eg', 'ae', 'om'] as const

export type CountryCode = (typeof COUNTRY_ORDER)[number]

/*
 * Each country's short code (always Latin, shown left to right) and its
 * name. Arabic from the storyboard's presence page, English from the
 * company profile.
 */
export const COUNTRIES: Record<CountryCode, { code: string; name: Localized }> = {
  sa: { code: 'SA', name: copy('السعودية', 'Saudi Arabia') },
  eg: { code: 'EG', name: copy('مصر', 'Egypt') },
  ae: { code: 'AE', name: copy('الإمارات', 'UAE') },
  om: { code: 'OM', name: copy('عُمان', 'Oman') },
}
