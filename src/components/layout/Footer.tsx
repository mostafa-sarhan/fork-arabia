import type { ReactNode } from 'react'
import { Logo } from '@/components/brand/Logo'
import { LanguageFooterLink } from '@/components/ui/LanguageFooterLink'
import { Container } from '@/components/layout/Container'
import { getSectorById } from '@/data/sectorIndex'
import {
  FOOTER_DESCRIPTION,
  FOOTER_FEATURED_SECTOR_IDS,
} from '@/data/siteCopy'
import { BRAND_DOMAIN } from '@/lib/brand'
import { cn } from '@/lib/cn'
import { Copy } from '@/lib/i18n/Copy'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { FOOTER_NAV } from '@/lib/navigation'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import { ROUTE_PATHS, sectorPath } from '@/lib/routing/routes'
import { publishedSocials, SITE_CONTACT } from '@/lib/siteContact'

const YEAR = new Date().getFullYear()

/*
 * One link treatment for the whole footer. The focus ring is turquoise on
 * navy rather than the petrol used on light surfaces: petrol on navy is
 * 1.6:1 and would be invisible, where turquoise is 4.9:1 — above the 3:1
 * that a focus indicator owes the surface behind it.
 */
const footerLink =
  'rounded-sm text-on-navy-muted transition-colors duration-200 hover:text-on-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

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
 * The site footer, mounted once for every route.
 *
 * Nothing here is a second copy of anything: the quick links come from the
 * navigation configuration, the featured services from the sectors data by
 * id, and the phone numbers from the contact configuration. The storyboard
 * chose the five services; which five is the only thing stated here.
 */
export function Footer() {
  const { t } = useLanguage()
  const socials = publishedSocials()

  return (
    <footer className="bg-navy text-on-navy-muted">
      <Container className="py-section-sm">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/*
            The brand column spans two tracks from the tablet breakpoint up:
            a 72px lockup is 307px wide, and a quarter of the container is
            narrower than that at 1024 and 1280 — the logo would be clamped
            and scaled down rather than shown at its token height.
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
                <li key={item.routeId}>
                  <LocalizedLink
                    to={ROUTE_PATHS[item.routeId]}
                    className={footerLink}
                  >
                    {t(item.labelKey)}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </Column>

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
                      The direction belongs to the digits, not to the box.
                      A block that declares dir="ltr" also aligns itself to
                      the left, which would park the number on the far side
                      of its own label in an Arabic column; an inline
                      isolate inside a box that keeps the page direction
                      fixes the digits and nothing else.
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
            <LanguageFooterLink className="font-medium" />
            <a
              href={`https://${BRAND_DOMAIN}`}
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
