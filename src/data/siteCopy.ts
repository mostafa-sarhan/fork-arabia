import { copy, type Localized } from '@/lib/i18n/localized'

/*
 * Standing copy that is the client's words rather than interface wording.
 * Interface labels — "Quick links", "Contact us" — stay in the translation
 * table, because those are ours to word.
 *
 * Both halves below are the profile's own words, from its cover line
 * ("Integrated Professional Services / Legal | Financial | Administrative |
 * Technology") and the first line of "Who We Are".
 */
export const FOOTER_DESCRIPTION: Localized = copy(
  'خدمات مهنية متكاملة: قانونية، مالية، إدارية، تقنية. نرافق شركاءنا من الفكرة والتأسيس إلى التشغيل والحوكمة والنمو.',
  'Integrated professional services: legal, financial, administrative, technology. We accompany our partners from idea and incorporation through operation, governance and growth.',
)

/**
 * The company in one sentence: the home page's description in search
 * results and link previews, the default for any page without its own,
 * and the app manifest's description (written in at build time by
 * scripts/prerender.mjs). The one place to change how the company's
 * fields are named («تقنية» awaits the client's confirmation).
 */
export const COMPANY_DESCRIPTION: Localized = copy(
  'فورك العربية المحدودة شركة خدمات مهنية متكاملة: قانونية، مالية، إدارية، وتقنية. نرافق الشركات والمستثمرين في السعودية ومصر والإمارات وعُمان منذ 2016.',
  'FORK ARABIA is an integrated professional services firm — legal, financial, administrative and technology — in Saudi Arabia, Egypt, the UAE and Oman.',
)

/** The five sectors the storyboard puts in the footer, in its order. */
export const FOOTER_FEATURED_SECTOR_IDS = [
  'legalCorporate',
  'businessSetup',
  'financialAccounting',
  'qualityExcellence',
  'premiumResidency',
] as const
