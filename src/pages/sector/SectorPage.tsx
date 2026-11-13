import { useParams } from 'react-router'
import { MethodologySection } from '@/components/sections/MethodologySection'
import { getSectorBySlug } from '@/data/sectorIndex'
import { getSectorDetail } from '@/data/sectors'
import type { SectorDetail } from '@/data/sectors/types'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { usePageMeta } from '@/lib/usePageMeta'
import NotFoundPage from '@/pages/not-found/NotFoundPage'
import { ResidencyBenefits } from './sections/ResidencyBenefits'
import { ResidencyRole } from './sections/ResidencyRole'
import { ResidencyTracks } from './sections/ResidencyTracks'
import { SectorConsultation } from './sections/SectorConsultation'
import { SectorHero } from './sections/SectorHero'
import { SectorOthersSection } from './sections/SectorOthers'
import { SectorServices } from './sections/SectorServices'
import { WhyForkStrip } from './sections/WhyForkStrip'

/**
 * One sector's page, for every `/services/:slug`. An unknown slug is not a
 * sector with no content, it is a page that does not exist, so it renders
 * the 404. Keyed by slug, so moving to another sector starts its filter
 * afresh.
 */
export default function SectorPage() {
  const { slug } = useParams()
  const sector = getSectorBySlug(slug)

  if (!sector) {
    return <NotFoundPage />
  }

  return <SectorSections key={sector.slug} sector={getSectorDetail(sector.slug)} />
}

/**
 * The page, top to bottom: hero, services (or, for premium residency, its
 * tracks, our role and its benefits), how we work, why FORK, the
 * consultation card, and the other sectors (below 1024, or always where
 * there is no services aside to carry them).
 */
function SectorSections({ sector }: { sector: SectorDetail }) {
  const { language } = useLanguage()
  const ctaTitle = resolveCopy(sector.ctaTitle, language)
  const hasServices = sector.services.length > 0

  usePageMeta({
    title: resolveCopy(sector.title, language),
    description: resolveCopy(sector.summary, language),
    indexable: true,
  })

  return (
    <>
      <SectorHero sector={sector} />

      {hasServices ? <SectorServices sector={sector} /> : null}

      {sector.extras ? (
        <>
          <ResidencyTracks tracks={sector.extras.tracks} disclaimer={sector.extras.disclaimer} />
          <ResidencyRole steps={sector.extras.steps} ctaTitle={ctaTitle} />
          <ResidencyBenefits benefits={sector.extras.benefits} />
        </>
      ) : null}

      <MethodologySection tone="light" />
      <WhyForkStrip />
      <SectorConsultation title={ctaTitle} />
      <SectorOthersSection slug={sector.slug} othersInAside={hasServices} />
    </>
  )
}
