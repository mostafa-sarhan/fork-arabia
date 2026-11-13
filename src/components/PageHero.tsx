import { BrandMarkWatermark } from '@/components/BrandMarkWatermark'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PATHS } from '@/config/paths'
import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'

/** One figure in the hero's optional row: "2016" over "Year founded". */
export type PageHeroFact = {
  value: string
  label: string
}

type PageHeroProps = {
  /** The page's H1; also the breadcrumb's current page. */
  title: string
  lead: string
  facts?: PageHeroFact[]
}

/*
 * Navy with the home hero's faint grid. 48px top below 1024, 72px from it;
 * the foot is the same unless the facts row closes the hero instead.
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

/*
 * The lead: 18px, 20px from 1024 (a size used only in the heroes), white
 * at 80%, at most 640px wide.
 */
const LEAD =
  'max-w-160 mt-5 text-body-lg lg:text-[1.25rem] leading-paragraph text-pretty text-white/80'

/*
 * The facts row, under a white hairline. Three compact columns at every
 * width, with hairlines between them; the first sits flush at the inline
 * start, under the title.
 */
const FACTS = 'grid grid-cols-3 mt-10 lg:mt-14 border-t py-8 lg:py-10 border-white/12'
const FACT = 'px-3 sm:px-6 lg:px-10 first:ps-0 not-first:border-s border-white/12'

/* 28px on phones, 40px from 768: sizes used only here. */
const FACT_VALUE =
  'font-display text-[1.75rem] md:text-[2.5rem] leading-[1.1] font-extrabold tabular-nums text-white'
const FACT_LABEL = 'mt-1.5 text-body-sm md:text-body text-white/75'

/**
 * The hero every inner page opens with: breadcrumb, H1, one lead line and,
 * optionally, a row of three key figures.
 */
export function PageHero({ title, lead, facts }: PageHeroProps) {
  const { t } = useLanguage()

  return (
    <section className={SECTION}>
      <Container className={cn(CONTENT, !facts && CONTENT_FOOT)}>
        <Breadcrumb
          tone="navy"
          items={[{ label: t('nav.home'), to: PATHS.home }, { label: title }]}
        />

        {/* Title, lead and figures enter 60ms apart. The text is
            positioned so it paints over the watermark. */}
        <div className="relative mt-6">
          <BrandMarkWatermark tone="white" className={WATERMARK} />

          <Reveal
            as="h1"
            className="relative font-display text-page-title tracking-latin-tight text-balance text-white"
          >
            {title}
          </Reveal>

          <Reveal as="p" delay={60} className={cn(LEAD, 'relative')}>
            {lead}
          </Reveal>
        </div>

        {facts ? (
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
      </Container>
    </section>
  )
}
