import meetingPhotoFallback from '@/assets/images/home/client-meeting-1400.jpg'
import meetingPhotoWide from '@/assets/images/home/client-meeting-1400.webp'
import meetingPhotoNarrow from '@/assets/images/home/client-meeting-800.webp'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import {
  BarChartIcon,
  GlobeIcon,
  PuzzleIcon,
  RouteIcon,
  UsersIcon,
} from '@/components/ui/icons'
import { copy, draft, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says.
 *
 * Arabic is transcribed from the client's storyboard and English from the
 * company profile. `draft` marks English written here because the profile
 * had no equivalent; it is listed in `docs/copy-review.md` for approval.
 * The profile has the five lines but not their short titles.
 */
const COPY = {
  eyebrow: copy('لماذا فورك؟', 'Why FORK?'),

  heading: draft(
    'من الاستشارة للتنفيذ للمتابعة، مع فريق واحد',
    'From consultation to implementation and follow-up, with one team',
  ),

  imageAlt: draft(
    'مستشار من فورك العربية في اجتماع مع عميل بمكتب الرياض',
    'A FORK ARABIA consultant meeting a client at the Riyadh office',
  ),

  points: [
    {
      title: draft('شريك واحد', 'One Partner'),
      line: copy(
        'شريك واحد يغطي احتياجات قانونية ومالية وإدارية وتقنية متعددة.',
        'One partner covering multiple legal, financial, administrative and technology needs.',
      ),
    },
    {
      title: draft('فهم الأسواق', 'Market Understanding'),
      line: copy(
        'فهم لبيئات الأعمال المختلفة في مصر والأسواق الخليجية التي نخدمها.',
        'Understanding of the different business environments in Egypt and the Gulf markets we serve.',
      ),
    },
    {
      title: draft('حلول مصممة لك', 'Solutions Built for You'),
      line: copy(
        'حلول عملية تُبنى حسب احتياج المنشأة بدلًا من القوالب الجاهزة.',
        'Practical solutions built around the entity’s needs rather than ready-made templates.',
      ),
    },
    {
      title: draft('من الاستشارة للتنفيذ', 'From Consultation to Implementation'),
      line: copy(
        'تكامل بين الاستشارة والتنفيذ والمتابعة.',
        'Integration between consultancy, implementation and follow-up.',
      ),
    },
    {
      title: draft('تقنية وتحليل', 'Technology and Analytics'),
      line: copy(
        'توظيف التكنولوجيا والتحليل لرفع جودة المخرجات وسرعة الإنجاز.',
        'Leveraging technology and analytics to raise output quality and speed of delivery.',
      ),
    },
  ],
}

/*
 * The start column. It is not sticky: it is about as tall as the five
 * cards, so it would barely move.
 */
const START_COLUMN = 'flex flex-col gap-6 lg:gap-8'

/* One icon per point, in the order of COPY.points. */
const POINT_ICONS = [UsersIcon, GlobeIcon, PuzzleIcon, RouteIcon, BarChartIcon]

/*
 * One point. Not a link, so it only answers a pointer: the border turns
 * turquoise and a soft navy-tinted shadow comes up. Nothing moves, so
 * reduced motion needs no exception.
 */
const CARD =
  'flex items-start gap-4 rounded-2xl border p-5 lg:px-7 border-line bg-surface transition-[border-color,box-shadow] duration-200 hover:border-turquoise hover:shadow-card'

const ICON_CIRCLE =
  'flex size-10 shrink-0 items-center justify-center rounded-full bg-turquoise-soft text-heading'

/* 15px with a 1.85 line height, as in the service cards. */
const LINE = 'mt-1 text-[0.9375rem] leading-[1.85] text-ink-muted'

export function WhyForkSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="pt-16 pb-18 lg:py-28 bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 lg:items-stretch gap-8 lg:gap-16">
          {/* Eyebrow, heading and photograph, at the inline start. They
              enter first, then the cards. */}
          <Reveal className={START_COLUMN}>
            <div className="flex flex-col gap-4 lg:gap-5">
              <Eyebrow>{text.eyebrow}</Eyebrow>

              <h2 className="font-display text-section-title text-balance text-heading">
                {text.heading}
              </h2>
            </div>

            {/* Below the fold, so it loads lazily; a 4:3 box below 1024. */}
            {/* From 1024 it fills the height left under the heading, so its foot lines up with the last card. */}
            {/* It settles from 104% as the column fades in, and leans in to
                103% under a pointer; the rounded box clips both. */}
            <picture className="relative block overflow-hidden rounded-3xl isolate lg:flex-1 lg:min-h-80">
              <source
                type="image/webp"
                srcSet={`${meetingPhotoNarrow} 800w, ${meetingPhotoWide} 1400w`}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <img
                src={meetingPhotoFallback}
                width={1400}
                height={1050}
                alt={text.imageAlt}
                loading="lazy"
                decoding="async"
                className="reveal-media aspect-4/3 w-full rounded-3xl object-cover object-center transition-transform duration-600 ease-out-soft motion-safe:hover:scale-[1.03] lg:absolute lg:inset-0 lg:h-full lg:aspect-auto lg:object-[center_40%]"
              />
            </picture>
          </Reveal>

          {/* The five points, at the inline end. */}
          <ul className="flex flex-col gap-3 lg:gap-4">
            {text.points.map((point, index) => {
              const Icon = POINT_ICONS[index]
              return (
                <li key={point.title}>
                  {/* 60ms apart after the start column. */}
                  <Reveal delay={120 + index * 60} className={CARD}>
                    <span aria-hidden="true" className={ICON_CIRCLE}>
                      <Icon size={20} />
                    </span>

                    <div>
                      <h3 className="text-body-lg font-extrabold text-heading">
                        {point.title}
                      </h3>
                      <p className={LINE}>{point.line}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
