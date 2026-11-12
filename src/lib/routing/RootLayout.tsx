import { Suspense, useCallback, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { LanguageSuggestion } from '@/components/layout/LanguageSuggestion'
import { RouteFallback } from '@/components/layout/RouteFallback'
import { SkipLink } from '@/components/ui/SkipLink'
import { legacyLanguageRedirect } from './routes'

/**
 * The shell every route renders inside.
 *
 * It owns what belongs to the site rather than to any page: the skip link,
 * the header, retiring the old `?lang=` parameter, and the boundary that
 * lazily loaded pages suspend against. The header is mounted here once, so
 * it survives navigation — a header remounted per page would lose its
 * condensed state and replay its transition on every click.
 *
 * The open state of the mobile sheet lives here too, because opening it has
 * to take the rest of the page out of the focus order and the accessibility
 * tree, and "the rest of the page" is the header's sibling.
 *
 * The redirect replaces the history entry instead of pushing one, so the
 * back button returns to wherever the visitor came from rather than to a URL
 * that would immediately redirect again.
 */
export function RootLayout() {
  const location = useLocation()
  /*
   * The state is "which page the sheet was opened on", not "is it open".
   * Written that way, closing on navigation is a consequence of the data
   * rather than an effect that chases the router: the sheet is open while
   * the visitor is still on the page they opened it from, and a route
   * change closes it by definition.
   */
  const [openedOnPathname, setOpenedOnPathname] = useState<string | null>(null)
  const isMenuOpen = openedOnPathname === location.pathname

  const setMenuOpen = useCallback(
    (open: boolean) => setOpenedOnPathname(open ? location.pathname : null),
    [location.pathname],
  )

  const redirect = legacyLanguageRedirect(location)

  if (redirect) {
    return <Navigate to={redirect} replace />
  }

  return (
    <>
      <SkipLink />
      <Header isMenuOpen={isMenuOpen} onMenuOpenChange={setMenuOpen} />

      <div inert={isMenuOpen}>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>

        <Footer />
      </div>

      <LanguageSuggestion isMenuOpen={isMenuOpen} />
    </>
  )
}
