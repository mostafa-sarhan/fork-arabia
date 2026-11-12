import { PagePlaceholder } from '@/components/PagePlaceholder'
import { PATHS } from '@/config/paths'
import { usePageMeta } from '@/lib/usePageMeta'

export default function BookConsultationPage() {
  usePageMeta({ titleKey: 'nav.bookConsultation', indexable: false })

  return <PagePlaceholder titleKey="nav.bookConsultation" path={PATHS.bookConsultation} />
}
