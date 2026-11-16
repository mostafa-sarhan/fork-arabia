import { LocalizedLink } from '@/components/LocalizedLink'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { BUTTON_MOTION } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LinkArrow } from '@/components/ui/LinkArrow'
import { SERVED_COUNTRIES, type ServedCountry } from '@/config/countries'
import { getOffice, OFFICES } from '@/config/offices'
import { PATHS } from '@/config/paths'
import { cn } from '@/lib/cn'
import { copy, localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says. The offices come from config/offices.ts
 * and the eight countries from config/countries.ts, shared with the
 * Presence page; the tag words here are this card's own.
 *
 * Arabic is transcribed from the client's storyboard and English from the
 * company profile. English written here because the profile had no
 * equivalent was approved by the client on 2026-11-16.
 * The big number is not copy: it is the length of the country list.
 */
const COPY = {
  heading: copy('تواجدنا', 'Our Presence'),
  countLine: copy('نقدم خدماتنا في 8 دول', 'We serve clients in 8 countries'),
  link: copy('عناوين المكاتب', 'Office Addresses'),

  /*
   * The storyboard's short form of each office's address, for this card.
   * The office's label and city, and its full address, live in
   * config/offices.ts.
   */
  cardAddresses: {
    riyadh: copy(
      'المربع، حي الوشام، برج الوشم، مبنى أوقاف الراجحي، مكتب 110',
      'Al Murabba, Al Wisham District, Al Washm Tower, Al Rajhi Awqaf Building, Office 110',
    ),
    tanta: copy(
      'ميدان المحطة، أبراج عبد المنعم رياض، برج A، الدور الحادي عشر',
      'Station Square, Abdel Moneim Riad Towers, Tower A, 11th Floor',
    ),
  },

  /* The three tags a country can carry; each country names one by key. */
  tags: {
    head: copy('مقر رئيسي', 'Head office'),
    branch: copy('فرع', 'Branch'),
    services: copy('خدمات', 'Services'),
  },
} as const

type TagKey = keyof typeof COPY.tags

/* A country's tag: its office's kind, or services. */
function tagOf(country: ServedCountry): TagKey {
  if (!country.office) {
    return 'services'
  }
  return getOffice(country.office)?.kind === 'headquarters' ? 'head' : 'branch'
}

/* Navy with the hero's faint grid. 72px foot below 1024, 112px from it. */
const SECTION = 'pt-16 pb-18 lg:py-28 bg-navy bg-grid-on-navy'

/*
 * The header row. Below 1024 it stacks: heading, then the number line.
 * From 1024 the heading, a 56px divider and the number share a row, with
 * the link at the inline end, on their baseline.
 */
const HEADER = 'flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6'
const HEADER_START = 'flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8'

/* 64px, a size used only here; Latin digits, so it reads left to right. */
const BIG_NUMBER = 'text-[4rem] leading-none font-extrabold tabular-nums text-white'

/*
 * "Office addresses" from 1024: white, bold, a 2px turquoise underline
 * under the label (`link-underline` on its span), light turquoise on
 * hover. 44px tall for the target.
 */
const LINK_DESKTOP =
  'max-lg:hidden inline-flex h-11 items-center gap-2 text-body font-bold text-white transition-colors duration-200 hover:text-turquoise-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-sm'

/*
 * The same link below 1024: a full-width 52px outline button at the foot
 * of the section, 1.5px white border (no border-width token for 1.5px).
 */
const LINK_MOBILE =
  'flex h-13 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-white text-body font-bold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

/*
 * The two offices. Stacked below 1024 with a hairline between them; side
 * by side from 1024 with a vertical hairline (divide-x is logical in v4).
 */
const OFFICE_GRID =
  'mt-10 border-t border-white/12 pt-10 grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/12'
const OFFICE =
  'flex flex-col gap-2 py-6 first:pt-0 last:pb-0 lg:py-0 lg:first:pe-12 lg:last:ps-12'

/* 15px with a 1.85 line height, as in the service cards. */
const ADDRESS = 'not-italic text-[0.9375rem] leading-[1.85] text-white/72'

/* 2 columns below 768, 3 to 1023, 4 from 1024. */
const COUNTRY_GRID =
  'mt-10 lg:mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'

/*
 * One country. The longest name and its tag need about 200px side by
 * side, so below 1024 the tag sits under the name; from 1024 they share
 * a row, with 12px inline padding until 1280 so the row still fits.
 */
const TILE =
  'flex h-full flex-col items-start lg:flex-row lg:items-center lg:justify-between gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-3.5 md:px-5 md:py-4 lg:px-3 xl:px-5'

const PILL = 'shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-caption font-bold'

/* The tag colours: the head office stands out, services stay quiet. */
const PILL_TONES: Record<TagKey, string> = {
  head: 'bg-turquoise text-navy',
  branch: 'bg-white/14 text-white',
  services: 'bg-white/8 text-white/75',
}

export function PresenceSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className={SECTION}>
      <Container>
        {/* Header. It enters first. */}
        <Reveal className={HEADER}>
          <div className={HEADER_START}>
            <SectionTitle tone="navy">{text.heading}</SectionTitle>

            <span aria-hidden="true" className="max-lg:hidden h-14 w-px bg-white/15" />

            <p className="flex items-center gap-4">
              <span aria-hidden="true" dir="ltr" className={BIG_NUMBER}>
                {SERVED_COUNTRIES.length}
              </span>
              <span className="text-body-lg text-white/80">{text.countLine}</span>
            </p>
          </div>

          <LocalizedLink to={PATHS.presence} className={LINK_DESKTOP}>
            {/* The padding drops the line to where the old 8px underline offset
                put it; the matching negative margin keeps the label in place. */}
            <span className="link-underline pb-0.75 -mb-0.75">{text.link}</span>
            <LinkArrow className="size-4.5" />
          </LocalizedLink>
        </Reveal>

        {/* The two offices, after the header. */}
        <Reveal delay={120} className={OFFICE_GRID}>
          {OFFICES.map((office) => (
            <div key={office.id} className={OFFICE}>
              <p className="flex items-center gap-2 text-body-sm font-bold text-turquoise-soft">
                <Dot />
                {resolveCopy(office.label, language)}
              </p>
              <h3 className="text-h3 font-extrabold text-white">{resolveCopy(office.city, language)}</h3>
              <address className={ADDRESS}>{text.cardAddresses[office.id]}</address>
            </div>
          ))}
        </Reveal>

        {/* The eight countries, 40ms apart after the offices. */}
        <ul className={COUNTRY_GRID}>
          {SERVED_COUNTRIES.map((country, index) => (
            <li key={country.id}>
              <Reveal delay={240 + index * 40} className={TILE}>
                <span className="flex items-center gap-2 text-body font-bold text-white">
                  <Dot />
                  {resolveCopy(country.name, language)}
                </span>
                <span className={cn(PILL, PILL_TONES[tagOf(country)])}>
                  {text.tags[tagOf(country)]}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Below 1024 the link moves to the foot of the section. */}
        <Reveal className="lg:hidden mt-10">
          <LocalizedLink to={PATHS.presence} className={cn(LINK_MOBILE, BUTTON_MOTION)} data-cta>
            {text.link}
            <LinkArrow className="size-4.5" />
          </LocalizedLink>
        </Reveal>
      </Container>
    </section>
  )
}

/* The small turquoise dot before an office label or a country name. */
function Dot() {
  return <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-turquoise" />
}
