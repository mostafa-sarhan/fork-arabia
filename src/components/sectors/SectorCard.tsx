import type { ReactNode } from 'react'
import { LocalizedLink } from '@/components/LocalizedLink'
import { ICONS } from '@/components/ui/iconRegistry'
import { LinkArrow } from '@/components/ui/LinkArrow'
import { sectorPath } from '@/config/paths'
import type { SectorEntry } from '@/data/sectorIndex'
import { cn } from '@/lib/cn'
import type { Language } from '@/lib/i18n/languageConfig'
import { resolveCopy } from '@/lib/i18n/localized'

/*
 * The card, which is the link. Hover, keyboard focus and a tap (active)
 * all turn it navy (`card-on:`, defined in index.css); every part inside
 * follows through `group-card-on:`. 270px minimum height from 768 (67.5
 * on the spacing scale); below that it is as tall as its text.
 */
const CARD =
  'group flex h-full flex-col gap-4 rounded-2xl border p-6 lg:p-8 md:min-h-67.5 border-line bg-surface transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-page'
const CARD_ON =
  'card-on:bg-navy card-on:border-navy card-on:shadow-raised'

const ICON_BOX =
  'flex size-13 shrink-0 items-center justify-center rounded-xl bg-turquoise-soft text-petrol transition-colors duration-200'
const ICON_BOX_ON =
  'group-card-on:bg-turquoise/16 group-card-on:text-turquoise'

/* 40px, a size used only here. Decorative, so a very light tone. */
const NUMBER =
  'text-[2.5rem] leading-none font-extrabold tabular-nums text-line transition-colors duration-200 group-card-on:text-white/18'

const TITLE =
  'text-h4 font-extrabold text-heading transition-colors duration-200 group-card-on:text-white'

/* 15px with a 1.85 line height, used only here. */
const SUMMARY =
  'flex-1 text-[0.9375rem] leading-[1.85] text-ink-muted transition-colors duration-200 group-card-on:text-white/78'

/* The optional meta row: small muted text that turns white on navy. */
const META =
  'flex flex-wrap items-center gap-2 text-body-sm font-bold text-ink-muted transition-colors duration-200 group-card-on:text-white/78'

const FOOTER =
  'flex items-center gap-2 border-t pt-4 text-button font-bold border-line text-link transition-colors duration-200 group-card-on:border-white/14 group-card-on:text-turquoise'

type SectorCardProps = {
  sector: SectorEntry
  /** The footer's words: "التفاصيل" on the home page. */
  linkLabel: string
  language: Language
  /** A small row above the footer line, such as a service count. */
  meta?: ReactNode
}

/** One sector as a card. The whole card is a single link to its page. */
export function SectorCard({ sector, linkLabel, language, meta }: SectorCardProps) {
  const Icon = ICONS[sector.icon]

  return (
    <LocalizedLink to={sectorPath(sector.slug)} className={cn(CARD, CARD_ON)}>
      <div className="flex items-start justify-between">
        <span aria-hidden="true" className={cn(ICON_BOX, ICON_BOX_ON)}>
          <Icon size={24} />
        </span>
        <span aria-hidden="true" dir="ltr" className={NUMBER}>
          {sector.number}
        </span>
      </div>

      <h3 className={TITLE}>{resolveCopy(sector.title, language)}</h3>

      <p className={SUMMARY}>{resolveCopy(sector.summary, language)}</p>

      {meta ? <div className={META}>{meta}</div> : null}

      <span className={FOOTER}>
        {linkLabel}
        <LinkArrow className="size-4" />
      </span>
    </LocalizedLink>
  )
}
