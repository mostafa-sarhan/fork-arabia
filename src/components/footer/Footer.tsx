import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/layout/Container'
import { LocalizedLink } from '@/components/LocalizedLink'
import {
  ChatIcon,
  MailIcon,
  PhoneIcon,
  type IconProps,
} from '@/components/ui/icons'
import {
  publishedSocials,
  SITE_CONTACT,
  type ContactChannel,
} from '@/config/contact'
import { FOOTER_NAV } from '@/config/navigation'
import { cn } from '@/lib/cn'
import { useLanguageOptions } from '@/lib/i18n/languageSwap'
import type { TranslationKey } from '@/lib/i18n/translations'
import { useLanguage } from '@/lib/i18n/useLanguage'

const YEAR = new Date().getFullYear()

/**
 * The focus ring for every control down here. It is turquoise rather than
 * the petrol used on light surfaces: petrol on navy is 1.6:1 and would be
 * invisible, where turquoise is 4.9:1 — above the 3:1 a focus indicator
 * owes the surface behind it.
 */
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

/** One link treatment for the footer's text links. */
const footerLink = cn(
  'rounded-sm text-on-navy-muted transition-colors duration-200 hover:text-on-navy',
  focusRing,
)

/** The three taps worth one each: ring the office, chat, or write. */
const CONTACT_BUTTONS = [
  { id: 'riyadh', labelKey: 'footer.call', Icon: PhoneIcon },
  { id: 'whatsapp', labelKey: 'contact.whatsapp', Icon: ChatIcon },
  { id: 'email', labelKey: 'footer.email', Icon: MailIcon },
] as const satisfies ReadonlyArray<{
  id: ContactChannel['id']
  labelKey: TranslationKey
  Icon: (props: IconProps) => ReactNode
}>

/**
 * Call, WhatsApp and email.
 *
 * One set of buttons at every width, not two: below 768px they are three
 * equal labelled cells across the full width, and from 768px up the label
 * drops away and each becomes a square icon button at the end of the top
 * row. The label is never the whole accessible name — the number or the
 * address is part of it, so the three are told apart by more than "Call",
 * "WhatsApp" and "Email", and the icon-only form still says where it goes.
 */
function ContactButtons() {
  const { t } = useLanguage()

  return (
    <ul
      aria-label={t('contact.shortcuts')}
      className="grid w-full grid-cols-3 gap-2 md:flex md:w-auto"
    >
      {CONTACT_BUTTONS.map(({ id, labelKey, Icon }) => {
        const channel = SITE_CONTACT.find((item) => item.id === id)

        if (!channel) {
          return null
        }

        return (
          <li key={id}>
            <a
              href={channel.href}
              target={channel.external ? '_blank' : undefined}
              rel={channel.external ? 'noopener noreferrer' : undefined}
              aria-label={`${t(labelKey)}: ${channel.display}`}
              className={cn(
                'flex min-h-11 w-full flex-col items-center justify-center gap-1 rounded-lg bg-white/10 px-2 py-2 text-caption font-medium text-on-navy transition-colors duration-200 hover:bg-white/15',
                'md:size-10 md:min-h-0 md:px-0 md:py-0',
                focusRing,
              )}
            >
              <Icon aria-hidden="true" className="size-5" />
              <span className="md:hidden">{t(labelKey)}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * The primary links, inline from 768px up.
 *
 * They are hidden below that width rather than folded away: the header's
 * menu already carries the same list on a phone, and a second copy of it
 * is what made this footer long.
 */
function FooterNav() {
  const { t } = useLanguage()

  return (
    <nav
      aria-label={t('footer.quickLinks')}
      className="hidden md:block"
    >
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-body-sm">
        {FOOTER_NAV.map((item) => (
          <li key={item.path}>
            <LocalizedLink to={item.path} className={footerLink}>
              {t(item.labelKey)}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** The brand's accounts, shown only once an address is known for them. */
function SocialLinks() {
  const { t } = useLanguage()
  const socials = publishedSocials()

  if (socials.length === 0) {
    return null
  }

  return (
    <ul
      aria-label={t('footer.social')}
      className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-body-sm md:justify-start"
    >
      {socials.map((network) => (
        <li key={network.id}>
          <a
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(footerLink, 'font-medium')}
          >
            {network.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

/**
 * AR | EN.
 *
 * At the foot of the page the question the navbar's dropdown answers —
 * which language am I reading? — is already settled, so what is left is
 * somewhere to go. Each code carries its language's own name as its
 * accessible name, so "EN" is never read out as a word.
 */
function LanguageCodes() {
  const options = useLanguageOptions()

  return (
    <span className="flex items-center gap-2">
      {options.map((option, index) => (
        <Fragment key={option.language}>
          {index > 0 ? (
            /* Decoration, and exempt as such — but drawn at 3.4:1 rather
               than the 2.5:1 it had, so it reads as a divider. */
            <span aria-hidden="true" className="text-white/40">
              |
            </span>
          ) : null}
          <Link
            to={option.to}
            hrefLang={option.language}
            rel="alternate"
            aria-current={option.isCurrent ? 'true' : undefined}
            className={cn(
              footerLink,
              /* The box is the target: two letters are 15px wide, where a
                 finger wants 44 in both directions. The row above is
                 already taller than that from 768px up, so only the width
                 is held there. */
              'inline-flex min-h-11 min-w-11 items-center justify-center font-medium md:min-h-0',
              option.isCurrent && 'text-on-navy',
            )}
          >
            <span lang={option.language} className="sr-only">
              {option.endonym}
            </span>
            <span dir="ltr">{option.code}</span>
          </Link>
        </Fragment>
      ))}
    </span>
  )
}

/**
 * The site footer, mounted once by the layout.
 *
 * It is one layout, not two: the same logo, the same three contact buttons
 * and the same legal line at every width, re-arranged at 768px by the
 * breakpoint classes rather than by a second copy of the markup. The links
 * come from the navigation configuration and the numbers from the contact
 * configuration, so nothing here is written down twice.
 */
export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-navy text-on-navy-muted">
      <Container className="py-6 md:py-8">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-6">
          <Logo tone="white" size="footer" />
          <FooterNav />
          <ContactButtons />
        </div>

        <SocialLinks />

        {/* The hairline is the divider; it needs no element of its own. */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 border-t border-white/10 pt-4 text-caption md:mt-6">
          <p>
            © {YEAR} {t('brand.legal')}
          </p>
          <LanguageCodes />
        </div>
      </Container>
    </footer>
  )
}
