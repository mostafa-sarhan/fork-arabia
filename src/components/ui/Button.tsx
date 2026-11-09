import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { Spinner } from './Spinner'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'

export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors duration-200 ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-strong active:bg-navy-strong',
  secondary:
    'bg-turquoise text-navy hover:bg-turquoise-strong active:bg-turquoise-strong',
  outline:
    'border border-line-strong bg-surface text-ink hover:border-petrol hover:text-petrol active:bg-navy-soft',
  ghost: 'text-ink hover:bg-navy-soft active:bg-navy-soft',
  destructive:
    'bg-danger text-white hover:bg-danger-strong active:bg-danger-strong',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-body-sm',
  md: 'h-11 px-5 text-button',
  lg: 'h-12 px-6 text-body',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Spinner className="size-4" /> : null}
      {children}
    </button>
  )
}
