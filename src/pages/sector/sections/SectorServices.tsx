import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { COUNTRIES } from '@/data/sectors/countries'
import type { SectorDetail } from '@/data/sectors/types'
import { draft, localizeAll, proposed, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { groupServices } from '../serviceGroups'
import { SectorBookingCard } from './SectorBookingCard'
import { SectorOthers } from './SectorOthers'
import { ServiceFilter, type ServiceFilterOption } from './ServiceFilter'
import { ServiceGroup } from './ServiceGroup'

/*
 * Arabic from the storyboard ("خدمات القطاع"); the filter's words are not
 * in it, so they are `proposed`. All listed in docs/copy-review.md.
 */
const COPY = {
  heading: draft('خدمات القطاع', 'Sector services'),
  all: proposed('الكل', 'All'),
  filterLabel: proposed('تصفية الخدمات حسب الدولة', 'Filter services by country'),
}

/*
 * Two columns from 1024: the services (flex 1) and a 340px aside. Below
 * 1024 the aside follows the list.
 */
const LAYOUT = 'flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16'

/*
 * From 1024 the aside holds the booking card and the other sectors, 12px
 * apart, and sticks 24px under the header (the narrow bar, the desktop one
 * from 1280). No token for those sums. Below 1024 it holds the booking
 * card alone; the other sectors close the page instead.
 *
 * Sticky only from 800px tall (the 652px aside + 88px header + 48px clear
 * is 788px): on a shorter screen a sticky aside would be cut off, so it
 * scrolls with the page.
 */
const ASIDE =
  'flex flex-col gap-3 lg:w-85 lg:shrink-0 lg:[@media(min-height:50rem)]:sticky lg:top-[calc(var(--header-height-mobile)+1.5rem)] xl:top-[calc(var(--header-height)+1.5rem)]'

/**
 * A sector's services. With two countries or more: a filter row, the
 * services without a country, then one group per country. Every service is
 * always in the HTML; a filter only hides the other countries' groups.
 */
export function SectorServices({ sector }: { sector: SectorDetail }) {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)
  const [filter, setFilter] = useState('all')

  const { grouped, general, groups } = groupServices(sector.services)

  const isShown = (country: string) => filter === 'all' || filter === country
  /* The group that opens the list (no space above it), if no unheaded list does. */
  const topGroup = general.length > 0 ? undefined : groups.find((group) => isShown(group.country))?.country

  const options: ServiceFilterOption[] = [
    { value: 'all', label: text.all, count: sector.services.length },
    ...groups.map((group) => ({
      value: group.country,
      label: resolveCopy(COUNTRIES[group.country].name, language),
      count: group.services.length,
    })),
  ]

  return (
    <section className="pt-14 pb-18 lg:pt-20 lg:pb-28 bg-page">
      <Container className={LAYOUT}>
        <div className="min-w-0 flex-1">
          <Reveal>
            <SectionTitle>{text.heading}</SectionTitle>
          </Reveal>

          {grouped ? (
            <div className="mt-8">
              <ServiceFilter
                label={text.filterLabel}
                options={options}
                active={filter}
                onChange={setFilter}
              />
            </div>
          ) : null}

          <div className="mt-8 lg:mt-6">
            {general.length > 0 ? <ServiceGroup services={general} /> : null}

            {groups.map((group) => (
              <ServiceGroup
                key={group.country}
                country={group.country}
                services={group.services}
                hidden={!isShown(group.country)}
                className={group.country === topGroup ? undefined : 'mt-10 lg:mt-12'}
              />
            ))}
          </div>
        </div>

        <aside className={ASIDE}>
          <SectorBookingCard title={resolveCopy(sector.ctaTitle, language)} />
          <SectorOthers slug={sector.slug} className="max-lg:hidden" />
        </aside>
      </Container>
    </section>
  )
}
