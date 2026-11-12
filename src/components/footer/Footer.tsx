import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/layout/Container'
import { LocalizedLink } from '@/components/LocalizedLink'
import { ChatIcon, MailIcon, PhoneIcon, type IconProps } from '@/components/ui/icons'
import { BRAND_DOMAIN } from '@/config/brand'
import {
  publishedSocials,
  SITE_CONTACT,
  type ContactChannel,
} from '@/config/contact'
import { FOOTER_NAV } from '@/config/navigation'
import { sectorPath } from '@/config/paths'
import { SITE_URL } from '@/config/site'
import { getSectorById } from '@/data/sectorIndex'
import {
  FOOTER_DESCRIPTION,
  FOOTER_FEATURED_SECTOR_IDS,
} from '@/data/siteCopy'
import { cn } from '@/lib/cn'
import { Copy } from '@/lib/i18n/Copy'
import { useLanguageOptions, useLanguageSwap } from '@/lib/i18n/languageSwap'
import type { TranslationKey } from '@/lib/i18n/translations'
import { useLanguage } from '@/lib/i18n/useLanguage'

const YEAR = new Date().getFullYear()

/**
 * One link treatment for the whole footer. The focus ring is turquoise
 * rather than the petrol used on light surfaces: petrol on navy is 1.6:1 and
 * would be invisible, where turquoise is 4.9:1 — above the 3:1 a focus
 * indicator owes the surface behind it.
 */
const footerLink =
  'rounded-sm text-on-navy-muted transition-colors duration-200 hover:text-on-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

/** The same ring on a filled control, which carries its own radius. */
const footerFocus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

/** A contact channel by id, so no number is written twice. */
function channelById(id: ContactChannel['id']) {
  return SITE_CONTACT.find((channel) => channel.id === id)
}

/** A phone number or address, with the digits kept left to right. */
function ChannelLine({ channel }: { channel: ContactChannel }) {
  const { t } = useLanguage()

  return (
    <a
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noopener noreferrer' : undefined}
      className={cn(footerLink, 'flex flex-col gap-0.5')}
    >
      <span className="text-caption text-on-navy-muted">
        {t(channel.labelKey)}
      </span>
      {/*
        The direction belongs to the digits, not to the box: a block with
        dir="ltr" would also align itself to the left and park the number on
        the far side of its own label in Arabic.
      */}
      <span className="font-medium text-on-navy">
        <bdi dir="ltr">{channel.display}</bdi>
      </span>
    </a>
  )
}

/* -------------------------------------------------------------------- */
/* Mobile, below 768px                                                   */
/* -------------------------------------------------------------------- */

/** The three taps worth one each: ring the office, chat, or write. */
const QUICK_CONTACT = [
  { id: 'riyadh', labelKey: 'footer.call', Icon: PhoneIcon },
  { id: 'whatsapp', labelKey: 'contact.whatsapp', Icon: ChatIcon },
  { id: 'email', labelKey: 'footer.email', Icon: MailIcon },
] as const satisfies ReadonlyArray<{
  id: ContactChannel['id']
  labelKey: TranslationKey
  Icon: (props: IconProps) => ReactNode
}>

/** `+` while the section is closed, `−` once it is open. */
function PlusMinus() {
  return (
    <span
      aria-hidden="true"
      className="relative block size-4 shrink-0 text-on-navy"
    >
      <span className="absolute inset-0 m-auto h-0.5 w-4 rounded-full bg-current" />
      <span className="absolute inset-0 m-auto h-4 w-0.5 rounded-full bg-current transition-transform duration-200 ease-standard group-open:scale-y-0" />
    </span>
  )
}

/**
 * One collapsible section of the mobile footer.
 *
 * `details` carries the open state itself, so the whole footer needs no
 * JavaScript and keeps working before the bundle loads. Under
 * prefers-reduced-motion the project's global rule flattens the indicator's
 * transition.
 */
function FooterSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <details className="group border-t border-white/10">
      <summary
        className={cn(
          'flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-sm [&::-webkit-details-marker]:hidden',
          footerFocus,
        )}
      >
        <h2 className="text-body-sm font-semibold text-on-navy">{title}</h2>
        <PlusMinus />
      </summary>

      <div className="pb-3">{children}</div>
    </details>
  )
}

