import type { ReactNode } from 'react'
import type { RouteMeta } from './routes'
import { useDocumentHead } from './useDocumentHead'
import { useRouteEntry } from './useRouteEntry'

/**
 * Wraps every route element with what each page owes the document: a title
 * and head links, a reset scroll position and focus moved into the page.
 *
 * It renders inside the layout's `Suspense`, so a lazily loaded page takes
 * its title and the focus move when its content appears rather than while
 * the fallback is on screen.
 */
export function PageRoute({
  route,
  children,
}: {
  route: RouteMeta
  children: ReactNode
}) {
  useDocumentHead(route)
  useRouteEntry()

  return children
}
