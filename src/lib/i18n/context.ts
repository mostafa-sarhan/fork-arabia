import { createContext } from 'react'
import type { Direction, Language } from './languageConfig'
import type { TranslationKey } from './translations'

export type LanguageContextValue = {
  language: Language
  direction: Direction
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
