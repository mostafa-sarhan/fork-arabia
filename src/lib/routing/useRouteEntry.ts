import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** The page landmark every page renders, and the skip link's target. */
const MAIN_ID = 'main'

/**
 * The path this document has already entered.
 *
 * Module scope is deliberate: "is this the route the visitor arrived on?" is
 * a property of the document, not of a component, and every page mounts its
 * own instance. Comparing paths rather than counting mounts also keeps
 * StrictMode's double-invoked effects from being mistaken for a navigation.
 */
let enteredPathname: string | null = null

/**
 * Makes a client-side navigation behave like a document load.
 *
 * A browser resets the scroll position and the focus point on every real
 * navigation; a router that only swaps components does neither, so the next
 * page opens half-way down and the next Tab continues from whatever link was
 * just clicked. Both are repaired here, once, for every route.
 *
 * The route the visitor arrived on is left alone — the browser has already
 * positioned it, and moving focus into the page on load would talk over a
 * screen reader's own announcement. A navigation to a hash is left alone too:
 * the anchor is the destination.
 */
export function useRouteEntry(): void {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (enteredPathname === pathname) {
      return
    }

    const isInitialRoute = enteredPathname === null

    enteredPathname = pathname

    if (isInitialRoute || hash) {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.getElementById(MAIN_ID)?.focus({ preventScroll: true })
  }, [hash, pathname])
}
