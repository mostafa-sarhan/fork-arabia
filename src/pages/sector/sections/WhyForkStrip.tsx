import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { ICONS } from '@/components/ui/iconRegistry'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { WHY_FORK } from '@/data/whyFork'
import { localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * The five points: one column on phones, two from 768, three from 1024,
 * all five on one row from 1280.
 */
const GRID = 'grid mt-10 lg:mt-12 gap-3 lg:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'

/* A small card on the navy band: white at 5% over a white-at-12% border. */
const CARD = 'h-full rounded-2xl border p-5 lg:p-6 border-white/12 bg-white/5'

/* The icon on a turquoise tint; decorative, so turquoise is fine on navy. */
const ICON_CIRCLE =
  'flex size-10 items-center justify-center rounded-full bg-turquoise/15 text-turquoise'

/**
 * "Why FORK?" as a navy band: the label as the heading, its bar, the
 * one-line promise, and the five points as small cards. A darker navy
 * than the methodology above it, so the two bands read apart.
 */
export function WhyForkStrip() {
  const { language } = useLanguage()
  const text = localizeAll(WHY_FORK, language)

  return (
    <section className="pt-16 pb-18 lg:py-24 bg-navy-strong">
      <Container>
        <Reveal>
          <SectionTitle tone="navy">{text.eyebrow}</SectionTitle>
          <p className="max-w-160 mt-5 text-body-lg leading-paragraph text-pretty text-white/80">
            {text.heading}
          </p>
        </Reveal>

        <ul className={GRID}>
          {text.points.map((point, index) => {
            const Icon = ICONS[point.icon]

            return (
              <li key={point.title}>
                {/* 60ms apart after the heading. */}
                <Reveal delay={120 + index * 60} className={CARD}>
                  <span aria-hidden="true" className={ICON_CIRCLE}>
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-body-lg font-extrabold text-white">{point.title}</h3>
                  <p className="mt-1.5 text-body-sm leading-[1.8] text-white/75">{point.line}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
