import { FooterBrand } from '@/components/footer/FooterBrand'
import { footerLink } from '@/components/footer/FooterColumn'
import { FooterContact } from '@/components/footer/FooterContact'
import { FooterLinks } from '@/components/footer/FooterLinks'
import { FooterServices } from '@/components/footer/FooterServices'
import { LanguageFooterLink } from '@/components/footer/LanguageFooterLink'
import { Container } from '@/components/layout/Container'
import { BRAND_DOMAIN } from '@/lib/brand'
import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { SITE_URL } from '@/lib/site'

const YEAR = new Date().getFullYear()

/**
 * The site footer, mounted once by the layout.
 *
 * Nothing here is a second copy of anything: the quick links come from the
 * navigation configuration, the featured services from the sectors data by
 * id, and the phone numbers from the contact configuration.
 */
export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-navy text-on-navy-muted">
      <Container className="py-section-sm">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <FooterBrand />
          <FooterLinks />
          <FooterServices />
          <FooterContact />
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
