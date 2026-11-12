import { Fragment } from 'react'
import heroPhotoFallback from '@/assets/images/home/riyadh-meeting-1400.jpg'
import heroPhotoWide from '@/assets/images/home/riyadh-meeting-1400.webp'
import heroPhotoNarrow from '@/assets/images/home/riyadh-meeting-800.webp'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, PinIcon, ShieldIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import {
  HERO_TITLE_SEPARATOR,
  HOME_HERO,
  HOME_HERO_CARD,
  HOME_HERO_IMAGE,
} from '@/data/homeCopy'
import { cn } from '@/lib/cn'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/**
 * The entrance sequence, in the order the eye should travel. Each step is
 * one `--animate-enter` with a delay; prefers-reduced-motion removes the
 * animation, which leaves every element at its final state. Nothing is
 * hidden by anything but the animation's own fill, so the text is in the
 * markup from the first byte.
 */
const ENTER = 'animate-enter motion-reduce:animate-none'
const ENTER_STEP = 60

function enterDelay(step: number) {
  return { animationDelay: `${step * ENTER_STEP}ms` }
}

/** The two decorative layers behind the hero: the grid and the brand mark. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-hero-grid" />

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
      {text.split(HERO_TITLE_SEPARATOR).map((word, index) => (
        <Fragment key={word}>
          {/* A no-break space keeps the dot on the word it follows; the
              ordinary space after it is where the line may break. */}
          {index > 0 ? (
            <>
              <span className="text-turquoise">{'\u00A0·'}</span>{' '}
            </>
          ) : null}
          {word}
        </Fragment>
      ))}
    </h1>
  )
}

export function HomeHero() {
  const { language, t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-navy">
      <HeroBackdrop />

      <Container className="relative z-raised pt-12 pb-section-sm md:pb-hero-bottom lg:pt-hero-top">
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
              {resolveCopy(HOME_HERO.badge, language)}
            </span>

            <HeroTitle text={resolveCopy(HOME_HERO.title, language)} />

            <p
              className={cn(
                'mt-6 max-w-measure text-lead text-on-navy-muted text-pretty lg:text-lead-lg',
                ENTER,
              )}
              style={enterDelay(2)}
            >
              {resolveCopy(HOME_HERO.lead, language)}
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
              {resolveCopy(HOME_HERO.trust, language)}
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
                alt={resolveCopy(HOME_HERO_IMAGE.alt, language)}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full rounded-3xl object-cover object-top lg:aspect-[5/4]"
              />
            </picture>

            <div className="absolute -bottom-6 start-4 end-4 flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-raised lg:-bottom-7 lg:end-auto lg:start-6 lg:max-w-[19rem]">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-turquoise-soft text-petrol"
              >
                <ShieldIcon size={22} />
              </span>

              <span>
                <span className="block text-body-sm font-semibold text-heading">
                  {resolveCopy(HOME_HERO_CARD.title, language)}
                </span>
                <span className="mt-0.5 block text-caption text-ink-muted">
                  {resolveCopy(HOME_HERO_CARD.subtitle, language)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
