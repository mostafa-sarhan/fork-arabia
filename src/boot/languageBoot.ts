import {
  DEFAULT_LANGUAGE,
  DIRECTIONS,
  LANGUAGE_PATH_PREFIXES,
  LANGUAGES,
  type Language,
} from '@/lib/i18n/languageConfig'

/*
 * Sets `lang` and `dir` from the URL before the first paint, so an English
 * page never renders right-to-left for a frame. The bundle sets the same
 * two attributes again once it loads; this only has to be first.
 */

function languageFromPath(pathname: string): Language {
  for (const language of LANGUAGES) {
    const prefix = LANGUAGE_PATH_PREFIXES[language]

    if (prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))) {
      return language
    }
  }

  return DEFAULT_LANGUAGE
}

const language = languageFromPath(window.location.pathname)

document.documentElement.lang = language
document.documentElement.dir = DIRECTIONS[language]
