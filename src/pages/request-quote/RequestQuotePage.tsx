import { PagePlaceholder } from '@/components/PagePlaceholder'
import { PATHS } from '@/config/paths'
import { usePageMeta } from '@/lib/usePageMeta'

export default function RequestQuotePage() {
  usePageMeta({ titleKey: 'nav.requestQuote', indexable: false })

  return <PagePlaceholder titleKey="nav.requestQuote" path={PATHS.requestQuote} />
}
