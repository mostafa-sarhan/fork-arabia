import { SITE_URL } from '@/lib/site'

/**
 * The company's own name, in both languages, in the order the logo lockup
 * sets them.
 *
 * It is a constant rather than a translation: a legal name does not change
 * with the interface language, and putting it in the translation table
 * would invite someone to "translate" one half of it.
 */
export const BRAND_FULL_NAME = 'FORK ARABIA LIMITED — فورك العربية المحدودة'

/** The bare host, for printing the address. `SITE_URL` is the link itself. */
export const BRAND_DOMAIN = new URL(SITE_URL).host
