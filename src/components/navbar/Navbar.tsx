import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/layout/Container'
import { LocalizedLink } from '@/components/LocalizedLink'
import { Button } from '@/components/ui/Button'
import { CalendarIcon } from '@/components/ui/icons'
import { NAV_ACTIONS, PRIMARY_NAV, type NavItem } from '@/config/navigation'
import { PATHS } from '@/config/paths'
import { cn } from '@/lib/cn'
import { isPathActive } from '@/lib/i18n/localizePath'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { LanguageMenu } from './LanguageMenu'
import { MobileMenu, MobileMenuToggle } from './MobileMenu'
import {
  ServicesMenuPanel,
  ServicesMenuTrigger,
  useServicesMenu,
} from './ServicesMenu'

/**
 * Whether the page has scrolled away from the top, with the sentinel to put
 * at the document origin.
 *
 * It drives one thing: the shadow under the bar. Nothing in the bar resizes
 * on scroll — a bar that resizes under the reader moves the whole page with
 * it, and the logo in particular must never animate. An IntersectionObserver
 * fires twice per page where a scroll listener runs on every frame, and the
 * sentinel's own height is the threshold.
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

/**
 * One link in the bar.
 *
 * The current page is marked three times over: `aria-current="page"` for
 * assistive technology, navy and a heavier weight for everyone — turquoise
 * on white is 2.69:1, under the 3:1 a non-text indicator needs — and the
 * turquoise bar as decoration on top, which is why it is aria-hidden.
 */
export function NavbarLink({
  item,
  isActive,
}: {
  item: NavItem
  isActive: boolean
}) {
  const { t } = useLanguage()

  return (
    <LocalizedLink
      to={item.path}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative inline-flex h-10 items-center rounded-md px-3 text-nav transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        isActive
          ? 'font-semibold text-navy'
          : 'font-medium text-ink-muted hover:text-navy',
      )}
    >
      {t(item.labelKey)}
      {/* Grown from the inline-start edge; `origin-left` has no logical
          keyword, so the rtl: variant mirrors it. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-turquoise transition-transform duration-300 ease-emphasized rtl:origin-right',
          isActive ? 'scale-x-100' : 'scale-x-0',
        )}
      />
    </LocalizedLink>
  )
}

/*
 * The desktop bar appears at 1280px, not 1024px. That is a measurement: at
 * the logo's token height the English bar needs the lockup (239px), five
 * links (465px), the language switch and a call to action, and at 1024px the
 * links wrap to a second row. English is the binding case — every label is
 * longer than its Arabic counterpart. Below 1280 the mobile bar carries the
 * same actions in the sheet.
 *
 * Everything is laid out with logical properties, so the Arabic bar reads
 * logo -> links -> actions from the right and the English one from the left
 * with no mirrored stylesheet.
 */

/** The site navbar, mounted once by the layout so it survives navigation. */
export function Navbar() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const [isScrolled, sentinelRef] = useScrolled()
  const servicesMenu = useServicesMenu()

  return (
    <>
      {/* Out of flow at the document origin, so it adds no height and
          scrolls away with the page — a child of the sticky bar would
          travel with it. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-gutter"
      />

      <header className="sticky top-0 z-nav">
        {/* Scrolling changes the shadow and nothing else. */}
        <div
          data-scrolled={isScrolled || undefined}
          className="relative z-toast border-b border-line bg-surface transition-shadow duration-300 ease-standard data-scrolled:shadow-header"
        >
          {/* The narrow bar runs on tight gaps: at 360px the English brand,
              booking action, language trigger and toggle come to 318px
              against 320px of content box, and English is the binding case.
              Below 360px (`max-xs`) even that overflows, so the booking
              action drops to its calendar alone — 279px against 280px. The
              logo never gives. */}
          <Container className="flex h-header-mobile items-center justify-between gap-1 sm:gap-4 xl:h-header">
            <Logo className="shrink-0" />

            <nav
              aria-label={t('nav.primary')}
              className="hidden min-w-0 xl:block"
            >
              <ul className="flex items-center gap-1">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.path}>
                    {/* Services is one item of the navigation like any
                        other; only the component in its slot differs,
                        because it carries the sector panel behind it. */}
                    {item.path === PATHS.services ? (
                      <>
                        <ServicesMenuTrigger menu={servicesMenu} />
                        {/* Right after its own trigger, so Tab walks into
                            the panel and out the far side into the next
                            item. It is still positioned against the bar
                            rather than against this list item. */}
                        <ServicesMenuPanel menu={servicesMenu} />
                      </>
                    ) : (
                      <NavbarLink
                        item={item}
                        isActive={isPathActive(pathname, item.path)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Full height, so the language panel hangs from the bar's own
                edge rather than from the middle of it. */}
            <div className="flex shrink-0 items-center gap-0.5 self-stretch sm:gap-2">
              <LanguageMenu className="hidden xl:flex" />

              {/* The language link belongs to the navigation, the buttons to
                  the actions. */}
              <span
                aria-hidden="true"
                className="hidden h-6 w-px bg-line xl:block"
              />

              {NAV_ACTIONS.map((action) => (
                <Button
                  key={action.path}
                  to={action.path}
                  variant={action.variant}
                  size="sm"
                  className="hidden xl:inline-flex"
                >
                  {t(action.labelKey)}
                </Button>
              ))}

              {/* `tap-target` on the three controls of the narrow bar: they
                are drawn to fit 320px, which is smaller than 44px, so each
                one answers taps over a 44px square it does not occupy.

                Below 640px the label shortens, the pill tightens and the
                  calendar carries the meaning the dropped words used to;
                  below 360px the icon carries all of it, in a square the
                  size of the menu toggle. The accessible name is the whole
                  action either way, and while a word is visible it is the
                  first word of that name, so voice control still matches
                  what is on screen (WCAG 2.5.3). */}
              <Button
                to={PATHS.bookConsultation}
                variant="secondary"
                size="sm"
                aria-label={t('nav.bookConsultation')}
                className="tap-target xl:hidden max-sm:px-2.5 max-xs:size-9 max-xs:tap-target-start max-xs:px-0"
              >
                <CalendarIcon aria-hidden="true" className="size-4 sm:hidden" />
                <span className="max-xs:hidden sm:hidden">
                  {t('nav.bookConsultationShort')}
                </span>
                <span className="hidden sm:inline">
                  {t('nav.bookConsultation')}
                </span>
              </Button>

              {/* The narrow bar carries the same control after the booking
                  action. Two copies rather than one re-ordered with CSS, so
                  the tab order follows what the eye sees at both widths. */}
              <LanguageMenu className="flex xl:hidden" />
              <MobileMenuToggle />
            </div>
          </Container>
        </div>

        <MobileMenu />
      </header>
    </>
  )
}
