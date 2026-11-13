import type { ReactNode } from 'react'
import { BrandMarkWatermark } from '@/components/BrandMarkWatermark'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { PATHS } from '@/config/paths'
import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'

/** One figure in the hero's optional row: "2016" over "Year founded". */
export type PageHeroFact = {
  value: string
  label: string
  /** Compact row only: dropped on the narrowest phones (below 375px). */
  hideOnNarrow?: boolean
}

type PageHeroProps = {
  /** The page's H1; also the breadcrumb's current page, unless `crumb` is set. */
  title: string
  /** The breadcrumb's current page, where it differs from the H1. */
  crumb?: string
  lead: string
  /** Crumbs between Home and this page, such as "Our services". */
  trail?: BreadcrumbItem[]
  /** An icon drawn in a 56px turquoise square above the title. */
  icon?: ReactNode
  /** A short line beside the icon, such as "Sector 02". */
  kicker?: string
  /** Buttons under the lead. */
  actions?: ReactNode
  facts?: PageHeroFact[]
  /**
   * `figures`: three big figures closing the hero (About).
   * `compact`: one line of small value-and-label pairs (a sector).
   */
  factsStyle?: 'figures' | 'compact'
}

/*
 * Navy with the home hero's faint grid. 48px top below 1024, 72px from it;
 * the foot is the same unless the figures row closes the hero instead.
 */
const SECTION = 'relative overflow-hidden bg-navy bg-grid-on-navy'
const CONTENT = 'relative pt-12 lg:pt-18'
const CONTENT_FOOT = 'pb-12 lg:pb-18'

/*
 * The whole F, 320px tall and white at 6%, at the inline end of the
 * content and centred on the title and lead. The hero's padding leaves
 * room above and below it, so it is never clipped. Hidden below 1024,
 * where it would sit behind the text.
 */
const WATERMARK = 'end-0 top-1/2 -translate-y-1/2 h-80 opacity-6 max-lg:hidden'

/* The optional icon square (56px, navy icon on turquoise) and its kicker. */
const ICON_SQUARE = 'grid size-14 shrink-0 place-items-center rounded-xl bg-turquoise text-on-accent'
const KICKER = 'text-body font-bold tabular-nums text-white/80'

/*
 * The lead: 18px, 20px from 1024 (a size used only in the heroes), white
 * at 80%, at most 640px wide.
 */
const LEAD =
  'max-w-160 mt-5 text-body-lg lg:text-[1.25rem] leading-paragraph text-pretty text-white/80'

/*
 * The figures row, under a white hairline. Three compact columns at every
 * width, with hairlines between them; the first sits flush at the inline
 * start, under the title.
 */
const FACTS = 'grid grid-cols-3 mt-10 lg:mt-14 border-t py-8 lg:py-10 border-white/12'
const FACT = 'px-3 sm:px-6 lg:px-10 first:ps-0 not-first:border-s border-white/12'

/* 28px on phones, 40px from 768: sizes used only here. */
const FACT_VALUE =
  'font-display text-[1.75rem] md:text-[2.5rem] leading-[1.1] font-extrabold tabular-nums text-white'
const FACT_LABEL = 'mt-1.5 text-body-sm md:text-body text-white/75'

/*
 * The compact row: value-and-label pairs on one line under a hairline,
 * wrapping when they do not fit. Each pair lists its label first for
 * assistive tech; flex-row-reverse draws the value first.
 */
const COMPACT_FACTS =
  'flex flex-wrap mt-8 lg:mt-10 gap-x-6 gap-y-2 lg:gap-x-10 border-t pt-6 border-white/12'
const COMPACT_FACT = 'flex flex-row-reverse items-baseline justify-end gap-1.5'
const COMPACT_VALUE = 'text-body-lg font-extrabold tabular-nums text-white'
const COMPACT_LABEL = 'text-body-sm md:text-body text-white/75'

/**
 * The hero every inner page opens with: breadcrumb, H1, one lead line and,
 * optionally, an icon with a kicker above the title, buttons under the
 * lead and a row of key facts.
 */
export function PageHero({
  title,
  crumb,
  lead,
  trail = [],
  icon,
  kicker,
  actions,
  facts,
  factsStyle = 'figures',
}: PageHeroProps) {
  const { t } = useLanguage()

  /* Each piece enters 60ms after the one above it. */
  const hasKicker = Boolean(icon || kicker)
  const titleDelay = hasKicker ? 60 : 0
  const closesWithFigures = Boolean(facts) && factsStyle === 'figures'

  return (
    <section className={SECTION}>
      <Container className={cn(CONTENT, !closesWithFigures && CONTENT_FOOT)}>
        <Breadcrumb
          tone="navy"
          items={[{ label: t('nav.home'), to: PATHS.home }, ...trail, { label: crumb ?? title }]}
        />

        {/* The text is positioned so it paints over the watermark. */}
        <div className="relative mt-6">
          <BrandMarkWatermark tone="white" className={WATERMARK} />

          {hasKicker ? (
            <Reveal className="relative flex items-center gap-4 mb-5">
              {icon ? (
                <span aria-hidden="true" className={ICON_SQUARE}>
                  {icon}
                </span>
              ) : null}
              {kicker ? <p className={KICKER}>{kicker}</p> : null}
            </Reveal>
          ) : null}

          <Reveal
            as="h1"
            delay={titleDelay}
            className="relative font-display text-page-title tracking-latin-tight text-balance text-white"
          >
            {title}
          </Reveal>

          <Reveal as="p" delay={titleDelay + 60} className={cn(LEAD, 'relative')}>
            {lead}
          </Reveal>

          {actions ? (
            <Reveal delay={titleDelay + 120} className="relative mt-8">
              {actions}
            </Reveal>
          ) : null}
        </div>

        {facts && factsStyle === 'figures' ? (
          <Reveal delay={120}>
            <dl className={FACTS}>
              {/* The label comes first, so it is read "Year founded: 2016";
                  flex-col-reverse draws it under the figure, and
                  justify-end keeps the figures level at the top when
                  the labels wrap to different lengths. */}
              {facts.map((fact) => (
                <div key={fact.label} className={cn(FACT, 'flex flex-col-reverse justify-end')}>
                  <dt className={FACT_LABEL}>{fact.label}</dt>
                  <dd className={FACT_VALUE}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}

        {facts && factsStyle === 'compact' ? (
          <Reveal delay={titleDelay + 180}>
            <dl className={COMPACT_FACTS}>
              {/* 375px has no breakpoint token, hence the arbitrary query. */}
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className={cn(COMPACT_FACT, fact.hideOnNarrow && 'max-[375px]:hidden')}
                >
                  <dt className={COMPACT_LABEL}>{fact.label}</dt>
                  <dd className={COMPACT_VALUE}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
