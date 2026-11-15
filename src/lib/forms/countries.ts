import { SERVED_COUNTRIES } from '@/config/countries'
import { WORLD_COUNTRIES } from '@/data/worldCountries'
import type { Language } from '@/lib/i18n/languageConfig'
import { resolveCopy } from '@/lib/i18n/localized'

/*
 * A country field's value is its ISO code in lower case ("de"); the eight
 * served countries' config ids are the same codes ("sa", "eg"…).
 */

/* The browser's own country names, one reader per language, made once. */
const DISPLAY_NAMES: Partial<Record<Language, Intl.DisplayNames>> = {}

function regionName(code: string, language: Language) {
  DISPLAY_NAMES[language] ??= new Intl.DisplayNames([language], { type: 'region' })
  return DISPLAY_NAMES[language].of(code.toUpperCase()) ?? code.toUpperCase()
}

/**
 * Every name a country is searched by: the one shown, the other
 * language's, and the browser's in both ("UAE" is also "United Arab
 * Emirates").
 */
export function countrySearchNames(id: string) {
  const names = [countryName(id, 'ar'), countryName(id, 'en'), regionName(id, 'ar'), regionName(id, 'en')]
  return [...new Set(names)]
}

/** A country's name: the config's for the eight served, the browser's for the rest. */
export function countryName(id: string, language: Language) {
  const served = SERVED_COUNTRIES.find((country) => country.id === id)
  return served ? resolveCopy(served.name, language) : regionName(id, language)
}

/** A country's dial code ("+49"), or '' for an unknown value. */
export function dialCodeOf(id: string) {
  const served = SERVED_COUNTRIES.find((country) => country.id === id)
  return served?.dialCode ?? WORLD_COUNTRIES.find((country) => country.code === id.toUpperCase())?.dialCode ?? ''
}

/** The country as the team's email gives it: the Arabic name and its code («ألمانيا (DE)»). */
export function countryForEmail(id: string) {
  return id ? `${countryName(id, 'ar')} (${id.toUpperCase()})` : ''
}

/** Every country beyond the eight served, named in `language` and sorted for it. */
export function otherCountries(language: Language) {
  const served = new Set(SERVED_COUNTRIES.map((country) => country.id))
  const collator = new Intl.Collator(language)
  return WORLD_COUNTRIES.filter((country) => !served.has(country.code.toLowerCase()))
    .map((country) => ({ id: country.code.toLowerCase(), dialCode: country.dialCode, name: regionName(country.code, language) }))
    .sort((a, b) => collator.compare(a.name, b.name))
}
