import { cn } from '@/lib/cn'
import { ArrowRightIcon } from './icons'

/**
 * The arrow after a link or button label. It points along the reading
 * direction and nudges 4px further that way while its link or button is
 * hovered or focused (`link-arrow` in index.css).
 */
export function LinkArrow({ className }: { className?: string }) {
  return <ArrowRightIcon className={cn('link-arrow rtl:-scale-x-100', className)} />
}
