import { BrandMarkWatermark } from '@/components/BrandMarkWatermark'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { CONSULTATION_DETAILS } from '@/config/consultation'
import { bookingQuery, PATHS } from '@/config/paths'
import type { SectorSlug } from '@/data/sectorIndex'
import { localizeAll } from '@/lib/i18n/localized'
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

/*
 * The six details. Each tile is as wide as its own label and value, which
 * never wrap; the row wraps instead and the tiles grow to fill each line,
 * so narrower widths get fewer tiles per line, never squeezed text.
 */
const TILES = 'flex flex-wrap gap-2.5 lg:gap-3'
const TILE = 'flex flex-auto flex-col-reverse justify-end rounded-xl bg-surface px-4 py-3.5'
const TILE_LABEL = 'mt-1 whitespace-nowrap text-body-sm text-ink-muted'
const TILE_VALUE = 'whitespace-nowrap text-body font-bold text-heading'

/* Full width and stacked on phones, side by side from 640. */
const BUTTON = 'h-13 w-full sm:w-auto'

/**
 * The closing consultation card: a question, one line of invitation, the
 * two buttons and the consultation's six details. Used by the services
 * page and every sector page, each with its own question.
 */
export function ConsultationCta({
  title,
  text,
  sector,
}: {
  title: string
  text: string
  /** On a sector page: its slug, so the booking link preselects it. */
  sector?: SectorSlug
}) {
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
                {text}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-2.5 lg:gap-3">
                <Button
                  to={PATHS.bookConsultation}
                  search={sector ? bookingQuery(sector) : undefined}
                  variant="primary"
                  size="lg"
                  className={BUTTON}
                >
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
                  <dt className={TILE_LABEL}>{detail.label}</dt>
                  <dd className={TILE_VALUE}>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
