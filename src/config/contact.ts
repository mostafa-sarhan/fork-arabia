import type { TranslationKey } from '@/lib/i18n/translations'

/**
 * The company's published contact points.
 *
 * They are configuration, not copy: the same number appears in the mobile
 * menu, the future footer and the contact page, and a number that is right
 * in two places out of three is worse than no number. The display form and
 * the link form are stated together so they cannot drift apart.
 *
 * Every display value is Latin-digit text that will sit inside Arabic
 * paragraphs, so each is rendered with dir="ltr" — without it the leading
 * `+` is reordered to the wrong end of the number.
 */
export type ContactChannel = {
  readonly id: 'riyadh' | 'tanta' | 'whatsapp' | 'email'
  readonly labelKey: TranslationKey
  /** Exactly as it should be read by a human. */
  readonly display: string
  /** tel:, https://wa.me/ or mailto:. */
  readonly href: string
  /** Whether following it leaves the site. */
  readonly external: boolean
}

export const SITE_CONTACT = [
  {
    id: 'riyadh',
    labelKey: 'contact.riyadh',
    display: '+966 55 008 7404',
    href: 'tel:+966550087404',
    external: false,
  },
  {
    id: 'tanta',
    labelKey: 'contact.tanta',
    display: '+20 100 445 1996',
    href: 'tel:+201004451996',
    external: false,
  },
  {
    id: 'whatsapp',
    labelKey: 'contact.whatsapp',
    display: '+966 50 094 1484',
    href: 'https://wa.me/966500941484',
    external: true,
  },
  {
    id: 'email',
    labelKey: 'contact.email',
    display: 'info@forkarabia.sa',
    href: 'mailto:info@forkarabia.sa',
    external: false,
  },
] as const satisfies ReadonlyArray<ContactChannel>

export type SocialNetwork = {
  readonly id: 'instagram' | 'facebook' | 'tiktok'
  /** A brand name, the same in both languages. */
  readonly label: string
  /**
   * The client has not supplied these yet. An empty string is the "not
   * known" state on purpose: it is required, so the field cannot be
   * forgotten, and `publishedSocials()` hides any link that still has one
   * rather than publishing a dead href.
   */
  readonly url: string
}

export const SOCIAL_NETWORKS = [
  { id: 'instagram', label: 'Instagram', url: '' },
  { id: 'facebook', label: 'Facebook', url: '' },
  { id: 'tiktok', label: 'TikTok', url: '' },
] as const satisfies ReadonlyArray<SocialNetwork>

/** Only the networks whose address is known. */
export function publishedSocials(): readonly SocialNetwork[] {
  return SOCIAL_NETWORKS.filter((network) => network.url !== '')
}
