import type { Language } from '@/lib/i18n/languageConfig'
import { copy, resolveCopy } from '@/lib/i18n/localized'

/*
 * The count words on a sector page: "9 خدمات", "خدمة واحدة", "4 دول".
 * Not in the storyboard, so both languages are `proposed` and listed in
 * docs/copy-review.md.
 */
const COPY = {
  oneService: copy('خدمة واحدة', '1 service'),
  services: copy('خدمات', 'services'),
  countries: copy('دول', 'countries'),
}

/** The word after a services count: "خدمات" / "services". */
export function servicesWord(language: Language) {
  return resolveCopy(COPY.services, language)
}

/** The word after a countries count: "دول" / "countries". */
export function countriesWord(language: Language) {
  return resolveCopy(COPY.countries, language)
}

/** A full count: "خدمة واحدة" for one, otherwise "{n} خدمات". */
export function servicesCount(count: number, language: Language) {
  return count === 1
    ? resolveCopy(COPY.oneService, language)
    : `${count} ${servicesWord(language)}`
}
