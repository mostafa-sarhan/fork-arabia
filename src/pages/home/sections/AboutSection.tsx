import { useEffect, useRef, useState } from 'react'
import { LocalizedLink } from '@/components/LocalizedLink'
import { Container } from '@/components/layout/Container'
import { ArrowRightIcon, EyeIcon, TargetIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import { cn } from '@/lib/cn'
import { copy, draft, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says.
 *
 * Arabic is transcribed from the client's storyboard and English from the
 * company profile. `draft` marks English written here because the profile
 * had no equivalent; it is listed in `docs/copy-review.md` for approval.
 */
const COPY = {
  eyebrow: copy('من نحن', 'Who We Are'),

  /* The year inside the heading is drawn petrol; see FOUNDING_YEAR. */
  heading: draft(
    'شريك مهني واحد لكل مراحل أعمالك منذ 2016',
    'One professional partner for every stage of your business since 2016',
  ),

  paragraph: copy(
    'فورك شركة خدمات مهنية رائدة، تقدم منظومة متكاملة من الحلول القانونية والمالية والمحاسبية والإدارية والتقنية لقطاع الأعمال في جمهورية مصر العربية، والمملكة العربية السعودية، ودولة الإمارات العربية المتحدة، وسلطنة عُمان.',
    'FORK is a leading professional services company offering an integrated suite of legal, financial, accounting, administrative and technology solutions for the business sector in the Arab Republic of Egypt, the Kingdom of Saudi Arabia, the United Arab Emirates and the Sultanate of Oman.',
  ),

  disciplines: [
    copy('قانونية', 'Legal'),
    copy('مالية', 'Financial'),
    copy('إدارية', 'Administrative'),
    copy('تقنية', 'Technology'),
  ],

  visionLabel: copy('رؤيتنا', 'Our Vision'),

  /* The storyboard keeps only the first clause of the profile's vision;
     the English does the same. */
  vision: copy(
    'أن نكون الشريك المهني الأكثر تكاملًا وثقةً للشركات والمستثمرين في مصر وأسواق الخليج التي نخدمها.',
    'To be the most integrated and trusted professional partner for companies and investors in Egypt and the Gulf markets we serve.',
  ),

  missionLabel: copy('رسالتنا', 'Our Mission'),

  mission: draft(
    'حلول مترابطة تتحول من توصيات إلى إجراءات واضحة ومخرجات عملية تدعم القرار.',
    'Interconnected solutions that turn recommendations into clear actions and practical outputs that support decision-making.',
  ),

  link: draft('اعرف أكثر عن فورك', 'Learn more about FORK'),
}

/** The part of the heading drawn in petrol. */
const FOUNDING_YEAR = '2016'

/*
 * The entrance, the hero's own: the text column, then the two cards,
 * 120ms apart. It starts the first time the section scrolls into view.
 * Until then the three blocks are transparent (they still take their
 * space, so nothing shifts); prefers-reduced-motion skips both the
 * waiting state and the animation.
 */
const ENTER = 'animate-enter motion-reduce:animate-none'
const BEFORE_ENTER = 'motion-safe:opacity-0'

function enterDelay(step: number) {
  return { animationDelay: `${step * 120}ms` }
}

export function AboutSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      // Start once the top of the section is a little way up the screen.
      { rootMargin: '0px 0px -15% 0px' },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const [headingBeforeYear, headingAfterYear] = resolveCopy(
    COPY.heading,
    language,
  ).split(FOUNDING_YEAR)

  return (
    <section ref={sectionRef} className="bg-surface pt-16 pb-18 lg:py-30">
      <Container>
        <div className="grid gap-5.5 lg:grid-cols-2 lg:items-center lg:gap-24">
          {/* Text column, at the inline start. */}
          <div
            className={cn(
              'flex flex-col gap-5.5 lg:gap-7',
              seen ? ENTER : BEFORE_ENTER,
            )}
            style={enterDelay(0)}
          >
            <p className="flex items-center gap-3 text-[0.9375rem] font-bold text-petrol">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-turquoise"
              />
              {resolveCopy(COPY.eyebrow, language)}
            </p>

            <h2 className="font-display text-[length:clamp(1.875rem,2.4vw+1rem,2.875rem)] leading-[1.45] font-extrabold text-heading text-balance">
              {headingBeforeYear}
              <span className="text-petrol">{FOUNDING_YEAR}</span>
              {headingAfterYear}
            </h2>

            <p className="max-w-measure text-body leading-[1.9] text-ink-muted lg:text-body-lg lg:leading-[2]">
              {resolveCopy(COPY.paragraph, language)}
            </p>

            {/*
              A 2x2 grid below 1024, one strip of four from there up. The four
              columns are equal unless a label needs more: at 1024,
              "Administrative" is wider than a quarter of the column.
            */}
            <ul className="grid max-w-measure grid-cols-2 lg:grid-cols-[repeat(4,minmax(max-content,1fr))] lg:gap-x-4 lg:border-y lg:border-line">
              {COPY.disciplines.map((discipline) => (
                <li
                  key={resolveCopy(discipline, language)}
                  className="flex items-center gap-2.5 border-b border-line py-3.5 text-body font-bold text-heading lg:border-b-0 lg:py-4.5"
                >
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-turquoise"
                  />
                  {resolveCopy(discipline, language)}
                </li>
              ))}
            </ul>

            {/* A full-width outline button below 1024, an underlined
                text link from there up. */}
            <LocalizedLink
              to={PATHS.about}
              className={cn(
                'flex items-center gap-2 font-bold transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2',
                // Below 1024: the outline button.
                'max-lg:h-13 max-lg:justify-center max-lg:rounded-lg max-lg:border-[1.5px] max-lg:border-navy max-lg:text-body max-lg:text-heading max-lg:hover:bg-navy-soft',
                // From 1024: the underlined link.
                'lg:min-h-11 lg:self-start lg:border-b-2 lg:border-turquoise lg:text-[1.0625rem] lg:text-link lg:hover:text-link-hover',
              )}
            >
              {resolveCopy(COPY.link, language)}
              <ArrowRightIcon className="size-4.5 rtl:-scale-x-100" />
            </LocalizedLink>
          </div>

          {/* Cards column, at the inline end. */}
          <div className="flex flex-col gap-3.5 lg:block">
            <div
              className={cn(
                'relative overflow-hidden rounded-2xl bg-navy px-6 py-7 lg:min-h-75 lg:rounded-[1.5rem] lg:p-12 lg:pb-24',
                seen ? ENTER : BEFORE_ENTER,
              )}
              style={enterDelay(1)}
            >
              <BrandMarkWatermark />

              <div className="relative flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-turquoise/16 text-turquoise"
                >
                  <EyeIcon size={24} />
                </span>
                <h3 className="text-body-lg font-bold text-white">
                  {resolveCopy(COPY.visionLabel, language)}
                </h3>
              </div>

              <p className="relative mt-6 text-[1.1875rem] leading-[1.8] font-semibold text-white lg:text-[1.625rem]">
                {resolveCopy(COPY.vision, language)}
              </p>
            </div>

            {/*
              From 1024 up the mission card is pulled 48px over the bottom of
              the vision card and stepped 72px in from the inline start. The
              vision card's extra bottom padding (lg:pb-24) keeps its text
              clear of the overlap.
            */}
            <div
              className={cn(
                'relative rounded-2xl border border-line bg-surface px-6 py-7 shadow-raised lg:-mt-12 lg:ms-18 lg:rounded-[1.5rem] lg:px-10 lg:py-9',
                seen ? ENTER : BEFORE_ENTER,
              )}
              style={enterDelay(2)}
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-turquoise-soft text-petrol"
                >
                  <TargetIcon size={22} />
                </span>
                <h3 className="text-body-lg font-bold text-petrol">
                  {resolveCopy(COPY.missionLabel, language)}
                </h3>
              </div>

              <p className="mt-5 text-[1.0625rem] leading-[1.85] font-semibold text-heading lg:text-[1.25rem]">
                {resolveCopy(COPY.mission, language)}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/*
 * The F of the logo, white at 7%, run off the vision card's bottom
 * inline-end corner. The card's overflow-hidden clips it.
 */
function BrandMarkWatermark() {
  return (
    <svg
      viewBox="0 0 474 501"
      aria-hidden="true"
      focusable="false"
      className="absolute -end-10 -bottom-12 h-45 w-auto fill-white opacity-7 lg:-end-14 lg:-bottom-16 lg:h-65"
    >
      <rect x="0" y="0" width="474" height="150" rx="75" />
      <rect x="0" y="175" width="304" height="150" rx="75" />
      <circle cx="75" cy="426" r="75" />
    </svg>
  )
}
