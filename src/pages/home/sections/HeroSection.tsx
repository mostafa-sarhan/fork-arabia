import { Fragment } from 'react'
import heroPhotoFallback from '@/assets/images/home/riyadh-meeting-1400.jpg'
import heroPhotoWide from '@/assets/images/home/riyadh-meeting-1400.webp'
import heroPhotoNarrow from '@/assets/images/home/riyadh-meeting-800.webp'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, PinIcon, ShieldIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import { cn } from '@/lib/cn'
import { copy, draft, localizeAll } from '@/lib/i18n/localized'
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
 * The two buttons. Below 1024 they are equal grid columns, 50px tall,
 * with 15px text and no arrow; from 1024 up they go back to the
 * size="lg" defaults at their own width. The 15px is arbitrary on
 * purpose: text-button would also set line-height 1 and nudge the label.
 */
const BUTTON = 'h-12.5 w-full px-4 text-[0.9375rem]'
const BUTTON_DESKTOP = 'lg:h-12 lg:w-auto lg:px-6 lg:text-body'
const BUTTON_OUTLINE_ON_NAVY =
  'border-white/45 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white active:bg-white/15 focus-visible:ring-white'

/*
 * The floating card over the photograph's bottom corner, a size smaller
 * below 1024. It is as wide as its two lines need, up to the photograph's
 * width less 12px on each side (a calc, since no width token says that),
 * or 19rem from 1024 up.
 */
const PHOTO_CARD =
  'absolute start-3 -bottom-4 flex w-fit max-w-[calc(100%-24px)] items-center rounded-2xl gap-3 px-3.5 py-2.5 bg-surface shadow-raised'
const PHOTO_CARD_DESKTOP = 'lg:start-6 lg:-bottom-7 lg:max-w-76 lg:px-4 lg:py-4'

export function HeroSection() {
  const { language, t } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="relative overflow-hidden bg-navy">
      <HeroBackdrop />

      <Container className="relative z-raised pt-9 pb-14 md:pb-32 lg:pt-24 lg:pb-38">
        {/* From 1024 the text column is a little wider than the photograph. */}
        <div className="grid items-center lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-18">
          {/* The text column is a size container, so the English heading can
              fit its width. It enters badge, heading, paragraph, buttons,
              60ms apart. */}
          <div className="@container">
            <Reveal
              as="span"
              className="inline-flex items-center rounded-full border gap-2 px-3.5 py-1.5 text-body-sm font-medium border-turquoise/35 bg-turquoise/14 text-turquoise-soft"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-turquoise"
              />
              {text.badge}
            </Reveal>

            <HeroTitle text={text.title} alwaysTwoLines={language === 'en'} />

            {/* The 20px from 1024 is used nowhere else, so it has no token. */}
            <Reveal
              as="p"
              delay={120}
              className="max-w-measure mt-6 text-body leading-paragraph text-pretty lg:text-[1.25rem] text-on-navy-muted"
            >
              {text.lead}
            </Reveal>

            {/* Below 360px the two labels do not fit side by side, so the
                buttons stack. */}
            <Reveal
              delay={180}
              className="grid min-[360px]:grid-cols-2 lg:flex lg:items-center mt-9 gap-2.5 lg:gap-3"
            >
              <Button
                to={PATHS.bookConsultation}
                variant="secondary"
                size="lg"
                className={cn(
                  BUTTON,
                  BUTTON_DESKTOP,
                  'focus-visible:ring-offset-navy',
                )}
              >
                {t('nav.bookConsultation')}
                <ArrowRightIcon className="size-4 max-lg:hidden rtl:-scale-x-100" />
              </Button>

              <Button
                to={PATHS.requestQuote}
                variant="outline"
                size="lg"
                className={cn(
                  BUTTON,
                  BUTTON_DESKTOP,
                  BUTTON_OUTLINE_ON_NAVY,
                  'focus-visible:ring-offset-navy',
                )}
              >
                {t('nav.requestQuote')}
              </Button>
            </Reveal>

            <TrustLine className="max-lg:hidden mt-7">{text.trust}</TrustLine>
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
                alt={text.imageAlt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-4/3 w-full lg:aspect-5/4 rounded-3xl object-cover object-top"
              />
            </picture>

            <div className={cn(PHOTO_CARD, PHOTO_CARD_DESKTOP)}>
              <span
                aria-hidden="true"
                className="flex size-9 lg:size-11 shrink-0 items-center justify-center rounded-lg bg-turquoise-soft text-petrol"
              >
                <ShieldIcon className="size-4.5 lg:size-5.5" />
              </span>

              <span>
                <span className="block text-body-sm font-semibold text-heading">
                  {text.cardTitle}
                </span>
                {/* Hidden where it would wrap, so the card stays two lines:
                    the English needs about 414px of screen, the Arabic 360. */}
                <span
                  className={cn(
                    'block mt-0.5 text-caption text-ink-muted',
                    language === 'en'
                      ? 'max-[413px]:hidden'
                      : 'max-[359px]:hidden',
                  )}
                >
                  {text.cardSubtitle}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Below 1024 the trust line comes after the photograph and its
            card: 46px (mt-11.5) is the card's 16px overhang plus 30px of
            air. */}
        <TrustLine className="lg:hidden mt-11.5">{text.trust}</TrustLine>
      </Container>
    </section>
  )
}

