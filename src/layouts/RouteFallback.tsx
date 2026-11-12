import { Spinner } from '@/components/ui/Spinner'
import { useLanguage } from '@/lib/i18n/useLanguage'

/**
 * Shown while a lazily loaded page's chunk is in flight. Deliberately
 * minimal: it is on screen for a fraction of a second on a warm connection,
 * so it carries the page background and the brand accent and nothing that
 * would flash.
 */
export function RouteFallback() {
  const { t } = useLanguage()

  return (
    <div className="grid min-h-svh place-items-center bg-page">
      <p
        role="status"
        className="flex items-center gap-3 text-body-sm text-ink-muted"
      >
        <Spinner className="size-5 text-turquoise" />
        {t('a11y.loading')}
      </p>
    </div>
  )
}
