import { PagePlaceholder } from '@/components/PagePlaceholder'
import { PATHS } from '@/config/paths'
import { usePageMeta } from '@/lib/usePageMeta'

export default function PresencePage() {
  usePageMeta({ titleKey: 'nav.presence', indexable: false })

  return <PagePlaceholder titleKey="nav.presence" path={PATHS.presence} />
}
