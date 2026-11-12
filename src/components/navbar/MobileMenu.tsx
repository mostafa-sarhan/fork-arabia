import { useEffect, useId, useRef, useState, type ComponentType } from 'react'
import { useLocation } from 'react-router'
import { LocalizedLink } from '@/components/LocalizedLink'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { ICONS } from '@/components/ui/iconRegistry'
import {
  ChatIcon,
  ChevronDownIcon,
  CloseIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  type IconProps,
} from '@/components/ui/icons'
import { SITE_CONTACT, type ContactChannel } from '@/config/contact'
import { NAV_ACTIONS, PRIMARY_NAV } from '@/config/navigation'
import { PATHS, sectorPath } from '@/config/paths'
import { SECTOR_INDEX } from '@/data/sectorIndex'
import { cn } from '@/lib/cn'
import { Copy } from '@/lib/i18n/Copy'
import { isPathActive } from '@/lib/i18n/localizePath'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { LanguageSheetRow } from './LanguageMenu'
import { useNavbar } from './useNavbar'

const CHANNEL_ICONS: Record<ContactChannel['id'], ComponentType<IconProps>> = {
  riyadh: PhoneIcon,
  tanta: PhoneIcon,
  whatsapp: ChatIcon,
  email: MailIcon,
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** The control that opens and closes the sheet, below the desktop bar. */
export function MobileMenuToggle() {
  const { t } = useLanguage()
  const {
    isMobileMenuOpen,
    mobileMenuId,
    toggleMobileMenu,
    registerMobileToggle,
  } = useNavbar()

  return (
    <IconButton
      ref={registerMobileToggle}
      label={isMobileMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
      variant="outline"
      size="sm"
      aria-expanded={isMobileMenuOpen}
      aria-controls={mobileMenuId}
      onClick={toggleMobileMenu}
      /* 36x36 as drawn, 44x44 to a finger — taken out of the gutter
         behind it, so the language trigger beside it keeps all of its
         own box. */
      className="tap-target tap-target-end xl:hidden"
    >
      {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  )
}

/**
 * The navigation sheet for everything below the desktop breakpoint.
 *
 * It stops short of the full width so the overlay stays visible behind it: a
 * sheet that covers the screen edge to edge leaves nothing to tap to dismiss
 * it, and hides that there is a page underneath at all.
 *
 * It is always mounted so the slide is a plain CSS transition rather than a
 * mount animation, and `inert` keeps it out of the focus order and the
 * accessibility tree while it is closed. Under prefers-reduced-motion the
 * project's global rule flattens the transition, so it simply appears.
 */
export function MobileMenu() {
  const { t } = useLanguage()
  const location = useLocation()
  const { isMobileMenuOpen, mobileMenuId, closeMobileMenu } = useNavbar()
  const panelRef = useRef<HTMLDivElement>(null)
  const sectorsId = useId()
  const [areSectorsOpen, setSectorsOpen] = useState(false)

  /*
   * The focus contract: focus enters the sheet when it opens, Tab cycles
   * inside it, and Escape leaves. The page behind it is inert already, but
   * Tab would otherwise reach the browser chrome and come back in the wrong
   * place.
   */
  useEffect(() => {
    const panel = panelRef.current

    if (!isMobileMenuOpen || !panel) {
      return
    }

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))

    focusables()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu()
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
  }, [closeMobileMenu, isMobileMenuOpen])

  /*
   * The sheet and its toggle both disappear above the desktop breakpoint. A
   * window that grows past it while the sheet is open would leave the page
   * inert, unscrollable and with no control left to close it, so the sheet
   * closes itself as soon as the browser stops displaying it.
   */
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const closeIfHidden = () => {
      const panel = panelRef.current

      if (panel && getComputedStyle(panel).display === 'none') {
        closeMobileMenu()
      }
    }

    window.addEventListener('resize', closeIfHidden)

    return () => window.removeEventListener('resize', closeIfHidden)
  }, [closeMobileMenu, isMobileMenuOpen])

  /** The page must not scroll underneath the sheet. */
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const previous = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeMobileMenu}
        className={cn(
          'fixed inset-0 z-overlay bg-navy/40 transition-opacity duration-300 xl:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        id={mobileMenuId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.primary')}
        inert={!isMobileMenuOpen}
        className={cn(
          'fixed inset-y-0 end-0 z-modal flex w-10/12 max-w-compact flex-col overflow-y-auto overscroll-contain bg-surface shadow-raised transition-transform duration-300 ease-emphasized xl:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full',
        )}
      >
        <nav
          aria-label={t('nav.primary')}
          className="border-b border-line px-gutter pb-6 pt-header"
        >
          <ul className="flex flex-col">
            {PRIMARY_NAV.map((item) => {
              const isActive = isPathActive(location.pathname, item.path)
              const isServices = item.path === PATHS.services

              return (
                <li key={item.path}>
                  <div className="flex items-center">
                    <LocalizedLink
                      to={item.path}
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
                      Services carries the same sectors the desktop panel
                      does, as a group that expands in place. The link beside
                      it still goes to the services page, so the parent page
                      is never trapped behind its own menu.
                    */}
                    {isServices ? (
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

                  {isServices && areSectorsOpen ? (
                    <ul
                      id={sectorsId}
                      className="mb-2 ms-3 border-s border-line ps-3"
                    >
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
        </nav>

        <div className="flex flex-col gap-3 border-b border-line px-gutter py-6">
          {NAV_ACTIONS.map((action) => (
            <Button
              key={action.path}
              to={action.path}
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
                        An inline isolate inside a box that keeps the sheet's
                        direction: the digits read left to right without the
                        line jumping to the other edge.
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

        <LanguageSheetRow className="border-t border-line px-gutter py-4" />
      </div>
    </>
  )
}
