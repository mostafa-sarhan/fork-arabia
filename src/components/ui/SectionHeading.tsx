import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type HeadingLevel = 1 | 2 | 3

const levels: Record<
  HeadingLevel,
  { tag: ElementType; size: string; weight: string }
> = {
  1: { tag: 'h1', size: 'text-h1', weight: 'font-bold' },
  2: { tag: 'h2', size: 'text-h2', weight: 'font-semibold' },
  3: { tag: 'h3', size: 'text-h3', weight: 'font-semibold' },
}

export type SectionHeadingProps = {
  title: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  align?: 'start' | 'center'
  level?: HeadingLevel
  className?: string
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  align = 'start',
  level = 2,
  className,
}: SectionHeadingProps) {
  const Heading = levels[level].tag

  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-overline tracking-latin-wide text-subheading">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          'font-display text-heading',
          levels[level].size,
          levels[level].weight,
          eyebrow ? 'mt-3' : null,
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-body-lg text-ink-muted">{description}</p>
      ) : null}
    </div>
  )
}
