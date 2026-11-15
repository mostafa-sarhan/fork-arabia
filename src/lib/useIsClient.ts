import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * False in the prerender and in the first render in the browser (the one
 * that hydrates the prerendered HTML), true from then on. For markup that
 * depends on the visitor's moment, like "today", which the build day
 * cannot know: drawn only once it can be drawn right, with no mismatch.
 */
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
