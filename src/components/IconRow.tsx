import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
 * The tile is centred on the whole text block: a single line sits exactly
 * on the tile's centre, and a longer block (a three-line address) is
 * centred on it as a whole.
 */
const ROW = 'flex items-center gap-3'

/* A 40px tile; its shape and colours come from `tileClassName`. */
const TILE = 'grid size-10 shrink-0 place-items-center'

type IconRowProps = {
  /** The icon drawn in the tile; decorative. */
  icon: ReactNode
  /** The tile's look: radius, background and icon colour. */
  tileClassName?: string
  className?: string
  children: ReactNode
}

/** An icon tile with its text beside it, the two centred on each other. */
export function IconRow({ icon, tileClassName, className, children }: IconRowProps) {
  return (
    <div className={cn(ROW, className)}>
      <span aria-hidden="true" className={cn(TILE, tileClassName)}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
