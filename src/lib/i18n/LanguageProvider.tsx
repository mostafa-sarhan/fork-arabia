import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { LanguageContext, type Direction } from './context'
import {
  translations,
  type Language,
  type TranslationKey,
} from './translations'

const STORAGE_KEY = 'fork-arabia-language'

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'ar'
  }

  try {
    const query = new URLSearchParams(window.location.search).get('lang')
    if (query === 'ar' || query === 'en') {
      return query
    }

    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'ar' || stored === 'en') {
      return stored
    }
  } catch {
    // Storage can be unavailable in restricted browsing contexts.
  }

  return 'ar'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = language
    root.dir = direction

    try {
      window.localStorage.setItem(STORAGE_KEY, language)
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
