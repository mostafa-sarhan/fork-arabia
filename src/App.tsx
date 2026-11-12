import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { SiteLayout } from '@/layouts/SiteLayout'
import AboutPage from '@/pages/about/AboutPage'
import BookConsultationPage from '@/pages/book-consultation/BookConsultationPage'
import ContactPage from '@/pages/contact/ContactPage'
import HomePage from '@/pages/home/HomePage'
import NotFoundPage from '@/pages/not-found/NotFoundPage'
import PresencePage from '@/pages/presence/PresencePage'
import RequestQuotePage from '@/pages/request-quote/RequestQuotePage'
import ServicesPage from '@/pages/services/ServicesPage'

/* The two heaviest pages are loaded on demand; the layout's Suspense
   fallback covers the wait. */
const DesignSystemPage = lazy(
  () => import('@/pages/design-system/DesignSystemPage'),
)
const SectorPage = lazy(() => import('@/pages/sector/SectorPage'))


const pages = (
  <>
    <Route index element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="services" element={<ServicesPage />} />
    <Route path="services/:slug" element={<SectorPage />} />
    <Route path="presence" element={<PresencePage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="book-consultation" element={<BookConsultationPage />} />
    <Route path="request-quote" element={<RequestQuotePage />} />
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
