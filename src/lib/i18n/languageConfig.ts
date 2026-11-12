/**
 * The single definition of the project's languages.
 *
 * Two very different consumers need these values: `LanguageProvider`, which
 * imports this module normally, and `src/boot/languageBoot.ts`, which runs
 * before the bundle loads and is compiled into an inline script by
 * `build/languageBootPlugin.ts`. Both read the same constants, so the
 * allowed values, the default, the direction map and the URL prefixes cannot
 * drift apart.
 */

export const LANGUAGES = ['ar', 'en'] as const

export type Language = (typeof LANGUAGES)[number]

export type Direction = 'rtl' | 'ltr'

/** Arabic is the primary language of the business, so it is the default. */
export const DEFAULT_LANGUAGE: Language = 'ar'

export const DIRECTIONS: Record<Language, Direction> = {
  ar: 'rtl',
  en: 'ltr',
}

/**
 * The first path segment that identifies each language.
 *
 * The default language owns the unprefixed tree, so its prefix is empty:
 * `/about` is Arabic and `/en/about` is English. Exactly one language may
 * have an empty prefix, and it must be `DEFAULT_LANGUAGE`, otherwise an
 * unprefixed URL would be ambiguous. `src/lib/i18n/localizePath.ts` is the
 * only place that reads this.
 */
export const LANGUAGE_PATH_PREFIXES: Record<Language, string> = {
  ar: '',
  en: '/en',
}

export function isLanguage(value: unknown): value is Language {
  return (
    typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)
  )
}
