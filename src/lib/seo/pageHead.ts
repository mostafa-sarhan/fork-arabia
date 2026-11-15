import { SITE_ROUTES, type SiteRoute } from '@/config/routes'
import { PATHS } from '@/config/paths'
import { BRAND_TAGLINE, NOT_FOUND_TITLE, PAGE_SEO, SECTOR_DESCRIPTION_ENDINGS, SHARE_IMAGE, type PageLabel } from '@/config/seo'
import { SITE_URL } from '@/config/site'
import { getSectorBySlug } from '@/data/sectorIndex'
import { COMPANY_DESCRIPTION } from '@/data/siteCopy'
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '@/lib/i18n/languageConfig'
import { languageFromPathname, localizePath, withoutPrefix } from '@/lib/i18n/localizePath'
import { resolveCopy } from '@/lib/i18n/localized'
import { translations } from '@/lib/i18n/translations'

/*
 * Every page's <head>, from config/seo.ts: one function for both sides.
 * scripts/prerender.mjs writes these tags into each HTML file; in the
 * browser, useDocumentHead() puts them in place on every navigation.
 */

export type HeadTag =
  | { tag: 'title'; text: string }
  | { tag: 'meta'; name: string; content: string }
  | { tag: 'meta'; property: string; content: string }
  | { tag: 'link'; rel: string; href: string; hreflang?: string }

/** What Open Graph calls each language. */
const OG_LOCALES: Record<Language, string> = { ar: 'ar_SA', en: 'en_US' }

/** The page a URL belongs to, or undefined for one that does not exist. */
export function routeAt(pathname: string): SiteRoute | undefined {
  const path = withoutPrefix(pathname)
  return SITE_ROUTES.find((route) => route.path === path)
}

/** A page's absolute address in one language: "https://www.forkarabia.sa/en/about". */
export function absoluteUrl(path: string, language: Language) {
  const localized = localizePath(path, language)
  return `${SITE_URL}${localized === '/' ? '/' : localized}`
}

/** "Page | Brand", in one language. */
function titled(name: string, language: Language) {
  return `${name} | ${translations[language]['brand.name']}`
}

function label(name: PageLabel, language: Language) {
  return typeof name === 'string' ? translations[language][name] : resolveCopy(name, language)
}

/** Two sentences as one description; the English summaries have no full stop of their own. */
function joinSentences(first: string, second: string) {
  return /[.!؟?]$/.test(first) ? `${first} ${second}` : `${first}. ${second}`
}

/** A page's title and description, in one language. */
export function pageText(route: SiteRoute, language: Language) {
  if (route.page === 'home') {
    return {
      title: `${translations[language]['brand.legal']} | ${resolveCopy(BRAND_TAGLINE, language)}`,
      description: resolveCopy(COMPANY_DESCRIPTION, language),
    }
  }
  if (route.page === 'sector') {
    const sector = getSectorBySlug(route.slug)!
    return {
      title: titled(resolveCopy(sector.title, language), language),
      description: joinSentences(
        resolveCopy(sector.summary, language),
        resolveCopy(SECTOR_DESCRIPTION_ENDINGS[route.slug], language),
      ),
    }
  }
  const page = PAGE_SEO[route.page]
  return { title: titled(label(page.name, language), language), description: resolveCopy(page.description, language) }
}

/** A page no search engine should list: its title, the company's description, noindex. */
function unlistedHead(name: string, language: Language): HeadTag[] {
  return [
    { tag: 'title', text: titled(name, language) },
    { tag: 'meta', name: 'description', content: resolveCopy(COMPANY_DESCRIPTION, language) },
    { tag: 'meta', name: 'robots', content: 'noindex' },
  ]
}

/** Every head tag that belongs to the page at `pathname`. */
export function pageHead(pathname: string): HeadTag[] {
  const language = languageFromPathname(pathname)
  const route = routeAt(pathname)

  if (!route) {
    const isDesignSystem = withoutPrefix(pathname) === PATHS.designSystem
    return unlistedHead(isDesignSystem ? translations[language]['ds.title'] : resolveCopy(NOT_FOUND_TITLE, language), language)
  }

  const { title, description } = pageText(route, language)
  const url = absoluteUrl(route.path, language)
  const other = LANGUAGES.find((candidate) => candidate !== language)!

  return [
    { tag: 'title', text: title },
    { tag: 'meta', name: 'description', content: description },
    { tag: 'link', rel: 'canonical', href: url },
    ...LANGUAGES.map((alternate): HeadTag => ({ tag: 'link', rel: 'alternate', hreflang: alternate, href: absoluteUrl(route.path, alternate) })),
    { tag: 'link', rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(route.path, DEFAULT_LANGUAGE) },
    { tag: 'meta', property: 'og:type', content: 'website' },
    { tag: 'meta', property: 'og:site_name', content: translations[language]['brand.legal'] },
    { tag: 'meta', property: 'og:title', content: title },
    { tag: 'meta', property: 'og:description', content: description },
    { tag: 'meta', property: 'og:url', content: url },
    { tag: 'meta', property: 'og:locale', content: OG_LOCALES[language] },
    { tag: 'meta', property: 'og:locale:alternate', content: OG_LOCALES[other] },
    { tag: 'meta', property: 'og:image', content: `${SITE_URL}${SHARE_IMAGE.path}` },
    { tag: 'meta', property: 'og:image:width', content: String(SHARE_IMAGE.width) },
    { tag: 'meta', property: 'og:image:height', content: String(SHARE_IMAGE.height) },
    { tag: 'meta', property: 'og:image:alt', content: resolveCopy(SHARE_IMAGE.alt, language) },
    { tag: 'meta', name: 'twitter:card', content: 'summary_large_image' },
  ]
}

/** Marks the tags that belong to the page, so the browser can swap them on navigation. */
export const PAGE_HEAD_ATTRIBUTE = 'data-page-head'

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** The tags as HTML, for the prerender. */
export function headHtml(tags: HeadTag[]): string {
  return tags
    .map((tag) => {
      if (tag.tag === 'title') return `<title ${PAGE_HEAD_ATTRIBUTE}>${escape(tag.text)}</title>`
      const attributes = Object.entries(tag)
        .filter(([key]) => key !== 'tag')
        .map(([key, value]) => `${key}="${escape(String(value))}"`)
        .join(' ')
      return `<${tag.tag} ${PAGE_HEAD_ATTRIBUTE} ${attributes} />`
    })
    .join('\n    ')
}
