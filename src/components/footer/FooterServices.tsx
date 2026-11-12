import { FooterColumn, footerLink } from '@/components/footer/FooterColumn'
import { getSectorById } from '@/data/sectorIndex'
import { FOOTER_FEATURED_SECTOR_IDS } from '@/data/siteCopy'
import { Copy } from '@/lib/i18n/Copy'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import { sectorPath } from '@/lib/routing/routes'

/**
 * The featured services column. The five sectors are named in the site copy;
 * their titles and slugs come from the sectors data by id.
 */
export function FooterServices() {
  const { t } = useLanguage()

  return (
    <FooterColumn title={t('footer.featured')}>
      <ul className="flex flex-col gap-2.5 text-body-sm">
        {FOOTER_FEATURED_SECTOR_IDS.map((id) => {
          const sector = getSectorById(id)

          if (!sector) {
            return null
          }

          return (
            <li key={id}>
              <LocalizedLink to={sectorPath(sector.slug)} className={footerLink}>
                <Copy value={sector.title} />
              </LocalizedLink>
            </li>
          )
        })}
      </ul>
    </FooterColumn>
  )
}
