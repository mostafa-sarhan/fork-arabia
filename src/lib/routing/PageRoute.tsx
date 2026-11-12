import type { ReactNode } from 'react'
import type { RouteMeta } from './routes'
import { useDocumentHead } from './useDocumentHead'
import { useRouteEntry } from './useRouteEntry'

/**
 * Wraps every route element with the things each page owes the document:
 * a title and head links, a reset scroll position and focus moved into the
 * page. Pages themselves stay free of routing concerns.
 *
 * It sits inside `Suspense` rather than above it, so a lazily loaded page
 * takes its title and the focus move at the moment its content appears
 * instead of while the fallback is on screen.
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
