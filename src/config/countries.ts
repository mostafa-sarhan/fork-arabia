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
}

export const SERVED_COUNTRIES: readonly ServedCountry[] = [
  { id: 'sa', name: COUNTRIES.sa.name, office: 'riyadh' },
  { id: 'eg', name: COUNTRIES.eg.name, office: 'tanta' },
  {
    id: 'ae',
    name: COUNTRIES.ae.name,
    cities: copy('دبي، الشارقة، أبوظبي', 'Dubai, Sharjah and Abu Dhabi'),
  },
  { id: 'om', name: COUNTRIES.om.name },
  { id: 'jo', name: draft('الأردن', 'Jordan') },
  { id: 'gb', name: copy('المملكة المتحدة', 'United Kingdom') },
  { id: 'us', name: draft('الولايات المتحدة', 'United States') },
  { id: 'za', name: draft('جنوب أفريقيا', 'South Africa') },
]
