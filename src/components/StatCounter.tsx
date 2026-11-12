import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

/** How much of the number has to be on screen before it starts counting. */
const VIEWPORT_THRESHOLD = 0.4

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/** Ease-out cubic: quick off the mark, settling onto the final value. */
function easeOut(progress: number): number {
  return 1 - (1 - progress) ** 3
}

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
 * A number that counts up to its value the first time it is seen.
 *
 * The final value is also the first render, so the number is correct with
 * no JavaScript and the box never changes size: the digits are tabular and
 * the counting span holds a width of as many characters as the final number
 * has, so nothing on the line moves while it runs.
 *
 * It counts once. Anyone who has asked for reduced motion simply gets the
 * final value, and a screen reader is given that value as text while the
 * animating digits beside it stay hidden.
 */
export function StatCounter({
  value,
  suffix,
  duration = 2000,
  className,
  suffixClassName,
}: StatCounterProps) {
  const [shown, setShown] = useState(value)
  const element = useRef<HTMLSpanElement>(null)
  const digits = String(value).length

  useEffect(() => {
    const node = element.current

    if (!node || window.matchMedia(REDUCED_MOTION).matches) {
      return
    }

    let frame = 0
    let startedAt: number | null = null

    const step = (now: number) => {
      startedAt ??= now

      const progress = Math.min((now - startedAt) / duration, 1)

      setShown(Math.round(easeOut(progress) * value))

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return
        }

        // Once only: the count is an entrance, not a loop.
        observer.disconnect()
        frame = requestAnimationFrame(step)
      },
      { threshold: VIEWPORT_THRESHOLD },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [duration, value])

  return (
    <span
      ref={element}
      className={cn('inline-flex items-baseline tabular-nums', className)}
    >
      {/*
        One fixed slot per digit of the final number, so nothing on this
        line moves while the count runs: the figures are tabular, each slot
        is exactly one character wide, and a slot the number has not
        reached yet is simply empty. The box therefore holds the width of
        the final number from the first frame, and the empty slots always
        fall on the outside of the number rather than beside the suffix.

        dir="ltr" because the slots are laid out one per digit: left to
        right in both languages, as the digits themselves are.
      */}
      <span aria-hidden="true" dir="ltr" className="inline-block">
        {String(shown)
          .padStart(digits, ' ')
          .split('')
          .map((character, index) => (
            <span key={index} className="inline-block w-[1ch] text-center">
              {character.trim()}
            </span>
          ))}

        {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
      </span>

      <span className="sr-only">{`${value}${suffix ?? ''}`}</span>
    </span>
  )
}
