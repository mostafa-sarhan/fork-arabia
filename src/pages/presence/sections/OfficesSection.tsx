import { IconRow } from '@/components/IconRow'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ClockIcon, PhoneIcon, PinIcon, type IconProps } from '@/components/ui/icons'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { mapEmbedSrc, OFFICES, type Office } from '@/config/offices'
import { PATHS } from '@/config/paths'
import { COUNTRIES } from '@/data/sectors/countries'
import { cn } from '@/lib/cn'
import { copy, localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { useEffect, useState, type ReactNode } from 'react'

/*
 * What this section says besides the offices' own data (config/offices.ts).
 * None of it is in the storyboard, so all of it is `proposed`
 * (docs/copy-review.md).
 */
const COPY = {
  eyebrow: copy('تواجدنا', 'Our Presence'),
  heading: copy('مكاتبنا', 'Our Offices'),
  hours: copy('السبت للخميس، 10 صباحًا إلى 6 مساءً', 'Saturday to Thursday, 10 am to 6 pm'),
  openMap: copy('افتح في خرائط Google', 'Open in Google Maps'),
}

/* The page tone, so the white office cards stand off it. */
const SECTION = 'py-16 lg:py-24 bg-page'

const CARDS = 'mt-10 lg:mt-14 flex flex-col gap-6 lg:gap-8'

/*
 * One office: the map on top below 1024, then side by side from it — the
 * map at the inline start over 7 of 12 columns, the details over 5.
 */
const CARD =
  'group grid overflow-hidden rounded-2xl border border-line bg-surface shadow-card lg:grid-cols-12'

/*
 * 220px tall on phones and tablets; from 1024 as tall as the details.
 * While the map has keyboard focus (`data-focused`, see useKeyboardInFrame),
 * a petrol ring inside the box's edge, drawn on an overlay above the map:
 * the map would paint over the box's own shadow.
 */
const MAP_BOX =
  "relative h-55 lg:h-auto lg:col-span-7 bg-navy-soft after:pointer-events-none after:absolute after:inset-0 after:content-[''] data-focused:after:ring-3 data-focused:after:ring-inset data-focused:after:ring-petrol"

/*
 * The map frame: grey until the card is hovered or anything in it (the
 * map included) has focus, then full colour. Reduced motion swaps it at once.
 */
const MAP =
  'absolute inset-0 size-full border-0 grayscale transition-[filter] duration-(--duration-hover) ease-out-soft motion-reduce:transition-none group-hover:grayscale-0 group-focus-within:grayscale-0'

const DETAILS = 'flex flex-col gap-6 p-6 md:p-8 lg:p-10 lg:col-span-5'

/* The head office's badge is navy; the branch's is the soft turquoise one. */
const BADGE_TONES: Record<Office['kind'], string> = {
  headquarters: 'bg-navy text-white',
  branch: 'bg-turquoise-soft text-petrol',
}

/* A detail row's 40px icon tile (IconRow sizes it): turquoise-soft, slightly rounded. */
const ICON_TILE = 'rounded-lg bg-turquoise-soft text-petrol'

/* The relaxed paragraph line height, so a long address breathes. */
const DETAIL_TEXT = 'text-body leading-paragraph text-ink'

const PHONE_LINK =
  'rounded-sm font-semibold text-heading transition-colors duration-(--duration-hover) hover:text-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface'

/* Full width and stacked on phones, side by side at their own width from 640. */
const ACTIONS = 'mt-auto flex flex-col sm:flex-row sm:flex-wrap gap-3'
const BUTTON = 'w-full sm:w-auto'

/** The two offices, head office first, each as a large card with its map. */
export function OfficesSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className={SECTION}>
      <Container>
        <Reveal>
          <SectionTitle label={text.eyebrow}>{text.heading}</SectionTitle>
        </Reveal>

        <div className={CARDS}>
          {OFFICES.map((office, index) => (
            <Reveal key={office.id} delay={120 + index * 80}>
              <OfficeCard office={office} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/**
 * One office: its map, badge and country code, city, address, phones,
 * hours, and the two buttons.
 */
function OfficeCard({ office }: { office: Office }) {
  const { language, t } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <article className={CARD}>
      <OfficeMap src={mapEmbedSrc(office, language)} title={resolveCopy(office.mapTitle, language)} />

      <div className={DETAILS}>
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <Badge className={BADGE_TONES[office.kind]}>{resolveCopy(office.label, language)}</Badge>
            <Badge variant="outline" size="sm" dir="ltr" className="font-bold">
              {COUNTRIES[office.country].code}
            </Badge>
          </div>
          <h3 className="text-h3 font-extrabold text-heading text-balance">
            {resolveCopy(office.location, language)}
          </h3>
        </div>

        <ul className="flex flex-col gap-4">
          <DetailRow Icon={PinIcon}>
            <address className={cn(DETAIL_TEXT, 'not-italic')}>
              {resolveCopy(office.address, language)}
            </address>
          </DetailRow>

          <DetailRow Icon={PhoneIcon}>
            <span className="flex flex-col gap-1">
              {office.phones.map((phone) => (
                <a key={phone.href} href={phone.href} dir="ltr" className={cn(PHONE_LINK, 'self-start')}>
                  {phone.display}
                </a>
              ))}
            </span>
          </DetailRow>

          <DetailRow Icon={ClockIcon}>
            <p className={DETAIL_TEXT}>{text.hours}</p>
          </DetailRow>
        </ul>

        <div className={ACTIONS}>
          <Button
            href={office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className={BUTTON}
          >
            {text.openMap}
          </Button>
          <Button to={PATHS.bookConsultation} variant="outline-navy" size="lg" className={BUTTON}>
            {t('nav.bookConsultation')}
          </Button>
        </div>
      </div>
    </article>
  )
}

/**
 * Whether the keyboard has moved focus into a frame inside `box`. CSS cannot
 * tell: once focus is in the map's own document, neither the frame nor the
 * box matches :focus, :focus-visible or :focus-within (Chrome and Safari).
 * Seen from this page, the window loses focus and the frame becomes the
 * active element; a Tab pressed just before says it was the keyboard.
 */
function useKeyboardInFrame(box: HTMLElement | null) {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!box) {
      return
    }

    let byKeyboard = false
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') byKeyboard = true
    }
    const onPointer = () => {
      byKeyboard = false
    }
    /* The active element settles after the blur event, so read it a tick later. */
    const onWindowBlur = () =>
      setTimeout(() => {
        const active = document.activeElement
        setIsFocused(byKeyboard && active instanceof HTMLIFrameElement && box.contains(active))
      })
    const onWindowFocus = () => setIsFocused(false)

    document.addEventListener('keydown', onKey, true)
    document.addEventListener('pointerdown', onPointer, true)
    window.addEventListener('blur', onWindowBlur)
    window.addEventListener('focus', onWindowFocus)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.removeEventListener('pointerdown', onPointer, true)
      window.removeEventListener('blur', onWindowBlur)
      window.removeEventListener('focus', onWindowFocus)
    }
  }, [box])

  return isFocused
}

/**
 * The map's box, which holds its size from the start, and the map itself.
 * The browser's own `loading="lazy"` starts iframes a few thousand pixels
 * early, which on this page is both maps at once; the frame is mounted
 * only once its box is within 200px of the screen instead.
 */
function OfficeMap({ src, title }: { src: string; title: string }) {
  const [box, setBox] = useState<HTMLDivElement | null>(null)
  const [isNear, setIsNear] = useState(false)
  const isFocused = useKeyboardInFrame(box)

  useEffect(() => {
    if (!box) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )

    observer.observe(box)

    return () => observer.disconnect()
  }, [box])

  return (
    <div ref={setBox} data-focused={isFocused || undefined} className={MAP_BOX}>
      {isNear ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={MAP}
        />
      ) : null}
    </div>
  )
}

/** One detail line: its icon tile, then the text. */
function DetailRow({ Icon, children }: { Icon: (props: IconProps) => ReactNode; children: ReactNode }) {
  return (
    <li>
      <IconRow icon={<Icon size={20} />} tileClassName={ICON_TILE}>
        {children}
      </IconRow>
    </li>
  )
}
