import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SectionTitleProps = {
  /** The short label above the heading. */
  label?: ReactNode
  /** The heading itself. */
  children: ReactNode
  align?: 'start' | 'center'
  /** `navy` on a navy section, `light` on white or the page tone. */
  tone?: 'light' | 'navy'
  /** The heading's element: an h2 unless the outline needs another. */
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
}

const TONES = {
  light: { label: 'text-petrol', heading: 'text-heading' },
  navy: { label: 'text-turquoise-soft', heading: 'text-white' },
} as const

/**
 * Every section's heading: an optional label, the title, and a short
 * turquoise bar 20px under it.
 *
 * Inside a <Reveal>, the bar grows in a beat after its section appears:
 * from the inline start, or from the middle when centred (see
 * `.section-title-bar` in index.css). Under reduced motion it is simply
 * there.
 */
export function SectionTitle({
  label,
  children,
  align = 'start',
  tone = 'light',
  as: Heading = 'h2',
  className,
}: SectionTitleProps) {
  const colors = TONES[tone]

  return (
    <div
      className={cn(
        'flex flex-col items-start',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {label ? (
        <p className={cn('mb-3 text-eyebrow', colors.label)}>{label}</p>
      ) : null}

      <Heading
        className={cn(
          'font-display text-section-title text-balance',
          colors.heading,
        )}
      >
        {children}
      </Heading>

      {/* 48×3px, fully rounded. */}
      <span
        aria-hidden="true"
        data-align={align}
        className="section-title-bar mt-5 h-0.75 w-12 rounded-full bg-turquoise"
      />
    </div>
  )
}
