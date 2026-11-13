import { PageHero, type PageHeroFact } from '@/components/PageHero'
import { Button } from '@/components/ui/Button'
import { ICONS } from '@/components/ui/iconRegistry'
import { CONSULTATION_FACTS } from '@/config/consultation'
import { PATHS } from '@/config/paths'
import type { SectorDetail } from '@/data/sectors/types'
import { localizeAll, proposed, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { countriesOf } from '../serviceGroups'
import { countriesWord, servicesWord } from '../sectorCounts'

/*
 * The word before the sector's number ("القطاع 02"). Not in the
 * storyboard, so both languages are `proposed` (docs/copy-review.md).
 */
const COPY = {
  kicker: proposed('القطاع', 'Sector'),
}

/*
 * The two buttons: a two-column grid below 1024 (each half the width),
 * side by side at their own width from it.
 */
const ACTIONS = 'grid grid-cols-2 gap-2.5 lg:flex lg:gap-3'
const BUTTON = 'max-lg:px-3 focus-visible:ring-offset-navy'

/**
 * A sector's hero: the shared PageHero with the sector's icon and number,
 * its title and long description, the two calls to action and the facts
 * row — services, countries (only when two or more), and the free
 * consultation's length and reply time.
 */
export function SectorHero({ sector }: { sector: SectorDetail }) {
  const { language, t } = useLanguage()
  const text = localizeAll(COPY, language)
  const Icon = ICONS[sector.icon]

  const serviceCount = sector.services.length
  const countryCount = countriesOf(sector.services).length
  const { duration, reply } = CONSULTATION_FACTS

  const facts: PageHeroFact[] = [
    ...(serviceCount > 0 ? [{ value: String(serviceCount), label: servicesWord(language) }] : []),
    ...(countryCount >= 2 ? [{ value: String(countryCount), label: countriesWord(language) }] : []),
    { value: resolveCopy(duration.value, language), label: resolveCopy(duration.label, language) },
    {
      value: resolveCopy(reply.value, language),
      label: resolveCopy(reply.label, language),
      hideOnNarrow: true,
    },
  ]

  return (
    <PageHero
      title={resolveCopy(sector.title, language)}
      lead={resolveCopy(sector.lead, language)}
      trail={[{ label: t('nav.services'), to: PATHS.services }]}
      icon={<Icon size={28} />}
      kicker={`${text.kicker} ${sector.number}`}
      actions={
        <div className={ACTIONS}>
          <Button to={PATHS.bookConsultation} variant="secondary" size="lg" className={BUTTON}>
            {t('nav.bookConsultation')}
          </Button>
          <Button to={PATHS.requestQuote} variant="outline-on-navy" size="lg" className={BUTTON}>
            {t('nav.requestQuote')}
          </Button>
        </div>
      }
      facts={facts}
      factsStyle="compact"
    />
  )
}
