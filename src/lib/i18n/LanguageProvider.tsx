import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import {
  languageFromPathname,
  languagePathname,
} from '@/lib/routing/routes'
import { LanguageContext } from './context'
import { DIRECTIONS, type Language } from './languageConfig'
import { translations, type TranslationKey } from './translations'

/**
 * Supplies the language, its direction and the translator.
 *
 * The language is read from the URL rather than held in state. It used to
 * come from `?lang=`, falling back to a stored preference, which meant the
 * same page had two addresses, a shared link could open in a language the
 * sender never saw, and a crawler was shown Arabic for every URL. The path
 * now decides, so the address bar and the page can never disagree, and
 * nothing is remembered between visits — a link is the whole state.
 *
 * `setLanguage` is consequently a navigation. It keeps the current page, its
 * query and its hash, and only exchanges the language prefix, so switching
 * language never costs the visitor their place.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  const language = languageFromPathname(location.pathname)
  const direction = DIRECTIONS[language]

  useEffect(() => {
    const root = document.documentElement

    root.lang = language
    root.dir = direction
  }, [direction, language])

  const setLanguage = useCallback(
    (next: Language) => {
      navigate({
        pathname: languagePathname(location.pathname, next),
        search: location.search,
        hash: location.hash,
      })
    },
    [location.hash, location.pathname, location.search, navigate],
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
