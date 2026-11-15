import { PageHero } from '@/components/PageHero'
import { Container } from '@/components/layout/Container'
import { draft, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { usePageMeta } from '@/lib/usePageMeta'
import { BookingForm } from './sections/BookingForm'
import { ConsultationDetails } from './sections/ConsultationDetails'

/*
 * What the page itself says: the storyboard's booking page (English
 * written here, `draft`, listed in docs/copy-review.md).
 */
const COPY = {
  crumb: draft('حجز استشارة', 'Book a consultation'),
  title: draft('احجز استشارة مجانية', 'Book a free consultation'),
  lead: draft(
    'املأ البيانات وسيتواصل معك فريقنا خلال يوم عمل لتأكيد الموعد.',
    'Fill in your details and our team will contact you within one business day to confirm the appointment.',
  ),
}

/* The page tone, so the two white cards stand off it. */
const SECTION = 'py-12 lg:py-20 bg-page'

/*
 * Phones and tablets: the details first (compact), then the form, in one
 * column held to the screen (grid-cols-1 is minmax(0, 1fr), so a long
 * chosen value is cut with an ellipsis rather than widening the page).
 * From 1024 the form takes 7 of 12 columns at the inline start and the
 * details 5 at the end, sticky under the header.
 */
const LAYOUT = 'grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10'
const FORM_COLUMN = 'lg:col-span-7 lg:col-start-1 lg:row-start-1'
const ASIDE = 'lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]'

/**
 * Book a consultation: the hero, the consultation's details and the
 * booking form.
 */
export default function BookConsultationPage() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  usePageMeta({ title: text.title, description: text.lead, indexable: true })

  return (
    <>
      <PageHero title={text.title} crumb={text.crumb} lead={text.lead} />

      <section className={SECTION}>
        <Container className={LAYOUT}>
          <aside className={ASIDE}>
            <ConsultationDetails />
          </aside>

          <div className={FORM_COLUMN}>
            <BookingForm />
          </div>
        </Container>
      </section>
    </>
  )
}
