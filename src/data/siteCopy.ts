import { proposed, type Localized } from '@/lib/i18n/localized'

/**
 * Standing copy that is the client's words rather than interface wording.
 *
 * It lives here, beside the sectors, for the same reason they do: the
 * Arabic is transcribed from the storyboard and the English is pending
 * until the company profile is handed over. Interface labels — "Quick
 * links", "Contact us" — stay in the translation table, because those are
 * ours to word.
 */
export const FOOTER_DESCRIPTION: Localized = {
  ar: 'خدمات مهنية متكاملة: قانونية، مالية، إدارية، تقنية. نرافق شركاءنا من الفكرة والتأسيس إلى التشغيل والحوكمة والنمو.',
  /*
   * Both halves are the profile's own words, from its cover line
   * ("Integrated Professional Services / Legal | Financial |
   * Administrative | Technology") and the first line of "Who We Are" —
   * joined the way the Arabic joins them.
   */
  en: 'Integrated professional services: legal, financial, administrative, technology. We accompany our partners from idea and incorporation through operation, governance and growth.',
}

/**
 * The site's own description, for the document head and the social card.
 *
 * index.html carries the Arabic of this string as the default a crawler
 * sees before any script runs; `useDocumentHead` replaces it per language.
 */
export const SITE_DESCRIPTION: Localized = {
  ar: 'فورك العربية شركة خدمات مهنية متكاملة: قانونية، مالية، إدارية، وتقنية في السعودية ومصر والإمارات وعُمان.',
  en: proposed(
    'FORK ARABIA is an integrated professional services firm — legal, financial, administrative and technology — in Saudi Arabia, Egypt, the UAE and Oman.',
  ),
}

/** The five sectors the storyboard puts in the footer, in its order. */
export const FOOTER_FEATURED_SECTOR_IDS = [
  'legalCorporate',
  'businessSetup',
  'financialAccounting',
  'qualityExcellence',
  'premiumResidency',
] as const
