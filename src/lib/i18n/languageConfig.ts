/**
 * The single definition of the project's languages.
 *
 * Two very different consumers need these values: `LanguageProvider`, which
 * imports this module normally, and `src/boot/languageBoot.ts`, which runs
 * before the bundle loads and is compiled into an inline script by
 * `build/languageBootPlugin.ts`. Both read the same constants, so the
 * allowed values, the default, the direction map and the URL prefixes
 * cannot drift apart.
 */

export const LANGUAGES = ['ar', 'en'] as const

export type Language = (typeof LANGUAGES)[number]

export type Direction = 'rtl' | 'ltr'

/** Arabic is the primary language of the business, so it is the default. */
export const DEFAULT_LANGUAGE: Language = 'ar'

/**
 * Legacy only. The language used to be chosen with `?lang=`, which made the
 * same page reachable at two URLs and left the choice invisible to crawlers.
 * The path now decides (see `src/lib/routing/routes.ts`); this constant
 * survives so old links can be redirected to their path equivalent.
 */
export const LANGUAGE_QUERY_PARAM = 'lang'

export const DIRECTIONS: Record<Language, Direction> = {
  ar: 'rtl',
  en: 'ltr',
}

/**
 * The first path segment that identifies each language.
 *
 * The default language owns the unprefixed tree, so its prefix is empty:
 * `/design-system` is Arabic and `/en/design-system` is English. Exactly one
 * language may have an empty prefix, and it must be `DEFAULT_LANGUAGE`,
 * otherwise an unprefixed URL would be ambiguous.
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
