import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { gapClasses, type Gap } from './spacing'

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: Gap
}

export function Stack({ gap = 'md', className, ...props }: StackProps) {
  return (
    <div className={cn('flex flex-col', gapClasses[gap], className)} {...props} />
  )
}
