import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { copy, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says: Arabic from the storyboard's About page,
 * English from the company profile.
 */
const COPY = {
  heading: copy('فلسفتنا التنافسية', 'Our Competitive Philosophy'),

  paragraph: copy(
    'نجمع في إطار واحد بين تأسيس الشركات، وخدمات المستثمرين، والاستشارات القانونية، والمراجعة والتأكيد، وتطوير الإدارات المالية، والحوكمة والتميز المؤسسي والتدريب، وحلول التكنولوجيا والذكاء الاصطناعي؛ مما يمنح عملاءنا رؤية موحدة وتنفيذًا أكثر اتساقًا عبر مراحل العمل المختلفة.',
    'We bring together, under one framework, company formation, investor services, legal consultancy, audit and assurance, finance function development, governance and institutional excellence, training, and technology & AI solutions — giving our clients a unified vision and more consistent execution across every stage of their work.',
  ),
}

/*
 * The card: soft turquoise, 28px corners (between the 24px and 32px
 * radius tokens), 32px 24px on phones, 72px 64px from 1024 and 72px 96px
 * from 1280. From 1024 the title column is 320px and the paragraph takes
 * the rest.
 */
const CARD =
  'grid lg:grid-cols-[20rem_1fr] gap-6 lg:gap-12 rounded-[1.75rem] px-6 py-8 lg:px-16 xl:px-24 lg:py-18 bg-turquoise-soft'

/*
 * The quote mark and the title share a row. From 1024 both are drawn on
 * the paragraph's 48px line box (24px at a line height of 2), so the mark,
 * the title's first line and the paragraph's first line sit level.
 */
const TITLE_ROW = 'flex items-start gap-4'

/* 28px, a size used only here; a 48px line from 1024. */
const TITLE =
  'font-display text-[1.75rem] leading-[1.4] lg:leading-12 font-extrabold text-balance text-heading'

/* 18px, 24px from 1024, on a line height of 2: sizes used only here. */
const PARAGRAPH =
  'text-[1.125rem] lg:text-[1.5rem] leading-loose font-semibold text-pretty text-heading'

export function PhilosophySection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    /* No top padding: the values above already end on a section's foot. */
    <section className="pb-18 lg:pb-28 bg-surface">
      <Container>
        <Reveal className={CARD}>
          <div className={TITLE_ROW}>
            <QuoteMark />
            <h2 className={TITLE}>{text.heading}</h2>
          </div>

          <p className={PARAGRAPH}>{text.paragraph}</p>
        </Reveal>
      </Container>
    </section>
  )
}

/* A large opening quotation mark, mirrored in Arabic so it opens the text. */
function QuoteMark() {
  return (
    <svg
      viewBox="0 0 50 40"
      aria-hidden="true"
      focusable="false"
      className="h-10 lg:h-12 w-auto shrink-0 fill-turquoise rtl:-scale-x-100"
    >
      <path d="M0 40V24C0 10.7 6.4 2.7 19.2 0l2 5.2C14.2 7.3 10.6 11.6 10.4 18H20v22H0Zm28 0V24c0-13.3 6.4-21.3 19.2-24l2 5.2C42.2 7.3 38.6 11.6 38.4 18H48v22H28Z" />
    </svg>
  )
}
