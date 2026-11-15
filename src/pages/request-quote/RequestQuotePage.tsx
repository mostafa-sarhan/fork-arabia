import { FormLayout } from '@/components/forms/FormLayout'
import { WhatsAppButton } from '@/components/forms/WhatsAppButton'
import { PageHero } from '@/components/PageHero'
import { draft, localizeAll, proposed } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { QuoteForm } from './sections/QuoteForm'

/*
 * What the page itself says: the storyboard's quote page (English written
 * here, `draft`, listed in docs/copy-review.md).
 */
const COPY = {
  crumb: draft('طلب عرض سعر', 'Request a quote'),
  title: draft('اطلب عرض سعر', 'Request a quote'),
  lead: draft(
    'اختر الخدمة واكتب تفاصيل طلبك، وسنرسل لك عرض السعر على بريدك الإلكتروني.',
    'Choose the service and describe your request, and we will email you a quote.',
  ),
}

/* What happens after sending, at the top of the aside (`proposed`). */
const STEPS = [
  proposed('نستلم طلبك', 'We receive your request'),
  proposed('ندرس تفاصيل طلبك', 'We study the details of your request'),
  proposed('نرسل لك عرض السعر على بريدك الإلكتروني', 'We email you the quote'),
]

/**
 * Request a quote: the hero, the quote form, and an aside with what
 * happens next and a WhatsApp shortcut, in the booking page's layout.
 */
export default function RequestQuotePage() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)
  const steps = localizeAll(STEPS, language)

  return (
    <>
      <PageHero title={text.title} crumb={text.crumb} lead={text.lead} />

      <FormLayout steps={steps} aside={<WhatsAppButton />}>
        <QuoteForm />
      </FormLayout>
    </>
  )
}
