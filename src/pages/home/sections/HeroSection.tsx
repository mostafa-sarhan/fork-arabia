import { Fragment } from 'react'
import heroPhotoFallback from '@/assets/images/home/riyadh-meeting-1400.jpg'
import heroPhotoWide from '@/assets/images/home/riyadh-meeting-1400.webp'
import heroPhotoNarrow from '@/assets/images/home/riyadh-meeting-800.webp'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, PinIcon, ShieldIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import { cn } from '@/lib/cn'
import { copy, draft, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says.
 *
 * Arabic is transcribed from the client's storyboard and English from the
 * company profile. `draft` marks English written here because the profile
 * had no equivalent; it renders like any other copy and is listed in
 * `docs/copy-review.md` for the client to approve. The two button labels
 * are not here: they are interface wording the navbar and footer share,
 * so they stay in the translation table.
 */
const COPY = {
  badge: copy('خدمات مهنية متكاملة', 'Integrated Professional Services'),

  title: copy(
    'قانونية · مالية · إدارية · تقنية',
    'Legal · Financial · Administrative · Technology',
  ),

  /* The English opens with the profile's own sentence from "Who We Are";
     only the closing clause naming the markets is ours. */
  lead: draft(
    'نرافق شركاءنا من الفكرة والتأسيس إلى التشغيل والحوكمة والنمو، في مصر والسعودية والإمارات وعُمان وأسواق أخرى.',
    'We accompany our partners from idea and incorporation through operation, governance and growth — in Egypt, Saudi Arabia, the UAE, Oman and other markets.',
  ),

  trust: draft(
    'مقر رئيسي في الرياض، وفرع في طنطا، وخدمات في 8 دول.',
    'Head office in Riyadh, a branch in Tanta, and services across 8 countries.',
  ),

  imageAlt: draft(
    'فريق فورك العربية في اجتماع عمل بمكتب الرياض',
    'The FORK ARABIA team in a business meeting at the Riyadh office',
  ),

  cardTitle: draft('شريك مهني واحد منذ 2016', 'One professional partner since 2016'),

  cardSubtitle: draft(
    'من الاستشارة للتنفيذ للمتابعة',
    'From consultation to implementation and follow-up',
  ),
}

/** The separator inside the heading. Each one is drawn turquoise. */
const TITLE_SEPARATOR = ' · '

/*
 * The entrance sequence, in the order the eye should travel: badge,
 * heading, paragraph, buttons, 60ms apart. prefers-reduced-motion removes
 * the animation, which leaves every element at its final state — and the
 * text is in the markup from the first byte either way, so nothing is
 * hidden from a crawler.
 */
const ENTER = 'animate-enter motion-reduce:animate-none'

function enterDelay(step: number) {
  return { animationDelay: `${step * 60}ms` }
}

export function HeroSection() {
  const { language, t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-navy">
      <HeroBackdrop />

      <Container className="relative z-raised pt-12 pb-10 md:pb-38 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-18">
          <div>
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-turquoise/35 bg-turquoise/14 px-3.5 py-1.5 text-body-sm font-medium text-turquoise-soft',
                ENTER,
              )}
              style={enterDelay(0)}
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-turquoise"
              />
              {resolveCopy(COPY.badge, language)}
            </span>

            <HeroTitle text={resolveCopy(COPY.title, language)} />

            <p
              className={cn(
                'mt-6 max-w-measure text-body leading-[1.9] text-on-navy-muted text-pretty lg:text-[1.25rem]',
                ENTER,
              )}
              style={enterDelay(2)}
            >
              {resolveCopy(COPY.lead, language)}
            </p>

            <div
              className={cn(
                'mt-9 flex flex-col gap-3 sm:flex-row sm:items-center',
                ENTER,
              )}
              style={enterDelay(3)}
            >
              <Button
                to={PATHS.bookConsultation}
                variant="secondary"
                size="lg"
                className="h-13 w-full focus-visible:ring-offset-navy sm:h-12 sm:w-auto"
              >
                {t('nav.bookConsultation')}
                <ArrowRightIcon className="size-4 rtl:-scale-x-100" />
              </Button>

              <Button
                to={PATHS.requestQuote}
                variant="outline"
                size="lg"
                className="h-13 w-full border-white/45 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white active:bg-white/15 focus-visible:ring-white focus-visible:ring-offset-navy sm:h-12 sm:w-auto"
              >
                {t('nav.requestQuote')}
              </Button>
            </div>

            <p className="mt-7 flex items-center gap-2 text-body-sm text-on-navy-muted">
              <PinIcon size={16} className="shrink-0" />
              {resolveCopy(COPY.trust, language)}
            </p>
          </div>

          {/* The image and the card that overlaps it, one box together. */}
          <div className="relative">
            {/*
              The page's largest image and its LCP element, so it is fetched
              at once rather than lazily. The photograph is 5:4, which is the
              box it is given from 1024 up; the 4:3 box below that crops a
              little off the foot of it, so the anchor is the top — the three
              people and the logo on the wall behind them stay in frame in
              both.
            */}
            <picture>
              <source
                type="image/webp"
                srcSet={`${heroPhotoNarrow} 800w, ${heroPhotoWide} 1400w`}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <img
                src={heroPhotoFallback}
                width={1400}
                height={1120}
                alt={resolveCopy(COPY.imageAlt, language)}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[1.5rem] object-cover object-top lg:aspect-[5/4]"
              />
            </picture>

            {/*
              The card is as wide as its two lines need and no wider, so on
              a phone it overlaps the photograph's bottom corner instead of
              lying across the picture. It is the same card at every width,
              a size smaller below 1024.
            */}
            <div className="absolute -bottom-4 start-3 flex w-fit max-w-[85%] items-center gap-3 rounded-2xl bg-surface px-3.5 py-2.5 shadow-raised lg:-bottom-7 lg:start-6 lg:max-w-[19rem] lg:px-4 lg:py-4">
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-turquoise-soft text-petrol lg:size-11"
              >
                <ShieldIcon className="size-[18px] lg:size-[22px]" />
              </span>

              <span>
                <span className="block text-body-sm font-semibold text-heading">
                  {resolveCopy(COPY.cardTitle, language)}
                </span>
                <span className="mt-0.5 block text-caption text-ink-muted">
                  {resolveCopy(COPY.cardSubtitle, language)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** The two decorative layers behind the hero: the grid and the brand mark. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* A faint white grid, 56px cells. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.035) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* The F mark, run off the inline-end corner: left in Arabic. */}
      <svg
        viewBox="0 0 474 501"
        focusable="false"
        className="absolute -bottom-20 -end-24 h-[34rem] w-auto opacity-7"
        fill="var(--color-turquoise)"
      >
        <rect x="0" y="0" width="474" height="150" rx="75" />
        <rect x="0" y="175" width="304" height="150" rx="75" />
        <circle cx="75" cy="426" r="75" />
      </svg>
    </div>
  )
}

/** The H1, with each "·" of the copy drawn turquoise. */
function HeroTitle({ text }: { text: string }) {
  return (
    <h1
      className={cn(
        'mt-6 font-display text-hero tracking-latin-tight text-white text-balance',
        ENTER,
      )}
      style={enterDelay(1)}
    >
      {text.split(TITLE_SEPARATOR).map((word, index) => (
        <Fragment key={word}>
          {/* A no-break space keeps the dot on the word it follows; the
              ordinary space after it is where the line may break. */}
          {index > 0 ? (
            <>
              <span className="text-turquoise">{' ·'}</span>{' '}
            </>
          ) : null}
          {word}
        </Fragment>
      ))}
    </h1>
  )
}
