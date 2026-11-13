import { PageHero } from '@/components/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { copy, localizeAll, proposed } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { usePageMeta } from '@/lib/usePageMeta'
import { IntroSection } from './sections/IntroSection'
import { MethodologySection } from './sections/MethodologySection'
import { PhilosophySection } from './sections/PhilosophySection'
import { ValuesSection } from './sections/ValuesSection'
import { VisionMissionSection } from './sections/VisionMissionSection'

/*
 * What the page itself says: the hero and the partners heading. The title
 * is the navbar's own "About us", from the translation table.
 *
 * The lead is the storyboard's, its English the profile's. The three
 * figure labels are not in the storyboard, so both languages are
 * `proposed` and listed in `docs/copy-review.md`.
 */
const COPY = {
  lead: copy(
    'نرافق شركاءنا من الفكرة والتأسيس إلى التشغيل والحوكمة والنمو.',
    'We accompany our partners from idea and incorporation through operation, governance and growth.',
  ),

  facts: [
    { value: '2016', label: proposed('سنة التأسيس', 'Year founded') },
    { value: '8', label: proposed('دول نقدم فيها خدماتنا', 'Countries we serve') },
    { value: '9', label: proposed('قطاعات خدمات', 'Service sectors') },
  ],

  partnersHeading: copy('شركاؤنا', 'Our Partners'),
}

/**
 * The About page: the hero, who the company is, its vision and mission,
 * its six values, its competitive philosophy, how it works, its partners,
 * and the invitation to book.
 */
export default function AboutPage() {
  usePageMeta({ titleKey: 'nav.about', indexable: true })

  const { language, t } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <>
      <PageHero title={t('nav.about')} lead={text.lead} facts={text.facts} />
      <IntroSection />
      <VisionMissionSection />
      <ValuesSection />
      <PhilosophySection />
      <MethodologySection />
      <PartnersSection heading={text.partnersHeading} />
      <CtaSection />
    </>
  )
}
