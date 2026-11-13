import type { SectorSlug } from '@/data/sectorIndex'
import businessSetup from './business-setup'
import financialAccounting from './financial-accounting'
import governanceOrganization from './governance-organization'
import legalCorporate from './legal-corporate'
import operationalSupport from './operational-support'
import premiumResidency from './premium-residency'
import qualityExcellence from './quality-excellence'
import technologyAi from './technology-ai'
import trainingEducation from './training-education'
import type { SectorDetail } from './types'

/*
 * Every sector page's data, by slug. Only the sector page imports this
 * module, and that page is loaded on demand, so none of this body copy is
 * in the bundle the home page, the navbar or the footer download — they
 * read the light `src/data/sectorIndex.ts` instead.
 */
const SECTOR_DETAILS: Record<SectorSlug, SectorDetail> = {
  'legal-corporate': legalCorporate,
  'business-setup': businessSetup,
  'financial-accounting': financialAccounting,
  'governance-organization': governanceOrganization,
  'quality-excellence': qualityExcellence,
  'training-education': trainingEducation,
  'technology-ai': technologyAi,
  'operational-support': operationalSupport,
  'premium-residency': premiumResidency,
}

export function getSectorDetail(slug: SectorSlug): SectorDetail {
  return SECTOR_DETAILS[slug]
}
