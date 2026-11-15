import { SERVED_COUNTRIES } from '@/config/countries'
import type { Language } from '@/lib/i18n/languageConfig'
import { resolveCopy } from '@/lib/i18n/localized'
import { FORM_COPY } from './formCopy'

/** The country field's options: the countries served, then "Other country". */
export function countryOptions(language: Language) {
  return [
    ...SERVED_COUNTRIES.map((country) => ({ value: country.id, label: resolveCopy(country.name, language) })),
    { value: 'other', label: resolveCopy(FORM_COPY.otherCountry, language) },
  ]
}
