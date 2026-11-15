import type { OfficeId } from '@/config/offices'
import { COUNTRIES } from '@/data/sectors/countries'
import { copy, draft, type Localized } from '@/lib/i18n/localized'

/**
 * The eight countries the company serves, in the storyboard's order. The
 * home page's presence section and the Presence page both read this list,
 * and "8 countries" anywhere is its length.
 *
 * The four that sub-services name reuse their entry in the sectors'
 * country list; the rest are written here. `draft` marks English written
 * here, listed in docs/copy-review.md.
 */
export type ServedCountry = {
  readonly id: string
  readonly name: Localized
  /** The office it holds, if any. */
  readonly office?: OfficeId
  /** The cities served there, where the storyboard names them. */
  readonly cities?: Localized
  /** The international dialling code, as the phone field's prefix shows it. */
  readonly dialCode: string
}

export const SERVED_COUNTRIES: readonly ServedCountry[] = [
  { id: 'sa', name: COUNTRIES.sa.name, office: 'riyadh', dialCode: '+966' },
  { id: 'eg', name: COUNTRIES.eg.name, office: 'tanta', dialCode: '+20' },
  {
    id: 'ae',
    name: COUNTRIES.ae.name,
    cities: copy('دبي، الشارقة، أبوظبي', 'Dubai, Sharjah and Abu Dhabi'),
    dialCode: '+971',
  },
  { id: 'om', name: COUNTRIES.om.name, dialCode: '+968' },
  { id: 'jo', name: draft('الأردن', 'Jordan'), dialCode: '+962' },
  { id: 'gb', name: copy('المملكة المتحدة', 'United Kingdom'), dialCode: '+44' },
  { id: 'us', name: draft('الولايات المتحدة', 'United States'), dialCode: '+1' },
  { id: 'za', name: draft('جنوب أفريقيا', 'South Africa'), dialCode: '+27' },
]
