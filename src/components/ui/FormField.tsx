import type { HTMLAttributes, LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export function FormLabel({
  className,
  children,
  required = false,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn('block text-label font-medium text-ink', className)}
      {...props}
    >
      {children}
      {required ? (
        <span className="ms-1 text-danger" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  )
}

export function HelperText({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-body-sm text-ink-muted', className)}
      {...props}
    />
  )
}

export function ErrorMessage({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      role="alert"
      className={cn('text-body-sm font-medium text-danger-strong', className)}
      {...props}
    >
      {children}
    </p>
  )
}
