import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SERVED_COUNTRIES, type ServedCountry } from '@/config/countries'
import { getOffice } from '@/config/offices'
import { cn } from '@/lib/cn'
import { copy, localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * What this section says. The heading and the services tag are the
 * storyboard's (English written here, `draft`); the legend's "office" is
 * `proposed`. The countries themselves are config/countries.ts.
 */
const COPY = {
  heading: copy('نقدم خدماتنا في 8 دول', 'We serve clients in 8 countries'),
  office: copy('مكتب', 'Office'),
  services: copy('خدمات', 'Services'),
}

/* White; the closing call to action follows on the same white. */
const SECTION = 'pt-16 pb-14 lg:pt-24 lg:pb-18 bg-surface'

/* The heading, then the legend: side by side from 768, on its baseline. */
const HEADER = 'flex flex-col md:flex-row md:items-end md:justify-between gap-5'
const LEGEND = 'flex items-center gap-5 text-body-sm text-ink-muted'
const SWATCH = 'size-3.5 shrink-0 rounded-sm border'

/* Two columns below 1024, four from it. */
const GRID = 'mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4'

/*
 * One country. A light hover — turquoise border, lifted 2px (the lift is
 * motion-safe only). An office country is navy, a services one white.
 */
const TILE =
  'flex h-full flex-col items-start gap-2 rounded-xl border p-4 lg:p-5 transition-[border-color,translate] duration-(--duration-hover) ease-out-soft hover:border-turquoise motion-safe:hover:-translate-y-0.5'
const TILE_OFFICE = 'border-navy bg-navy'
const TILE_SERVICES = 'border-line bg-surface'

const NAME = 'text-body-lg font-bold'
const PILL = 'rounded-full px-2.5 py-1 text-caption font-bold'
const SUB = 'text-body-sm'

/** The eight countries, offices first, with a legend for the two tile kinds. */
export function CountriesSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className={SECTION}>
      <Container>
        <Reveal className={HEADER}>
          <SectionTitle>{text.heading}</SectionTitle>

          <ul className={LEGEND}>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className={cn(SWATCH, TILE_OFFICE)} />
              {text.office}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className={cn(SWATCH, 'border-line-strong bg-surface')} />
              {text.services}
            </li>
          </ul>
        </Reveal>

        <ul className={GRID}>
          {SERVED_COUNTRIES.map((country, index) => (
            <li key={country.id}>
              <Reveal delay={120 + index * 40} className="h-full">
                <CountryTile country={country} servicesLabel={text.services} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/**
 * One tile. An office country names the office (head office or branch)
 * and its city; any other is tagged services, with its cities if known.
 */
function CountryTile({ country, servicesLabel }: { country: ServedCountry; servicesLabel: string }) {
  const { language } = useLanguage()
  const office = country.office ? getOffice(country.office) : undefined

  if (office) {
    return (
      <div className={cn(TILE, TILE_OFFICE)}>
        <p className={cn(NAME, 'text-white')}>{resolveCopy(country.name, language)}</p>
        <span className={cn(PILL, 'bg-turquoise text-navy')}>{resolveCopy(office.label, language)}</span>
        <p className={cn(SUB, 'text-white/75')}>{resolveCopy(office.name, language)}</p>
      </div>
    )
  }

  return (
    <div className={cn(TILE, TILE_SERVICES)}>
      <p className={cn(NAME, 'text-heading')}>{resolveCopy(country.name, language)}</p>
      <span className={cn(PILL, 'bg-turquoise-soft text-petrol')}>{servicesLabel}</span>
      {country.cities ? (
        <p className={cn(SUB, 'text-ink-muted')}>{resolveCopy(country.cities, language)}</p>
      ) : null}
    </div>
  )
}
