import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/layout/Container'
import { HeaderNavLink } from '@/components/layout/HeaderNavLink'
import { LanguageMenu } from '@/components/layout/LanguageMenu'
import { MobileMenu } from '@/components/layout/MobileMenu'
import {
  ServicesMenuPanel,
  ServicesMenuTrigger,
} from '@/components/layout/ServicesMenu'
import { useServicesMenu } from '@/components/layout/useServicesMenu'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { CalendarIcon, CloseIcon, MenuIcon } from '@/components/ui/icons'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { NAV_ACTIONS, PRIMARY_NAV } from '@/lib/navigation'
import { isRouteActive, ROUTE_PATHS } from '@/lib/routing/routes'

/**
 * Whether the page has scrolled away from the top.
 *
 * It drives one thing: the shadow under the bar. The header's height, the
 * logo and the padding are fixed per breakpoint and do not react to
 * scrolling — a bar that resizes under the reader moves the whole page
 * with it, and the logo in particular must never animate.
 *
 * An IntersectionObserver fires twice per page — once when the sentinel
 * leaves the viewport and once when it comes back — where a scroll listener
 * runs on every frame of every scroll and has to be throttled to stay off
 * the main thread. The sentinel is also what defines the threshold: moving
 * the trigger point is a height change, not a magic number in JavaScript.
 */
function useScrolled(): [boolean, (node: HTMLDivElement | null) => void] {
  const [isScrolled, setScrolled] = useState(false)
  const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sentinel) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(entry ? !entry.isIntersecting : false),
      { threshold: 0 },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [sentinel])

  return [isScrolled, setSentinel]
}

export type HeaderProps = {
  isMenuOpen: boolean
  onMenuOpenChange: (isOpen: boolean) => void
}

/*
 * The desktop bar appears at 1280px, not 1024px.
 *
 * That is a measurement, not a preference: with the logo at its token
 * height the English bar needs the brand lockup (239px), five navigation
 * items (465px), the language switch and a call to action, and at 1024px
 * the navigation wraps to a second row. English is the binding case —
 * every label is longer than its Arabic counterpart. Below 1280 the bar
 * is the mobile one, which carries the same actions in the sheet.
 */

/**
 * The site header, mounted once for every route.
 *
 * Ownership of the menu's open state sits with the layout rather than here,
 * because opening the sheet has to make the rest of the page inert — and
 * the rest of the page is the layout's sibling, not this component's child.
 *
 * Everything is laid out with logical properties, so the Arabic bar reads
 * logo → nav → actions from the right and the English one from the left
 * with no mirrored stylesheet.
 */
export function Header({ isMenuOpen, onMenuOpenChange }: HeaderProps) {
  const { t } = useLanguage()
  const location = useLocation()
  const [isScrolled, sentinelRef] = useScrolled()
  const servicesMenu = useServicesMenu()
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

  /*
   * Closing returns focus to the control that opened the sheet, so a
   * keyboard visitor resumes where they were instead of at the top of the
   * document.
   */
  const closeMenu = useCallback(() => {
    onMenuOpenChange(false)
    toggleRef.current?.focus()
  }, [onMenuOpenChange])

  const toggleMenu = useCallback(
    () => onMenuOpenChange(!isMenuOpen),
    [isMenuOpen, onMenuOpenChange],
  )

  return (
    <>
      {/*
        Out of flow and at the document origin, so it adds no height and
        scrolls away with the page. The header itself is sticky and would
        carry a child sentinel along with it.
      */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-gutter"
      />

      <header className="sticky top-0 z-nav">
        <div
          data-scrolled={isScrolled || undefined}
          /*
            The only thing scrolling changes. The transition is on the
            shadow alone, so nothing can animate a size.
          */
          className="relative z-toast border-b border-line bg-surface transition-shadow duration-300 ease-standard data-scrolled:shadow-header"
        >
          {/*
            The gaps tighten on the narrowest bar. At 375 the brand, the
            booking action, the language trigger and the menu toggle come
            to 311px against 335px of content box; at the desktop spacing
            the group would run 8px past the container's padding and sit
            closer to the screen edge than the logo does on the other
            side. The gap is the only thing that gives — not the logo, not
            the labels. The trigger's "AR" is what gives next: below 640px
            the globe stands alone, and the code returns with the room for
            it.
          */}
          <Container className="flex h-header-mobile items-center justify-between gap-3 sm:gap-4 xl:h-header">
            <Logo className="shrink-0" />

            <nav
              aria-label={t('nav.primary')}
              className="hidden min-w-0 xl:block"
            >
              <ul className="flex items-center gap-1">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.routeId}>
                    {/*
                      Services is the one item with a panel behind it. It is
                      still one entry in the navigation configuration: only
                      the component rendered in this slot differs.
                    */}
                    {item.routeId === 'services' ? (
                      <ServicesMenuTrigger menu={servicesMenu} />
                    ) : (
                      <HeaderNavLink
                        item={item}
                        isActive={isRouteActive(location.pathname, item.routeId)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/*
              Full height, so the language panel inside it hangs from the
              bar's own edge rather than from the middle of the bar. Its
              contents stay centred.
            */}
            <div className="flex shrink-0 items-center gap-1 self-stretch sm:gap-2">
              <LanguageMenu className="hidden xl:flex" />

              {/*
                Separates the navigation from the actions: the language
                link belongs to the former, the two buttons to the latter.
              */}
              <span
                aria-hidden="true"
                className="hidden h-6 w-px bg-line xl:block"
              />

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
                Below 640px the label shortens to fit beside the brand and
                the toggle, with the calendar carrying the meaning the
                dropped words used to. The accessible name stays the whole
                action: the visible word is the first word of it, so voice
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
                <span className="sm:hidden">
                  {t('nav.bookConsultationShort')}
                </span>
                <span className="hidden sm:inline">
                  {t('nav.bookConsultation')}
                </span>
              </Button>

              <LanguageMenu className="flex xl:hidden" />

              <IconButton
                ref={toggleRef}
                label={isMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
                variant="outline"
                size="sm"
                aria-expanded={isMenuOpen}
                aria-controls={menuId}
                onClick={toggleMenu}
                className="xl:hidden"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </div>
          </Container>
        </div>

        <ServicesMenuPanel menu={servicesMenu} />

        <MobileMenu id={menuId} isOpen={isMenuOpen} onClose={closeMenu} />
      </header>
    </>
  )
}
