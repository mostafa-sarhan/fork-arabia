import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { ChevronDownIcon } from './icons'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean
}

export function Select({
  className,
  invalid = false,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(
          'h-11 w-full appearance-none rounded-md border border-line-strong bg-surface ps-3.5 pe-10 text-body text-ink transition-colors duration-200 focus:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/20 disabled:cursor-not-allowed disabled:bg-page disabled:text-ink-muted',
          invalid && 'border-danger focus:border-danger focus:ring-danger/20',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
    </div>
  )
}
