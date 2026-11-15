import type { ContactChannel } from '@/config/contact'
import { draft, type Localized } from '@/lib/i18n/localized'

/**
 * The company's two offices, head office first. The home page's presence
 * card reads the label and city; the full address and map link are for
 * the Presence page.
 *
 * The Arabic addresses are the client's. Their English, and the labels'
 * and cities' English, were written here: `draft` lists them in
 * docs/copy-review.md.
 */
export type Office = {
  readonly id: 'riyadh' | 'tanta'
  readonly kind: 'headquarters' | 'branch'
  /** "Head office" / "Branch", as the presence card tags it. */
  readonly label: Localized
  readonly city: Localized
  readonly address: Localized
  /** The office on Google Maps. */
  readonly mapUrl: string
  /** Its phone line in config/contact.ts, so no number is written twice. */
  readonly phone: ContactChannel['id']
}

export const OFFICES = [
  {
    id: 'riyadh',
    kind: 'headquarters',
    label: draft('المقر الرئيسي', 'Head Office'),
    city: draft('الرياض، السعودية', 'Riyadh, Saudi Arabia'),
    address: draft(
      'الرياض، المربع، حي الوشام، برج الوشم، مبنى أوقاف الراجحي، المدخل التجاري للشركات، شركة فورك العربية، مكتب 110',
      'Office 110, FORK ARABIA, Corporate Business Entrance, Al Rajhi Awqaf Building, Al Washm Tower, Al Wisham District, Al Murabba, Riyadh',
    ),
    mapUrl: 'https://maps.app.goo.gl/hVCk5aJ1frFbZuiy6',
    phone: 'riyadh',
  },
  {
    id: 'tanta',
    kind: 'branch',
    label: draft('فرع', 'Branch'),
    city: draft('طنطا، مصر', 'Tanta, Egypt'),
    address: draft(
      'ميدان المحطة، أبراج عبد المنعم رياض، برج A، الدور الحادي عشر (أعلى هيئة قضايا الدولة)، طنطا، الغربية',
      '11th Floor, Tower A, Abdel Moneim Riad Towers (above the State Lawsuits Authority), Station Square, Tanta, Gharbia',
    ),
    mapUrl: 'https://maps.app.goo.gl/VUsii9iMvnivJg256',
    phone: 'tanta',
  },
] as const satisfies ReadonlyArray<Office>
