import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { fieldBase, fieldInvalid } from './fieldStyles'

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
        fieldBase,
        'min-h-28 resize-y py-3',
        invalid && fieldInvalid,
        className,
      )}
      {...props}
    />
  )
}
