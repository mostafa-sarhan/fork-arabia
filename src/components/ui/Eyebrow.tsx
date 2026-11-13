import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * The short label above a section title, after a turquoise rule. Inside a
 * <Reveal>, the rule grows in from the inline start a beat after the
 * section appears.
 */
export function Eyebrow({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <p className={cn('flex items-center gap-3 text-eyebrow text-petrol', className)}>
      <span
        aria-hidden="true"
        className="eyebrow-line h-0.5 w-8 rounded-full bg-turquoise"
      />
      {children}
    </p>
  )
}
