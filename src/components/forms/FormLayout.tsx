import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import { NextSteps } from './NextSteps'

/* The page tone, so the white cards stand off it. */
const SECTION = 'py-12 lg:py-20 bg-page'

/*
 * Phones and tablets: the form first, then the aside, in one column held
 * to the screen (grid-cols-1 is minmax(0, 1fr), so a long chosen value is
 * cut with an ellipsis rather than widening the page). The form comes
 * first in the HTML too, so Tab and screen readers meet it first.
 *
 * From 1024 the form takes 7 of 12 columns at the inline start and the
 * aside 5 at the end, both placed by column, on one row.
 */
const LAYOUT = 'grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10'
const FORM_COLUMN = 'lg:col-span-7 lg:col-start-1 lg:row-start-1'
const ASIDE = 'flex flex-col gap-4 lg:col-span-5 lg:col-start-8 lg:row-start-1'

/*
 * Sticky 24px under the header (the narrow bar, the desktop one from
 * 1280), as the sector page's aside. It never reaches the footer: a sticky
 * box stays inside its grid. Applied only while it fits whole (STICKY_FITS).
 */
const STICKY = 'lg:sticky lg:top-[calc(var(--header-height-mobile)+1.5rem)] xl:top-[calc(var(--header-height)+1.5rem)]'

/* Space kept under a sticky aside, so its last card does not touch the screen's edge. */
const BOTTOM_CLEAR = 24

/**
 * Whether the aside, held at its sticky offset, fits the screen whole.
 * The sector page uses a fixed min-height for its one aside; the form
 * asides differ per page, so this one is measured, and re-measured when
 * the screen or the aside's size changes. Too tall, it scrolls with the
 * page: never cut off, never an inner scrollbar.
 */
function useFitsScreen(ref: RefObject<HTMLElement | null>) {
  const [fits, setFits] = useState(false)

  useEffect(() => {
    const aside = ref.current
    if (!aside) {
      return
    }
    function measure() {
      if (!aside) return
      const root = getComputedStyle(document.documentElement)
      const wide = window.matchMedia('(min-width: 80rem)').matches
      const header = parseFloat(root.getPropertyValue(wide ? '--header-height' : '--header-height-mobile')) || 0
      setFits(header + 24 + aside.offsetHeight + BOTTOM_CLEAR <= window.innerHeight)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(aside)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [ref])

  return fits
}

type FormLayoutProps = {
  /** What happens after sending: three steps, at the top of the aside. */
  steps: readonly string[]
  /** The page's own aside content, under the steps. */
  aside: ReactNode
  /** The form card. */
  children: ReactNode
}

/** A form page's body under its hero: the form card and its aside. Shared by every form page. */
export function FormLayout({ steps, aside, children }: FormLayoutProps) {
  const asideRef = useRef<HTMLElement>(null)
  const fits = useFitsScreen(asideRef)

  return (
    <section className={SECTION}>
      <Container className={LAYOUT}>
        <div className={FORM_COLUMN}>{children}</div>
        <aside ref={asideRef} className={cn(ASIDE, fits && STICKY)}>
          <NextSteps steps={steps} />
          {aside}
        </aside>
      </Container>
    </section>
  )
}
