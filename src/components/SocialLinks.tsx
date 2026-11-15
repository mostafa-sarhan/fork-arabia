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

/* A round 40px button on navy: a soft white hairline, the glyph in white/80. */
const BUTTON =
  'grid size-10 place-items-center rounded-full border border-white/20 text-white/80'

/*
 * Hover and keyboard focus: turquoise fill and border, navy glyph, lifted
 * 2px. The lift is motion-safe only, so reduced motion keeps the colour
 * change alone. The ring is turquoise, offset from the navy footer.
 */
const BUTTON_ON =
  'hover:bg-turquoise hover:border-turquoise hover:text-navy motion-safe:hover:-translate-y-0.5 focus-visible:bg-turquoise focus-visible:border-turquoise focus-visible:text-navy motion-safe:focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

const BUTTON_MOTION =
  'transition-[background-color,border-color,color,translate] duration-(--duration-hover) ease-out-soft'

/**
 * The company's social accounts as a row of round icon links, each opening
 * in a new tab. Drawn for the navy footer; `className` places the row.
 */
export function SocialLinks({ className }: { className?: string }) {
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
              className={cn(BUTTON, BUTTON_ON, BUTTON_MOTION)}
            >
              <Icon size={18} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
