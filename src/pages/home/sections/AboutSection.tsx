import { Reveal } from '@/components/Reveal'
import { LocalizedLink } from '@/components/LocalizedLink'
import { Container } from '@/components/layout/Container'
import { ArrowRightIcon, EyeIcon, TargetIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import { cn } from '@/lib/cn'
import { copy, draft, localizeAll } from '@/lib/i18n/localized'
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

  /* The heading in two parts, so the year can be drawn petrol. */
  headingLead: draft(
    'شريك مهني واحد لكل مراحل أعمالك منذ',
    'One professional partner for every stage of your business since',
  ),
  headingYear: '2016',

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

/*
 * The "learn more" link. Below 1024 it is a full-width outline button,
 * 52px tall with a 1.5px navy border (no border-width token for 1.5px).
 * From 1024 up it is an underlined text link at 17px, a size used only
 * here.
 */
const LINK =
  'flex items-center gap-2 font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2'
const LINK_MOBILE =
  'max-lg:h-13 max-lg:justify-center max-lg:rounded-lg max-lg:border-[1.5px] max-lg:text-body max-lg:border-navy max-lg:text-heading max-lg:hover:bg-navy-soft'
const LINK_DESKTOP =
  'lg:min-h-11 lg:self-start lg:border-b-2 lg:text-[1.0625rem] lg:border-turquoise lg:text-link lg:hover:text-link-hover'

/*
 * The two cards. Below 1024 they stack 14px apart. From 1024 up the
 * mission card is pulled 48px over the foot of the vision card and
 * stepped 72px in from the inline start; the vision card's extra bottom
 * padding (lg:pb-24) keeps its text clear of that overlap.
 */
const VISION_CARD = 'relative overflow-hidden rounded-2xl px-6 py-7 bg-navy'
const VISION_CARD_DESKTOP = 'lg:min-h-75 lg:rounded-3xl lg:p-12 lg:pb-24'
const MISSION_CARD =
  'relative rounded-2xl border px-6 py-7 border-line bg-surface shadow-raised'
const MISSION_CARD_DESKTOP = 'lg:rounded-3xl lg:-mt-12 lg:ms-18 lg:px-10 lg:py-9'

export function AboutSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="pt-16 pb-18 lg:py-30 bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 lg:items-center gap-5.5 lg:gap-24">
          {/* Text column, at the inline start. It enters first, then the
              two cards, 120ms apart. */}
          <Reveal className="flex flex-col gap-5.5 lg:gap-7">
            <p className="flex items-center gap-3 text-eyebrow text-petrol">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-turquoise"
              />
              {text.eyebrow}
            </p>

            <h2 className="font-display text-section-title text-balance text-heading">
              {/* One string with its space: Arabic shapes the last word
                  slightly differently when the space is a separate node. */}
              {`${text.headingLead} `}
              <span className="text-petrol">{text.headingYear}</span>
            </h2>

            <p className="max-w-measure text-body leading-paragraph lg:text-body-lg lg:leading-loose text-ink-muted">
              {text.paragraph}
            </p>

            {/*
              A 2x2 grid below 1024, one strip of four from there up. The four
              columns are equal unless a label needs more: at 1024,
              "Administrative" is wider than a quarter of the column.
            */}
            <ul className="grid grid-cols-2 lg:grid-cols-[repeat(4,minmax(max-content,1fr))] max-w-measure lg:border-y lg:gap-x-4 lg:border-line">
              {text.disciplines.map((discipline) => (
                <li
                  key={discipline}
                  className="flex items-center border-b lg:border-b-0 gap-2.5 py-3.5 lg:py-4.5 text-body font-bold border-line text-heading"
                >
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-turquoise"
                  />
                  {discipline}
                </li>
              ))}
            </ul>

            <LocalizedLink
              to={PATHS.about}
              className={cn(LINK, LINK_MOBILE, LINK_DESKTOP)}
            >
              {text.link}
              <ArrowRightIcon className="size-4.5 rtl:-scale-x-100" />
            </LocalizedLink>
          </Reveal>

          {/* Cards column, at the inline end. */}
          <div className="flex flex-col lg:block gap-3.5">
            <Reveal delay={120} className={cn(VISION_CARD, VISION_CARD_DESKTOP)}>
              <BrandMarkWatermark />

              <div className="relative flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-turquoise/16 text-turquoise"
                >
                  <EyeIcon size={24} />
                </span>
                <h3 className="text-body-lg font-bold text-white">
                  {text.visionLabel}
                </h3>
              </div>

              {/* 19px, 26px from 1024: sizes used only here. */}
              <p className="relative mt-6 text-[1.1875rem] lg:text-[1.625rem] leading-[1.8] font-semibold text-white">
                {text.vision}
              </p>
            </Reveal>

            <Reveal
              delay={240}
              className={cn(MISSION_CARD, MISSION_CARD_DESKTOP)}
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-turquoise-soft text-petrol"
                >
                  <TargetIcon size={22} />
                </span>
                <h3 className="text-body-lg font-bold text-petrol">
                  {text.missionLabel}
                </h3>
              </div>

              {/* 17px, 20px from 1024: sizes used only here. */}
              <p className="mt-5 text-[1.0625rem] lg:text-[1.25rem] leading-[1.85] font-semibold text-heading">
                {text.mission}
              </p>
            </Reveal>
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
      className="absolute -end-10 lg:-end-14 -bottom-12 lg:-bottom-16 h-45 lg:h-65 w-auto fill-white opacity-7"
    >
      <rect x="0" y="0" width="474" height="150" rx="75" />
      <rect x="0" y="175" width="304" height="150" rx="75" />
      <circle cx="75" cy="426" r="75" />
    </svg>
  )
}
