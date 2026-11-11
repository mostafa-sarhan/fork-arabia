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

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === 'ar' ? 'en' : 'ar'))
  }, [])

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
