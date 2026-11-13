import { BrandMarkWatermark } from '@/components/BrandMarkWatermark'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { CONSULTATION_DETAILS, CONSULTATION_INVITE } from '@/config/consultation'
import { PATHS } from '@/config/paths'
import { localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * The card: turquoise-soft, as the home page's closing call to action.
 * 32px 24px below 1024, 56px from it.
 */
const CARD =
  'relative overflow-hidden rounded-2xl px-6 py-8 lg:rounded-3xl lg:p-14 bg-turquoise-soft'

/* The F run off the card's bottom inline-end corner. */
const WATERMARK = '-end-8 -bottom-10 h-45 lg:-end-12 lg:-bottom-16 lg:h-70'

/* Text and buttons beside the tiles from 1024; stacked below. */
const LAYOUT = 'relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14'

/* The six details: 2 × 3 on phones, 3 × 2 from 768. */
const TILES = 'grid grid-cols-2 md:grid-cols-3 gap-2.5 lg:gap-3'
const TILE = 'flex flex-col-reverse justify-end rounded-xl bg-surface px-4 py-3.5'

/* Full width and stacked on phones, side by side from 640. */
const BUTTON = 'h-13 w-full sm:w-auto'

/**
 * The sector's closing call to action: its question, the services page's
 * invitation, the two buttons, and the consultation's six details.
 */
export function SectorConsultation({ title }: { title: string }) {
  const { language, t } = useLanguage()
  const details = localizeAll(CONSULTATION_DETAILS, language)

  return (
    <section className="pt-16 pb-14 lg:pt-24 lg:pb-16 bg-surface">
      <Container>
        <Reveal className={CARD}>
          <BrandMarkWatermark tone="petrol" className={WATERMARK} />

          <div className={LAYOUT}>
            <div>
              {/* 40px from 1024, as the home page's call-to-action card. */}
              <h2 className="font-display text-section-title lg:text-[2.5rem] text-balance text-heading">
                {title}
              </h2>
              <p className="max-w-140 mt-4 text-body lg:text-body-lg leading-paragraph text-pretty text-ink-muted">
                {resolveCopy(CONSULTATION_INVITE, language)}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-2.5 lg:gap-3">
                <Button to={PATHS.bookConsultation} variant="primary" size="lg" className={BUTTON}>
                  {t('nav.bookConsultation')}
                </Button>
                <Button to={PATHS.requestQuote} variant="outline-navy" size="lg" className={BUTTON}>
                  {t('nav.requestQuote')}
                </Button>
              </div>
            </div>

            {/* Each label comes first for assistive tech ("Days: …");
                flex-col-reverse draws it under its value. */}
            <dl className={TILES}>
              {details.map((detail) => (
                <div key={detail.id} className={TILE}>
                  <dt className="mt-1 text-body-sm text-ink-muted">{detail.label}</dt>
                  <dd className="text-body font-bold text-heading">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
