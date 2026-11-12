import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { useExclusivePopover } from '@/components/navbar/exclusivePopover'

const OPEN_DELAY = 120
const CLOSE_DELAY = 180

/**
 * The open/closed state of the services panel.
 *
 * Pointer and keyboard want opposite things here. A pointer wants hover, but
 * opening instantly would flash the panel open when crossing the item on the
 * way elsewhere, and closing instantly would snatch it away mid-reach across
 * the gap below it. Hence a short, cancellable delay on each side, which
 * click and keyboard bypass.
 *
 * What is open is stored as the path it was opened on, so a navigation closes
 * it as a consequence of the data rather than through an effect.
 */
export function useServicesMenu() {
  const { pathname } = useLocation()
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const triggerRef = useRef<HTMLElement | null>(null)
  const panelRef = useRef<HTMLElement | null>(null)

  /*
   * Callback refs rather than ref objects in the return value: the elements
   * belong to two different components, and a function is the only shape
   * that does not read a ref during someone else's render.
   */
  const registerTrigger = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node
  }, [])

  const registerPanel = useCallback((node: HTMLElement | null) => {
    panelRef.current = node
  }, [])

  const isOpen = openedOn === pathname

  const clear = useCallback(() => {
    if (timer.current !== undefined) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
  }, [])

  const closeNow = useCallback(() => {
    clear()
    setOpenedOn(null)
  }, [clear])

  /* Opening this panel closes the language menu, anchored to the same bar. */
  const claim = useExclusivePopover(closeNow)

  const openNow = useCallback(() => {
    clear()
    claim()
    setOpenedOn(pathname)
  }, [claim, clear, pathname])

  const openSoon = useCallback(() => {
    clear()
    timer.current = window.setTimeout(() => {
      claim()
      setOpenedOn(pathname)
    }, OPEN_DELAY)
  }, [claim, clear, pathname])

  const closeSoon = useCallback(() => {
    clear()
    timer.current = window.setTimeout(() => setOpenedOn(null), CLOSE_DELAY)
  }, [clear])

  useEffect(() => clear, [clear])

  /* Escape, a click outside, and focus leaving all mean the same thing. */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const isInside = (target: EventTarget | null) =>
      target instanceof Node &&
      (triggerRef.current?.contains(target) === true ||
        panelRef.current?.contains(target) === true)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeNow()
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!isInside(event.target)) {
        closeNow()
      }
    }

    const onFocusIn = (event: FocusEvent) => {
      if (!isInside(event.target)) {
        closeNow()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [closeNow, isOpen])

  return {
    isOpen,
    openNow,
    closeNow,
    openSoon,
    closeSoon,
    registerTrigger,
    registerPanel,
    panelId: 'services-menu',
  }
}

export type ServicesMenuState = ReturnType<typeof useServicesMenu>
