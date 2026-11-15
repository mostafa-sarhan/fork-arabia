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
 *
 * It also marks <html> with `js`: the page's script runs, so a <Reveal>
 * found below the screen may wait hidden for its turn (index.css). Without
 * it nothing is ever hidden.
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
document.documentElement.classList.add('js')
