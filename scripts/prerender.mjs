/**
 * Writes every page of the site as static HTML, after `vite build`.
 *
 *   dist/index.html, dist/about/index.html, … dist/en/about/index.html, …
 *   dist/404.html, which Vercel serves with a 404 status for any other URL
 *   dist/sitemap.xml and dist/robots.txt, from the same routes list
 *
 * The pages come from src/config/routes.ts, rendered by the server build of
 * src/entry-server.tsx (dist-ssr/, deleted afterwards) into the client
 * build's own index.html, so each file loads the same scripts and styles and
 * the browser hydrates what it finds. Each root records the URL it was
 * rendered for (data-prerendered), which main.tsx checks before hydrating.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SERVER_BUILD = join(ROOT, 'dist-ssr')

const { render, localizedRoutes, DIRECTIONS, pageHead, headHtml, COMPANY_DESCRIPTION, resolveCopy, SITE_ROUTES, LANGUAGES, DEFAULT_LANGUAGE, absoluteUrl, SITE_URL } = await import(pathToFileURL(join(SERVER_BUILD, 'entry-server.js')).href)
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

const HTML_TAG = '<html lang="ar" dir="rtl">'
const ROOT_TAG = '<div id="root"></div>'
/* Where index.html takes each page's own head tags. */
const HEAD_MARKER = /<!-- page-head:[\s\S]*?-->/
if (!HEAD_MARKER.test(template)) throw new Error('prerender: dist/index.html has no <!-- page-head: … --> marker')
for (const marker of [HTML_TAG, ROOT_TAG]) {
  if (!template.includes(marker)) throw new Error(`prerender: dist/index.html has no ${marker}`)
}

/** The template with one page's markup, its language and direction, and its head tags. */
function page({ url, language, markup }) {
  return template
    .replace(HTML_TAG, `<html lang="${language}" dir="${DIRECTIONS[language]}">`)
    .replace(HEAD_MARKER, headHtml(pageHead(url)))
    .replace(ROOT_TAG, `<div id="root" data-prerendered="${url}">${markup}</div>`)
}

/** "/" → dist/index.html, "/en/about" → dist/en/about/index.html. */
function fileFor(url) {
  return join(DIST, url, 'index.html')
}

/*
 * Search results show about 155 characters, so every listed page's
 * description should be 140-160. One outside that range is reported, not
 * fatal: the build goes on and the warning names the page.
 */
const DESCRIPTION_LENGTH = { min: 140, max: 160 }
const descriptionWarnings = []

function checkDescription(url, language) {
  const description = pageHead(url).find((tag) => tag.name === 'description')?.content ?? ''
  const { length } = [...description]
  if (length < DESCRIPTION_LENGTH.min || length > DESCRIPTION_LENGTH.max) {
    descriptionWarnings.push(`  ${url} (${language}): ${length} characters, "${description}"`)
  }
}

/** A page split into "spinner now, content later" would ship the spinner: stop the build instead. */
function assertComplete(url, markup) {
  if (markup.includes('<!--$?-->')) {
    throw new Error(`prerender: ${url} still has a pending Suspense boundary (the spinner, not the page)`)
  }
}

const routes = localizedRoutes()

for (const { url, language } of routes) {
  const markup = await render(url)
  assertComplete(url, markup)
  checkDescription(url, language)
  const file = fileFor(url)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page({ url, language, markup }))
}

/*
 * The 404, in Arabic (the default language), never indexed (pageHead gives
 * any unknown URL noindex). Any unknown URL gets it; under /en the browser
 * then draws the English 404 itself, since the URL differs from the one it
 * was rendered for.
 */
const NOT_FOUND_URL = '/404'
writeFileSync(
  join(DIST, '404.html'),
  page({
    url: NOT_FOUND_URL,
    language: 'ar',
    markup: await render(NOT_FOUND_URL),
  }),
)

/* The app manifest describes the company in the same one sentence (src/data/siteCopy.ts). */
const manifestFile = join(DIST, 'site.webmanifest')
const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'))
manifest.description = resolveCopy(COMPANY_DESCRIPTION, 'ar')
writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`)

/*
 * sitemap.xml: every page in the routes list, in each language, each entry
 * naming its other-language versions (hreflang, x-default to Arabic). The
 * 404 and the design-system reference are not in that list, so never here.
 */
const alternates = (path) =>
  [...LANGUAGES.map((language) => [language, absoluteUrl(path, language)]), ['x-default', absoluteUrl(path, DEFAULT_LANGUAGE)]]
    .map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
    .join('\n')

const sitemapEntries = LANGUAGES.flatMap((language) =>
  SITE_ROUTES.map((route) => `  <url>\n    <loc>${absoluteUrl(route.path, language)}</loc>\n${alternates(route.path)}\n  </url>`),
)
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('\n')}
</urlset>
`,
)

/* robots.txt: everything may be crawled; the sitemap is named in full. */
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

rmSync(SERVER_BUILD, { recursive: true, force: true })
console.log(`prerendered ${routes.length} pages and 404.html; sitemap.xml (${sitemapEntries.length} URLs), robots.txt`)
if (descriptionWarnings.length) {
  console.warn(`\n⚠ ${descriptionWarnings.length} description(s) outside ${DESCRIPTION_LENGTH.min}-${DESCRIPTION_LENGTH.max} characters (src/config/seo.ts):\n${descriptionWarnings.join('\n')}\n`)
}
