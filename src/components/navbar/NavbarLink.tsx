import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { NavItem } from '@/lib/navigation'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import { ROUTE_PATHS } from '@/lib/routing/routes'

/**
 * One item of the desktop bar.
 *
 * The current item is marked three times over: `aria-current="page"` for
 * assistive technology, navy and a heavier weight for everyone — turquoise
 * on white is 2.69:1, under the 3:1 a non-text indicator needs — and the
 * turquoise bar as decoration on top, which is why it is aria-hidden.
 */
export function NavbarLink({
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
      {/*
        Grown from the inline-start edge. `origin-left` has no logical
        keyword, so the rtl: variant mirrors it.
      */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-turquoise transition-transform duration-300 ease-emphasized rtl:origin-right',
          isActive ? 'scale-x-100' : 'scale-x-0',
        )}
      />
    </LocalizedLink>
  )
}
