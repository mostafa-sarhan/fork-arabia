import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Footer } from '@/components/footer'
import { InertWhileMenuOpen, Navbar, NavbarProvider } from '@/components/navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { LanguageSuggestion } from './LanguageSuggestion'
import { RouteFallback } from './RouteFallback'

/**
 * The shell every page renders inside.
 *
 * It owns what belongs to the site rather than to any page: the skip link,
 * the navbar, the `main` landmark every page fills, the footer and the
 * boundary lazily loaded pages suspend against. The navbar is mounted here
 * once, so it survives navigation — remounted per page it would lose its
 * scrolled state and replay its transition on every click.
 */
export function SiteLayout() {
  return (
    <NavbarProvider>
      <SkipLink />
      <Navbar />

      <InertWhileMenuOpen>
        {/* The skip link's target, and where `usePageMeta` puts focus. */}
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
