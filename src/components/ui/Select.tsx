import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { fieldBase, fieldInvalid } from './fieldStyles'
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
          fieldBase,
          // pe-10 replaces the shared pe-3.5 to clear the chevron.
          'h-11 appearance-none pe-10',
          invalid && fieldInvalid,
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
