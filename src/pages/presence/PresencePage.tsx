import { PageHero, type PageHeroFact } from '@/components/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'
import { SERVED_COUNTRIES } from '@/config/countries'
import { OFFICES } from '@/config/offices'
import { SITE_URL } from '@/config/site'
import { COUNTRIES } from '@/data/sectors/countries'
import type { Language } from '@/lib/i18n/languageConfig'
import { draft, localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { usePageMeta } from '@/lib/usePageMeta'
import { countriesWord } from '@/pages/sector/sectorCounts'
import { CountriesSection } from './sections/CountriesSection'
import { OfficesSection } from './sections/OfficesSection'

/*
 * What the page itself says. The title is the navbar's own "Our
 * presence"; the lead is the storyboard's, also the meta description
 * (English written here, `draft`, listed in docs/copy-review.md). The
 * hero's facts come from config: each office's city and label, and the
 * number of countries.
 */
const COPY = {
  lead: draft(
    'مقر رئيسي في الرياض، وفرع في طنطا، وخدمات في 8 دول.',
    'Head office in Riyadh, a branch in Tanta, and services across 8 countries.',
  ),
}

/**
 * The Presence page: the hero, the two offices with their maps, the eight
 * countries, and the closing invitation to book.
 */
export default function PresencePage() {
  const { language, t } = useLanguage()
  const text = localizeAll(COPY, language)

  usePageMeta({ titleKey: 'nav.presence', description: text.lead, indexable: true })

  const facts: PageHeroFact[] = [
    ...OFFICES.map((office) => ({
      value: resolveCopy(office.name, language),
      label: resolveCopy(office.label, language),
    })),
    { value: String(SERVED_COUNTRIES.length), label: countriesWord(language) },
  ]

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd(language, t('brand.legal')))}
      </script>

      <PageHero title={t('nav.presence')} lead={text.lead} facts={facts} />
      <OfficesSection />
      <CountriesSection />
      <CtaSection />
    </>
  )
}

/**
 * The company and its two offices as schema.org data, in the page's
 * language, built from config/offices.ts.
 */
function organizationJsonLd(language: Language, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url: language === 'en' ? `${SITE_URL}/en` : SITE_URL,
    location: OFFICES.map((office) => ({
      '@type': 'Place',
      name: `${name} — ${resolveCopy(office.label, language)}`,
      hasMap: office.mapUrl,
      telephone: office.phones.map((phone) => phone.href.replace('tel:', '')),
      address: {
        '@type': 'PostalAddress',
        streetAddress: resolveCopy(office.address, language),
        addressLocality: resolveCopy(office.name, language),
        addressCountry: COUNTRIES[office.country].code,
      },
    })),
  }
}
