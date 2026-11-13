import { StatCounter } from '@/components/StatCounter'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import { draft, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * The four numbers the storyboard puts under the hero, in its order. The
 * Arabic labels are the storyboard's; the English is ours and awaits
 * approval in `docs/copy-review.md`. `plus` is the turquoise "+" the
 * single card shows after the number.
 */
const COPY = {
  stats: [
    { value: 10, plus: true, label: draft('سنوات خبرة', 'Years of experience') },
    { value: 2000, plus: true, label: draft('عميل', 'Clients') },
    { value: 3000, plus: true, label: draft('مشروع', 'Projects') },
    { value: 8, plus: false, label: draft('دول', 'Countries') },
  ],
}

/*
 * One set of markup, read two ways. Below 768 it is a 2x2 grid of separate
 * white cards on the page tone, clear of the hero above and the footer
 * below. From 768 up the grid closes its gaps and the wrapper itself
 * becomes the single white card, its columns separated by hairlines,
 * pulled up over the hero's bottom edge by half its own height.
 */
const GRID = 'relative z-raised grid grid-cols-2 max-w-280 mx-auto gap-6'
const GRID_AS_CARD =
  'md:grid-cols-4 md:-mt-18 md:gap-0 md:rounded-2xl md:border md:border-line md:bg-surface md:shadow-raised'

const STAT = 'rounded-2xl px-4 py-10 text-center bg-surface'
const STAT_IN_CARD = 'md:rounded-none md:px-6 md:py-8.5 md:bg-transparent'

/**
 * The section paints no background of its own: the page tone is the
 * body's, so the navy above stays visible behind the half of the card
 * that overlaps it.
 */
export function StatsSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="pt-12 pb-16 md:pt-0 md:pb-section">
      <Container>
        <div className={cn(GRID, GRID_AS_CARD)}>
          {text.stats.map((stat, index) => (
            <div
              key={stat.value}
              className={cn(
                STAT,
                STAT_IN_CARD,
                // Hairlines between the columns of the single card.
                index > 0 && 'md:border-s md:border-line',
              )}
            >
              {/* 44px, 40px in the single card, 46px from 1024: sizes used
                  only here, so they have no token. */}
              <StatCounter
                value={stat.value}
                suffix={stat.plus ? '+' : undefined}
                suffixClassName="max-md:hidden text-turquoise"
                className="justify-center font-display text-[2.75rem] md:text-[2.5rem] lg:text-[2.875rem] leading-[1.05] font-extrabold text-petrol"
              />

              {/* 15px on 1.5 in the single card, used only here. */}
              <p className="mt-2 md:mt-1.5 text-body-lg md:text-[0.9375rem] md:leading-[1.5] text-ink-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
