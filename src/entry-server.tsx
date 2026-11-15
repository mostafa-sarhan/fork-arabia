/* Run only by the prerender, never hot-reloaded: the fast-refresh rule does not apply. */
/* eslint-disable react/only-export-components */
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import App from './App'
import { LanguageProvider } from './lib/i18n/LanguageProvider'

/*
 * The server half of the build, used only by scripts/prerender.mjs: the
 * same App as main.tsx, at a given URL, rendered to HTML once everything
 * it waits for (the lazily loaded pages) has arrived.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </StaticRouter>
    </StrictMode>,
    /* No streaming here: a large page is never split into "spinner now,
       content later" (React's default above about 12 KB); it is written
       in place, whole. */
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  )

  return new Response(prelude).text()
}

export { localizedRoutes, SITE_ROUTES } from './config/routes'
export { SITE_URL } from './config/site'
export { COMPANY_DESCRIPTION } from './data/siteCopy'
export { DEFAULT_LANGUAGE, DIRECTIONS, LANGUAGES } from './lib/i18n/languageConfig'
export { resolveCopy } from './lib/i18n/localized'
export { absoluteUrl, headHtml, pageHead } from './lib/seo/pageHead'
