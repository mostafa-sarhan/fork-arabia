import { copy, draft, type Localized } from '@/lib/i18n/localized'

/*
 * Every word the home page's hero and statistics show.
 *
 * Arabic is transcribed from the client's storyboard and English from the
 * company profile. Where the profile had no equivalent the English is ours
 * and marked with `draft`, which lists it in `docs/copy-review.md` for the
 * client to approve. The button labels are not here: "Book a consultation"
 * and "Request a quote" are interface wording the navbar and footer already
 * share, so they stay in the translation table.
 */

/** The separator inside the hero heading. HomeHero draws each one turquoise. */
export const HERO_TITLE_SEPARATOR = ' · '

export const HOME_HERO = {
  /** The badge above the heading, from the profile's cover line. */
  badge: copy('خدمات مهنية متكاملة', 'Integrated Professional Services'),

  /** The H1. Both halves are the profile's cover words. */
  title: copy(
    'قانونية · مالية · إدارية · تقنية',
    'Legal · Financial · Administrative · Technology',
  ),

  /*
   * The lead paragraph. The English opens with the profile's own sentence
   * from "Who We Are"; only the closing clause naming the markets is ours,
   * which is why the whole string is marked for review.
   */
  lead: draft(
    'نرافق شركاءنا من الفكرة والتأسيس إلى التشغيل والحوكمة والنمو، في مصر والسعودية والإمارات وعُمان وأسواق أخرى.',
    'We accompany our partners from idea and incorporation through operation, governance and growth — in Egypt, Saudi Arabia, the UAE, Oman and other markets.',
  ),

  /** The line under the buttons, beside a location icon. */
  trust: draft(
    'مقر رئيسي في الرياض، وفرع في طنطا، وخدمات في 8 دول.',
    'Head office in Riyadh, a branch in Tanta, and services across 8 countries.',
  ),
} as const

/** The hero photograph: its alt text, and the placeholder's wording. */
export const HOME_HERO_IMAGE = {
  alt: draft(
    'فريق فورك العربية في اجتماع عمل بمكتب الرياض',
    'The FORK ARABIA team in a business meeting at the Riyadh office',
  ),
  label: draft(
    'صورة رئيسية: فريق العمل أو المكتب',
    'Main image: the team or the office',
  ),
  caption: draft(
    'صورة مؤقتة مرخّصة لحد ما تتوفر صور الشركة',
    'A licensed placeholder until the company photographs are available',
  ),
} as const

/** The white card over the hero image: two lines beside a shield icon. */
export const HOME_HERO_CARD = {
  title: draft('شريك مهني واحد منذ 2016', 'One professional partner since 2016'),
  subtitle: draft(
    'من الاستشارة للتنفيذ للمتابعة',
    'From consultation to implementation and follow-up',
  ),
} as const

export type HomeStat = {
  readonly id: string
  readonly value: number
  /** Whether the number carries a turquoise "+" on the single card. */
  readonly plus: boolean
  readonly label: Localized
}

/** The four numbers the storyboard puts under the hero, in its order. */
export const HOME_STATS = [
  {
    id: 'years',
    value: 10,
    plus: true,
    label: draft('سنوات خبرة', 'Years of experience'),
  },
  {
    id: 'clients',
    value: 2000,
    plus: true,
    label: draft('عميل', 'Clients'),
  },
  {
    id: 'projects',
    value: 3000,
    plus: true,
    label: draft('مشروع', 'Projects'),
  },
  {
    id: 'countries',
    value: 8,
    plus: false,
    label: draft('دول', 'Countries'),
  },
] as const satisfies ReadonlyArray<HomeStat>
