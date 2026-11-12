import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
} from 'react'
import { useLocation } from 'react-router'
import { Button } from '@/components/ui/Button'
import { LanguageSheetOptions } from '@/components/layout/LanguageMenu'
import {
  ChatIcon,
  ChevronDownIcon,
  MailIcon,
  PhoneIcon,
} from '@/components/ui/icons'
import { ICONS } from '@/components/ui/iconRegistry'
import { SECTOR_INDEX } from '@/data/sectorIndex'
import { Copy } from '@/lib/i18n/Copy'
import type { IconProps } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { NAV_ACTIONS, PRIMARY_NAV } from '@/lib/navigation'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import { isRouteActive, ROUTE_PATHS, sectorPath } from '@/lib/routing/routes'
import { SITE_CONTACT, type ContactChannel } from '@/lib/siteContact'

const CHANNEL_ICONS: Record<ContactChannel['id'], ComponentType<IconProps>> = {
  riyadh: PhoneIcon,
  tanta: PhoneIcon,
  whatsapp: ChatIcon,
  email: MailIcon,
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

export type MobileMenuProps = {
  isOpen: boolean
  /** Closes the sheet and hands focus back to the toggle that opened it. */
  onClose: () => void
  /** Ties the sheet to the toggle's aria-controls. */
  id: string
}

/**
 * The navigation sheet for everything below the desktop breakpoint.
 *
 * It stops short of the full width so the overlay is always visible behind
 * it: a sheet that covers the screen edge to edge leaves nothing to tap to
 * dismiss it, and hides that there is a page underneath at all.
 *
 * It is always mounted so the slide is a plain CSS transition rather than a
 * mount animation, and `inert` — not merely `hidden` — keeps it out of the
 * focus order and the accessibility tree while it is closed. Under
 * prefers-reduced-motion the project's global rule flattens the transition
 * to nothing, so it simply appears.
 */
export function MobileMenu({ isOpen, onClose, id }: MobileMenuProps) {
  const { t } = useLanguage()
  const location = useLocation()
  const panelRef = useRef<HTMLDivElement>(null)
  const sectorsId = useId()
  const [areSectorsOpen, setSectorsOpen] = useState(false)

  /**
   * The focus contract: focus enters the sheet when it opens, Tab cycles
   * inside it, and Escape leaves. The page behind it is made inert by the
   * layout, so a trap is belt and braces — but Tab would otherwise still
   * reach the browser chrome and come back in the wrong place.
   */
  useEffect(() => {
    const panel = panelRef.current

    if (!isOpen || !panel) {
      return
    }

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))

    focusables()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]

      if (!first || !last) {
        return
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  /** The page must not scroll underneath the sheet. */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previous = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  const handleOverlayClick = useCallback(() => onClose(), [onClose])

  return (
    <>
      <div
        aria-hidden="true"
        onClick={handleOverlayClick}
        className={cn(
          'fixed inset-0 z-overlay bg-navy/40 transition-opacity duration-300 xl:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.primary')}
        inert={!isOpen}
        className={cn(
          'fixed inset-y-0 end-0 z-modal flex w-10/12 max-w-compact flex-col overflow-y-auto overscroll-contain bg-surface shadow-raised transition-transform duration-300 ease-emphasized xl:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full',
        )}
      >
        <nav
          aria-label={t('nav.primary')}
          className="border-b border-line px-gutter pb-6 pt-header"
        >
          <ul className="flex flex-col">
            {PRIMARY_NAV.map((item) => {
              const isActive = isRouteActive(location.pathname, item.routeId)

              return (
                <li key={item.routeId}>
                  <div className="flex items-center">
                    <LocalizedLink
                      to={ROUTE_PATHS[item.routeId]}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'relative flex min-h-12 flex-1 items-center rounded-md px-3 text-body-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                        isActive
                          ? 'font-semibold text-navy'
                          : 'font-medium text-ink-muted hover:text-navy',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-y-2 start-0 w-0.5 rounded-full bg-turquoise transition-opacity duration-200',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {t(item.labelKey)}
                    </LocalizedLink>

                    {/*
                      Services carries the same panel the desktop bar does,
                      as a group that expands in place. The link beside it
                      still goes to the services page, so the parent page is
                      never trapped behind its own menu.
                    */}
                    {item.routeId === 'services' ? (
                      <button
                        type="button"
                        aria-expanded={areSectorsOpen}
                        aria-controls={sectorsId}
                        aria-label={t('nav.servicesMenu')}
                        onClick={() => setSectorsOpen(!areSectorsOpen)}
                        className="inline-flex size-12 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        <ChevronDownIcon
                          className={cn(
                            'size-5 transition-transform duration-200',
                            areSectorsOpen && '-scale-y-100',
                          )}
                        />
                      </button>
                    ) : null}
                  </div>

                  {item.routeId === 'services' && areSectorsOpen ? (
                    <ul id={sectorsId} className="mb-2 ms-3 border-s border-line ps-3">
                      {SECTOR_INDEX.map((sector) => {
                        const Icon = ICONS[sector.icon]

                        return (
                          <li key={sector.id}>
                            <LocalizedLink
                              to={sectorPath(sector.slug)}
                              className="flex min-h-12 items-center gap-3 rounded-md px-3 text-body-sm font-medium text-ink-muted transition-colors duration-200 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                            >
                              <Icon className="size-4 shrink-0 text-petrol" />
                              <Copy value={sector.title} />
                            </LocalizedLink>
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ul>

          <LanguageSheetOptions className="mt-4" />
        </nav>

        <div className="flex flex-col gap-3 border-b border-line px-gutter py-6">
          {NAV_ACTIONS.map((action) => (
            <Button
              key={action.routeId}
              to={ROUTE_PATHS[action.routeId]}
              variant={action.variant}
              fullWidth
            >
              {t(action.labelKey)}
            </Button>
          ))}
        </div>

        <div className="px-gutter py-6">
          <p className="text-overline tracking-latin-wide text-subheading">
            {t('contact.shortcuts')}
          </p>
          <ul className="mt-3 flex flex-col gap-1">
            {SITE_CONTACT.map((channel) => {
              const Icon = CHANNEL_ICONS[channel.id]

              return (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    className="flex min-h-12 items-center gap-3 rounded-md px-3 text-body-sm text-ink transition-colors duration-200 hover:bg-navy-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    <Icon className="size-5 shrink-0 text-petrol" />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-caption text-ink-muted">
                        {t(channel.labelKey)}
                      </span>
                      {/*
                        The isolate is inline, inside a box that keeps the
                        sheet's direction: the digits read left to right
                        without the line jumping to the other edge.
                      */}
                      <span className="truncate font-medium">
                        <bdi dir="ltr">{channel.display}</bdi>
                      </span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
