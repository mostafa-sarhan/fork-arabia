import {
  DEFAULT_LANGUAGE,
  LANGUAGE_PATH_PREFIXES,
  LANGUAGES,
  type Language,
} from './languageConfig'

/** `''`, `'/foo/'` and `'/foo'` all normalise to the same comparable value. */
function normalize(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '')

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

/** The same URL with its language prefix removed. */
export function withoutPrefix(pathname: string): string {
  const prefix = LANGUAGE_PATH_PREFIXES[languageFromPathname(pathname)]

  if (!prefix) {
    return normalize(pathname)
  }

  return normalize(normalize(pathname).slice(prefix.length))
}

/**
 * Where a page of this site lives in a given language: the Arabic path as
 * written in `src/config/paths.ts`, with `/en` in front of it for English.
 */
export function localizePath(path: string, language: Language): string {
  const prefix = LANGUAGE_PATH_PREFIXES[language]
  const canonical = normalize(path)

  if (!prefix) {
    return canonical
  }

  return canonical === '/' ? prefix : `${prefix}${canonical}`
}

/**
 * The language a URL belongs to.
 *
 * `src/boot/languageBoot.ts` repeats this rule in the pre-paint script, so
 * the document is in the right language and direction before first paint —
 * keep the two in step.
 */
export function languageFromPathname(pathname: string): Language {
  const normalized = normalize(pathname)

  for (const language of LANGUAGES) {
    const prefix = LANGUAGE_PATH_PREFIXES[language]

    if (
      prefix &&
      (normalized === prefix || normalized.startsWith(`${prefix}/`))
    ) {
      return language
    }
  }

  return DEFAULT_LANGUAGE
}

/**
 * This same URL in another language — for any path, including ones no page
 * claims, so the language switch still works on a 404.
 */
export function samePathInLanguage(
  pathname: string,
  language: Language,
): string {
  return localizePath(withoutPrefix(pathname), language)
}

/**
 * Whether a URL is "on" a page, for marking the navigation. A section owns
 * its children: `/services/legal` keeps Services marked. Home is the
 * exception — it is a prefix of everything, so it matches exactly.
 */
export function isPathActive(pathname: string, path: string): boolean {
  const canonical = withoutPrefix(pathname)

  if (path === '/') {
    return canonical === '/'
  }

  return canonical === path || canonical.startsWith(`${path}/`)
}
