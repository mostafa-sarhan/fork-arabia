import { useCallback, useEffect, useId } from 'react'

/**
 * Exclusivity between the popovers anchored to the navbar.
 *
 * The bar has two — the services panel and the language menu — and they must
 * never be open at once, or the second to open covers the first. Neither can
 * own that rule: one knows when it opens but not who else exists, and the
 * component rendering both knows who exists but not when either opens. So
 * each registers how to close itself, and opening closes everyone else.
 */
const closers = new Map<string, () => void>()

/**
 * Registers `close` for as long as the component lives, and returns the
 * function to call when this popover opens. `close` has to keep its identity
 * between renders, which every caller satisfies with `useCallback`.
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
