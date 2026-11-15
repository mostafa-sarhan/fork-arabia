import { BrandMarkWatermark } from '@/components/BrandMarkWatermark'
import { Container } from '@/components/layout/Container'
import { LocalizedLink } from '@/components/LocalizedLink'
import { Button } from '@/components/ui/Button'
import { LinkArrow } from '@/components/ui/LinkArrow'
import { PATHS } from '@/config/paths'
import { localizeAll, proposed } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { usePageMeta } from '@/lib/usePageMeta'

/* The page's words (`proposed`, listed in docs/copy-review.md). */
const COPY = {
  title: proposed('الصفحة غير موجودة', 'Page not found'),
  line: proposed('ربما تم نقل الصفحة أو أن الرابط غير صحيح.', 'The page may have moved, or the link may be wrong.'),
  home: proposed('العودة إلى الرئيسية', 'Back to home'),
  services: proposed('تصفح خدماتنا', 'Browse our services'),
  quickLinks: proposed('روابط سريعة', 'Quick links'),
}

/* The page tone, the block centred in the space between header and footer. */
const SECTION = 'relative flex min-h-main items-center overflow-hidden bg-page py-section-sm sm:py-section'
const BLOCK = 'relative mx-auto max-w-panel text-center'

/*
 * The large faint "404", navy at a whisper, over the F mark as a petrol
 * watermark (the PageHero's watermark, in its light-surface tone), drawn
 * taller than the digits so it reads as a backdrop, not as bars across
 * them; the title keeps clear of its dot.
 */
const FIGURE = 'relative mx-auto grid w-fit place-items-center'
const WATERMARK = 'top-1/2 start-1/2 h-[140%] -translate-y-1/2 -translate-x-1/2 rtl:translate-x-1/2'
const NUMBER =
  'relative font-display text-[clamp(7rem,24vw,12rem)] leading-none font-extrabold tracking-latin-tight text-navy/12 tabular-nums select-none'

const TITLE = 'mt-12 font-display text-h2 font-bold text-heading text-balance'
const LINE = 'mx-auto mt-4 max-w-measure text-body-lg text-ink-muted text-pretty'

/* Two buttons, side by side from 640, stacked full width below. */
const ACTIONS = 'mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center'

/* The quick links: a short row of quiet links, a dot between them. */
const QUICK = 'mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-body-sm'
const QUICK_LINK =
  'rounded-sm font-semibold text-petrol underline-offset-4 hover:text-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2'
const QUICK_DOT = 'size-1 rounded-full bg-line-strong'

/**
 * Rendered for every path no route claims, in the language the path asks
 * for: `/typo` is Arabic, `/en/typo` is English. Inside the site's own
 * header and footer, so a wrong URL still looks like the company: a calm
 * block with the way home, the services, and three quick links.
 * Never indexed.
 */
export default function NotFoundPage() {
  const { language, t } = useLanguage()
  const text = localizeAll(COPY, language)

  usePageMeta({ title: text.title, indexable: false })

  const quickLinks = [
    { to: PATHS.about, label: t('nav.about') },
    { to: PATHS.presence, label: t('nav.presence') },
    { to: PATHS.contact, label: t('nav.contact') },
  ] as const

  return (
    <section className={SECTION}>
      <Container>
        <div className={BLOCK}>
          <div aria-hidden="true" className={FIGURE}>
            <BrandMarkWatermark tone="petrol" className={WATERMARK} />
            <span dir="ltr" className={NUMBER}>
              404
            </span>
          </div>

          <h1 className={TITLE}>{text.title}</h1>
          <p className={LINE}>{text.line}</p>

          <div className={ACTIONS}>
            <Button to={PATHS.home} variant="primary" size="lg">
              {text.home}
            </Button>
            <Button to={PATHS.services} variant="outline" size="lg">
              {text.services}
              <LinkArrow className="size-4" />
            </Button>
          </div>

          <nav aria-label={text.quickLinks} className={QUICK}>
            {quickLinks.map((link, index) => (
              <span key={link.to} className="flex items-center gap-3">
                {index > 0 ? <span aria-hidden="true" className={QUICK_DOT} /> : null}
                <LocalizedLink to={link.to} className={QUICK_LINK}>
                  {link.label}
                </LocalizedLink>
              </span>
            ))}
          </nav>
        </div>
      </Container>
    </section>
  )
}
