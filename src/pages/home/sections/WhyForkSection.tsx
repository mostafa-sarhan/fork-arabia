import meetingPhotoFallback from '@/assets/images/home/client-meeting-1400.jpg'
import meetingPhotoWide from '@/assets/images/home/client-meeting-1400.webp'
import meetingPhotoNarrow from '@/assets/images/home/client-meeting-800.webp'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { ICONS } from '@/components/ui/iconRegistry'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { WHY_FORK } from '@/data/whyFork'
import { draft, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * What this section says beyond the shared Why-FORK copy (the label,
 * heading and five points live in `src/data/whyFork.ts`, which the sector
 * pages read too). `draft` marks English written here; it is listed in
 * `docs/copy-review.md` for approval.
 */
const COPY = {
  imageAlt: draft(
    'مستشار من فورك العربية في اجتماع مع عميل بمكتب الرياض',
    'A FORK ARABIA consultant meeting a client at the Riyadh office',
  ),
}

/*
 * The start column. It is not sticky: it is about as tall as the five
 * cards, so it would barely move.
 */
const START_COLUMN = 'flex flex-col gap-6 lg:gap-8'

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
  const text = localizeAll({ ...WHY_FORK, ...COPY }, language)

  return (
    <section className="pt-16 pb-18 lg:py-28 bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 lg:items-stretch gap-8 lg:gap-16">
          {/* Heading and photograph, at the inline start. They
              enter first, then the cards. */}
          <Reveal className={START_COLUMN}>
            <SectionTitle label={text.eyebrow}>{text.heading}</SectionTitle>

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
              const Icon = ICONS[point.icon]
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
