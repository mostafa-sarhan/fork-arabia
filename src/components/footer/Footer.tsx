import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/layout/Container'
import { LocalizedLink } from '@/components/LocalizedLink'
import { BRAND_DOMAIN } from '@/config/brand'
import { publishedSocials, SITE_CONTACT } from '@/config/contact'
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
import { useLanguageSwap } from '@/lib/i18n/languageSwap'
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
 * The language control in the bottom bar: a plain link to the other
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

/**
 * The site footer, mounted once by the layout.
 *
 * Nothing here is a second copy of anything: the quick links come from the
 * navigation configuration, the featured services from the sectors data by
 * id, and the phone numbers from the contact configuration.
 */
export function Footer() {
  const { t } = useLanguage()
  const socials = publishedSocials()

  return (
    <footer className="bg-navy text-on-navy-muted">
      <Container className="py-section-sm">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

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
                      The direction belongs to the digits, not to the box: a
                      block with dir="ltr" would also align itself to the
                      left and park the number on the far side of its own
                      label in Arabic.
                    */}
                    <span className="font-medium text-on-navy">
                      <bdi dir="ltr">{channel.display}</bdi>
                    </span>
                  </a>
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
    </footer>
  )
}
