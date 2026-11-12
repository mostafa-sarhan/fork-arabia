import { usePageMeta } from '@/lib/usePageMeta'
import { HomeHero } from './HomeHero'
import { HomeStats } from './HomeStats'

/**
 * The home page: the hero, then the four numbers that overlap its edge.
 *
 * Its title is the company's full name rather than a page name, so it is
 * the one page that takes no brand suffix.
 */
export default function HomePage() {
  usePageMeta({ titleKey: 'home.title', brandSuffix: false, indexable: true })

  return (
    <>
      <HomeHero />
      <HomeStats />
    </>
  )
}
