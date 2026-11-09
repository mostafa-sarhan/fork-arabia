import { cn } from '../../lib/cn'
import { useLanguage } from '../../lib/i18n/useLanguage'
import { ForkIcon } from '../ui/icons'

export type LogoProps = {
  className?: string
  showSuffix?: boolean
}

export function Logo({ className, showSuffix = true }: LogoProps) {
  const { t, language } = useLanguage()
  const isEnglish = language === 'en'

  return (
    <a
      href="/"
      aria-label={t('brand.homeLabel')}
      className={cn(
        'inline-flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2',
        className,
      )}
    >
      <span className="grid size-10 place-items-center rounded-md bg-navy text-turquoise">
        <ForkIcon className="size-5" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            'font-display text-body-sm font-bold text-ink',
            isEnglish && 'tracking-brand',
          )}
        >
          {t('brand.name')}
        </span>
        {showSuffix ? (
          <span
            className={cn(
              'mt-0.5 text-overline font-medium text-ink-muted',
              isEnglish && 'tracking-brand-wide',
            )}
          >
            {t('brand.suffix')}
          </span>
        ) : null}
      </span>
    </a>
  )
}
