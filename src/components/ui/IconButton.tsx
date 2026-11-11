import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type IconButtonVariant = 'solid' | 'outline' | 'ghost'
export type IconButtonSize = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center rounded-md transition-colors duration-200 ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50'

/** The pressed states mirror Button's, variant for variant. */
const variants: Record<IconButtonVariant, string> = {
  solid: 'bg-navy text-white hover:bg-navy-strong active:bg-navy-strong',
  outline:
    'border border-line-strong bg-surface text-ink hover:border-petrol hover:text-petrol active:bg-navy-soft',
  ghost:
    'text-ink-muted hover:bg-navy-soft hover:text-ink active:bg-navy-soft active:text-ink',
}

const sizes: Record<IconButtonSize, string> = {
  sm: 'size-9',
  md: 'size-11',
}

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
}

export function IconButton({
  label,
  variant = 'ghost',
  size = 'md',
  className,
  type = 'button',
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      /*
       * aria-label alone: a title duplicating it made assistive technology
       * announce the same string twice and added a hover tooltip that never
       * appears for keyboard or touch users.
       */
      aria-label={label}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
