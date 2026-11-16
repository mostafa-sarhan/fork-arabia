import { FormLayout } from '@/components/forms/FormLayout'
import { PageHero } from '@/components/PageHero'
import { copy, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { ContactDetails } from './sections/ContactDetails'
import { ContactForm } from './sections/ContactForm'

/*
 * What the page itself says: the storyboard's contact page (English
 * written here, `draft`, listed in docs/copy-review.md).
 */
const COPY = {
  crumb: copy('تواصل معنا', 'Contact us'),
  title: copy('تواصل معنا', 'Contact us'),
  lead: copy(
    'فريقنا في الرياض وطنطا جاهز يرد على استفساراتك.',
    'Our team in Riyadh and Tanta is ready to answer your questions.',
  ),
}

/* What happens after sending, at the top of the aside (`proposed`). */
const STEPS = [
  copy('نستلم رسالتك', 'We receive your message'),
  copy('نراجعها', 'We review it'),
  copy('نرد عليك خلال يوم عمل', 'We reply within one business day'),
]

/**
 * Contact us: the hero, the company's offices and channels, and the
 * message form, in the other form pages' layout.
 */
export default function ContactPage() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)
  const steps = localizeAll(STEPS, language)

  return (
    <>
      <PageHero title={text.title} crumb={text.crumb} lead={text.lead} />

      <FormLayout steps={steps} aside={<ContactDetails />}>
        <ContactForm />
      </FormLayout>
    </>
  )
}
