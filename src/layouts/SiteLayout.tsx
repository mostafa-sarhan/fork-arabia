import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Footer } from '@/components/footer'
import { InertWhileMenuOpen, Navbar, NavbarProvider } from '@/components/navbar'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { SkipLink } from '@/components/ui/SkipLink'
import { JsonLd } from '@/components/JsonLd'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { organizationJsonLd } from '@/lib/seo/structuredData'
import { useDocumentHead } from '@/lib/seo/useDocumentHead'
import { useNavigationReset } from '@/lib/useNavigationReset'
import { LanguageSuggestion } from './LanguageSuggestion'
import { RouteFallback } from './RouteFallback'

/**
 * The shell every page renders inside.
 *
 * It owns what belongs to the site rather than to any page: the skip link,
 * the navbar, the `main` landmark every page fills, the footer, the
 * floating WhatsApp button and the boundary lazily loaded pages suspend
 * against. The navbar is mounted here
 * once, so it survives navigation — remounted per page it would lose its
 * scrolled state and replay its transition on every click.
 */
export function SiteLayout() {
  /* The page's head tags (config/seo.ts), and the scroll and focus a real navigation would reset. */
  useDocumentHead()
  useNavigationReset()
  const { language } = useLanguage()

  return (
    <NavbarProvider>
      <SkipLink />
      <Navbar />

      <InertWhileMenuOpen>
        {/* Fixed in the corner; first here so Tab meets it right after the header. */}
        <WhatsAppButton />

        {/* The skip link's target, and where `useNavigationReset` puts focus. */}
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </main>

        <Footer />
      </InertWhileMenuOpen>

      <LanguageSuggestion />

      {/* The company, as schema.org data, on every page. */}
      <JsonLd data={organizationJsonLd(language)} />
    </NavbarProvider>
  )
}
