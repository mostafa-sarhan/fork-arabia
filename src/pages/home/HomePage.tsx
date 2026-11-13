import { usePageMeta } from '@/lib/usePageMeta'
import { AboutSection } from './sections/AboutSection'
import { HeroSection } from './sections/HeroSection'
import { PartnersSection } from './sections/PartnersSection'
import { PresenceSection } from './sections/PresenceSection'
import { ServicesSection } from './sections/ServicesSection'
import { StatsSection } from './sections/StatsSection'
import { WhyForkSection } from './sections/WhyForkSection'

/**
 * The home page: the hero, the four numbers that overlap its edge, who
 * the company is, the nine service sectors, why to choose it, where it
 * works, then who it works with.
 *
 * Its title is the company's full name rather than a page name, so it is
 * the one page that takes no brand suffix.
 */
export default function HomePage() {
  usePageMeta({ titleKey: 'home.title', brandSuffix: false, indexable: true })

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <WhyForkSection />
      <PresenceSection />
      <PartnersSection />
    </>
  )
}
