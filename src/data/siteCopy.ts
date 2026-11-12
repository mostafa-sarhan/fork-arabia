import { draft, type Localized } from '@/lib/i18n/localized'

/*
 * Standing copy that is the client's words rather than interface wording.
 * Interface labels — "Quick links", "Contact us" — stay in the translation
 * table, because those are ours to word.
 */

/**
 * The site's own description, for the document head and the social card.
 *
 * index.html carries the Arabic of this string as the default a crawler
 * sees before any script runs; `usePageMeta` replaces it per language.
 */
export const SITE_DESCRIPTION: Localized = draft(
  'فورك العربية شركة خدمات مهنية متكاملة: قانونية، مالية، إدارية، وتقنية في السعودية ومصر والإمارات وعُمان.',
  'FORK ARABIA is an integrated professional services firm — legal, financial, administrative and technology — in Saudi Arabia, Egypt, the UAE and Oman.',
)
