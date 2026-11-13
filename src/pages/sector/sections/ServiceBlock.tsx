import { COUNTRIES } from '@/data/sectors/countries'
import { cn } from '@/lib/cn'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { NumberedService } from '../serviceGroups'

type ServiceBlockProps = {
  service: NumberedService
  /**
   * Show the service's country as a tag: only where no group heading
   * does. Without it the block is in a group, under a sticky heading.
   */
  showCountry: boolean
}

/*
 * One service. Below 1024 a white card (20px padding, 16px radius) with a
 * small number beside the title; from 1024 an editorial block on the page
 * tone: a big muted number in its own 72px column, a hairline between
 * blocks. The id lets /services/<slug>#<id> land on it.
 */
const BLOCK =
  'grid grid-cols-[auto_1fr] items-baseline gap-x-3 rounded-xl bg-surface p-5 lg:grid-cols-[4.5rem_1fr] lg:gap-x-6 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-9 lg:border-t lg:border-line lg:first:border-t-0'

/* 40px from 1024, a size used only here; decorative, so line-strong. */
const NUMBER =
  'text-body-sm font-extrabold tabular-nums text-ink-muted lg:row-span-2 lg:self-start lg:text-[2.5rem] lg:leading-none lg:text-line-strong'

/* 19px on phones, 23px from 1024: sizes used only here. */
const TITLE =
  'text-[1.1875rem] lg:text-[1.4375rem] leading-[1.45] font-extrabold text-balance text-heading'

/* 15px on phones, 17px with a 1.95 line height from 1024: used only here. */
const BODY =
  'col-span-2 mt-2 lg:col-span-1 lg:col-start-2 text-[0.9375rem] leading-[1.85] lg:text-[1.0625rem] lg:leading-[1.95] text-pretty text-ink-muted'

/*
 * Inside a country group, an anchor jump stops 64px further down than the
 * page's scroll padding (the header), so the title clears the group's
 * sticky heading too.
 */
const UNDER_STICKY_HEADING = 'scroll-mt-16'

const COUNTRY_TAG =
  'ms-2 inline-flex rounded-full bg-navy-soft px-2.5 py-0.5 align-middle text-caption font-bold text-petrol'

export function ServiceBlock({ service, showCountry }: ServiceBlockProps) {
  const { language } = useLanguage()

  return (
    <li id={service.id} className={cn(BLOCK, !showCountry && UNDER_STICKY_HEADING)}>
      <span aria-hidden="true" className={NUMBER}>
        {service.number}
      </span>

      <h3 className={TITLE}>
        {resolveCopy(service.title, language)}
        {showCountry && service.country ? (
          <span className={COUNTRY_TAG}>{resolveCopy(COUNTRIES[service.country].name, language)}</span>
        ) : null}
      </h3>

      <p className={BODY}>{resolveCopy(service.body, language)}</p>
    </li>
  )
}
