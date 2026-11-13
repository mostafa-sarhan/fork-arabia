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

/**
 * Fades and slides its content up the first time it comes into view.
 *
 * Until then it is transparent but keeps its space, so nothing shifts.
 * Under prefers-reduced-motion it is simply there: no waiting state and no
 * animation.
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className,
  style,
  children,
}: RevealProps) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      // Start once the element is a little way up the screen.
      { rootMargin: '0px 0px -15% 0px' },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [element])

  return (
    <Tag
      ref={setElement}
      className={cn(
        className,
        inView
          ? 'animate-enter motion-reduce:animate-none'
          : 'motion-safe:opacity-0',
      )}
      style={{ ...style, animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
