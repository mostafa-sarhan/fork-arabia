import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { NavItem } from '@/lib/navigation'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import { ROUTE_PATHS } from '@/lib/routing/routes'

/**
 * One item of the desktop bar.
 *
 * Every primary item is rendered through this component, including the ones
 * that will later open a panel: when Services grows its nine-sector menu it
 * becomes a second component used in the same slot, and neither the
 * navigation configuration nor the Header's props change.
 *
 * The current item is marked three times over. `aria-current="page"` for
 * assistive technology; navy and a heavier weight for everyone — turquoise
 * on white is 2.69:1, below the 3:1 minimum for a non-text indicator, so it
 * is never allowed to carry the state on its own; and the turquoise bar as
 * decoration on top, which is why it is aria-hidden.
 */
export function HeaderNavLink({
  item,
  isActive,
}: {
  item: NavItem
  isActive: boolean
}) {
  const { t } = useLanguage()

  return (
    <LocalizedLink
      to={ROUTE_PATHS[item.routeId]}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative inline-flex h-10 items-center rounded-md px-3 text-nav transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        isActive
          ? 'font-semibold text-navy'
          : 'font-medium text-ink-muted hover:text-navy',
      )}
    >
      {t(item.labelKey)}
      <span
        aria-hidden="true"
        className={cn(
          /*
           * Grown from the inline-start edge: origin-left in LTR, mirrored
           * by the rtl: variant, which is Tailwind's direction-aware escape
           * hatch for the transform-origin property — it has no logical
           * keyword of its own.
           */
          'absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-turquoise transition-transform duration-300 ease-emphasized rtl:origin-right',
          isActive ? 'scale-x-100' : 'scale-x-0',
        )}
      />
    </LocalizedLink>
  )
}
