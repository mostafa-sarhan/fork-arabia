import { useEffect, useState } from 'react'

/**
 * Whether the page has scrolled away from the top, with the sentinel to
 * place at the document origin.
 *
 * It drives one thing: the shadow under the bar. Nothing in the bar resizes
 * on scroll — a bar that resizes under the reader moves the whole page with
 * it, and the logo in particular must never animate.
 *
 * An IntersectionObserver fires twice per page where a scroll listener runs
 * on every frame, and the sentinel's own height is the threshold, so moving
 * the trigger point is a style change rather than a number in JavaScript.
 */
export function useNavbarScrolled(): [
  boolean,
  (node: HTMLDivElement | null) => void,
] {
  const [isScrolled, setScrolled] = useState(false)
  const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sentinel) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(entry ? !entry.isIntersecting : false),
      { threshold: 0 },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [sentinel])

  return [isScrolled, setSentinel]
}
