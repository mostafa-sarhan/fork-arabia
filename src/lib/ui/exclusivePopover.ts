import { useCallback, useEffect, useId } from 'react'

/**
 * Exclusivity between popovers that overlay the same bar.
 *
 * The header has two — the services panel and the language menu — and they
 * must never be open at once: both are anchored to the bottom edge of the
 * same bar, so the second to open covers the first, and two panels end up
 * claiming the same piece of the screen.
 *
 * Neither popover can own that rule on its own. One knows when it opens but
 * not who else exists; the component rendering both knows who exists but
 * not when either opens. So the rule sits beside them: each registers how
 * to close itself, and opening closes everyone else. A third popover added
 * later gets the behaviour by registering, with nothing to wire up through
 * props.
 */
const closers = new Map<string, () => void>()

/**
 * Registers `close` for as long as the component lives, and returns the
 * function to call when this popover opens.
 *
 * `close` has to keep its identity between renders — a new function every
 * render would re-register every render — which every caller satisfies by
 * building it with `useCallback`.
 */
export function useExclusivePopover(close: () => void): () => void {
  const id = useId()

  useEffect(() => {
    closers.set(id, close)

    return () => {
      closers.delete(id)
    }
  }, [close, id])

  return useCallback(() => {
    for (const [other, closeOther] of closers) {
      if (other !== id) {
        closeOther()
      }
    }
  }, [id])
}
