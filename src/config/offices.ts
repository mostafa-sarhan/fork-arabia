import { SITE_CONTACT, type ContactChannel } from '@/config/contact'
import type { CountryCode } from '@/data/sectors/countries'
import type { Language } from '@/lib/i18n/languageConfig'
import { draft, proposed, type Localized } from '@/lib/i18n/localized'

/**
 * The company's two offices, head office first. The home page's presence
 * card reads the label and city; the Presence page reads everything.
 *
 * The Arabic is the storyboard's (Presence page). Where the profile has
 * no English, `draft` marks English written here and `proposed` wording
 * written here in both languages; all are listed in docs/copy-review.md.
 */

/** A phone line: as it is read, and as it is dialled. */
export type OfficePhone = {
  readonly display: string
  readonly href: string
}

export type Office = {
  readonly id: 'riyadh' | 'tanta'
  readonly kind: 'headquarters' | 'branch'
  readonly country: CountryCode
  /** "Head office" / "Branch", as the badges and tags say it. */
  readonly label: Localized
  /** The city alone: "الرياض". */
  readonly name: Localized
  /** City and country, short, for the home page card: "الرياض، السعودية". */
  readonly city: Localized
  /** City and country in full, for the Presence page: "الرياض، المملكة العربية السعودية". */
  readonly location: Localized
  readonly address: Localized
  /** The address in one short line, for the contact page. */
  readonly shortAddress: Localized
  readonly phones: readonly OfficePhone[]
  /** The office on Google Maps, to open in a new tab. */
  readonly mapUrl: string
  /** The embeddable map, in Arabic; `mapEmbedSrc()` localizes it. */
  readonly mapEmbed: string
  /** The map frame's accessible title. */
  readonly mapTitle: Localized
}

/** A line already listed in config/contact.ts, so no number is written twice. */
function contactPhone(id: ContactChannel['id']): OfficePhone {
  const channel = SITE_CONTACT.find((item) => item.id === id)

  if (!channel) {
    throw new Error(`Unknown contact channel: ${id}`)
  }

  return { display: channel.display, href: channel.href }
}

export const OFFICES = [
  {
    id: 'riyadh',
    kind: 'headquarters',
    country: 'sa',
    label: draft('المقر الرئيسي', 'Head Office'),
    name: draft('الرياض', 'Riyadh'),
    city: draft('الرياض، السعودية', 'Riyadh, Saudi Arabia'),
    location: draft('الرياض، المملكة العربية السعودية', 'Riyadh, Kingdom of Saudi Arabia'),
    address: draft(
      'الرياض، المربع، حي الوشام، برج الوشم، مبنى أوقاف الراجحي، المدخل التجاري للشركات، شركة فورك العربية، مكتب 110',
      'Office 110, FORK ARABIA, Corporate Business Entrance, Al Rajhi Awqaf Building, Al Washm Tower, Al Wisham District, Al Murabba, Riyadh',
    ),
    shortAddress: draft(
      'المربع، حي الوشام، برج الوشم، مبنى أوقاف الراجحي، مكتب 110',
      'Office 110, Al Rajhi Awqaf Building, Al Washm Tower, Al Wisham, Al Murabba',
    ),
    phones: [contactPhone('riyadh'), { display: '+966 50 195 1017', href: 'tel:+966501951017' }],
    mapUrl: 'https://maps.app.goo.gl/hVCk5aJ1frFbZuiy6',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.3238083681126!2d46.7023185!3d24.6469802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f05866980f8bb%3A0x30b4d35e73b1f496!2sFORK%20BUSINESS%20Arabia%20ltd!5e0!3m2!1sar!2seg!4v1794726087038!5m2!1sar!2seg',
    mapTitle: proposed('خريطة مقر الرياض', 'Map of the Riyadh head office'),
  },
  {
    id: 'tanta',
    kind: 'branch',
    country: 'eg',
    label: draft('فرع', 'Branch'),
    name: draft('طنطا', 'Tanta'),
    city: draft('طنطا، مصر', 'Tanta, Egypt'),
    location: draft('طنطا، جمهورية مصر العربية', 'Tanta, Arab Republic of Egypt'),
    address: draft(
      'ميدان المحطة، أبراج عبد المنعم رياض، برج A، الدور الحادي عشر (أعلى هيئة قضايا الدولة)، طنطا، الغربية',
      '11th Floor, Tower A, Abdel Moneim Riad Towers (above the State Lawsuits Authority), Station Square, Tanta, Gharbia',
    ),
    shortAddress: draft(
      'ميدان المحطة، أبراج عبد المنعم رياض، برج A، الدور 11',
      '11th Floor, Tower A, Abdel Moneim Riad Towers, Station Square',
    ),
    phones: [contactPhone('tanta'), { display: '+20 155 990 0523', href: 'tel:+201559900523' }],
    mapUrl: 'https://maps.app.goo.gl/VUsii9iMvnivJg256',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3427.669291273134!2d30.995142984866806!3d30.783859981619276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDQ3JzAxLjkiTiAzMMKwNTknMzQuNiJF!5e0!3m2!1sar!2seg!4v1794726113705!5m2!1sar!2seg',
    mapTitle: proposed('خريطة فرع طنطا', 'Map of the Tanta branch'),
  },
] as const satisfies ReadonlyArray<Office>

/**
 * A place the company serves by phone without an office there. Listed on
 * the contact page beside the offices; not an office, so the Presence
 * page's office cards never read it.
 */
export type ServiceContact = {
  readonly id: 'uae'
  /** The place, as the contact page names it. */
  readonly name: Localized
  /** What is offered there, in one short line. */
  readonly note: Localized
  readonly phones: readonly OfficePhone[]
}

export const SERVICE_CONTACTS = [
  {
    id: 'uae',
    name: draft('الإمارات', 'United Arab Emirates'),
    note: draft('خدمات في دبي والشارقة وأبوظبي', 'Services in Dubai, Sharjah and Abu Dhabi'),
    phones: [{ display: '+971 52 225 5402', href: 'tel:+971522255402' }],
  },
] as const satisfies ReadonlyArray<ServiceContact>

export type OfficeId = (typeof OFFICES)[number]['id']

export function getOffice(id: OfficeId) {
  return OFFICES.find((office) => office.id === id)
}

/**
 * An office's embedded map in the page's language. The embed URL names its
 * interface language in `!1s<code>` segments; the stored one is Arabic, so
 * English swaps every one of them.
 */
export function mapEmbedSrc(office: Office, language: Language) {
  return office.mapEmbed.replaceAll('!1sar', `!1s${language}`)
}
