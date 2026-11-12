import { lazy, type ReactNode } from 'react'
import { Route, Routes } from 'react-router'
import { LANGUAGES } from '@/lib/i18n/languageConfig'
import { PageRoute } from '@/lib/routing/PageRoute'
import { RootLayout } from '@/lib/routing/RootLayout'
import {
  localizedPath,
  localizedPattern,
  NOT_FOUND_ROUTE,
  ROUTES,
  SECTOR_ROUTE,
  type RouteId,
} from '@/lib/routing/routes'
import ComingSoon from '@/pages/ComingSoon'
import NotFound from '@/pages/NotFound'

const DesignSystem = lazy(() => import('@/pages/DesignSystem'))
const PagePlaceholder = lazy(() => import('@/pages/PagePlaceholder'))
const SectorPlaceholder = lazy(() =>
  import('@/pages/PagePlaceholder').then((module) => ({
    default: module.SectorPlaceholder,
  })),
)

const ROUTE_ELEMENTS = {
  home: <ComingSoon />,
  about: <PagePlaceholder routeId="about" />,
  services: <PagePlaceholder routeId="services" />,
  presence: <PagePlaceholder routeId="presence" />,
  contact: <PagePlaceholder routeId="contact" />,
  bookConsultation: <PagePlaceholder routeId="bookConsultation" />,
  requestQuote: <PagePlaceholder routeId="requestQuote" />,
  sector: <SectorPlaceholder />,
  designSystem: <DesignSystem />,
  notFound: <NotFound />,
} satisfies Record<RouteId, ReactNode>


function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {ROUTES.flatMap((route) =>
          LANGUAGES.map((language) => (
            <Route
              key={`${route.id}:${language}`}
              path={localizedPath(route.path, language)}
              element={
                <PageRoute route={route}>
                  {ROUTE_ELEMENTS[route.id]}
                </PageRoute>
              }
            />
          )),
        )}

        {LANGUAGES.map((language) => (
          <Route
            key={`sector:${language}`}
            path={localizedPattern(SECTOR_ROUTE.path, language)}
            element={
              <PageRoute route={SECTOR_ROUTE}>
                {ROUTE_ELEMENTS.sector}
              </PageRoute>
            }
          />
        ))}

        <Route
          path="*"
          element={
            <PageRoute route={NOT_FOUND_ROUTE}>
              {ROUTE_ELEMENTS.notFound}
            </PageRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
