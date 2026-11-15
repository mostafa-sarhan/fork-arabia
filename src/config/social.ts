import { copy, type Localized } from '@/lib/i18n/localized'

/**
 * The company's social accounts, in the order the footer shows them.
 *
 * `label` is the link's accessible name — the icon alone says nothing to
 * a screen reader — worded "FORK ARABIA on <network>" in both languages.
 */
export type SocialNetwork = {
  readonly id: 'facebook' | 'instagram' | 'tiktok'
  readonly url: string
  readonly label: Localized
}

export const SOCIAL_NETWORKS = [
  {
    id: 'facebook',
    url: 'https://www.facebook.com/ForkBusiness',
    label: copy('فورك العربية على فيسبوك', 'FORK ARABIA on Facebook'),
  },
  {
    id: 'instagram',
    url: 'https://www.instagram.com/fork.business',
    label: copy('فورك العربية على إنستغرام', 'FORK ARABIA on Instagram'),
  },
  {
    id: 'tiktok',
    url: 'https://www.tiktok.com/@forkbusiness',
    label: copy('فورك العربية على تيك توك', 'FORK ARABIA on TikTok'),
  },
] as const satisfies ReadonlyArray<SocialNetwork>
