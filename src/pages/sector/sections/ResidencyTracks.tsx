import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { InfoIcon } from '@/components/ui/icons'
import type { SectorExtras } from '@/data/sectors/types'
import { localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

type ResidencyTracksProps = {
  tracks: SectorExtras['tracks']
  disclaimer: SectorExtras['disclaimer']
}

/* Six cards: one column on phones, two from 768, 3 × 2 from 1024. */
const GRID = 'grid mt-10 lg:mt-12 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5'
const CARD = 'flex h-full flex-col rounded-2xl border p-6 lg:p-7 border-line bg-surface'
const TAG =
  'self-start rounded-full bg-turquoise-soft px-3 py-1 text-caption font-bold text-petrol'

/* The terms line: fee or threshold, as the storyboard words it. */
const TERMS = 'mt-2 text-body leading-[1.85] text-pretty text-ink-muted'

/**
 * Premium residency's six tracks, each with its tag, name and terms, and
 * the note that the fees follow the centre's latest announcement — kept
 * under the cards that quote them.
 */
export function ResidencyTracks({ tracks, disclaimer }: ResidencyTracksProps) {
  const { language } = useLanguage()
  const text = localizeAll({ ...tracks, disclaimer }, language)

  return (
    <section className="pt-14 pb-16 lg:pt-20 lg:pb-24 bg-page">
      <Container>
        <Reveal>
          <SectionTitle>{text.title}</SectionTitle>
          <p className="max-w-160 mt-5 text-body-lg leading-paragraph text-pretty text-ink-muted">
            {text.intro}
          </p>
        </Reveal>

        <ul className={GRID}>
          {text.items.map((track, index) => (
            <li key={track.title}>
              <Reveal delay={60 + index * 60} className={CARD}>
                <span className={TAG}>{track.tag}</span>
                <h3 className="mt-4 text-h4 font-extrabold text-heading">{track.title}</h3>
                <p className={TERMS}>{track.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-start gap-2 text-body-sm text-ink-muted">
          <InfoIcon size={18} className="mt-0.5 shrink-0 text-petrol" />
          {text.disclaimer}
        </p>
      </Container>
    </section>
  )
}
