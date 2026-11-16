import { PageHero } from '@/components/PageHero'
import { FormLayout } from '@/components/forms/FormLayout'
import { copy, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { BookingForm } from './sections/BookingForm'
import { ConsultationDetails } from './sections/ConsultationDetails'

/*
 * What the page itself says: the storyboard's booking page (English
 * written here, `draft`, listed in docs/copy-review.md).
 */
const COPY = {
  crumb: copy('حجز استشارة', 'Book a consultation'),
  title: copy('احجز استشارة مجانية', 'Book a free consultation'),
  lead: copy(
    'املأ البيانات وسيتواصل معك فريقنا خلال يوم عمل لتأكيد الموعد.',
    'Fill in your details and our team will contact you within one business day to confirm the appointment.',
  ),
}

/* What happens after sending, at the top of the aside (`proposed`). */
const STEPS = [
  copy('نستلم طلبك', 'We receive your request'),
  copy('نتواصل معك خلال يوم عمل', 'We contact you within one business day'),
  copy('نؤكد موعد الاستشارة', 'We confirm your consultation'),
]

/**
 * Book a consultation: the hero, the consultation's details and the
 * booking form.
 */
export default function BookConsultationPage() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)
  const steps = localizeAll(STEPS, language)

  return (
    <>
      <PageHero title={text.title} crumb={text.crumb} lead={text.lead} />

      <FormLayout steps={steps} aside={<ConsultationDetails />}>
        <BookingForm />
      </FormLayout>
    </>
  )
}
