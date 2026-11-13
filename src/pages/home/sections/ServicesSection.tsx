import { Reveal } from '@/components/Reveal'
import { LocalizedLink } from '@/components/LocalizedLink'
import { Container } from '@/components/layout/Container'
import { ICONS } from '@/components/ui/iconRegistry'
import { BUTTON_MOTION } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LinkArrow } from '@/components/ui/LinkArrow'
import { PATHS, sectorPath } from '@/config/paths'
import { SECTOR_INDEX, type SectorEntry } from '@/data/sectorIndex'
import { cn } from '@/lib/cn'
import type { Language } from '@/lib/i18n/languageConfig'
import { copy, draft, localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says. The nine cards are not here: their number,
 * icon, title and summary come from `src/data/sectorIndex.ts`.
 *
 * Arabic is transcribed from the client's storyboard and English from the
 * company profile. `draft` marks English written here because the profile
 * had no equivalent; it is listed in `docs/copy-review.md` for approval.
 */
const COPY = {
  eyebrow: copy('خدماتنا', 'Our Services'),
  heading: copy('منظومة خدمات متكاملة', 'An Integrated Service Ecosystem'),
  subheading: copy(
    'احتياجات متعددة تُدار من خلال شريك واحد ورؤية واحدة',
    'Multiple needs, managed through one partner and one vision',
  ),
  button: draft('كل الخدمات', 'All Services'),
  cardLink: draft('التفاصيل', 'Details'),
}

/*
 * The layout. One column below 1024: header, then the button (from 768)
 * or the grid (below 768, where the button moves under the grid). From
 * 1024 the header and button share a row — the column sized to the button
 * has no token, hence the arbitrary track — and the grid spans both.
 */
const LAYOUT = 'grid lg:grid-cols-[1fr_auto] lg:gap-x-8'
const BUTTON_SLOT = 'max-md:order-last mt-8 md:mt-6 lg:mt-0 lg:self-end'
const GRID =
  'mt-8 md:mt-12 lg:mt-14 lg:col-span-2 grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-6'

/*
 * "All services": a 52px outline button with a 1.5px navy border (no
 * border-width token for 1.5px). Full width below 768.
 */
const BUTTON =
  'flex md:inline-flex h-13 items-center justify-center gap-2 rounded-lg border-[1.5px] px-6 text-body font-bold border-navy text-heading hover:bg-navy-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-page'

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

const FOOTER =
  'flex items-center gap-2 border-t pt-4 text-button font-bold border-line text-link transition-colors duration-200 group-card-on:border-white/14 group-card-on:text-turquoise'

export function ServicesSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="pt-16 pb-18 lg:py-28 bg-page">
      <Container>
        <div className={LAYOUT}>
          {/* Header, at the inline start. It enters first. */}
          <Reveal className="flex flex-col gap-4 lg:gap-5">
            <SectionTitle label={text.eyebrow}>{text.heading}</SectionTitle>

            <p className="max-w-measure text-body md:text-body-lg text-ink-muted">
              {text.subheading}
            </p>
          </Reveal>

          <Reveal className={BUTTON_SLOT}>
            <LocalizedLink to={PATHS.services} className={cn(BUTTON, BUTTON_MOTION)}>
              {text.button}
              <LinkArrow className="size-4.5" />
            </LocalizedLink>
          </Reveal>

          <ul className={GRID}>
            {SECTOR_INDEX.map((sector, index) => (
              <li key={sector.id}>
                {/* 40ms apart after the header, so the ninth card is in
                    by about 450ms. */}
                <Reveal delay={120 + index * 40} className="h-full">
                  <SectorCard
                    sector={sector}
                    linkLabel={text.cardLink}
                    language={language}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

/* One sector as a card. The whole card is a single link to its page. */
function SectorCard({
  sector,
  linkLabel,
  language,
}: {
  sector: SectorEntry
  linkLabel: string
  language: Language
}) {
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

      <span className={FOOTER}>
        {linkLabel}
        <LinkArrow className="size-4" />
      </span>
    </LocalizedLink>
  )
}
