import afaqLogo from '@/assets/partners/afaq.png'
import cascoLogo from '@/assets/partners/casco.png'
import professionalExpertsLogo from '@/assets/partners/professional-experts.png'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import type { CSSProperties } from 'react'
import { copy, draft, localizeAll, resolveCopy, type Localized } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says, apart from the partners' names.
 *
 * Arabic is transcribed from the client's storyboard. `draft` marks
 * English written here; it is listed in `docs/copy-review.md` for approval.
 * The storyboard's note that logos will be added later is not rendered.
 */
const COPY = {
  heading: draft('شركاؤنا وعملاؤنا', 'Our Partners & Clients'),
}

/*
 * The logos, in the order they appear. To add one, drop the file in
 * src/assets/partners/, import it above and add one line here: the file,
 * its pixel size (for width/height, so nothing shifts) and the name, which
 * is the logo's alt text.
 *
 * `logoHeight` is the drawn height in px on desktop (phones use 75% of it),
 * tuned by eye so wide and tall logos carry the same visual weight.
 */
const PARTNERS: { src: string; width: number; height: number; name: Localized; logoHeight?: number }[] = [
  { src: cascoLogo, width: 900, height: 286, name: copy('CASCO', 'CASCO'), logoHeight: 44 },
  { src: afaqLogo, width: 511, height: 663, name: draft('آفاق', 'Afaq'), logoHeight: 78 },
  { src: professionalExpertsLogo, width: 344, height: 229, name: draft('الخبراء المحترفون للاستشارات المالية', 'Professional Experts Financial Consulting'), logoHeight: 72 },
]

const DEFAULT_LOGO_HEIGHT = 56

/* Passes a partner's height to LOGO as the --logo-h custom property. */
function logoStyle(partner: (typeof PARTNERS)[number]) {
  return { '--logo-h': `${partner.logoHeight ?? DEFAULT_LOGO_HEIGHT}px` } as CSSProperties
}

/*
 * How the strip loops. Each half of the track repeats the list until it
 * is wider than a 1920px screen, counted at the desktop tile (220px plus
 * its 20px gap): three logos repeat three times, ten logos once. The
 * track then moves at 40px a second, so the duration is the half's width
 * over 40 (on phones, where tiles are smaller, it is a calmer 30px/s).
 */
const TILE_STEP = 240
const COPIES = Math.ceil(1920 / (PARTNERS.length * TILE_STEP))
const DURATION_SECONDS = (COPIES * PARTNERS.length * TILE_STEP) / 40

/* Everything after the first, real list: aria-hidden echoes of it. */
const ECHOES = Array.from({ length: COPIES * 2 - 1 }, () => PARTNERS).flat()

/*
 * The strip clips the track and fades it out over 80px at both edges
 * (no mask utility says that). With reduced motion there is no fade.
 */
const STRIP =
  'mt-12 overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_80px,black_calc(100%-80px),transparent)]'

/*
 * The track: as wide as its tiles, moving (see `marquee` in index.css).
 * With reduced motion it is a plain block and only the real list shows.
 */
const TRACK = 'flex motion-safe:w-max animate-marquee'

/* The real list. With reduced motion: one centered row that wraps. */
const LIST =
  'flex motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-5'

/*
 * One tile: 160×88 below 768, 220×112 from it. The 20px gap is a margin
 * on each tile rather than a flex gap, so both halves of the track are
 * exactly equal and the loop has no jump.
 */
const TILE =
  'flex shrink-0 items-center justify-center me-5 motion-reduce:me-0 w-40 h-22 md:w-55 md:h-28 rounded-xl border border-line bg-surface'

/*
 * Full colour, never cropped; at most 70% of the tile's width (no token).
 * The PNGs have white/near-white backgrounds; multiply makes them
 * disappear on the white tile without editing the files.
 */
const LOGO =
  'w-auto h-[calc(var(--logo-h)*0.75)] md:h-(--logo-h) max-w-[70%] object-contain mix-blend-multiply'

export function PartnersSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <Container>
        <Reveal>
          <h2 className="font-display text-section-title text-balance text-center text-heading">
            {text.heading}
          </h2>
        </Reveal>

        <div className={STRIP}>
          <div
            className={TRACK}
            style={{ animationDuration: `${DURATION_SECONDS}s` }}
          >
            <ul className={LIST}>
              {PARTNERS.map((partner) => (
                <li key={partner.src} className={TILE}>
                  <img
                    src={partner.src}
                    width={partner.width}
                    height={partner.height}
                    alt={resolveCopy(partner.name, language)}
                    loading="lazy"
                    decoding="async"
                    className={LOGO}
                    style={logoStyle(partner)}
                  />
                </li>
              ))}
            </ul>

            <div aria-hidden="true" className="flex motion-reduce:hidden">
              {ECHOES.map((partner, index) => (
                <div key={index} className={TILE}>
                  <img
                    src={partner.src}
                    width={partner.width}
                    height={partner.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={LOGO}
                    style={logoStyle(partner)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
