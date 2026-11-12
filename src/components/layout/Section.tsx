import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg'
export type SectionTone = 'default' | 'surface' | 'muted'

const spacing: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-section-sm',
  md: 'py-section-sm sm:py-section lg:py-section-lg',
  lg: 'py-section sm:py-section-lg',
}

const tones: Record<SectionTone, string> = {
  default: '',
  surface: 'bg-surface',
  muted: 'bg-navy-soft/60',
}

export type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: SectionSpacing
  tone?: SectionTone
}

export function Section({
  spacing: sectionSpacing = 'md',
  tone = 'default',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spacing[sectionSpacing], tones[tone], className)}
      {...props}
    />
  )
}
