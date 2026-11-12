import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type BadgeVariant = 'neutral' | 'accent' | 'outline' | 'danger'
export type BadgeSize = 'sm' | 'md'

const variants: Record<BadgeVariant, string> = {
  neutral: 'bg-navy-soft text-navy',
  accent: 'bg-turquoise-soft text-petrol',
  outline: 'border border-line-strong text-ink-muted',
  danger: 'bg-danger-soft text-danger-strong',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-caption',
  md: 'px-2.5 py-1 text-body-sm',
}

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  size?: BadgeSize
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
