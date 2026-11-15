import { useEffect, useLayoutEffect, useState, type RefObject } from 'react'
import { cn } from '@/lib/cn'
import { fieldBase, fieldInvalid } from '@/components/ui/fieldStyles'

/*
 * The trigger of a custom control (Select, DatePicker): a button drawn as
 * the text inputs are, 52px, its value at the start and an icon at the
 * end. While its panel is open it keeps the focused look.
 */
const TRIGGER =
  'relative flex h-13 cursor-pointer items-center gap-3 pe-11 text-start aria-expanded:border-petrol aria-expanded:ring-4 aria-expanded:ring-turquoise/25'

export function triggerClass(invalid: boolean, className?: string) {
  return cn(fieldBase, TRIGGER, invalid && fieldInvalid, className)
}

/* The icon at the trigger's inline end (chevron or calendar). */
export const TRIGGER_ICON = 'pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted'

/* The chosen value, cut with an ellipsis; the muted placeholder. */
export const TRIGGER_VALUE = 'min-w-0 flex-1 truncate'
export const TRIGGER_PLACEHOLDER = 'min-w-0 flex-1 truncate text-ink-muted/70'

/*
 * The panel: white, 12px radius, thin border, soft shadow, 8px off the
 * trigger. It fades and slides 4px into place (motion tokens) and back
 * out. Closed, it is display:none — out of the layout, the Tab order and
 * the accessibility tree; `starting:` and `transition-discrete` let it
 * animate in and out of that. With reduced motion it simply appears.
 */
const PANEL =
  'absolute z-dropdown rounded-xl border border-line bg-surface shadow-raised transition-[opacity,translate,display] transition-discrete duration-(--duration-hover) ease-out-soft motion-reduce:transition-none'
const PANEL_SIDE = { bottom: 'top-full mt-2', top: 'bottom-full mb-2' }
const PANEL_CLOSED = { bottom: 'hidden opacity-0 -translate-y-1', top: 'hidden opacity-0 translate-y-1' }
const PANEL_OPEN = {
  bottom: 'block opacity-100 translate-y-0 starting:opacity-0 starting:-translate-y-1',
  top: 'block opacity-100 translate-y-0 starting:opacity-0 starting:translate-y-1',
}

export type PanelSide = keyof typeof PANEL_SIDE

export function panelClass(open: boolean, side: PanelSide, className?: string) {
  return cn(PANEL, PANEL_SIDE[side], open ? PANEL_OPEN[side] : PANEL_CLOSED[side], className)
}

/* Room kept between a panel and the screen's edges. */
const EDGE = 16
const GAP = 8

type PopoverOptions = {
  open: boolean
  /** Closes without moving focus: the visitor clicked or tabbed elsewhere. */
  onDismiss: () => void
  /** The control's wrapper: trigger and panel. */
  rootRef: RefObject<HTMLElement | null>
  panelRef: RefObject<HTMLElement | null>
  /** The tallest the panel's content may be before it scrolls, in px. */
  maxHeight?: number
}

/**
 * Where an open panel goes, and when it closes on its own.
 *
 * It opens under the trigger, or above it when there is more room there
 * than below (the fixed header counts as no room). It is shifted along the
 * inline axis when it would cross the screen's edge, and its height is
 * capped to the room it has. A press outside the control closes it.
 */
export function usePopover({ open, onDismiss, rootRef, panelRef, maxHeight = Infinity }: PopoverOptions) {
  const [side, setSide] = useState<PanelSide>('bottom')
  const [shift, setShift] = useState(0)
  const [room, setRoom] = useState(maxHeight)

  useLayoutEffect(() => {
    if (!open) {
      return
    }

    function place() {
      const root = rootRef.current
      const panel = panelRef.current
      if (!root || !panel) {
        return
      }
      const anchor = root.getBoundingClientRect()
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0
      const below = window.innerHeight - anchor.bottom - GAP - EDGE
      const above = anchor.top - header - GAP - EDGE
      const needed = Math.min(panel.scrollHeight, maxHeight)
      const nextSide = below >= needed || below >= above ? 'bottom' : 'top'

      setSide(nextSide)
      setRoom(Math.max(160, Math.min(maxHeight, nextSide === 'bottom' ? below : above)))

      /* The panel starts at the trigger's inline start; keep it on screen. */
      const rtl = getComputedStyle(root).direction === 'rtl'
      const width = panel.offsetWidth
      const screen = document.documentElement.clientWidth
      const left = rtl ? anchor.right - width : anchor.left
      const right = left + width
      let dx = 0
      if (right > screen - EDGE) dx = screen - EDGE - right
      if (left + dx < EDGE) dx = EDGE - left
      setShift(rtl ? -dx : dx)
    }

    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [open, rootRef, panelRef, maxHeight])

  useEffect(() => {
    if (!open) {
      return
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        onDismiss()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, onDismiss, rootRef])

  return { side, shift, room }
}
