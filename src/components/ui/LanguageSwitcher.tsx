import { cn } from '../../lib/cn'
import { useLanguage } from '../../lib/i18n/useLanguage'
import type { Language } from '../../lib/i18n/translations'

const options: Array<{ value: Language; short: string }> = [
  { value: 'ar', short: 'AR' },
  { value: 'en', short: 'EN' },
]

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
      {options.map((option) => {
        const isActive = language === option.value
        const label =
          option.value === 'ar' ? t('lang.arabic') : t('lang.english')

        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-label={label}
            aria-pressed={isActive}
            onClick={() => setLanguage(option.value)}
            className={cn(
              'min-h-9 min-w-10 rounded px-2.5 py-1.5 text-caption font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-1',
              isActive
                ? 'bg-navy text-white'
                : 'text-ink-muted hover:bg-navy-soft hover:text-ink',
            )}
          >
            {option.short}
          </button>
        )
      })}
    </div>
  )
}
