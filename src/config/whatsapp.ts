import { getSectorBySlug } from '@/data/sectorIndex'
import type { Language } from '@/lib/i18n/languageConfig'
import { draft, proposed, resolveCopy } from '@/lib/i18n/localized'
import { withoutPrefix } from '@/lib/i18n/localizePath'
import { SITE_CONTACT } from './contact'
import { PATHS } from './paths'

/* "Message us on WhatsApp": the storyboard's contact page (English written here, `draft`). */
export const WHATSAPP_LABEL = draft('راسلنا على واتساب', 'Message us on WhatsApp')

/* The floating button's landmark name, heard by screen readers (`proposed`). */
export const WHATSAPP_DOCK_LABEL = proposed('تواصل سريع', 'Quick contact')

/*
 * The text the floating WhatsApp button writes for the visitor, by route
 * (the Arabic paths of paths.ts; `/en` is the same route). Any route not
 * listed gets `default`. In a sector page's message, {sector} is that
 * sector's title. All `proposed`, listed in docs/copy-review.md.
 */
export const WHATSAPP_MESSAGES = {
  default: proposed('مرحبًا، أود الاستفسار عن خدمات فورك العربية.', 'Hello, I’d like to ask about FORK ARABIA’s services.'),
  [PATHS.services]: proposed('مرحبًا، أود الاستفسار عن خدماتكم.', 'Hello, I’d like to ask about your services.'),
  '/services/:slug': proposed('مرحبًا، أود الاستفسار عن خدمات {sector}.', 'Hello, I’d like to ask about {sector}.'),
  [PATHS.presence]: proposed('مرحبًا، أود معرفة المزيد عن مكاتبكم وفروعكم.', 'Hello, I’d like to know more about your offices and branches.'),
}

/* The pages that carry WhatsApp in their own aside, where the floating button stays away. */
export const WHATSAPP_FLOATING_HIDDEN_ON: readonly string[] = [PATHS.bookConsultation, PATHS.requestQuote, PATHS.contact]

/* A sector page's path: /services/<slug>. */
const SECTOR_ROUTE = /^\/services\/([^/]+)$/

/** The prefilled message for a page, in the page language. */
export function whatsappMessage(pathname: string, language: Language) {
  const route = withoutPrefix(pathname)
  const sector = getSectorBySlug(SECTOR_ROUTE.exec(route)?.[1])

  if (sector) {
    return resolveCopy(WHATSAPP_MESSAGES['/services/:slug'], language).replace(
      '{sector}',
      resolveCopy(sector.title, language),
    )
  }
  const message = WHATSAPP_MESSAGES[route as keyof typeof WHATSAPP_MESSAGES] ?? WHATSAPP_MESSAGES.default
  return resolveCopy(message, language)
}

/* The company's WhatsApp number as wa.me wants it: digits only, from config/contact.ts. */
const WHATSAPP_DIGITS = SITE_CONTACT.find((channel) => channel.id === 'whatsapp')?.display.replace(/\D/g, '') ?? ''

/** A wa.me link that opens the chat with `text` already typed. */
export function whatsappHref(text: string) {
  return `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(text)}`
}
