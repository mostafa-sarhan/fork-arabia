import { Logo } from '@/components/brand/Logo'
import { footerLink } from '@/components/footer/FooterColumn'
import { FOOTER_DESCRIPTION } from '@/data/siteCopy'
import { cn } from '@/lib/cn'
import { Copy } from '@/lib/i18n/Copy'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { publishedSocials } from '@/lib/siteContact'

/**
 * The brand column: the lockup, the company's own description and the
 * published social accounts.
 *
 * It spans two tracks from the tablet breakpoint up — a 72px lockup is 307px
 * wide, and a quarter of the container is narrower than that at 1024 and
 * 1280, so the logo would be clamped and scaled down.
 */
export function FooterBrand() {
  const { t } = useLanguage()
  const socials = publishedSocials()

  return (
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
  )
}
