/**
 * Regenerates the site's icons and share image from two hand-kept sources:
 *
 *   public/favicon.svg     the browser-tab icon (kept as designed, never
 *                          written by this script); drawn from it:
 *     public/favicon.ico         16 and 32px, for browsers without SVG icons
 *
 *   apple-touch-icon.png, icon-192.png and icon-512.png are kept as
 *   designed too (the white F on a navy rounded square); this script
 *   never writes them.
 *
 *   public/brand/mark.svg  the F mark, for the share image:
 *     public/og/default.png      1200x630: the lockup and the tagline on
 *                                the hero's navy grid
 *
 * Run it after any logo or icon change:  npm run brand
 *
 * sharp (a dev dependency, never shipped) draws the PNGs; the share
 * image's text is set in Cairo from scripts/brand/Cairo-Variable.ttf, the
 * site's own typeface, bundled so the result is the same on any machine.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = join(ROOT, 'public')
const FONT_FILE = join(ROOT, 'scripts/brand/Cairo-Variable.ttf')

/* The guideline's palette (Brand Guideline, page 7), as the site's tokens. */
const NAVY = '#182F59'
const TURQUOISE = '#19AFB0'
const WHITE = '#FFFFFF'

/* The mark's box, and its three shapes as written in mark.svg. */
const MARK_WIDTH = 474
const MARK_HEIGHT = 501
const markSource = readFileSync(join(PUBLIC, 'brand/mark.svg'), 'utf8')
const SHAPES = ['bar-1', 'bar-2', 'dot'].map((id) => {
  const element = markSource.match(new RegExp(`<(rect|circle)[^>]*id="${id}"[^>]*/>`))?.[0]
  if (!element) throw new Error(`mark.svg has no shape with id="${id}"`)
  return { id, element: element.replace(/\sfill="[^"]*"/, '').replace(/\sid="[^"]*"/, '') }
})

/** The mark's three shapes, all in one colour (the share image draws it in white). */
function markShapes({ fill }) {
  return SHAPES.map(({ element }) => element.replace('/>', `fill="${fill}" />`)).join('\n    ')
}

/* The favicon as designed: its viewBox and what it draws. */
const faviconSource = readFileSync(join(PUBLIC, 'favicon.svg'), 'utf8')
const FAVICON_VIEWBOX = faviconSource.match(/viewBox="([^"]*)"/)?.[1] ?? '0 0 64 64'
const FAVICON_BODY = faviconSource.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')

/** The favicon as it is, drawn into a transparent `size` px square (for the .ico). */
function fromFavicon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${FAVICON_VIEWBOX}">${FAVICON_BODY}</svg>`
}

/** An .ico holding PNG images (every browser since IE 11 reads them). */
function icoFrom(pngs) {
  const header = Buffer.alloc(6 + pngs.length * 16)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(pngs.length, 4)
  let offset = header.length
  pngs.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16
    header.writeUInt8(size >= 256 ? 0 : size, entry) // width
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1) // height
    header.writeUInt8(0, entry + 2) // palette
    header.writeUInt8(0, entry + 3) // reserved
    header.writeUInt16LE(1, entry + 4) // colour planes
    header.writeUInt16LE(32, entry + 6) // bits per pixel
    header.writeUInt32LE(data.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += data.length
  })
  return Buffer.concat([header, ...pngs.map((png) => png.data)])
}

const png = (svg) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 })

/** One line of text in Cairo, as a transparent PNG, with its size. */
async function textLine(text, { size, weight = 'bold', color = WHITE, letterSpacing = 0 }) {
  const markup = `<span foreground="${color}" font_weight="${weight}" letter_spacing="${letterSpacing * 1024}">${text}</span>`
  const data = await sharp({ text: { text: markup, font: `Cairo ${size}`, fontfile: FONT_FILE, rgba: true, dpi: 72 } })
    .png()
    .toBuffer()
  const { width, height } = await sharp(data).metadata()
  return { data, width, height }
}

/*
 * The share image, 1200x630: the hero's navy with its faint 56px grid and
 * the mark as a large watermark at the inline end (left, as on the Arabic
 * hero); in the middle the lockup in white (the guideline's logo on dark)
 * and the tagline in turquoise under it. Everything sits inside a
 * centred 900x420 area, clear of any crop a platform makes.
 */
async function shareImage() {
  const W = 1200
  const H = 630
  const MARK_H = 150
  const markW = (MARK_WIDTH / MARK_HEIGHT) * MARK_H
  const GAP = 32

  const arabic = await textLine('فورك العربية المحدودة', { size: 58 })
  const latin = await textLine('FORK ARABIA LIMITED', { size: 37, letterSpacing: 1 })
  const tagline = await textLine('خدمات مهنية متكاملة', { size: 40, weight: 'semibold', color: TURQUOISE })

  /* The lockup: name lines at the start (right in Arabic), the mark after them. */
  const textW = Math.max(arabic.width, latin.width)
  /* The Latin line sits a little under the Arabic, clear of its dots. */
  const LINE_GAP = 6
  const textH = arabic.height + LINE_GAP + latin.height
  const lockupW = textW + GAP + markW
  const lockupH = Math.max(MARK_H, textH)
  const blockH = lockupH + 48 + tagline.height
  const top = Math.round((H - blockH) / 2)
  const left = Math.round((W - lockupW) / 2)

  const markX = left + lockupW - markW
  const textRight = markX - GAP
  const textTop = top + Math.round((lockupH - textH) / 2)

  const background = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="${WHITE}" stroke-opacity="0.035" stroke-width="2" />
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${NAVY}" />
  <rect width="${W}" height="${H}" fill="url(#grid)" />
  <g transform="translate(-170 ${(H - 440) / 2}) scale(${440 / MARK_HEIGHT})" opacity="0.05">
    ${markShapes({ fill: WHITE })}
  </g>
  <g transform="translate(${markX} ${top + (lockupH - MARK_H) / 2}) scale(${MARK_H / MARK_HEIGHT})">
    ${markShapes({ fill: WHITE })}
  </g>
</svg>`

  return sharp(Buffer.from(background))
    .composite([
      { input: arabic.data, left: Math.round(textRight - arabic.width), top: textTop },
      { input: latin.data, left: Math.round(textRight - latin.width), top: textTop + arabic.height + LINE_GAP },
      { input: tagline.data, left: Math.round((W - tagline.width) / 2), top: top + lockupH + 48 },
    ])
    .png({ compressionLevel: 9 })
}

mkdirSync(join(PUBLIC, 'og'), { recursive: true })

/* The .ico: the tab icon itself at 16 and 32px, transparent as the SVG is. */
const icoImages = await Promise.all(
  [16, 32].map(async (size) => ({ size, data: await png(fromFavicon(size)).toBuffer() })),
)
writeFileSync(join(PUBLIC, 'favicon.ico'), icoFrom(icoImages))


await (await shareImage()).toFile(join(PUBLIC, 'og/default.png'))

console.log('Brand files written: favicon.ico (from favicon.svg), og/default.png (from brand/mark.svg)')
