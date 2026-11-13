import { useId } from 'react'
import { LocalizedLink } from '@/components/LocalizedLink'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { LinkArrow } from '@/components/ui/LinkArrow'
import { sectorPath } from '@/config/paths'
import { getOtherSectors, type SectorSlug } from '@/data/sectorIndex'
import { cn } from '@/lib/cn'
import { draft, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/* The storyboard's words; listed in docs/copy-review.md. */
const HEADING = draft('قطاعات أخرى', 'Other sectors')

/* White on the page tone, a hairline round it, 20px radius, 20px in. */
const CARD = 'rounded-2xl border border-line bg-surface p-5'

/*
 * One row, which is the link: the title at the inline start, the arrow at
 * the end, a hairline between rows (the list's `divide-y`). 44px tall on
 * touch widths, 38px from 1024 so the sticky aside fits a laptop screen
 * whole. Hover and focus turn it petrol and nudge the arrow.
 */
const ROW =
  'flex min-h-11 lg:min-h-9.5 items-center justify-between gap-3 text-body-sm font-semibold text-heading transition-colors duration-(--duration-hover) hover:text-petrol focus-visible:text-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:rounded-sm'

type SectorOthersProps = {
  slug: SectorSlug
  className?: string
}

/**
 * Links to the other eight sectors. On a sector page it sits under the
 * booking card in the sticky aside from 1024, and closes the page below
 * that (see `SectorOthersSection`).
 */
export function SectorOthers({ slug, className }: SectorOthersProps) {
  const { language } = useLanguage()
  const headingId = useId()

  return (
    <nav aria-labelledby={headingId} className={cn(CARD, className)}>
      <h2 id={headingId} className="text-body leading-[1.4] font-extrabold text-heading">
        {resolveCopy(HEADING, language)}
      </h2>

      <ul className="mt-2 divide-y divide-line">
        {getOtherSectors(slug).map((sector) => (
          <li key={sector.id}>
            <LocalizedLink to={sectorPath(sector.slug)} className={ROW}>
              {resolveCopy(sector.title, language)}
              <LinkArrow className="size-4 shrink-0" />
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

type SectorOthersSectionProps = {
  slug: SectorSlug
  /** The services' sticky aside carries the other sectors from 1024. */
  othersInAside: boolean
}

/**
 * The last section of a sector page: the other sectors, on the
 * consultation card's surface, so that section's own bottom spacing sets
 * them apart. Where the services' aside lists them from 1024, the section
 * shows only below it.
 */
export function SectorOthersSection({ slug, othersInAside }: SectorOthersSectionProps) {
  return (
    <div className={cn('pb-18 lg:pb-28 bg-surface', othersInAside && 'lg:hidden')}>
      <Container>
        <Reveal>
          <SectorOthers slug={slug} />
        </Reveal>
      </Container>
    </div>
  )
}
