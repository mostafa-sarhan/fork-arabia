import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type ContainerSize = 'narrow' | 'default' | 'wide' | 'full'

const sizes: Record<ContainerSize, string> = {
  narrow: 'max-w-narrow',
  default: 'max-w-content',
  wide: 'max-w-wide',
  full: 'max-w-none',
}

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize
}

export function Container({
  size = 'default',
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-gutter sm:px-gutter-sm lg:px-gutter-lg',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
