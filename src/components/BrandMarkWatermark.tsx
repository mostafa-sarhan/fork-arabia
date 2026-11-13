import { cn } from '@/lib/cn'

/*
 * The fill and strength of each tone: white on a navy surface, petrol on
 * a light one.
 */
const TONES = {
  white: 'fill-white opacity-7',
  petrol: 'fill-petrol opacity-6',
} as const

/**
 * The F of the logo, drawn faintly as decoration behind a card's content.
 *
 * `className` places and sizes it, usually run off a corner; the card's
 * overflow-hidden clips it. Content drawn over it needs `relative` so it
 * paints on top.
 */
export function BrandMarkWatermark({
  tone,
  className,
}: {
  tone: keyof typeof TONES
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 474 501"
      aria-hidden="true"
      focusable="false"
      className={cn('absolute w-auto', TONES[tone], className)}
    >
      <rect x="0" y="0" width="474" height="150" rx="75" />
      <rect x="0" y="175" width="304" height="150" rx="75" />
      <circle cx="75" cy="426" r="75" />
    </svg>
  )
}
