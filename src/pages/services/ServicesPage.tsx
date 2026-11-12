import { PagePlaceholder } from '@/components/PagePlaceholder'
import { PATHS } from '@/config/paths'
import { usePageMeta } from '@/lib/usePageMeta'

export default function ServicesPage() {
  usePageMeta({ titleKey: 'nav.services', indexable: false })

  return <PagePlaceholder titleKey="nav.services" path={PATHS.services} />
}
