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
 * radius tokens), 32px 24px on phones and 72px 96px from 1024. From 1024
 * the title column is 260px and the paragraph takes the rest.
 */
const CARD =
  'grid lg:grid-cols-[16.25rem_1fr] gap-6 lg:gap-16 rounded-[1.75rem] px-6 py-8 lg:px-24 lg:py-18 bg-turquoise-soft'

/* 18px, 24px from 1024, on a line height of 2: sizes used only here. */
const PARAGRAPH =
  'text-[1.125rem] lg:text-[1.5rem] leading-loose font-semibold text-pretty text-heading'

export function PhilosophySection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="pb-16 lg:pb-30 bg-surface">
      <Container>
        <Reveal className={CARD}>
          <div className="flex flex-col gap-4 lg:gap-6">
            <QuoteMark />
            {/* 28px, a size used only here. */}
            <h2 className="font-display text-[1.75rem] leading-[1.4] font-extrabold text-heading">
              {text.heading}
            </h2>
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
      className="h-10 lg:h-14 w-auto fill-turquoise rtl:-scale-x-100"
    >
      <path d="M0 40V24C0 10.7 6.4 2.7 19.2 0l2 5.2C14.2 7.3 10.6 11.6 10.4 18H20v22H0Zm28 0V24c0-13.3 6.4-21.3 19.2-24l2 5.2C42.2 7.3 38.6 11.6 38.4 18H48v22H28Z" />
    </svg>
  )
}
