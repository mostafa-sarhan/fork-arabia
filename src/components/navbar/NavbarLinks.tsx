import { useLocation } from 'react-router'
import { NavbarLink } from '@/components/navbar/NavbarLink'
import { ServicesMenuTrigger } from '@/components/navbar/ServicesMenu'
import type { ServicesMenuState } from '@/components/navbar/useServicesMenu'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { PRIMARY_NAV } from '@/lib/navigation'
import { isRouteActive } from '@/lib/routing/routes'

/**
 * The primary links of the desktop bar.
 *
 * Services is one entry in the navigation configuration like any other;
 * only the component rendered in its slot differs, because it carries the
 * sector panel behind it.
 */
export function NavbarLinks({ menu }: { menu: ServicesMenuState }) {
  const { t } = useLanguage()
  const location = useLocation()

  return (
    <nav aria-label={t('nav.primary')} className="hidden min-w-0 xl:block">
      <ul className="flex items-center gap-1">
        {PRIMARY_NAV.map((item) => (
          <li key={item.routeId}>
            {item.routeId === 'services' ? (
              <ServicesMenuTrigger menu={menu} />
            ) : (
              <NavbarLink
                item={item}
                isActive={isRouteActive(location.pathname, item.routeId)}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
