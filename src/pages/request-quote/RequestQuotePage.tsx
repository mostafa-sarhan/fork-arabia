import { FormLayout } from '@/components/forms/FormLayout'
import { PageHero } from '@/components/PageHero'
import { draft, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { usePageMeta } from '@/lib/usePageMeta'
import { QuoteContact } from './sections/QuoteContact'
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

/**
 * Request a quote: the hero, the company's contact points and the quote
 * form, in the booking page's layout.
 */
export default function RequestQuotePage() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  usePageMeta({ title: text.title, description: text.lead, indexable: true })

  return (
    <>
      <PageHero title={text.title} crumb={text.crumb} lead={text.lead} />

      <FormLayout aside={<QuoteContact />}>
        <QuoteForm />
      </FormLayout>
    </>
  )
}
