import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { LanguageContext } from './context'
import {
  DEFAULT_LANGUAGE,
  DIRECTIONS,
  isLanguage,
  LANGUAGE_QUERY_PARAM,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from './languageConfig'
import { translations, type TranslationKey } from './translations'

/**
 * Query parameter first, then the stored preference, then the default.
 *
 * The boot script in `index.html` mirrors this order so the document is
 * already in the right language and direction at first paint. Both read the
 * constants from `./languageConfig`, so only the ordering is stated twice —
 * keep the two in step.
 */
function resolveInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }

  try {
    const query = new URLSearchParams(window.location.search).get(
      LANGUAGE_QUERY_PARAM,
    )

    if (isLanguage(query)) {
      return query
    }

    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (isLanguage(stored)) {
      return stored
    }
  } catch {
    // Storage can be unavailable in restricted browsing contexts.
  }

  return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(
    resolveInitialLanguage,
  )
  const direction = DIRECTIONS[language]

  useEffect(() => {
    const root = document.documentElement
    root.lang = language
    root.dir = direction

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Persisting the preference is optional.
    }
  }, [language, direction])

  /**
   * Keeps ?lang= in step with the UI. Without it a visitor who arrives on
   * ?lang=en and then switches to Arabic copies a URL that reopens in
   * English. replaceState is used rather than pushState so switching
   * language does not add a history entry the back button has to walk
   * through. A URL with no ?lang= is left clean until the first switch.
   */
  const syncQueryParam = useCallback((next: Language) => {
    try {
      const url = new URL(window.location.href)

      if (url.searchParams.get(LANGUAGE_QUERY_PARAM) === next) {
        return
      }

      url.searchParams.set(LANGUAGE_QUERY_PARAM, next)
      window.history.replaceState(window.history.state, '', url)
    } catch {
      // History access can be unavailable in restricted browsing contexts.
    }
  }, [])

  const setLanguage = useCallback(
    (next: Language) => {
      setLanguageState(next)
      syncQueryParam(next)
    },
    [syncQueryParam],
  )

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ar' ? 'en' : 'ar')
  }, [language, setLanguage])

  const t = useCallback(
    (key: TranslationKey) => translations[language][key],
    [language],
  )

  const value = useMemo(
    () => ({ language, direction, setLanguage, toggleLanguage, t }),
    [language, direction, setLanguage, toggleLanguage, t],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
