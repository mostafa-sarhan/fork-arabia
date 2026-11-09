import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export function Input({ className, invalid = false, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        'h-11 w-full rounded-md border border-line-strong bg-surface px-3.5 text-body text-ink transition-colors duration-200 placeholder:text-ink-muted/70 focus:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/20 disabled:cursor-not-allowed disabled:bg-page disabled:text-ink-muted',
        invalid && 'border-danger focus:border-danger focus:ring-danger/20',
        className,
      )}
      {...props}
    />
  )
}
