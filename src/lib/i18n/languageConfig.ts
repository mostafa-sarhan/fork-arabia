/**
 * The single definition of the project's languages.
 *
 * Two very different consumers need these values:
 *
 *   1. `LanguageProvider`, which imports this module normally.
 *   2. The boot script in `index.html`, which has to run before the bundle
 *      loads and therefore cannot import anything. `vite.config.ts` injects
 *      `languageBootConfig` into that script's `%LANGUAGE_BOOT_CONFIG%`
 *      placeholder while transforming the HTML, so the storage key, the
 *      allowed values, the default and the direction map are defined here
 *      once and cannot drift apart.
 */

export const LANGUAGES = ['ar', 'en'] as const

export type Language = (typeof LANGUAGES)[number]

export type Direction = 'rtl' | 'ltr'

/** Arabic is the primary language of the business, so it is the default. */
export const DEFAULT_LANGUAGE: Language = 'ar'

export const LANGUAGE_STORAGE_KEY = 'fork-arabia-language'

export const LANGUAGE_QUERY_PARAM = 'lang'

export const DIRECTIONS: Record<Language, Direction> = {
  ar: 'rtl',
  en: 'ltr',
}

export function isLanguage(value: unknown): value is Language {
  return (
    typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)
  )
}

/**
 * The serialisable subset handed to the boot script in `index.html`.
 * Keep every value JSON-safe: it is inlined with `JSON.stringify`.
 */
export const languageBootConfig = {
  languages: LANGUAGES,
  defaultLanguage: DEFAULT_LANGUAGE,
  storageKey: LANGUAGE_STORAGE_KEY,
  queryParam: LANGUAGE_QUERY_PARAM,
  directions: DIRECTIONS,
}
