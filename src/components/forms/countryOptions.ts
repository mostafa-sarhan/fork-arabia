import { SERVED_COUNTRIES } from '@/config/countries'
import { countryName, countrySearchNames, dialCodeOf, otherCountries } from '@/lib/forms/countries'
import { matchesSearch } from '@/lib/forms/search'
import type { Language } from '@/lib/i18n/languageConfig'
import type { SelectOption, SelectRank } from './Select'

/**
 * The country field's options, one flat list: the eight served countries
 * in the storyboard's order, then every other country sorted by name in
 * the page language. Each shows its dial code, muted, at the end.
 */
export function countryOptions(language: Language): SelectOption[] {
  return [
    ...SERVED_COUNTRIES.map((country) => ({ id: country.id, dialCode: country.dialCode })),
    ...otherCountries(language),
  ].map((country) => ({ value: country.id, label: countryName(country.id, language), detail: country.dialCode }))
}

/* A dial code or a typed number as bare digits: "+1 876" → "1876". */
const bareDigits = (text: string) => text.replace(/[\s+]/g, '')

/* The search's tiers, best first. */
const TIER = { exactCode: 0, nameStarts: 1, codeStarts: 2, contains: 3 } as const

/**
 * Ranks a country for a search: its exact dial code first ("49" →
 * Germany), then names starting with the text ("مص" → مصر), then dial
 * codes starting with it, then names or codes containing it. Names are
 * matched in Arabic and English.
 */
export const rankCountry: SelectRank = (option, query) => {
  const names = countrySearchNames(option.value)
  const code = bareDigits(dialCodeOf(option.value))
  const digits = bareDigits(query)
  const isNumber = /^\d+$/.test(digits)

  if (isNumber && code === digits) return TIER.exactCode
  if (names.some((name) => matchesSearch(name, query, 'start'))) return TIER.nameStarts
  if (isNumber && code.startsWith(digits)) return TIER.codeStarts
  if (names.some((name) => matchesSearch(name, query)) || (isNumber && code.includes(digits))) return TIER.contains
  return null
}
