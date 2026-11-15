import { IconRow } from '@/components/IconRow'
import { ChatIcon, MailIcon, PhoneIcon, type IconProps } from '@/components/ui/icons'
import { SITE_CONTACT, type ContactChannel } from '@/config/contact'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { ReactNode } from 'react'

/* Each channel's icon, as in the footer. */
const ICONS: Record<ContactChannel['id'], (props: IconProps) => ReactNode> = {
  riyadh: PhoneIcon,
  tanta: PhoneIcon,
  whatsapp: ChatIcon,
  email: MailIcon,
}

/* A white card, as the booking page's details; tighter on phones, above the form. */
const CARD = 'rounded-2xl border border-line bg-surface p-5 md:p-6 lg:p-8'
const HEADING = 'text-h4 font-extrabold text-heading'

/* One column on phones, two from 640, one again in the desktop aside. */
const LIST = 'mt-4 lg:mt-6 grid gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-y-5'

const TILE = 'rounded-lg bg-turquoise-soft text-petrol'
const LABEL = 'text-body-sm text-ink-muted'

/* The number or address: a link, read left to right inside Arabic. */
const VALUE =
  'inline-block rounded-sm text-body-sm md:text-body font-bold text-heading hover:text-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2'

/** The quote page's aside: the company's phones, WhatsApp and email, from config/contact.ts. */
export function QuoteContact() {
  const { t } = useLanguage()

  return (
    <div className={CARD}>
      <h2 className={HEADING}>{t('nav.contact')}</h2>

      <ul className={LIST}>
        {SITE_CONTACT.map((channel) => {
          const Icon = ICONS[channel.id]

          return (
            <li key={channel.id}>
              <IconRow icon={<Icon size={20} />} tileClassName={TILE}>
                <p className={LABEL}>{t(channel.labelKey)}</p>
                <a
                  href={channel.href}
                  dir="ltr"
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={VALUE}
                >
                  {channel.display}
                </a>
              </IconRow>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
