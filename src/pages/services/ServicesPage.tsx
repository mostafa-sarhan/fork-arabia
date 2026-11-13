import { PageHero, type PageHeroFact } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { ConsultationCta } from '@/components/sections/ConsultationCta'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { SectorCard } from '@/components/sectors/SectorCard'
import { CONSULTATION_INVITE } from '@/config/consultation'
import { SECTOR_INDEX } from '@/data/sectorIndex'
import { getSectorDetail } from '@/data/sectors'
import { COUNTRIES } from '@/data/sectors/countries'
import type { SectorDetail } from '@/data/sectors/types'
import type { Language } from '@/lib/i18n/languageConfig'
import { copy, draft, localizeAll, proposed, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { usePageMeta } from '@/lib/usePageMeta'
import { countriesWord, servicesCount } from '@/pages/sector/sectorCounts'
import { countriesOf } from '@/pages/sector/serviceGroups'

/*
 * What the page itself says. The title is the storyboard's heading; the
 * breadcrumb and the browser title are the navbar's own "Our services".
 * The nine cards come from the sector data, as on the home page.
 *
 * Arabic is the storyboard's, English the profile's where it has it;
 * `draft` and `proposed` mark wording written here, listed in
 * docs/copy-review.md.
 */
const COPY = {
  title: copy('منظومة خدمات متكاملة', 'An Integrated Service Ecosystem'),
  lead: draft(
    'احتياجات متعددة تُدار من خلال شريك واحد ورؤية واحدة، عبر 9 قطاعات.',
    'Multiple needs, managed through one partner and one vision, across 9 sectors.',
  ),

  /* The words under the hero's three figures. */
  sectorsWord: draft('قطاعات', 'sectors'),
  servicesWord: proposed('خدمة', 'services'),

  cardLink: draft('تفاصيل القطاع', 'Sector details'),
  ctaTitle: draft('مش متأكد أنهي خدمة تناسبك؟', 'Not sure which service fits you?'),
  partnersHeading: copy('شركاؤنا', 'Our Partners'),
}

/*
 * Every sector with its content. This page is its own lazy route, so the
 * nine detail files load only here; the navbar, footer and home page keep
 * reading the light index.
 */
const SECTORS = SECTOR_INDEX.map((sector) => getSectorDetail(sector.slug))
const ALL_SERVICES = SECTORS.flatMap((sector) => sector.services)

/* White, straight under the hero; the consultation card's own top
   padding spaces the next section. */
const SECTION = 'pt-14 lg:pt-20 bg-surface'

/* The home page's grid: one column, two from 768, three from 1024. */
const GRID = 'grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-6'

/* A country code: petrol on the turquoise tint, turquoise when the card
   turns navy, as the card's icon square does. */
const COUNTRY_PILL =
  'rounded-full px-2 py-0.5 text-caption font-bold bg-turquoise-soft text-petrol transition-colors duration-200 group-card-on:bg-turquoise/16 group-card-on:text-turquoise'

/**
 * The services page: the hero with the three totals, every sector as a
 * card (with its service count and countries), the consultation card and
 * the partners.
 */
export default function ServicesPage() {
  const { language, t } = useLanguage()
  const text = localizeAll(COPY, language)

  usePageMeta({ titleKey: 'nav.services', description: text.lead, indexable: true })

  const facts: PageHeroFact[] = [
    { value: String(SECTORS.length), label: text.sectorsWord },
    { value: String(ALL_SERVICES.length), label: text.servicesWord },
    { value: String(countriesOf(ALL_SERVICES).length), label: countriesWord(language) },
  ]

  return (
    <>
      <PageHero title={text.title} crumb={t('nav.services')} lead={text.lead} facts={facts} />

      <section className={SECTION}>
        <Container>
          <ul className={GRID}>
            {SECTORS.map((sector, index) => (
              <li key={sector.id}>
                {/* 40ms apart, as on the home page. */}
                <Reveal delay={index * 40} className="h-full">
                  <SectorCard
                    sector={sector}
                    linkLabel={text.cardLink}
                    language={language}
                    meta={
                      sector.services.length > 0 ? (
                        <SectorMeta sector={sector} language={language} />
                      ) : undefined
                    }
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The invitation is the storyboard's, shared with the sector pages. */}
      <ConsultationCta title={text.ctaTitle} text={resolveCopy(CONSULTATION_INVITE, language)} />
      <PartnersSection heading={text.partnersHeading} />
    </>
  )
}

/**
 * A card's meta row: "{n} خدمات" (or "خدمة واحدة") and the codes of the
 * countries its services name. Not drawn for premium residency, which has
 * tracks instead of services.
 */
function SectorMeta({ sector, language }: { sector: SectorDetail; language: Language }) {
  const countries = countriesOf(sector.services)

  return (
    <>
      <span>{servicesCount(sector.services.length, language)}</span>

      {countries.length > 0 ? (
        <span dir="ltr" className="flex flex-wrap gap-1">
          {countries.map((country) => (
            <span key={country} className={COUNTRY_PILL}>
              {COUNTRIES[country].code}
            </span>
          ))}
        </span>
      ) : null}
    </>
  )
}
