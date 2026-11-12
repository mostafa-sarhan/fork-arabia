import { StatCounter } from '@/components/StatCounter'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import { draft, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * The four numbers the storyboard puts under the hero, in its order. The
 * Arabic labels are the storyboard's; the English is ours and awaits
 * approval in `docs/copy-review.md`. `plus` is the turquoise "+" the
 * single card shows after the number.
 */
const STATS = [
  { value: 10, plus: true, label: draft('سنوات خبرة', 'Years of experience') },
  { value: 2000, plus: true, label: draft('عميل', 'Clients') },
  { value: 3000, plus: true, label: draft('مشروع', 'Projects') },
  { value: 8, plus: false, label: draft('دول', 'Countries') },
]

/**
 * One set of markup, read two ways. Below 768 it is a 2x2 grid of separate
 * white cards on the page tone, clear of the hero above and the footer
 * below. From 768 up the grid closes its gaps and the wrapper itself
 * becomes the single white card, its columns separated by hairlines,
 * pulled up over the hero's bottom edge by half its own height.
 *
 * The section paints no background of its own: the page tone is the
 * body's, so the navy above stays visible behind the half of the card
 * that overlaps it.
 */
export function StatsSection() {
  const { language } = useLanguage()

  return (
    <section className="pt-12 pb-16 md:pt-0 md:pb-section">
      <Container>
        <div className="relative z-raised mx-auto grid max-w-[70rem] grid-cols-2 gap-6 md:-mt-18 md:grid-cols-4 md:gap-0 md:rounded-2xl md:border md:border-line md:bg-surface md:shadow-raised">
          {STATS.map((stat, index) => (
            <div
              key={stat.value}
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
                className="justify-center font-display text-[2.75rem] leading-[1.05] font-extrabold text-petrol md:text-[2.5rem] lg:text-[2.875rem]"
              />

              <p className="mt-2 text-body-lg text-ink-muted md:mt-1.5 md:text-[0.9375rem] md:leading-[1.5]">
                {resolveCopy(stat.label, language)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
