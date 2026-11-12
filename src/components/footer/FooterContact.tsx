import { FooterColumn, footerLink } from '@/components/footer/FooterColumn'
import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { SITE_CONTACT } from '@/lib/siteContact'

/** The contact column, from the contact configuration. */
export function FooterContact() {
  const { t } = useLanguage()

  return (
    <FooterColumn title={t('nav.contact')}>
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
                The direction belongs to the digits, not to the box: a block
                with dir="ltr" would also align itself to the left and park
                the number on the far side of its own label in Arabic.
              */}
              <span className="font-medium text-on-navy">
                <bdi dir="ltr">{channel.display}</bdi>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </FooterColumn>
  )
}