/*
 * The trust line. It sits under the buttons from 1024 up and under the
 * photograph below that, so it is rendered in both places and each copy
 * is hidden (display: none) at the widths where it does not belong.
 */
function TrustLine({
  className,
  children,
}: {
  className?: string
  children: string
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-body-sm text-on-navy-muted',
        className,
      )}
    >
      <PinIcon size={16} className="shrink-0" />
      {children}
    </p>
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

      {/* The F mark, run off the inline-end corner: left in Arabic. Hidden
          below 1024, where it read as dark blobs behind the buttons. */}
      <svg
        viewBox="0 0 474 501"
        focusable="false"
        className="absolute -end-24 -bottom-20 h-136 w-auto max-lg:hidden opacity-7"
        fill="var(--color-turquoise)"
      >
        <rect x="0" y="0" width="474" height="150" rx="75" />
        <rect x="0" y="175" width="304" height="150" rx="75" />
        <circle cx="75" cy="426" r="75" />
      </svg>
    </div>
  )
}

/** One turquoise "·". The no-break space keeps it on the word it follows. */
function TitleSeparator({ className }: { className?: string }) {
  return <span className={cn('text-turquoise', className)}>{' ·'}</span>
}

/*
 * The H1, with each "·" of the copy drawn turquoise. The four words are
 * set as two pairs, each pair on its own line, and the dot between the
 * pairs is dropped so no line ends on a separator.
 *
 * The English is always two lines. "Administrative · Technology" is about
 * 11.6em wide, wider than the column at the hero size, so its size is
 * capped at 1/12 of the column (100cqi; the column is a size container).
 * It is set inline so the text-hero class keeps its weight and leading.
 *
 * The Arabic is two lines below 1024 only. From 1024 up its pairs run on
 * as one sentence, at the hero size, and wrap where they fall.
 */
function HeroTitle({
  text,
  alwaysTwoLines,
}: {
  text: string
  alwaysTwoLines: boolean
}) {
  const words = text.split(TITLE_SEPARATOR)
  const lines = [words.slice(0, 2), words.slice(2)]

  return (
    <Reveal
      as="h1"
      delay={60}
      className="mt-6 font-display text-hero tracking-latin-tight text-balance text-white"
      style={{
        fontSize: alwaysTwoLines
          ? 'min(var(--text-hero), 100cqi / 12)'
          : undefined,
      }}
    >
      {lines.map((line, lineIndex) => (
        <Fragment key={line.join()}>
          {lineIndex > 0 ? (
            <>
              <TitleSeparator
                className={alwaysTwoLines ? 'hidden' : 'max-lg:hidden'}
              />{' '}
            </>
          ) : null}
          <span
            className={
              alwaysTwoLines
                ? 'block whitespace-nowrap'
                : 'max-lg:block max-lg:whitespace-nowrap'
            }
          >
            {line.map((word, index) => (
              <Fragment key={word}>
                {index > 0 ? (
                  <>
                    <TitleSeparator />{' '}
                  </>
                ) : null}
                {word}
              </Fragment>
            ))}
          </span>
        </Fragment>
      ))}
    </Reveal>
  )
}
