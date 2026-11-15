import { ConsultationCta } from '@/components/sections/ConsultationCta'
import { MethodologySection } from '@/components/sections/MethodologySection'
import { CONSULTATION_INVITE } from '@/config/consultation'
import { getSectorBySlug } from '@/data/sectorIndex'
import { getSectorDetail } from '@/data/sectors'
import type { SectorDetail } from '@/data/sectors/types'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import NotFoundPage from '@/pages/not-found/NotFoundPage'
import { ResidencyBenefits } from './sections/ResidencyBenefits'
import { ResidencyRole } from './sections/ResidencyRole'
import { ResidencyTracks } from './sections/ResidencyTracks'
import { SectorHero } from './sections/SectorHero'
import { SectorOthersSection } from './sections/SectorOthers'
import { SectorServices } from './sections/SectorServices'
import { WhyForkStrip } from './sections/WhyForkStrip'

/**
 * One sector's page; the router gives each sector in config/routes.ts its
 * own route and slug. A slug with no sector renders the 404. Keyed by slug,
 * so moving to another sector starts its filter afresh.
 */
export default function SectorPage({ slug }: { slug: string }) {
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

  return (
    <>
      <SectorHero sector={sector} />

      {hasServices ? <SectorServices sector={sector} /> : null}

      {sector.extras ? (
        <>
          <ResidencyTracks tracks={sector.extras.tracks} disclaimer={sector.extras.disclaimer} />
          <ResidencyRole steps={sector.extras.steps} ctaTitle={ctaTitle} slug={sector.slug} />
          <ResidencyBenefits benefits={sector.extras.benefits} />
        </>
      ) : null}

      <MethodologySection tone="light" />
      <WhyForkStrip />
      <ConsultationCta
        title={ctaTitle}
        text={resolveCopy(CONSULTATION_INVITE, language)}
        sector={sector.slug}
      />
      <SectorOthersSection slug={sector.slug} othersInAside={hasServices} />
    </>
  )
}
