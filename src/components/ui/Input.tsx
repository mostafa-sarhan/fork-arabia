import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { fieldBase, fieldInvalid } from './fieldStyles'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export function Input({ className, invalid = false, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(fieldBase, 'h-11', invalid && fieldInvalid, className)}
      {...props}
    />
  )
}
