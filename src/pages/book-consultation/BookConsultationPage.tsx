import { PageHero } from '@/components/PageHero'
import { FormLayout } from '@/components/forms/FormLayout'
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

      <FormLayout aside={<ConsultationDetails />}>
        <BookingForm />
      </FormLayout>
    </>
  )
}
