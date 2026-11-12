import { useParams } from 'react-router'
import { PlaceholderShell } from '@/components/PagePlaceholder'
import { ICONS } from '@/components/ui/iconRegistry'
import { PATHS } from '@/config/paths'
import { getSectorContent } from '@/data/sectorContent'
import { getSectorBySlug, type SectorEntry } from '@/data/sectorIndex'
import { Copy } from '@/lib/i18n/Copy'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { usePageMeta } from '@/lib/usePageMeta'
import NotFoundPage from '@/pages/not-found/NotFoundPage'

/**
 * One sector, until its real template ships. The slug comes from the URL; an
 * unknown one is not a sector with no content, it is a page that does not
 * exist, so it renders the 404 rather than an empty shell.
 */
export default function SectorPage() {
  const { slug } = useParams()
  const sector = getSectorBySlug(slug)

  if (!sector) {
    return <NotFoundPage />
  }

  return <SectorPlaceholder sector={sector} />
}

function SectorPlaceholder({ sector }: { sector: SectorEntry }) {
  const { t, language } = useLanguage()
  const Icon = ICONS[sector.icon]
  /*
   * The sector's own question, from the content module — which is also what
   * keeps that module in this lazily loaded chunk rather than in the bundle
   * the navbar pulls in.
   */
  const { cta } = getSectorContent(sector.id)

  usePageMeta({ titleKey: 'nav.services', indexable: false })

  return (
    <PlaceholderShell
      lead={<Copy value={cta.title} />}
      crumbs={[
        { label: t('nav.home'), to: PATHS.home },
        { label: t('nav.services'), to: PATHS.services },
        { label: resolveCopy(sector.title, language) },
      ]}
      eyebrow={
        <p className="mt-5 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-navy-soft text-petrol">
            <Icon className="size-5" />
          </span>
          <span
            dir="ltr"
            className="text-overline tracking-latin-wide text-subheading"
          >
            {sector.number}
          </span>
        </p>
      }
      title={<Copy value={sector.title} />}
    />
  )
}
