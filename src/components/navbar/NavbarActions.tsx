import { Button } from '@/components/ui/Button'
import { CalendarIcon } from '@/components/ui/icons'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { NAV_ACTIONS } from '@/lib/navigation'
import { ROUTE_PATHS } from '@/lib/routing/routes'

/**
 * The two standing calls to action.
 *
 * Both are in the bar above 1280px. Below it only the booking action stays,
 * and the quote lives in the sheet — the bar has room for the brand, one
 * action, the language trigger and the menu toggle, and nothing more.
 */
export function NavbarActions() {
  const { t } = useLanguage()

  return (
    <>
      {NAV_ACTIONS.map((action) => (
        <Button
          key={action.routeId}
          to={ROUTE_PATHS[action.routeId]}
          variant={action.variant}
          size="sm"
          className="hidden xl:inline-flex"
        >
          {t(action.labelKey)}
        </Button>
      ))}

      {/*
        Below 640px the label shortens and the calendar carries the meaning
        the dropped words used to. The accessible name stays the whole
        action, and the visible word is the first word of it, so voice
        control still matches what is on screen (WCAG 2.5.3).
      */}
      <Button
        to={ROUTE_PATHS.bookConsultation}
        variant="secondary"
        size="sm"
        aria-label={t('nav.bookConsultation')}
        className="xl:hidden"
      >
        <CalendarIcon aria-hidden="true" className="size-4 sm:hidden" />
        <span className="sm:hidden">{t('nav.bookConsultationShort')}</span>
        <span className="hidden sm:inline">{t('nav.bookConsultation')}</span>
      </Button>
    </>
  )
}
