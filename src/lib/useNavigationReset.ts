import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** The layout's `main` landmark, and the skip link's target. */
const MAIN_ID = 'main'

/**
 * The path this document has already entered. Module scope is deliberate:
 * "is this the route the visitor arrived on?" is a property of the document,
 * not of a component. Comparing paths rather than counting mounts also keeps
 * StrictMode's double-invoked effects from looking like a navigation.
 */
let enteredPathname: string | null = null

/**
 * A browser resets the scroll position and the focus point on every real
 * navigation; a router that only swaps components does neither, so the next
 * page would open half-way down with focus still on the link just clicked.
 *
 * The route the visitor arrived on is left alone — the browser has already
 * positioned it, and moving focus on load would talk over a screen reader's
 * own announcement. A navigation to a hash is left alone too: the anchor is
 * the destination. Mounted once, in the layout.
 */
export function useNavigationReset() {
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
