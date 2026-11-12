import { StatCounter } from '@/components/StatCounter'
import { Container } from '@/components/layout/Container'
import { HOME_STATS } from '@/data/homeCopy'
import { cn } from '@/lib/cn'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/**
 * The four numbers under the hero.
 *
 * One set of markup, read two ways. Below 768 it is a 2x2 grid of separate
 * white cards on the page tone, sitting under the hero. From 768 up the
 * grid closes its gaps and the wrapper itself becomes the single white
 * card, its columns separated by hairlines, pulled up over the hero's
 * bottom edge by half its own height.
 */
export function HomeStats() {
  const { language } = useLanguage()

  /*
   * The section paints no background of its own: the page tone is the
   * body's, so the navy above stays visible behind the half of the card
   * that overlaps it.
   */
  return (
    <section className="pb-section-sm md:pb-section">
      <Container>
        <div className="relative z-raised mx-auto grid max-w-stats grid-cols-2 gap-6 md:-mt-stats-overlap md:grid-cols-4 md:gap-0 md:rounded-2xl md:border md:border-line md:bg-surface md:shadow-raised">
          {HOME_STATS.map((stat, index) => (
            <div
              key={stat.id}
              className={cn(
                'rounded-2xl bg-surface px-4 py-10 text-center',
                'md:rounded-none md:bg-transparent md:px-6 md:py-8.5',
                // Hairlines between the columns of the single card.
                index > 0 && 'md:border-s md:border-line',
              )}
            >
              <StatCounter
                value={stat.value}
                suffix={stat.plus ? '+' : undefined}
                suffixClassName="text-turquoise max-md:hidden"
                className="justify-center font-display text-stat-mobile text-petrol md:text-stat-tablet lg:text-stat"
              />

              <p className="mt-2 text-body-lg text-ink-muted md:mt-1.5 md:text-stat-label">
                {resolveCopy(stat.label, language)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
