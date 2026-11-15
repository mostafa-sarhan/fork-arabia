/**
 * Writes every page of the site as static HTML, after `vite build`.
 *
 *   dist/index.html, dist/about/index.html, … dist/en/about/index.html, …
 *   dist/404.html, which Vercel serves with a 404 status for any other URL
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

const { render, localizedRoutes, DIRECTIONS } = await import(pathToFileURL(join(SERVER_BUILD, 'entry-server.js')).href)
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

const HTML_TAG = '<html lang="ar" dir="rtl">'
const ROOT_TAG = '<div id="root"></div>'
for (const marker of [HTML_TAG, ROOT_TAG]) {
  if (!template.includes(marker)) throw new Error(`prerender: dist/index.html has no ${marker}`)
}

/** The template with one page's markup, its language and direction, and any extra head tags. */
function page({ url, language, markup, head = '' }) {
  return template
    .replace(HTML_TAG, `<html lang="${language}" dir="${DIRECTIONS[language]}">`)
    .replace('</head>', `${head}</head>`)
    .replace(ROOT_TAG, `<div id="root" data-prerendered="${url}">${markup}</div>`)
}

/** "/" → dist/index.html, "/en/about" → dist/en/about/index.html. */
function fileFor(url) {
  return join(DIST, url, 'index.html')
}

const routes = localizedRoutes()

/** A page split into "spinner now, content later" would ship the spinner: stop the build instead. */
function assertComplete(url, markup) {
  if (markup.includes('<!--$?-->')) {
    throw new Error(`prerender: ${url} still has a pending Suspense boundary (the spinner, not the page)`)
  }
}

for (const { url, language } of routes) {
  const markup = await render(url)
  assertComplete(url, markup)
  const file = fileFor(url)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page({ url, language, markup }))
}

/*
 * The 404, in Arabic (the default language), never indexed. Any unknown
 * URL gets it; under /en the browser then draws the English 404 itself,
 * since the URL differs from the one it was rendered for.
 */
const NOT_FOUND_URL = '/404'
writeFileSync(
  join(DIST, '404.html'),
  page({
    url: NOT_FOUND_URL,
    language: 'ar',
    markup: await render(NOT_FOUND_URL),
    head: '<meta name="robots" content="noindex" />',
  }),
)

rmSync(SERVER_BUILD, { recursive: true, force: true })
console.log(`prerendered ${routes.length} pages and 404.html`)
