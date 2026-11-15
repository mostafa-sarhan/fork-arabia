import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/icons/brandIcons'
import { SOCIAL_NETWORKS, type SocialNetwork } from '@/config/social'
import { cn } from '@/lib/cn'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/* Each network's glyph, by its id in config/social.ts. */
const ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
} satisfies Record<SocialNetwork['id'], unknown>

/* A round 40px button. */
const BUTTON = 'grid size-10 place-items-center rounded-full border'

/*
 * At rest, per background: on navy a soft white hairline and the glyph in
 * white/80; on a light surface a grey hairline and a petrol glyph.
 */
const TONES = {
  dark: 'border-white/20 text-white/80 focus-visible:ring-offset-navy',
  light: 'border-line-strong bg-surface text-petrol focus-visible:ring-offset-surface',
}

/*
 * Hover and keyboard focus, on either tone: turquoise fill and border,
 * navy glyph, lifted 2px. The lift is motion-safe only, so reduced motion
 * keeps the colour change alone. The ring is turquoise, offset from the
 * background (TONES).
 */
const BUTTON_ON =
  'hover:bg-turquoise hover:border-turquoise hover:text-navy motion-safe:hover:-translate-y-0.5 focus-visible:bg-turquoise focus-visible:border-turquoise focus-visible:text-navy motion-safe:focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2'

const BUTTON_MOTION =
  'transition-[background-color,border-color,color,translate] duration-(--duration-hover) ease-out-soft'

/**
 * The company's social accounts as a row of round icon links, each opening
 * in a new tab. `tone` is the background it sits on: the navy footer
 * (dark, the default) or a white card (light). `className` places the row.
 */
export function SocialLinks({ tone = 'dark', className }: { tone?: keyof typeof TONES; className?: string }) {
  const { language } = useLanguage()

  return (
    <ul className={cn('flex flex-wrap items-center gap-3', className)}>
      {SOCIAL_NETWORKS.map((network) => {
        const Icon = ICONS[network.id]

        return (
          <li key={network.id}>
            <a
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={resolveCopy(network.label, language)}
              className={cn(BUTTON, TONES[tone], BUTTON_ON, BUTTON_MOTION)}
            >
              <Icon size={18} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
