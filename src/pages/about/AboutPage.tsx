import { PagePlaceholder } from '@/components/PagePlaceholder'
import { PATHS } from '@/config/paths'
import { usePageMeta } from '@/lib/usePageMeta'

export default function AboutPage() {
  usePageMeta({ titleKey: 'nav.about', indexable: false })

  return <PagePlaceholder titleKey="nav.about" path={PATHS.about} />
}
