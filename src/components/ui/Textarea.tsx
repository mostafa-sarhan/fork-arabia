import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
}

export function Textarea({
  className,
  invalid = false,
  ...props
}: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(
        'min-h-28 w-full resize-y rounded-md border border-line-strong bg-surface px-3.5 py-3 text-body text-ink transition-colors duration-200 placeholder:text-ink-muted/70 focus:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/20 disabled:cursor-not-allowed disabled:bg-page disabled:text-ink-muted',
        invalid && 'border-danger focus:border-danger focus:ring-danger/20',
        className,
      )}
      {...props}
    />
  )
}
