import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Footer } from '@/components/footer'
import { LanguageSuggestion } from '@/components/layout/LanguageSuggestion'
import { RouteFallback } from '@/components/layout/RouteFallback'
import { InertWhileMenuOpen, Navbar, NavbarProvider } from '@/components/navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { useLegacyLanguageRedirect } from '@/lib/routing/useLegacyLanguageRedirect'

/**
 * The shell every route renders inside.
 *
 * It owns what belongs to the site rather than to any page: the skip link,
 * the navbar, the `main` landmark every page fills, the footer and the
 * boundary lazily loaded pages suspend against. The navbar is mounted here
 * once, so it survives navigation — remounted per page it would lose its
 * scrolled state and replay its transition on every click.
 *
 * The redirect replaces the history entry instead of pushing one, so the back
 * button returns to wherever the visitor came from rather than to a URL that
 * would immediately redirect again.
 */
export function SiteLayout() {
  const redirect = useLegacyLanguageRedirect()

  if (redirect) {
    return <Navigate to={redirect} replace />
  }

  return (
    <NavbarProvider>
      <SkipLink />
      <Navbar />

      <InertWhileMenuOpen>
        {/* The skip link's target, and where route entry puts focus. */}
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </main>

        <Footer />
      </InertWhileMenuOpen>

      <LanguageSuggestion />
    </NavbarProvider>
  )
}
