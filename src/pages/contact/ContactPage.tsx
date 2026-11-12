import { PagePlaceholder } from '@/components/PagePlaceholder'
import { PATHS } from '@/config/paths'
import { usePageMeta } from '@/lib/usePageMeta'

export default function ContactPage() {
  usePageMeta({ titleKey: 'nav.contact', indexable: false })

  return <PagePlaceholder titleKey="nav.contact" path={PATHS.contact} />
}
