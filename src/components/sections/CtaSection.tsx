import { BrandMarkWatermark } from '@/components/BrandMarkWatermark'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { ClockIcon, GiftIcon, UsersIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import { draft, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says.
 *
 * Arabic is transcribed from the client's storyboard; the three facts come
 * from its booking page. `draft` marks English written here; it is listed
 * in `docs/copy-review.md` for approval. The two button labels are not
 * here: they are interface wording shared with the navbar and the hero,
 * so they stay in the translation table.
 */
const COPY = {
  heading: draft('جاهز تبدأ؟', 'Ready to get started?'),

  text: draft(
    'احجز استشارة مجانية مدتها 50 دقيقة، حضوريًا أو أونلاين أو بالتليفون، وسيتواصل معك فريقنا خلال يوم عمل لتأكيد الموعد.',
    'Book a free 50-minute consultation — in person, online or by phone — and our team will contact you within one business day to confirm the time.',
  ),

  duration: draft('50 دقيقة', '50 minutes'),
  price: draft('مجانية', 'Free'),
  formats: draft('حضوري · أونلاين · تليفون', 'In person · Online · Phone'),
}

/*
 * The card that carries the section. Turquoise-soft behind navy and muted
 * text (4.93:1 for the muted). 32px 24px below 1024, 56px 64px from it.
 */
const CARD =
  'relative overflow-hidden rounded-2xl px-6 py-8 lg:rounded-3xl lg:px-16 lg:py-14 bg-turquoise-soft'

/* The F run off the card's bottom inline-end corner: 180px, 280px from 1024. */
const WATERMARK = '-end-8 -bottom-10 h-45 lg:-end-12 lg:-bottom-16 lg:h-70'

/*
 * The two buttons: stacked and full width below 1024, side by side at
 * their own width from it, 52px tall throughout.
 */
const BUTTON = 'h-13 w-full lg:w-auto'

export function CtaSection() {
  const { language, t } = useLanguage()
  const text = localizeAll(COPY, language)

  const facts = [
    { icon: ClockIcon, label: text.duration },
    { icon: GiftIcon, label: text.price },
    { icon: UsersIcon, label: text.formats },
  ]

  return (
    <section className="pt-4 pb-18 lg:pt-6 lg:pb-28 bg-surface">
      <Container>
        <Reveal className={CARD}>
          <BrandMarkWatermark tone="petrol" className={WATERMARK} />

          {/* Text at the inline start, buttons at the inline end from 1024. */}
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div>
              {/* 40px from 1024: the card is narrower than a section, so its
                  title stops below the section-title maximum. */}
              <h2 className="font-display text-section-title lg:text-[2.5rem] text-balance text-heading">
                {text.heading}
              </h2>

              {/* 1.9 leading from 1024, used only here. */}
              <p className="max-w-155 mt-4 text-body leading-paragraph lg:text-body-lg lg:leading-[1.9] text-pretty text-ink-muted">
                {text.text}
              </p>

              {/* 15px labels: a size used only here. */}
              <ul className="flex flex-wrap mt-6 gap-x-6 gap-y-3">
                {facts.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-[0.9375rem] font-semibold text-heading"
                  >
                    <Icon size={20} className="shrink-0 text-petrol" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col lg:flex-row lg:shrink-0 gap-2.5 lg:gap-3">
              <Button
                to={PATHS.bookConsultation}
                variant="primary"
                size="lg"
                className={BUTTON}
              >
                {t('nav.bookConsultation')}
              </Button>

              <Button
                to={PATHS.requestQuote}
                variant="outline-navy"
                size="lg"
                className={BUTTON}
              >
                {t('nav.requestQuote')}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
