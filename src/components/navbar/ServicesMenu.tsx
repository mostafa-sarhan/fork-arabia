import { useLocation } from 'react-router'
import { Container } from '@/components/layout/Container'
import type { ServicesMenuState } from '@/components/navbar/useServicesMenu'
import { ICONS } from '@/components/ui/iconRegistry'
import { ArrowRightIcon, ChevronDownIcon } from '@/components/ui/icons'
import { SECTOR_INDEX } from '@/data/sectorIndex'
import { cn } from '@/lib/cn'
import { Copy } from '@/lib/i18n/Copy'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import { isRouteActive, ROUTE_PATHS, sectorPath } from '@/lib/routing/routes'

/**
 * The navigation item: a link and a disclosure, side by side.
 *
 * They are two controls because they do two things. Making the whole item a
 * button would put the services page out of reach of a keyboard; making it
 * only a link would leave the panel pointer-only. The link keeps the active
 * treatment of every other item; the chevron carries the ARIA state.
 */
export function ServicesMenuTrigger({ menu }: { menu: ServicesMenuState }) {
  const { t } = useLanguage()
  const location = useLocation()
  const isActive = isRouteActive(location.pathname, 'services')
  const { registerTrigger, openSoon, closeSoon, openNow, closeNow } = menu

  return (
    <div
      ref={registerTrigger}
      onPointerEnter={openSoon}
      onPointerLeave={closeSoon}
      className="flex items-center"
    >
      <LocalizedLink
        to={ROUTE_PATHS.services}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'relative inline-flex h-10 items-center rounded-md ps-3 pe-1 text-nav transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          isActive
            ? 'font-semibold text-navy'
            : 'font-medium text-ink-muted hover:text-navy',
        )}
      >
        {t('nav.services')}
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-turquoise transition-transform duration-300 ease-emphasized rtl:origin-right',
            isActive ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </LocalizedLink>

      <button
        type="button"
        aria-expanded={menu.isOpen}
        aria-controls={menu.panelId}
        aria-label={t('nav.servicesMenu')}
        onClick={() => (menu.isOpen ? closeNow() : openNow())}
        className="inline-flex size-8 items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <ChevronDownIcon
          className={cn(
            'size-4 transition-transform duration-200',
            menu.isOpen && '-scale-y-100',
          )}
        />
      </button>
    </div>
  )
}

/** Where Home, End and an arrow step land; the ends do not wrap. */
function targetIndex(
  key: string,
  current: number,
  step: number,
  count: number,
): number {
  if (key === 'Home') {
    return 0
  }

  if (key === 'End') {
    return count - 1
  }

  return Math.min(Math.max(current + step, 0), count - 1)
}

/**
 * The panel: the nine sectors as the data defines them, three by three,
 * anchored to the bottom edge of the navbar.
 */
export function ServicesMenuPanel({
  menu,
  placement = 'anchored',
}: {
  menu: ServicesMenuState
  /** `inline` drops the positioning so the design system can show it. */
  placement?: 'anchored' | 'inline'
}) {
  const { t, direction } = useLanguage()
  const { registerPanel, openNow, closeSoon, closeNow } = menu

  /*
   * Arrow keys walk the grid. Which physical arrow moves forward depends on
   * the writing direction, so the inline pair is mapped; the vertical pair
   * always moves by a row.
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const forward = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const backward = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    const steps: Record<string, number> = {
      [forward]: 1,
      [backward]: -1,
      ArrowDown: 3,
      ArrowUp: -3,
    }
    const step = steps[event.key]
    const isNavigationKey =
      step !== undefined || event.key === 'Home' || event.key === 'End'

    if (!isNavigationKey) {
      return
    }

    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[data-menu-item]'),
    )
    const current = items.indexOf(document.activeElement as HTMLElement)

    if (current === -1) {
      return
    }

    event.preventDefault()
    items[targetIndex(event.key, current, step ?? 0, items.length)]?.focus()
  }

  return (
    <div
      id={menu.panelId}
      ref={registerPanel}
      onPointerEnter={openNow}
      onPointerLeave={closeSoon}
      onKeyDown={onKeyDown}
      inert={!menu.isOpen}
      className={cn(
        'border-line bg-surface transition-all duration-200 ease-standard',
        placement === 'anchored'
          ? [
              'absolute inset-x-0 top-full z-dropdown hidden border-b shadow-header xl:block',
              menu.isOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none -translate-y-2 opacity-0',
            ]
          : 'rounded-lg border',
      )}
    >
      <Container className="py-8">
        <ul className="grid grid-cols-3 gap-3">
          {SECTOR_INDEX.map((sector) => {
            const Icon = ICONS[sector.icon]

            return (
              <li key={sector.id}>
                <LocalizedLink
                  to={sectorPath(sector.slug)}
                  data-menu-item=""
                  onClick={closeNow}
                  className="group flex h-full gap-3 rounded-lg border border-transparent p-3 transition-colors duration-200 hover:border-line hover:bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-navy-soft text-petrol transition-colors duration-200 group-hover:bg-turquoise-soft">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span
                        dir="ltr"
                        className="text-caption font-semibold tabular-nums text-ink-muted"
                      >
                        {sector.number}
                      </span>
                      <Copy
                        value={sector.title}
                        className="text-body-sm font-semibold text-heading"
                      />
                    </span>
                    <Copy
                      value={sector.summary}
                      className="mt-1 block text-caption text-ink-muted"
                    />
                  </span>
                </LocalizedLink>
              </li>
            )
          })}
        </ul>

        <div className="mt-5 border-t border-line pt-4">
          <LocalizedLink
            to={ROUTE_PATHS.services}
            data-menu-item=""
            onClick={closeNow}
            className="inline-flex items-center gap-2 rounded-sm text-body-sm font-semibold text-link transition-colors duration-200 hover:text-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            {t('nav.allServices')}
            <ArrowRightIcon className="size-4 rtl:-scale-x-100" />
          </LocalizedLink>
        </div>
      </Container>
    </div>
  )
}
