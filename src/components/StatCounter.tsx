import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

/** How much of the number has to be on screen before it starts counting. */
const VISIBLE_ENOUGH = 0.4

export type StatCounterProps = {
  /** The number to count to. Always rendered in Western digits. */
  value: number
  /** Shown after the number, e.g. "+". Read out with it. */
  suffix?: string
  /** How long the count takes, in milliseconds. */
  duration?: number
  className?: string
  /** Classes for the suffix alone, so a layout can leave it out. */
  suffixClassName?: string
}

/**
 * A number that counts up to its value the first time it is seen, once.
 *
 * The final value is also the first render, so the number is right with no
 * JavaScript and before the element is reached. Anyone who has asked for
 * reduced motion simply keeps that value, and a screen reader is given it
 * as text while the counting digits beside it stay hidden.
 */
export function StatCounter({
  value,
  suffix,
  duration = 2000,
  className,
  suffixClassName,
}: StatCounterProps) {
  const [shown, setShown] = useState(value)
  const box = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = box.current

    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let frame = 0
    let startedAt = 0

    const step = (now: number) => {
      if (startedAt === 0) {
        startedAt = now
      }

      const progress = Math.min((now - startedAt) / duration, 1)

      // Ease-out cubic: quick off the mark, settling onto the final value.
      setShown(Math.round((1 - (1 - progress) ** 3) * value))

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        observer.disconnect()
        frame = requestAnimationFrame(step)
      },
      { threshold: VISIBLE_ENOUGH },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [duration, value])

  const digits = String(shown).padStart(String(value).length, ' ').split('')

  return (
    <span
      ref={box}
      className={cn('inline-flex items-baseline tabular-nums', className)}
    >
      {/*
        One fixed-width slot per digit of the final number, written left to
        right in both languages. This is what keeps the measured CLS at
        zero: a plain number re-flows every time it gains a digit — 9 to
        10 to 100 — and each of those re-flows is counted as a layout
        shift, even inside a box of its own.
      */}
      <span aria-hidden="true" dir="ltr" className="inline-block">
        {digits.map((digit, index) => (
          <span key={index} className="inline-block w-[1ch] text-center">
            {digit.trim()}
          </span>
        ))}

        {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
      </span>

      <span className="sr-only">{`${value}${suffix ?? ''}`}</span>
    </span>
  )
}
