import { usePageMeta } from '@/lib/usePageMeta'
import { AboutSection } from './sections/AboutSection'
import { HeroSection } from './sections/HeroSection'
import { ServicesSection } from './sections/ServicesSection'
import { StatsSection } from './sections/StatsSection'

/**
 * The home page: the hero, the four numbers that overlap its edge, who
 * the company is, then the nine service sectors.
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
    </>
  )
}
