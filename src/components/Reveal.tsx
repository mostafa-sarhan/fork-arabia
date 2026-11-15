import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RevealProps = {
  /** The element to render. A div unless the markup needs another. */
  as?: 'div' | 'span' | 'p' | 'h1'
  /** How long to wait, in milliseconds, once in view. Staggers a group. */
  delay?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/*
 * Where a box stands:
 * - static: shown as it is, with no motion. Every box in the prerendered
 *   HTML and the first render, and any box already on screen once the
 *   page runs (the hero, the first section): those never animate in.
 * - pending: below the screen and waiting. Hidden only on a page whose
 *   script runs (the `js` class on <html>, set in the boot script) and
 *   only without prefers-reduced-motion (index.css, "Reveal").
 * - in: scrolled into view; fades and slides up once.
 */
type RevealState = 'static' | 'pending' | 'in'

/**
 * Fades and slides its content up the first time it is scrolled into
 * view, if it started below the screen. Until then it is transparent but
 * keeps its space, so nothing shifts.
 *
 * Content is never hidden in the HTML: the prerendered page shows
 * everything, and a box only waits once the page runs and finds it off
 * screen, out of sight, so nothing flashes. Under prefers-reduced-motion
 * nothing waits or moves.
 *
 * It marks itself `data-reveal="static" | "pending" | "in"` and exposes its
 * delay as `--reveal-delay`, so pieces inside (a section title's bar, a
 * photograph) can time their own motion from it in CSS ("Shared motion" in
 * index.css).
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className,
  style,
  children,
}: RevealProps) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [state, setState] = useState<RevealState>('static')

  useEffect(() => {
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let observer: IntersectionObserver | undefined

    /* Measured a frame later, once the layout has reset the scroll for a new page. */
    const frame = requestAnimationFrame(() => {
      const box = element.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) {
        return
      }

      setState('pending')
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setState('in')
            observer?.disconnect()
          }
        },
        // Start once the element is a little way up the screen.
        { rootMargin: '0px 0px -15% 0px' },
      )
      observer.observe(element)
    })

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [element])

  return (
    <Tag
      ref={setElement}
      data-reveal={state}
      className={cn(className, state === 'in' && 'animate-reveal motion-reduce:animate-none')}
      style={
        {
          ...style,
          animationDelay: `${delay}ms`,
          '--reveal-delay': `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  )
}
