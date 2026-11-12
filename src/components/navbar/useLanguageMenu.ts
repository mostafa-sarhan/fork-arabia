import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { useExclusivePopover } from '@/components/navbar/exclusivePopover'

/**
 * The open/closed state of the language menu.
 *
 * Unlike the services panel it has no hover behaviour: the language control
 * is not an item a pointer crosses on its way somewhere else, so a panel
 * that opened on hover would appear whenever someone crossed the gap between
 * the navigation and the buttons. It opens on click, Enter or Space, and on
 * ArrowDown.
 *
 * What is open is stored as the path it was opened on, so a navigation closes
 * it as a consequence of the data — including the one the menu exists to
 * perform.
 */
export function useLanguageMenu() {
  const { pathname } = useLocation()
  const panelId = useId()
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  /* Callback refs: the trigger and the panel are two different components. */
  const registerTrigger = useCallback((node: HTMLButtonElement | null) => {
    triggerRef.current = node
  }, [])

  const registerPanel = useCallback((node: HTMLDivElement | null) => {
    panelRef.current = node
  }, [])

  const isOpen = openedOn === pathname

  const closeNow = useCallback(() => setOpenedOn(null), [])
  const claim = useExclusivePopover(closeNow)

  const openNow = useCallback(() => {
    claim()
    setOpenedOn(pathname)
  }, [claim, pathname])

  const toggle = useCallback(() => {
    if (isOpen) {
      closeNow()
      return
    }

    openNow()
  }, [closeNow, isOpen, openNow])

  /*
   * Focus enters the menu when it opens, landing on the language already in
   * use — the menu-button pattern, and the only arrangement the arrow keys
   * have somewhere to start from.
   */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const panel = panelRef.current
    const landing =
      panel?.querySelector<HTMLElement>('[data-menu-item][aria-current]') ??
      panel?.querySelector<HTMLElement>('[data-menu-item]')

    landing?.focus()
  }, [isOpen])

  /*
   * Escape, a click outside and focus leaving all close it. Escape is the
   * only one that returns focus to the trigger: it is the only one where the
   * visitor has not already said where they want to be.
   */
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
        triggerRef.current?.focus()
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
    panelId,
    toggle,
    openNow,
    closeNow,
    registerTrigger,
    registerPanel,
  }
}

export type LanguageMenuState = ReturnType<typeof useLanguageMenu>
