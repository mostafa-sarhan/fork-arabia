import { FormLayout } from '@/components/forms/FormLayout'
import { PageHero } from '@/components/PageHero'
import { draft, localizeAll, proposed } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { usePageMeta } from '@/lib/usePageMeta'
import { ContactDetails } from './sections/ContactDetails'
import { ContactForm } from './sections/ContactForm'

/*
 * What the page itself says: the storyboard's contact page (English
 * written here, `draft`, listed in docs/copy-review.md).
 */
const COPY = {
  crumb: draft('تواصل معنا', 'Contact us'),
  title: draft('تواصل معنا', 'Contact us'),
  lead: draft(
    'فريقنا في الرياض وطنطا جاهز يرد على استفساراتك.',
    'Our team in Riyadh and Tanta is ready to answer your questions.',
  ),
}

/* What happens after sending, at the top of the aside (`proposed`). */
const STEPS = [
  proposed('نستلم رسالتك', 'We receive your message'),
  proposed('نراجعها', 'We review it'),
  proposed('نرد عليك خلال يوم عمل', 'We reply within one business day'),
]

/**
 * Contact us: the hero, the company's offices and channels, and the
 * message form, in the other form pages' layout.
 */
export default function ContactPage() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)
  const steps = localizeAll(STEPS, language)

  usePageMeta({ title: text.title, description: text.lead, indexable: true })

  return (
    <>
      <PageHero title={text.title} crumb={text.crumb} lead={text.lead} />

      <FormLayout steps={steps} aside={<ContactDetails />}>
        <ContactForm />
      </FormLayout>
    </>
  )
}
