import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { CheckIcon } from '@/components/ui/icons'
import type { SectorExtras } from '@/data/sectors/types'
import { localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/* The checklist: one column, two from 640, three from 1024. */
const LIST = 'grid mt-8 lg:mt-10 gap-3 sm:grid-cols-2 lg:grid-cols-3'
const ITEM =
  'flex h-full items-center gap-3 rounded-xl border px-4 py-4 border-line bg-surface text-body font-semibold text-heading'
const CHECK =
  'flex size-8 shrink-0 items-center justify-center rounded-full bg-turquoise-soft text-petrol'

/** Premium residency's key benefits, as a checklist. */
export function ResidencyBenefits({ benefits }: { benefits: SectorExtras['benefits'] }) {
  const { language } = useLanguage()
  const text = localizeAll(benefits, language)

  return (
    <section className="pt-16 pb-18 lg:py-24 bg-page">
      <Container>
        <Reveal>
          <SectionTitle>{text.title}</SectionTitle>
        </Reveal>

        <Reveal delay={120}>
          <ul className={LIST}>
            {text.items.map((benefit) => (
              <li key={benefit} className={ITEM}>
                <span aria-hidden="true" className={CHECK}>
                  <CheckIcon size={18} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
