import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { SectorExtras } from '@/data/sectors/types'
import { localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { SectorBookingCard } from './SectorBookingCard'

type ResidencyRoleProps = {
  steps: SectorExtras['steps']
  /** The sector's question, for the booking card beside the steps. */
  ctaTitle: string
}

/* Steps beside a 340px booking card from 1024, as the services section. */
const LAYOUT = 'flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16'
const ASIDE = 'lg:w-85 lg:shrink-0 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]'

/* Six numbered steps: one column, two from 768. */
const STEPS = 'grid mt-8 lg:mt-10 gap-3 md:grid-cols-2'
const STEP = 'flex h-full items-start gap-4 rounded-xl border p-5 border-line bg-page'
const STEP_NUMBER =
  'flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-body font-extrabold tabular-nums text-white'

/**
 * "Our role in your residency file": the six things the firm does, in
 * order, with the booking card beside them (the storyboard puts the
 * sector's question here, as this page has no services list).
 */
export function ResidencyRole({ steps, ctaTitle }: ResidencyRoleProps) {
  const { language } = useLanguage()
  const text = localizeAll(steps, language)

  return (
    <section className="pt-16 pb-18 lg:py-24 bg-surface">
      <Container className={LAYOUT}>
        <div className="min-w-0 flex-1">
          <Reveal>
            <SectionTitle>{text.title}</SectionTitle>
          </Reveal>

          <ol className={STEPS}>
            {text.items.map((step, index) => (
              <li key={step}>
                <Reveal delay={60 + index * 60} className={STEP}>
                  {/* The list already numbers the steps for assistive tech. */}
                  <span aria-hidden="true" className={STEP_NUMBER}>
                    {index + 1}
                  </span>
                  <p className="pt-1.5 text-body leading-[1.8] font-semibold text-heading">{step}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <aside className={ASIDE}>
          <SectorBookingCard title={ctaTitle} />
        </aside>
      </Container>
    </section>
  )
}
