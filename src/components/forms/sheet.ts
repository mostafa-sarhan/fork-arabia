import { useEffect, useState } from 'react'

/*
 * Where a Select opens as a bottom sheet instead of a dropdown: under
 * 768px, or on any touch-first screen (a tablet held either way).
 */
const SHEET_QUERY = '(max-width: 47.9375rem), (pointer: coarse)'

/** Whether a Select opening now should open as a sheet. */
export function prefersSheet() {
  return window.matchMedia(SHEET_QUERY).matches
}

/** Whether there is a mouse or trackpad: then the search box may take focus (no on-screen keyboard to pop up). */
export function hasFinePointer() {
  return window.matchMedia('(pointer: fine)').matches
}

/**
 * The part of the screen the visitor actually sees: on a phone, the
 * screen above the on-screen keyboard. Followed while `active`, so a
 * sheet can sit on top of the keyboard rather than behind it.
 */
export function useVisualViewport(active: boolean) {
  const [box, setBox] = useState<{ top: number; height: number } | null>(null)

  useEffect(() => {
    const viewport = window.visualViewport
    if (!active || !viewport) {
      return
    }
    const update = () => setBox({ top: viewport.offsetTop, height: viewport.height })
    update()
    viewport.addEventListener('resize', update)
    viewport.addEventListener('scroll', update)
    return () => {
      viewport.removeEventListener('resize', update)
      viewport.removeEventListener('scroll', update)
    }
  }, [active])

  return box
}
