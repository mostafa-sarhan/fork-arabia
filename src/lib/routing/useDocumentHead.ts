import { useEffect } from 'react'
import { useLocation } from 'react-router'
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
} from '@/lib/i18n/languageConfig'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { languagePathname, type RouteMeta } from './routes'

/**
 * Marks the elements this hook owns. Everything carrying the attribute is
 * removed and rewritten on each route change, so no stale canonical or
 * alternate can survive a navigation.
 */
const MANAGED_ATTRIBUTE = 'data-route-head'

type ManagedTag =
  | { tag: 'link'; rel: string; href: string; hreflang?: string }
  | { tag: 'meta'; name: string; content: string }

/**
 * The document head for one route: the title, the canonical URL and the
 * hreflang alternates.
 *
 * All of it is derived from the route and the current path, in one place,
 * because the three have to agree: a page whose title says English while its
 * canonical points at the Arabic URL is worse than having neither. The URLs
 * are built from `window.location.origin`, so the same build is correct on a
 * preview deployment and in production without a configured domain.
 */
export function useDocumentHead(route: RouteMeta): void {
  const { language, t } = useLanguage()
  const { pathname } = useLocation()
  const indexable = route.indexable !== false

  useEffect(() => {
    document.title = `${t(route.titleKey)} — ${t('brand.name')}`
  }, [route.titleKey, t])

  useEffect(() => {
    const { origin } = window.location

    const tags: ManagedTag[] = indexable
      ? [
          {
            tag: 'link',
            rel: 'canonical',
            href: `${origin}${languagePathname(pathname, language)}`,
          },
          ...LANGUAGES.map(
            (alternate): ManagedTag => ({
              tag: 'link',
              rel: 'alternate',
              hreflang: alternate,
              href: `${origin}${languagePathname(pathname, alternate)}`,
            }),
          ),
          {
            tag: 'link',
            rel: 'alternate',
            hreflang: 'x-default',
            href: `${origin}${languagePathname(pathname, DEFAULT_LANGUAGE)}`,
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
}
