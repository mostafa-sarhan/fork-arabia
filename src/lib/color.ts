/**
 * Color resolution and WCAG contrast math.
 *
 * Values are never duplicated here: `resolveTokenColor` asks the browser to
 * compute a CSS custom property, so the palette declared in `index.css`
 * stays the single source of truth and the ratios reported by the design
 * system are measured from whatever the tokens currently hold.
 */

export type Rgb = { r: number; g: number; b: number }

/** WCAG 2.1 AA minimum for normal-size text. */
export const AA_NORMAL = 4.5

/**
 * WCAG 2.1 AA minimum for large text (>=24px, or >=18.66px when bold) and
 * for graphical objects such as icons.
 */
export const AA_LARGE = 3

const RGB_PATTERN =
  /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.%]+))?\s*\)$/

function parseRgb(value: string): Rgb | null {
  const match = RGB_PATTERN.exec(value.trim())

  if (!match) {
    return null
  }

  const [, r, g, b, alpha] = match

  if (r === undefined || g === undefined || b === undefined) {
    return null
  }

  // An unresolvable custom property falls back to a transparent sentinel.
  if (alpha !== undefined && Number.parseFloat(alpha) === 0) {
    return null
  }

  return {
    r: Number.parseFloat(r),
    g: Number.parseFloat(g),
    b: Number.parseFloat(b),
  }
}

/**
 * Resolves a CSS custom property to concrete sRGB channels.
 *
 * A hidden probe element is used rather than reading the custom property
 * directly, because a token may be declared as `var(--other-token)` and only
 * a real property forces the substitution.
 *
 * Returns `null` when the token is undefined or does not resolve to sRGB.
 */
export function resolveTokenColor(token: string): Rgb | null {
  if (typeof document === 'undefined') {
    return null
  }

  const probe = document.createElement('span')
  probe.setAttribute('aria-hidden', 'true')
  probe.style.display = 'none'
  probe.style.color = `var(${token}, rgba(0, 0, 0, 0))`

  document.body.appendChild(probe)
  const computed = window.getComputedStyle(probe).color
  probe.remove()

  return parseRgb(computed)
}

export function toHex({ r, g, b }: Rgb): string {
  const channel = (value: number) =>
    Math.round(Math.min(255, Math.max(0, value)))
      .toString(16)
      .padStart(2, '0')

  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase()
}

function channelLuminance(value: number): number {
  const normalized = value / 255

  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

/** Relative luminance per WCAG 2.1. */
export function relativeLuminance({ r, g, b }: Rgb): number {
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  )
}

/** Contrast ratio per WCAG 2.1, from 1:1 to 21:1. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const first = relativeLuminance(a)
  const second = relativeLuminance(b)
  const lighter = Math.max(first, second)
  const darker = Math.min(first, second)

  return (lighter + 0.05) / (darker + 0.05)
}

export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`
}
