import { CtaSection } from '@/components/sections/CtaSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { AboutSection } from './sections/AboutSection'
import { HeroSection } from './sections/HeroSection'
import { PresenceSection } from './sections/PresenceSection'
import { ServicesSection } from './sections/ServicesSection'
import { StatsSection } from './sections/StatsSection'
import { WhyForkSection } from './sections/WhyForkSection'

/**
 * The home page: the hero, the four numbers that overlap its edge, who
 * the company is, the nine service sectors, why to choose it, where it
 * works, who it works with, and finally the invitation to book.
 *
 * Its title is the company's full name rather than a page name, so it is
 * the one page that takes no brand suffix.
 */
export default function HomePage() {

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <WhyForkSection />
      <PresenceSection />
      <PartnersSection />
      <CtaSection />
    </>
  )
}
