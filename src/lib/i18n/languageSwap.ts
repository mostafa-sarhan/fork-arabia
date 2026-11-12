import { useLocation } from 'react-router'
import {
  DIRECTIONS,
  LANGUAGES,
  type Direction,
  type Language,
} from './languageConfig'
import { samePathInLanguage } from './localizePath'
import { useLanguage } from './useLanguage'

/**
 * How each language refers to itself and to the act of switching to it.
 *
 * Every string here is written in the language it belongs to, and is the
 * same whatever the interface language is — which is exactly why it is a
 * constant rather than a translation. Someone who cannot read the current
 * page is the one being offered the switch, so the offer has to be in the
 * language they are being offered.
 */
const LANGUAGE_SELF: Record<
  Language,
  { endonym: string; action: string; suggestion: string; dismiss: string }
> = {
  ar: {
    endonym: 'العربية',
    action: 'التحويل إلى العربية',
    suggestion: 'هذه الصفحة متاحة أيضًا بالعربية',
    dismiss: 'إغلاق',
  },
  en: {
    endonym: 'English',
    action: 'Switch to English',
    suggestion: 'This page is also available in English',
    dismiss: 'Dismiss',
  },
}

export type LanguageSwap = {
  /** The language being offered — the one the visitor is not reading. */
  readonly language: Language
  readonly direction: Direction
  /** The same page in that language: path, query and hash all preserved. */
  readonly to: { pathname: string; search: string; hash: string }
  /** Its name in its own script, for the visible label. */
  readonly endonym: string
  /** "Switch to English" / "التحويل إلى العربية", for the accessible name. */
  readonly action: string
  readonly suggestion: string
  readonly dismiss: string
}

/**
 * The other language and where it lives.
 *
 * With two languages there is only ever one alternative, so the control
 * for it is a link to that one place rather than a set of options to
 * choose between.
 */
export function useLanguageSwap(): LanguageSwap {
  const { language } = useLanguage()
  const location = useLocation()
  const other: Language = language === 'ar' ? 'en' : 'ar'

  return {
    language: other,
    direction: DIRECTIONS[other],
    to: {
      pathname: samePathInLanguage(location.pathname, other),
      search: location.search,
      hash: location.hash,
    },
    ...LANGUAGE_SELF[other],
  }
}

export type LanguageOption = {
  readonly language: Language
  /** Its name in its own script, for the option's screen-reader name. */
  readonly endonym: string
  /** "AR" / "EN" — the only part of the option that is on screen. */
  readonly code: string
  /** This page in that language: path, query and hash all preserved. */
  readonly to: { pathname: string; search: string; hash: string }
  readonly isCurrent: boolean
}

/**
 * Every language the site has, in the order they are declared, each with
 * the address of this same page in it.
 *
 * The current language is in the list rather than filtered out of it. The
 * menu that shows these options has to say which language is in use before
 * it can offer the other one, and a list that named only the alternative
 * would leave the visitor guessing what they are reading now.
 */
export function useLanguageOptions(): readonly LanguageOption[] {
  const { language } = useLanguage()
  const location = useLocation()

  return LANGUAGES.map((candidate) => ({
    language: candidate,
    code: candidate.toUpperCase(),
    endonym: LANGUAGE_SELF[candidate].endonym,
    to: {
      pathname: samePathInLanguage(location.pathname, candidate),
      search: location.search,
      hash: location.hash,
    },
    isCurrent: candidate === language,
  }))
}
