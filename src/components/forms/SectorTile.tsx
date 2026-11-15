import { ICONS, type IconName } from '@/components/ui/iconRegistry'
import { cn } from '@/lib/cn'

/* A sector's icon on a soft turquoise tile; white on a highlighted row. */
const TILE = 'grid shrink-0 place-items-center rounded-lg bg-turquoise-soft text-petrol group-data-active:bg-surface'
const SIZES = { md: 'size-8', sm: 'size-6' }

/** A sector's icon tile, in dropdown options (md) and group headings (sm). */
export function SectorTile({ icon, size = 'md' }: { icon: IconName; size?: keyof typeof SIZES }) {
  const Icon = ICONS[icon]
  return (
    <span aria-hidden="true" className={cn(TILE, SIZES[size])}>
      <Icon size={size === 'md' ? 16 : 14} />
    </span>
  )
}
