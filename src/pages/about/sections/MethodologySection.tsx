import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'
import { copy, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says: Arabic from the storyboard's About page,
 * English from the company profile.
 */
const COPY = {
  heading: copy('منهجية العمل', 'Our Methodology'),

  steps: [
    {
      title: copy('الفهم', 'Understand'),
      line: copy(
        'فهم نشاط العميل وأهدافه وبيئة العمل التي يتحرك داخلها.',
        'Understanding the client’s activity, goals and the business environment in which it operates.',
      ),
    },
    {
      title: copy('التقييم', 'Assess'),
      line: copy(
        'تحديد الوضع الحالي والمتطلبات والفجوات والأولويات.',
        'Defining the current situation, requirements, gaps and priorities.',
      ),
    },
    {
      title: copy('التصميم', 'Design'),
      line: copy(
        'بناء نطاق عمل متكامل يحدد الحلول والمخرجات والمسؤوليات.',
        'Building an integrated scope of work that defines solutions, outputs and responsibilities.',
      ),
    },
    {
      title: copy('التنفيذ', 'Implement'),
      line: copy(
        'تنسيق التخصصات وإدارة التنفيذ وفق خطة واضحة.',
        'Coordinating specialisms and managing implementation according to a clear plan.',
      ),
    },
    {
      title: copy('المتابعة', 'Follow up'),
      line: copy(
        'مراجعة المخرجات وقياس التقدم واقتراح فرص التطوير المستمر.',
        'Reviewing outputs, measuring progress and proposing continuous improvement opportunities.',
      ),
    },
  ],
}

/*
 * How the steps are laid out:
 *   below 768   a vertical timeline: circle at the inline start, text
 *               beside it, a hairline down to the next circle;
 *   768–1023    three centred columns, no line;
 *   from 1024   five centred columns on one line through the circles.
 */
const STEPS = 'relative grid md:grid-cols-3 md:gap-y-12 lg:grid-cols-5'
const STEP =
  'relative flex gap-5 pb-10 last:pb-0 md:flex-col md:items-center md:gap-0 md:px-3 md:pb-0 md:text-center'

/* The phone timeline's hairline, from under one circle to the next. */
const STEP_CONNECTOR = 'absolute start-7 top-14 bottom-0 w-px md:hidden bg-white/14'

/*
 * The line through the circles' centres (28px down), from 1024 only. It
 * runs from the middle of the first column to the middle of the last:
 * 10% in from each side, half of one fifth.
 */
const RAIL = 'absolute top-7 start-[10%] end-[10%] h-px max-lg:hidden'

/*
 * The touch. Once the section is revealed (<Reveal> sets data-reveal="in"
 * on the list's box), the turquoise line draws over the grey one from the
 * inline start, and each circle fills turquoise with a navy number as the
 * line reaches it (its delay is set per step, below).
 *
 * The finished state is the plain classes; the `in-data-[reveal=pending]`
 * ones only hold it back while the box waits, and only without reduced
 * motion, which therefore shows the finished state at once.
 */
const RAIL_PROGRESS =
  'origin-left rtl:origin-right scale-x-100 bg-turquoise transition-[scale] ease-linear in-data-[reveal=pending]:motion-safe:scale-x-0'

const CIRCLE =
  'relative flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-turquoise bg-turquoise text-body-lg font-extrabold tabular-nums text-navy transition-colors duration-(--duration-reveal) ease-out-soft'
const CIRCLE_WAITING =
  'in-data-[reveal=pending]:motion-safe:bg-navy in-data-[reveal=pending]:motion-safe:text-white'

/*
 * The line's timing. It draws at a constant speed, so it reaches circle i
 * at LINE_START_MS + i × (LINE_DURATION_MS / gaps between circles): with
 * five steps, 200, 500, 800, 1100 and 1400ms. Phones and tablets have no
 * line but keep the same beat.
 */
const LINE_START_MS = 200
const LINE_DURATION_MS = 1200

/* 22px, 20px on phones: sizes used only on the About page. */
const STEP_TITLE = 'text-[1.25rem] md:text-[1.375rem] leading-[1.4] font-extrabold text-white'

export function MethodologySection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="py-16 lg:py-28 bg-navy bg-grid-on-navy">
      <Container>
        <Reveal className="flex flex-col gap-4 lg:gap-5">
          <Eyebrow />
          <h2 className="font-display text-section-title text-balance text-white">
            {text.heading}
          </h2>
        </Reveal>

        <Reveal delay={120} className="relative mt-10 lg:mt-16">
          <span aria-hidden="true" className={cn(RAIL, 'bg-white/14')} />
          <span
            aria-hidden="true"
            className={cn(RAIL, RAIL_PROGRESS)}
            style={{
              transitionDelay: `${LINE_START_MS}ms`,
              transitionDuration: `${LINE_DURATION_MS}ms`,
            }}
          />

          <ol className={STEPS}>
            {text.steps.map((step, index) => (
              <li key={step.title} className={STEP}>
                {index < text.steps.length - 1 ? (
                  <span aria-hidden="true" className={STEP_CONNECTOR} />
                ) : null}

                {/* The list already numbers the steps for assistive tech. */}
                <span
                  aria-hidden="true"
                  className={cn(CIRCLE, CIRCLE_WAITING)}
                  style={{ transitionDelay: `${circleDelay(index, text.steps.length)}ms` }}
                >
                  {index + 1}
                </span>

                {/* On phones the title sits level with the circle. */}
                <div className="pt-3 md:pt-6">
                  <h3 className={STEP_TITLE}>{step.title}</h3>
                  <p className="mt-2 text-body leading-paragraph text-white/75">{step.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  )
}

/* When circle `index` fills: the moment the line reaches its centre. */
function circleDelay(index: number, stepCount: number) {
  return LINE_START_MS + index * (LINE_DURATION_MS / (stepCount - 1))
}
