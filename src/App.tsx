import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { SITE_ROUTES, type SiteRoute } from '@/config/routes'
import { SiteLayout } from '@/layouts/SiteLayout'
import AboutPage from '@/pages/about/AboutPage'
import BookConsultationPage from '@/pages/book-consultation/BookConsultationPage'
import ContactPage from '@/pages/contact/ContactPage'
import HomePage from '@/pages/home/HomePage'
import NotFoundPage from '@/pages/not-found/NotFoundPage'
import PresencePage from '@/pages/presence/PresencePage'
import PrivacyPage from '@/pages/privacy/PrivacyPage'

/* The heaviest pages are loaded on demand — the services page, the
   sector page and the quote form (its service list) need every sector's
   full data, which then loads with them alone — and the layout's Suspense
   fallback covers the wait. */
const DesignSystemPage = lazy(
  () => import('@/pages/design-system/DesignSystemPage'),
)
const ServicesPage = lazy(() => import('@/pages/services/ServicesPage'))
const SectorPage = lazy(() => import('@/pages/sector/SectorPage'))
const RequestQuotePage = lazy(() => import('@/pages/request-quote/RequestQuotePage'))


/** The component that draws each kind of page in config/routes.ts. */
function pageFor(route: SiteRoute) {
  switch (route.page) {
    case 'home':
      return <HomePage />
    case 'about':
      return <AboutPage />
    case 'services':
      return <ServicesPage />
    case 'sector':
      return <SectorPage slug={route.slug} />
    case 'presence':
      return <PresencePage />
    case 'bookConsultation':
      return <BookConsultationPage />
    case 'requestQuote':
      return <RequestQuotePage />
    case 'contact':
      return <ContactPage />
    case 'privacy':
      return <PrivacyPage />
  }
}

/*
 * The site's pages from the one routes list, plus two that are not in it:
 * the design-system reference (never prerendered or listed; it lives in
 * the browser only) and the 404 for everything else.
 */
const pages = (
  <>
    {SITE_ROUTES.map((route) =>
      route.path === '/' ? (
        <Route key={route.path} index element={pageFor(route)} />
      ) : (
        <Route key={route.path} path={route.path.slice(1)} element={pageFor(route)} />
      ),
    )}
    <Route path="design-system" element={<DesignSystemPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </>
)

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/">{pages}</Route>
        <Route path="/en">{pages}</Route>
      </Route>
    </Routes>
  )
}