/** The two language codes, for the mobile bottom bar. */
function LanguageCodes() {
  const options = useLanguageOptions()

  return (
    <span className="flex items-center gap-2">
      {options.map((option, index) => (
        <Fragment key={option.language}>
          {index > 0 ? (
            <span aria-hidden="true" className="text-white/30">
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
              'inline-flex min-h-11 items-center font-medium',
              option.isCurrent && 'text-on-navy',
            )}
          >
            {/* The language's own name carries the accessible label, so the
                two-letter code is never read out as a word. */}
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
 * The footer below 768px: brand, three contact buttons, and the three lists
 * folded away behind their own headings.
 *
 * It reads exactly the same configuration as the wide footer — only the
 * markup differs. Collapsing the lists is what keeps the page's last screen
 * from being a long scroll past links nobody asked for.
 */
function MobileFooter() {
  const { t } = useLanguage()
  const socials = publishedSocials()

  return (
    <div className="md:hidden">
      {/* The sections end on a hairline, so the block needs less room under
          them than above the logo. */}
      <Container className="pt-10 pb-6">
        <div className="flex flex-col items-center text-center">
          <Logo tone="white" size="footer" />

          <Copy
            as="p"
            value={FOOTER_DESCRIPTION}
            className="mt-4 max-w-measure text-body-sm text-pretty"
          />
        </div>

        <ul className="mt-6 grid grid-cols-3 gap-2">
          {QUICK_CONTACT.map(({ id, labelKey, Icon }) => {
            const channel = channelById(id)

            if (!channel) {
              return null
            }

            return (
              <li key={id}>
                <a
                  href={channel.href}
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noopener noreferrer' : undefined}
                  /* The number is part of the name, so the three buttons are
                     told apart by more than "Call", "WhatsApp", "Email". */
                  aria-label={`${t(labelKey)}: ${channel.display}`}
                  className={cn(
                    'flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg bg-white/10 px-2 py-2.5 text-caption font-medium text-on-navy transition-colors duration-200 hover:bg-white/15',
                    footerFocus,
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" />
                  {t(labelKey)}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="mt-6">
          <FooterSection title={t('footer.quickLinks')}>
            <ul className="flex flex-col">
              {FOOTER_NAV.map((item) => (
                <li key={item.path}>
                  <LocalizedLink
                    to={item.path}
                    className={cn(footerLink, 'flex min-h-11 items-center text-body-sm')}
                  >
                    {t(item.labelKey)}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title={t('footer.featured')}>
            <ul className="flex flex-col">
              {FOOTER_FEATURED_SECTOR_IDS.map((id) => {
                const sector = getSectorById(id)

                if (!sector) {
                  return null
                }

                return (
                  <li key={id}>
                    <LocalizedLink
                      to={sectorPath(sector.slug)}
                      className={cn(footerLink, 'flex min-h-11 items-center text-body-sm')}
                    >
                      <Copy value={sector.title} />
                    </LocalizedLink>
                  </li>
                )
              })}
            </ul>
          </FooterSection>

          <FooterSection title={t('nav.contact')}>
            <ul className="flex flex-col gap-3 text-body-sm">
              {SITE_CONTACT.map((channel) => (
                <li key={channel.id}>
                  <ChannelLine channel={channel} />
                </li>
              ))}
            </ul>
          </FooterSection>

          <div className="border-t border-white/10" />
        </div>

        {socials.length > 0 ? (
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {socials.map((network) => (
              <li key={network.id}>
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex min-h-11 items-center rounded-lg bg-white/10 px-4 text-body-sm font-medium text-on-navy transition-colors duration-200 hover:bg-white/15',
                    footerFocus,
                  )}
                >
                  {network.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>

      <div className="border-t border-white/10">
        {/* One line while both halves fit, two neat lines when they do not. */}
        <Container className="flex flex-wrap items-center justify-between gap-x-4 py-3 text-caption">
          <p>
            © {YEAR} {t('brand.legal')}
          </p>
          <LanguageCodes />
        </Container>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------- */
/* Tablet and desktop, from 768px                                        */
/* -------------------------------------------------------------------- */

/** A titled column of the footer grid. */
function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-overline tracking-latin-wide text-on-navy">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}

/**
 * The language control in the wide bottom bar: a plain link to the other
 * language, not the dropdown the navbar carries.
 *
 * The dropdown exists to say which language is in use before offering the
 * rest, and at the foot of the page that question is already answered. What
 * is left is somewhere to go. It names the other language in its own script
 * and carries that language's `lang`, `dir` and `hrefLang`, so the label and
 * the accessible name are both announced in its voice.
 */
function LanguageFooterLink() {
  const swap = useLanguageSwap()

  return (
    <Link
      to={swap.to}
      lang={swap.language}
      dir={swap.direction}
      hrefLang={swap.language}
      rel="alternate"
      aria-label={swap.action}
      className={cn(footerLink, 'inline-flex items-center font-medium')}
    >
      {swap.endonym}
    </Link>
  )
}

/** The four-column footer, from the tablet breakpoint up. */
function WideFooter() {
  const { t } = useLanguage()
  const socials = publishedSocials()

  return (
    <div className="hidden md:block">
      <Container className="py-section-sm">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/*
            The brand column spans two tracks from the tablet breakpoint up:
            a 72px lockup is 307px wide, and a quarter of the container is
            narrower than that at 1024 and 1280 — the logo would be clamped.
          */}
          <div className="sm:col-span-2">
            <Logo tone="white" size="footer" />

            <Copy
              as="p"
              value={FOOTER_DESCRIPTION}
              className="mt-5 max-w-measure text-body-sm text-pretty"
            />

            {socials.length > 0 ? (
              <>
                <h2 className="mt-6 text-overline tracking-latin-wide text-on-navy">
                  {t('footer.social')}
                </h2>
                <ul className="mt-3 flex flex-wrap items-center gap-4">
                  {socials.map((network) => (
                    <li key={network.id}>
                      <a
                        href={network.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(footerLink, 'text-body-sm font-medium')}
                      >
                        {network.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <Column title={t('footer.quickLinks')}>
            <ul className="flex flex-col gap-2.5 text-body-sm">
              {FOOTER_NAV.map((item) => (
                <li key={item.path}>
                  <LocalizedLink to={item.path} className={footerLink}>
                    {t(item.labelKey)}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </Column>

          {/* The five featured sectors are named in the site copy; their
              titles and slugs come from the sectors data by id. */}
          <Column title={t('footer.featured')}>
            <ul className="flex flex-col gap-2.5 text-body-sm">
              {FOOTER_FEATURED_SECTOR_IDS.map((id) => {
                const sector = getSectorById(id)

                if (!sector) {
                  return null
                }

                return (
                  <li key={id}>
                    <LocalizedLink
                      to={sectorPath(sector.slug)}
                      className={footerLink}
                    >
                      <Copy value={sector.title} />
                    </LocalizedLink>
                  </li>
                )
              })}
            </ul>
          </Column>

          <Column title={t('nav.contact')}>
            <ul className="flex flex-col gap-3 text-body-sm">
              {SITE_CONTACT.map((channel) => (
                <li key={channel.id}>
                  <ChannelLine channel={channel} />
                </li>
              ))}
            </ul>
          </Column>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-caption sm:flex-row">
          <p>
            © {YEAR} {t('brand.legal')}. {t('footer.rights')}
          </p>
          <span className="flex items-center gap-5">
            <LanguageFooterLink />
            <a
              href={SITE_URL}
              dir="ltr"
              className={cn(footerLink, 'font-medium')}
            >
              {BRAND_DOMAIN}
            </a>
          </span>
        </Container>
      </div>
    </div>
  )
}

/**
 * The site footer, mounted once by the layout.
 *
 * Nothing here is a second copy of anything: the quick links come from the
 * navigation configuration, the featured services from the sectors data by
 * id, and the phone numbers from the contact configuration. The two layouts
 * read those same lists; only their markup differs, and exactly one of them
 * is rendered at any width.
 */
export function Footer() {
  return (
    <footer className="bg-navy text-on-navy-muted">
      <MobileFooter />
      <WideFooter />
    </footer>
  )
}
