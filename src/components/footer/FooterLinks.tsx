import { FooterColumn, footerLink } from '@/components/footer/FooterColumn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { FOOTER_NAV } from '@/lib/navigation'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import { ROUTE_PATHS } from '@/lib/routing/routes'

/** The quick links column, from the navigation configuration. */
export function FooterLinks() {
  const { t } = useLanguage()

  return (
    <FooterColumn title={t('footer.quickLinks')}>
      <ul className="flex flex-col gap-2.5 text-body-sm">
        {FOOTER_NAV.map((item) => (
          <li key={item.routeId}>
            <LocalizedLink to={ROUTE_PATHS[item.routeId]} className={footerLink}>
              {t(item.labelKey)}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </FooterColumn>
  )
}
