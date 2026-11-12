import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type DividerProps = HTMLAttributes<HTMLHRElement> & {
  orientation?: 'horizontal' | 'vertical'
}

export function Divider({
  orientation = 'horizontal',
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      className={cn(
        'border-0',
        orientation === 'vertical'
          ? 'h-full min-h-6 w-px bg-line'
          : 'w-full border-t border-line',
        className,
      )}
      {...props}
    />
  )
}
