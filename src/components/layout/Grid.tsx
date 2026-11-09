import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { gapClasses, type Gap } from './spacing'

export type GridColumns = 1 | 2 | 3 | 4

const columns: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  cols?: GridColumns
  gap?: Gap
}

export function Grid({ cols = 2, gap = 'md', className, ...props }: GridProps) {
  return (
    <div
      className={cn('grid', columns[cols], gapClasses[gap], className)}
      {...props}
    />
  )
}
