import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { SITE_DESCRIPTION } from '@/data/siteCopy'
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  type Language,
} from '@/lib/i18n/languageConfig'
import { samePathInLanguage } from '@/lib/i18n/localizePath'
import { resolveCopy } from '@/lib/i18n/localized'
import type { TranslationKey } from '@/lib/i18n/translations'
import { useLanguage } from '@/lib/i18n/useLanguage'

/**
 * Marks the elements this hook owns. Everything carrying the attribute is
 * removed and rewritten on each route change, so no stale canonical or
 * alternate can survive a navigation.
 */
const MANAGED_ATTRIBUTE = 'data-page-head'

/** The landmark the layout renders, and the skip link's target. */
const MAIN_ID = 'main'

/** What Open Graph calls each language, for `og:locale`. */
const OG_LOCALES: Record<Language, string> = {
  ar: 'ar_SA',
  en: 'en_US',
}

/**
 * The path this document has already entered. Module scope is deliberate:
 * "is this the route the visitor arrived on?" is a property of the document,
 * not of a component. Comparing paths rather than counting mounts also keeps
 * StrictMode's double-invoked effects from looking like a navigation.
 */
let enteredPathname: string | null = null

/**
 * Rewrites one of the meta tags index.html already carries.
 *
 * They are updated in place rather than appended: a second `description`
 * would not replace the first one, it would compete with it, and a crawler
 * reads whichever it meets first.
 */
function setMeta(selector: string, content: string): void {
  document.head.querySelector(selector)?.setAttribute('content', content)
}

type HeadTag =
  | { tag: 'link'; rel: string; href: string; hreflang?: string }
  | { tag: 'meta'; name: string; content: string }

export type PageMeta = {
  /** The page's title, as a key of the translation table. */
  titleKey: TranslationKey
  /**
   * Whether the brand name is appended to the title. The home page's title
   * is the company's own name, so it is the one page that sets this false
   * rather than repeat it.
   */
  brandSuffix?: boolean
  /**
   * Whether search engines may index this page. An unindexable page gets
   * `noindex` and no canonical or alternate links — a URL that should not be
   * found has no canonical form.
   */
  indexable?: boolean
}

/**
 * What every page owes the document: a title, a description, the social
 * tags, the canonical URL and its hreflang alternates — plus the scroll
 * position and focus point a real navigation would have reset.
 *
 * Call it once at the top of a page component. The URLs are built from
 * `window.location.origin`, so the same build is correct on a preview
 * deployment and in production.
 */
export function usePageMeta({
  titleKey,
  brandSuffix = true,
  indexable = true,
}: PageMeta): void {
  const { language, t } = useLanguage()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const title = brandSuffix
      ? `${t(titleKey)} — ${t('brand.name')}`
      : t(titleKey)
    const description = resolveCopy(SITE_DESCRIPTION, language)

    document.title = title
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:locale"]', OG_LOCALES[language])
  }, [brandSuffix, language, t, titleKey])

  useEffect(() => {
    const { origin } = window.location

    const tags: HeadTag[] = indexable
      ? [
          {
            tag: 'link',
            rel: 'canonical',
            href: `${origin}${samePathInLanguage(pathname, language)}`,
          },
          ...LANGUAGES.map(
            (alternate): HeadTag => ({
              tag: 'link',
              rel: 'alternate',
              hreflang: alternate,
              href: `${origin}${samePathInLanguage(pathname, alternate)}`,
            }),
          ),
          {
            tag: 'link',
            rel: 'alternate',
            hreflang: 'x-default',
            href: `${origin}${samePathInLanguage(pathname, DEFAULT_LANGUAGE)}`,
          },
        ]
      : [{ tag: 'meta', name: 'robots', content: 'noindex' }]

    const created = tags.map((spec) => {
      const element = document.createElement(spec.tag)

      element.setAttribute(MANAGED_ATTRIBUTE, '')

      if (spec.tag === 'link') {
        element.setAttribute('rel', spec.rel)
        element.setAttribute('href', spec.href)

        if (spec.hreflang) {
          element.setAttribute('hreflang', spec.hreflang)
        }
      } else {
        element.setAttribute('name', spec.name)
        element.setAttribute('content', spec.content)
      }

      document.head.append(element)

      return element
    })

    return () => {
      created.forEach((element) => element.remove())
    }
  }, [indexable, language, pathname])

  /*
   * A browser resets the scroll position and the focus point on every real
   * navigation; a router that only swaps components does neither, so the next
   * page would open half-way down with focus still on the link just clicked.
   *
   * The route the visitor arrived on is left alone — the browser has already
   * positioned it, and moving focus on load would talk over a screen reader's
   * own announcement. A navigation to a hash is left alone too: the anchor is
   * the destination.
   */
  useEffect(() => {
    if (enteredPathname === pathname) {
      return
    }

    const isInitialRoute = enteredPathname === null

    enteredPathname = pathname

    if (isInitialRoute || hash) {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.getElementById(MAIN_ID)?.focus({ preventScroll: true })
  }, [hash, pathname])
}
