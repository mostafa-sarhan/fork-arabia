import { useId } from 'react'
import { COUNTRIES, type CountryCode } from '@/data/sectors/countries'
import { cn } from '@/lib/cn'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { NumberedService } from '../serviceGroups'
import { servicesCount } from '../sectorCounts'
import { ServiceBlock } from './ServiceBlock'

type ServiceGroupProps = {
  services: readonly NumberedService[]
  /** The group's country; omitted for the list without a heading. */
  country?: CountryCode
  /** Hidden by the filter. The services stay in the HTML either way. */
  hidden?: boolean
  className?: string
}

/*
 * The country heading row: the code (turquoise, Latin, decorative — the
 * name follows it), the name at 22px (a size used only here) and the
 * count, over a 2px navy line.
 */
const HEADING = 'flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b-2 border-navy pb-3'

/*
 * The heading row sticks while its own group scrolls by, so the next
 * group's heading pushes it out (sticky inside the group, no script). It
 * stops 12px under the header (the narrow bar, the desktop one from 1280),
 * which stays on screen on sector pages; a band of the page tone fills
 * those 12px so nothing scrolls by between the bar and the heading. On the
 * page tone with 8px of it below the line, and under the navbar and its
 * menus (z-raised). No token for those sums.
 */
const STICKY =
  'sticky z-raised bg-page pb-2 top-[calc(var(--header-height-mobile)+0.75rem)] xl:top-[calc(var(--header-height)+0.75rem)] before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-page'
const CODE = 'text-body-sm font-extrabold tracking-latin-wide text-turquoise'
const NAME = 'text-[1.375rem] leading-[1.4] font-extrabold text-heading'

/*
 * Cards 12px apart below 1024; from 1024 the blocks carry their own rhythm
 * (the list then tucks under the heading's 8px, keeping the first block
 * where it was).
 */
const LIST = 'flex flex-col gap-3 lg:gap-0'

/**
 * A run of services: either the unheaded list, or one country's group
 * with its heading row.
 */
export function ServiceGroup({ services, country, hidden, className }: ServiceGroupProps) {
  const { language } = useLanguage()
  const headingId = useId()

  if (!country) {
    return (
      <ul hidden={hidden} className={cn(LIST, className)}>
        {services.map((service) => (
          <ServiceBlock key={service.id} service={service} showCountry />
        ))}
      </ul>
    )
  }

  const { code, name } = COUNTRIES[country]

  return (
    <div role="group" aria-labelledby={headingId} hidden={hidden} className={className}>
      <div className={STICKY}>
        <div className={HEADING}>
          <span aria-hidden="true" dir="ltr" className={CODE}>
            {code}
          </span>
          <p id={headingId} className={NAME}>
            {resolveCopy(name, language)}
          </p>
          <span className="text-body-sm text-ink-muted">
            · {servicesCount(services.length, language)}
          </span>
        </div>
      </div>

      <ul className={cn(LIST, 'mt-2 lg:-mt-2')}>
        {services.map((service) => (
          <ServiceBlock key={service.id} service={service} showCountry={false} />
        ))}
      </ul>
    </div>
  )
}
