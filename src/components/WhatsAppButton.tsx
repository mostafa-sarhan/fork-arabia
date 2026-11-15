import { useEffect, useRef, useState, type RefObject } from 'react'
import { useLocation } from 'react-router'
import { WhatsAppIcon } from '@/components/icons/brandIcons'
import { useNavbar } from '@/components/navbar/useNavbar'
import { WHATSAPP_FLOATING_HIDDEN_ON, WHATSAPP_LABEL, whatsappHref, whatsappMessage } from '@/config/whatsapp'
import { cn } from '@/lib/cn'
import { withoutPrefix } from '@/lib/i18n/localizePath'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * The dock: fixed in the bottom inline-end corner (left in Arabic, right
 * in English), 16px from the edges on phones and 24px from 768, plus the
 * device's safe area. Under the header (z-nav), its menu sheet and every
 * dialog.
 */
const DOCK = [
  'fixed z-sticky',
  'bottom-[calc(--spacing(4)+env(safe-area-inset-bottom))] md:bottom-[calc(--spacing(6)+env(safe-area-inset-bottom))]',
  'end-[calc(--spacing(4)+env(safe-area-inset-right))] md:end-[calc(--spacing(6)+env(safe-area-inset-right))]',
  'rtl:end-[calc(--spacing(4)+env(safe-area-inset-left))] rtl:md:end-[calc(--spacing(6)+env(safe-area-inset-left))]',
  /* Appearing and leaving: a fade, and a short rise unless motion is reduced. */
  'transition-[opacity,translate,visibility] duration-300 ease-out-soft',
].join(' ')
const DOCK_SHOWN = 'visible opacity-100 translate-y-0'
/*
 * Waiting (still on the first screen, or a button under it): faded out
 * but still in the tab order, so a keyboard visitor reaches it, and it
 * shows while it holds focus.
 */
const DOCK_WAITING =
  'pointer-events-none opacity-0 motion-safe:translate-y-3 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-y-0'
/* Away (footer, menu sheet, a dialog, a form page): faded out and out of reach. */
const DOCK_AWAY = 'invisible opacity-0 motion-safe:translate-y-3'

/*
 * The button: a navy circle, 48px on phones and 56px from 768, with the
 * white glyph and a soft shadow. Hover or keyboard focus lifts it 2px.
 */
const BUTTON = [
  'group relative grid size-12 place-items-center rounded-full bg-navy text-white shadow-raised md:size-14',
  'transition-[translate,background-color] duration-(--duration-hover) ease-standard',
  'hover:bg-navy-strong motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
].join(' ')
const GLYPH = 'size-6 md:size-7'

/* "Available": a small turquoise dot on the top corner, ringed in white. */
const DOT = 'absolute top-0.5 end-0.5 size-3 rounded-full bg-turquoise ring-2 ring-white md:top-1 md:end-1'

/*
 * The label pill, beside the button on the page's side. Only where there
 * is a fine pointer (a mouse): it slides out on hover or keyboard focus.
 * On touch there is none; one tap opens WhatsApp.
 */
const LABEL = [
  'pointer-events-none absolute end-full top-1/2 me-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-navy px-4 py-2 text-body-sm font-semibold text-white shadow-raised pointer-fine:block',
  'opacity-0 translate-x-2 rtl:-translate-x-2 transition-[opacity,translate] duration-(--duration-hover) ease-standard',
  'group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0',
].join(' ')

/* What hides the button while it is on screen: an open dialog, or the language card in its corner. */
const COVERS = 'dialog[open], [data-bottom-overlay]'

/* Hidden this far before the footer reaches the screen, so it never sits over it. */
const FOOTER_MARGIN = '0px 0px 120px 0px'

/**
 * Whether anything the button would cover is on screen: a dialog, the
 * language card. Watched as the page changes.
 */
