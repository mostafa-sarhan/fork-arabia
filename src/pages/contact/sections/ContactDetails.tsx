import { Fragment, type ReactNode } from 'react'
import { WhatsAppButton } from '@/components/forms/WhatsAppButton'
import { IconRow } from '@/components/IconRow'
import { LocalizedLink } from '@/components/LocalizedLink'
import { SocialLinks } from '@/components/SocialLinks'
import { GlobeIcon, MailIcon, PinIcon } from '@/components/ui/icons'
import { SITE_CONTACT } from '@/config/contact'
import { OFFICES, SERVICE_CONTACTS, type OfficePhone } from '@/config/offices'
import { PATHS } from '@/config/paths'
import { copy, localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/* The aside's own words: the storyboard's contact page (English written here, `draft`). */
const COPY = {
  enquiries: copy('للاستفسارات والطلبات', 'Enquiries and requests'),
}

/* The enquiries address, from config/contact.ts. */
const EMAIL = SITE_CONTACT.find((channel) => channel.id === 'email')!

/* A white card, as the other form pages' asides; its parts split by hairlines. */
const CARD = 'rounded-2xl border border-line bg-surface p-5 md:p-6 lg:p-8'
const PARTS = 'flex flex-col divide-y divide-line [&>*]:py-5 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'

/* The three places: one column, two from 640 (phones and tablets), one in the desktop aside. */
const PLACES = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-1'

const TILE = 'rounded-lg bg-turquoise-soft text-petrol'

/*
 * Small inline links get a touch area at least 44px tall in every browser
 * (14px above and below a 16-22px line): vertical padding taken back by
 * an equal negative margin, so the layout does not move.
 */
const TOUCH_TARGET = 'inline-block py-3.5 -my-3.5'

/* A place's name: a small petrol link to the Presence page. */
const PLACE_NAME =
  `${TOUCH_TARGET} rounded-sm text-label font-bold text-link hover:text-petrol-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2`
const PLACE_TEXT = 'mt-1 text-body-sm leading-paragraph text-ink-muted'

/* Phone numbers and the address: links, read left to right inside Arabic. */
const LINE_LINK =
  `${TOUCH_TARGET} rounded-sm font-bold text-heading hover:text-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2`
/* 4px between numbers that wrap onto two lines, so their touch areas stay 24px apart. */
const PHONES = 'mt-1 flex flex-wrap gap-x-2 gap-y-1 text-body-sm'
const LABEL = 'text-body-sm text-ink-muted'

/** One place: its name (to the Presence page), a short line, and its phones. */
function Place({ icon, name, text, phones }: { icon: ReactNode; name: string; text: string; phones: readonly OfficePhone[] }) {
  return (
    <IconRow icon={icon} tileClassName={TILE} className="items-start">
      <h2>
        <LocalizedLink to={PATHS.presence} className={PLACE_NAME}>
          {name}
        </LocalizedLink>
      </h2>
      <p className={PLACE_TEXT}>{text}</p>
      <p className={PHONES}>
        {phones.map((line, index) => (
          <Fragment key={line.href}>
            {index > 0 ? <span aria-hidden="true" className="text-ink-muted">·</span> : null}
            <a href={line.href} dir="ltr" className={LINE_LINK}>
              {line.display}
            </a>
          </Fragment>
        ))}
      </p>
    </IconRow>
  )
}

/**
 * The contact page's aside, all from config: the two offices and the UAE
 * line (each named as a link to the Presence page), the enquiries email,
 * WhatsApp, and the social accounts.
 */
export function ContactDetails() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <div className={CARD}>
      <div className={PARTS}>
        <div className={PLACES}>
          {OFFICES.map((office) => (
            <Place
              key={office.id}
              icon={<PinIcon size={20} />}
              name={`${resolveCopy(office.label, language)} · ${resolveCopy(office.name, language)}`}
              text={resolveCopy(office.shortAddress, language)}
              phones={office.phones}
            />
          ))}
          {SERVICE_CONTACTS.map((place) => (
            <Place
              key={place.id}
              icon={<GlobeIcon size={20} />}
              name={resolveCopy(place.name, language)}
              text={resolveCopy(place.note, language)}
              phones={place.phones}
            />
          ))}
        </div>

        <div>
          <IconRow icon={<MailIcon size={20} />} tileClassName={TILE}>
            <p className={LABEL}>{text.enquiries}</p>
            <a href={EMAIL.href} dir="ltr" className={`${LINE_LINK} text-body`}>
              {EMAIL.display}
            </a>
          </IconRow>
        </div>

        <div className="flex flex-col gap-5">
          <WhatsAppButton />
          <SocialLinks tone="light" />
        </div>
      </div>
    </div>
  )
}
