import { cn } from '../../lib/cn'
import { LANGUAGES, type Language } from '../../lib/i18n/languageConfig'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useLanguage } from '../../lib/i18n/useLanguage'

/** The visible toggle text. Latin in both languages, hence lang="en". */
const SHORT_LABELS: Record<Language, string> = {
  ar: 'AR',
  en: 'EN',
}

const FULL_LABELS: Record<Language, TranslationKey> = {
  ar: 'lang.arabic',
  en: 'lang.english',
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-surface p-0.5',
        className,
      )}
    >
      {LANGUAGES.map((option) => {
        const isActive = language === option

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLanguage(option)}
            className={cn(
              'min-h-9 min-w-10 rounded px-2.5 py-1.5 text-caption font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-1',
              isActive
                ? 'bg-navy text-white'
                : 'text-ink-muted hover:bg-navy-soft hover:text-ink',
            )}
          >
            {/*
              The accessible name is built from the content rather than an
              aria-label, so it starts with the visible "AR"/"EN" and voice
              control can still act on what is on screen (WCAG 2.5.3 Label
              in Name). The full language name is appended for screen
              readers only.
            */}
            <span lang="en">{SHORT_LABELS[option]}</span>
            <span className="sr-only">{` — ${t(FULL_LABELS[option])}`}</span>
          </button>
        )
      })}
    </div>
  )
}
