import type { IconName } from '@/components/ui/iconRegistry'
import { copy, type Localized } from '@/lib/i18n/localized'

/**
* The nine service sectors, as every list of them needs to know them.
*
* This is the index, not the content: identity, order, icon, title and the
* one-line summary — enough for the mega-menu, the mobile sheet, the
* footer and any card grid. The services, calls to action and extra blocks
* live in `sectorContent.ts`, which is loaded only by a sector's own page.
* Splitting them keeps roughly 30 kB of body copy out of the bundle every
* visitor downloads to see the home page.
*
* Arabic is transcribed verbatim from the client's storyboard and English
* from the company profile. Nothing here is paraphrased or translated;
* where the profile had no English, the wording is ours and marked
* proposed — see `docs/copy-review.md`.
*/

export type Sector = {
  readonly id: string
  readonly slug: string
  /** 1–9, the order the client lists them in. */
  readonly order: number
  /** The same order as the two-digit label the design shows. */
  readonly number: string
  readonly icon: IconName
  readonly title: Localized
  readonly summary: Localized
}

export const SECTOR_INDEX = [
  {
    id: 'legalCorporate',
    slug: 'legal-corporate',
    order: 1,
    number: '01',
    icon: 'scale',
    title: copy(
      'الخدمات القانونية وخدمات الشركات',
      'Legal & Corporate Services',
    ),
    summary: copy(
      'التقاضي والتحكيم، والعقود، والملكية الفكرية، والتراخيص، والإدارات القانونية.',
      'Litigation and arbitration, contracts, intellectual property, licensing and legal departments',
    ),
  },
  {
    id: 'businessSetup',
    slug: 'business-setup',
    order: 2,
    number: '02',
    icon: 'foundation',
    title: copy(
      'تأسيس الشركات',
      'Business Setup',
    ),
    summary: copy(
      'تأسيس الشركات وخدمات المستثمرين وإدارة المتطلبات الحكومية.',
      'Company formation, investor services and management of government requirements',
    ),
  },
  {
    id: 'financialAccounting',
    slug: 'financial-accounting',
    order: 3,
    number: '03',
    icon: 'ledger',
    title: copy(
      'الحلول المالية والمحاسبية',
      'Financial & Accounting Solutions',
    ),
    summary: copy(
      'الاستشارات المالية، ومحاسبة الزكاة والضرائب، والقوائم المالية.',
      'Financial advisory – Zakat & tax accounting – Financial statements',
    ),
  },
  {
    id: 'governanceOrganization',
    slug: 'governance-organization',
    order: 4,
    number: '04',
    icon: 'orgChart',
    title: copy(
      'الحوكمة والتنظيم',
      'Governance & Organization',
    ),
    summary: copy(
      'مجالس الإدارة والجمعيات العمومية والبناء التنظيمي والسياسات.',
      'Boards of directors, general assemblies, organizational structuring and policies',
    ),
  },
  {
    id: 'qualityExcellence',
    slug: 'quality-excellence',
    order: 5,
    number: '05',
    icon: 'medal',
    title: copy(
      'الجودة والتميز',
      'Quality & Excellence',
    ),
    summary: copy(
      'الأيزو، والتميز المؤسسي، والاستراتيجية، والمخاطر والاستدامة.',
      'ISO, institutional excellence, strategy, risk and sustainability',
    ),
  },
  {
    id: 'trainingEducation',
    slug: 'training-education',
    order: 6,
    number: '06',
    icon: 'academic',
    title: copy(
      'التدريب والتعليم',
      'Training & Education',
    ),
    summary: copy(
      'برامج متخصصة ورحلات تعليمية تفاعلية في المجالات المالية والمحاسبية.',
      'Specialized programs and interactive learning journeys in finance and accounting',
    ),
  },
  {
    id: 'technologyAi',
    slug: 'technology-ai',
    order: 7,
    number: '07',
    icon: 'chip',
    title: copy(
      'التكنولوجيا والذكاء الاصطناعي',
      'Technology & AI',
    ),
    summary: copy(
      'الأنظمة الذكية، والمحتوى المدعوم بالذكاء الاصطناعي، والدعم التقني.',
      'Smart systems, AI-powered content and technical support',
    ),
  },
  {
    id: 'operationalSupport',
    slug: 'operational-support',
    order: 8,
    number: '08',
    icon: 'supply',
    title: copy(
      'الدعم التشغيلي',
      'Operational Support',
    ),
    summary: copy(
      'المشتريات وسلاسل الإمداد وتوفير الكفاءات المتخصصة.',
      'Procurement, supply chains and provision of specialized talent',
    ),
  },
  {
    id: 'premiumResidency',
    slug: 'premium-residency',
    order: 9,
    number: '09',
    icon: 'passport',
    title: copy(
      'الإقامة المميزة بالسعودية',
      'Premium Residency in Saudi Arabia',
    ),
    summary: copy(
      'إصدار الإقامة المميزة للمستثمرين ورواد الأعمال وملاك العقارات ومتابعتها.',
      'Saudi Premium Residency for investors, entrepreneurs and property owners',
    ),
  },
] as const satisfies ReadonlyArray<Sector>

export type SectorSlug = (typeof SECTOR_INDEX)[number]['slug']
export type SectorId = (typeof SECTOR_INDEX)[number]['id']

/** The literal type of one entry, so a slug stays a `SectorSlug`. */
export type SectorEntry = (typeof SECTOR_INDEX)[number]

const BY_SLUG = new Map<string, SectorEntry>(
  SECTOR_INDEX.map((sector) => [sector.slug, sector]),
)

/** The sector a `/services/:slug` URL names, or undefined for an unknown slug. */
export function getSectorBySlug(slug: string | undefined) {
  return slug ? BY_SLUG.get(slug) : undefined
}

/**
* The sectors either side of this one, for paging through them. The list
* wraps, so the ninth sector's "next" is the first — a dead end at either
* end of a nine-item list is a worse answer than a loop.
*/
export function getAdjacentSectors(slug: SectorSlug) {
  const index = SECTOR_INDEX.findIndex((sector) => sector.slug === slug)

  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  return {
    previous: SECTOR_INDEX[(index - 1 + SECTOR_INDEX.length) % SECTOR_INDEX.length],
    next: SECTOR_INDEX[(index + 1) % SECTOR_INDEX.length],
  }
}

/** Every sector but this one, in order — the "other sectors" rail. */
export function getOtherSectors(slug: SectorSlug) {
  return SECTOR_INDEX.filter((sector) => sector.slug !== slug)
}