function useCoverOpen() {
  const [coverOpen, setCoverOpen] = useState(false)

  useEffect(() => {
    const check = () => setCoverOpen(document.querySelector(COVERS) !== null)
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['open', 'data-bottom-overlay'] })
    return () => observer.disconnect()
  }, [])

  return coverOpen
}

/** Whether the footer is near or on screen. */
function useFooterNear() {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) {
      return
    }
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: FOOTER_MARGIN })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return near
}

/* Clear space kept between the button and any CTA, so it steps aside before touching one. */
const CTA_CLEARANCE = 8

/** Whether a shown CTA comes within CTA_CLEARANCE of the button's box. */
function overlaps(cta: Element, box: DOMRect) {
  const rect = cta.getBoundingClientRect()
  const isNear =
    rect.width > 0 &&
    rect.right > box.left - CTA_CLEARANCE &&
    rect.left < box.right + CTA_CLEARANCE &&
    rect.bottom > box.top - CTA_CLEARANCE &&
    rect.top < box.bottom + CTA_CLEARANCE
  /* A hidden CTA (a closed menu's) is not covered. */
  return isNear && getComputedStyle(cta).visibility !== 'hidden'
}

/**
 * Two things the scroll position decides: whether the visitor is past the
 * first screen, and whether a button or a link drawn as one (`data-cta`)
 * is under the floating button, which then steps aside. Checked once a
 * frame while scrolling, on resize and on each new page.
 */
function useScrollState(dock: RefObject<HTMLElement | null>, pathname: string) {
  const [state, setState] = useState({ pastFirstScreen: false, overCta: false })

  useEffect(() => {
    let frame = 0
    function measure() {
      frame = 0
      const box = dock.current?.getBoundingClientRect()
      const overCta = box ? [...document.querySelectorAll('[data-cta]')].some((cta) => overlaps(cta, box)) : false
      const pastFirstScreen = window.scrollY > window.innerHeight
      setState((current) =>
        current.pastFirstScreen === pastFirstScreen && current.overCta === overCta ? current : { pastFirstScreen, overCta },
      )
    }
    function schedule() {
      frame ||= requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [dock, pathname])

  return state
}

/**
 * The floating WhatsApp button, on every page but the three forms (their
 * aside has WhatsApp already). It opens the chat in a new tab with a
 * message for the page (config/whatsapp.ts) already typed.
 *
 * It shows once the visitor is past the first screen, and while a button
 * is under it, it waits faded out (still reachable by Tab, showing on
 * focus). It goes away (faded, out of the tab order) while the footer
 * is near, the menu sheet or a dialog is open, or the language card is
 * up. Nothing loops, nothing opens by itself. In the page's order it
 * comes before `main`, so Tab meets it right after the header.
 */
export function WhatsAppButton() {
  const { language } = useLanguage()
  const { pathname } = useLocation()
  const { isMobileMenuOpen } = useNavbar()
  const dockRef = useRef<HTMLDivElement>(null)

  const coverOpen = useCoverOpen()
  const footerNear = useFooterNear()
  const { pastFirstScreen, overCta } = useScrollState(dockRef, pathname)
  const isFormPage = WHATSAPP_FLOATING_HIDDEN_ON.includes(withoutPrefix(pathname))

  const isAway = footerNear || coverOpen || isMobileMenuOpen || isFormPage
  const isWaiting = !pastFirstScreen || overCta
  const label = resolveCopy(WHATSAPP_LABEL, language)

  return (
    <div ref={dockRef} className={cn(DOCK, isAway ? DOCK_AWAY : isWaiting ? DOCK_WAITING : DOCK_SHOWN)}>
      <a
        href={whatsappHref(whatsappMessage(pathname, language))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={BUTTON}
      >
        <WhatsAppIcon className={GLYPH} />
        <span aria-hidden="true" className={DOT} />
        <span aria-hidden="true" className={LABEL}>
          {label}
        </span>
      </a>
    </div>
  )
}
