import { Container } from '@/components/layout/Container'
import { LanguageMenu } from '@/components/navbar/LanguageMenu'
import { MobileMenu, MobileMenuToggle } from '@/components/navbar/MobileMenu'
import { NavbarActions } from '@/components/navbar/NavbarActions'
import { NavbarBrand } from '@/components/navbar/NavbarBrand'
import { NavbarLinks } from '@/components/navbar/NavbarLinks'
import { ServicesMenuPanel } from '@/components/navbar/ServicesMenu'
import { useNavbarScrolled } from '@/components/navbar/useNavbarScrolled'
import { useServicesMenu } from '@/components/navbar/useServicesMenu'

/*
 * The desktop bar appears at 1280px, not 1024px. That is a measurement: at
 * the logo's token height the English bar needs the lockup (239px), five
 * links (465px), the language switch and a call to action, and at 1024px the
 * links wrap to a second row. English is the binding case — every label is
 * longer than its Arabic counterpart. Below 1280 the mobile bar carries the
 * same actions in the sheet.
 *
 * Everything is laid out with logical properties, so the Arabic bar reads
 * logo -> nav -> actions from the right and the English one from the left
 * with no mirrored stylesheet.
 */

/** The site navbar, mounted once by the layout so it survives navigation. */
export function Navbar() {
  const [isScrolled, sentinelRef] = useNavbarScrolled()
  const servicesMenu = useServicesMenu()

  return (
    <>
      {/*
        Out of flow at the document origin, so it adds no height and scrolls
        away with the page — a child of the sticky bar would travel with it.
      */}
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
          {/*
            The gaps tighten on the narrowest bar: at 375px the brand, the
            booking action, the language trigger and the toggle come to 311px
            against 335px of content box. The gap is the only thing that
            gives — not the logo, not the labels.
          */}
          <Container className="flex h-header-mobile items-center justify-between gap-3 sm:gap-4 xl:h-header">
            <NavbarBrand />

            <NavbarLinks menu={servicesMenu} />

            {/*
              Full height, so the language panel hangs from the bar's own
              edge rather than from the middle of it.
            */}
            <div className="flex shrink-0 items-center gap-1 self-stretch sm:gap-2">
              <LanguageMenu className="hidden xl:flex" />

              {/* The language link belongs to the navigation, the buttons to the actions. */}
              <span
                aria-hidden="true"
                className="hidden h-6 w-px bg-line xl:block"
              />

              <NavbarActions />

              <LanguageMenu className="flex xl:hidden" />
              <MobileMenuToggle />
            </div>
          </Container>
        </div>

        <ServicesMenuPanel menu={servicesMenu} />

        <MobileMenu />
      </header>
    </>
  )
}
