import {
  BrandLockup,
  type BrandLockupSize,
  type BrandLockupTone,
} from '@/components/brand/BrandLockup'
import { cn } from '@/lib/cn'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import { ROUTE_PATHS } from '@/lib/routing/routes'

export type LogoProps = {
  className?: string
  /** `white` for dark surfaces such as the footer. */
  tone?: BrandLockupTone
  /** Where this logo stands; see `BrandLockupSize`. */
  size?: BrandLockupSize
}

/**
 * The logo, wrapped in the link home.
 *
 * The lockup names itself, so the link takes its accessible name from its
 * content rather than from an aria-label — which also keeps the name and
 * the artwork from drifting apart.
 */
export function Logo({ className, tone = 'brand', size = 'header' }: LogoProps) {
  return (
    <LocalizedLink
      to={ROUTE_PATHS.home}
      className={cn(
        'inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2',
        tone === 'white' &&
          'focus-visible:ring-turquoise focus-visible:ring-offset-navy',
        className,
      )}
    >
      <BrandLockup tone={tone} size={size} />
    </LocalizedLink>
  )
}
