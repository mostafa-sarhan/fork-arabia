import { createContext } from 'react'
import type { Language, TranslationKey } from './translations'

export type Direction = 'rtl' | 'ltr'

export type LanguageContextValue = {
  language: Language
  direction: Direction
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: (key: TranslationKey) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
