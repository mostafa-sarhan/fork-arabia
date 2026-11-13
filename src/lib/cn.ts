import { extendTailwindMerge, type ClassNameValue } from 'tailwind-merge'

/**
 * Class name merging with conflict resolution.
 *
 * Joining strings was not enough. A consumer's `className` only won when the
 * compiled stylesheet happened to emit it after the component's own class, so
 * `<Input className="pe-10" />` depended on Tailwind's property ordering
 * rather than on the later class winning. twMerge drops the losing class
 * instead of leaving both in the attribute, which makes an override
 * deterministic.
 *
 * tailwind-merge only knows Tailwind's stock scales, and this project's theme
 * replaces most of them. The scales below teach it the project's tokens. They
 * matter most where a prefix is ambiguous: without them `text-h3` and
 * `text-ink` land in the same bucket, and `cn('text-h4 text-heading')` would
 * be silently reduced to a single class.
 *
 * Keep these lists in step with the @theme block and the @utility rules in
 * src/styles/index.css.
 */

/** --text-* : the type scale, resolved as font sizes. */
const text = [
  'display',
  'hero',
  'page-title',
  'section-title',
  'eyebrow',
  'h1',
  'h2',
  'h3',
  'h4',
  'body-lg',
  'body',
  'body-sm',
  'caption',
  'button',
  'label',
  'nav',
  'overline',
]

/** --color-* : brand, surface and semantic role colors. */
const color = [
  'navy',
  'navy-strong',
  'navy-soft',
  'petrol',
  'petrol-strong',
  'turquoise',
  'turquoise-lift',
  'turquoise-soft',
  'page',
  'surface',
  'ink',
  'ink-muted',
  'line',
  'line-strong',
  'danger',
  'danger-strong',
  'danger-soft',
  'on-accent',
  'heading',
  'subheading',
  'link',
  'link-hover',
  'on-navy',
  'on-navy-muted',
  'disabled-bg',
  'disabled-fg',
  'disabled-border',
]

/** --spacing-* : named gutters and section rhythm, on top of the numeric scale. */
const spacing = [
  'gutter',
  'gutter-sm',
  'gutter-lg',
  'section-sm',
  'section',
  'section-lg',
]

/** --container-* : the layout widths. */
const container = [
  'compact',
  'measure',
  'panel',
  'narrow',
  'content',
  'wide',
]

/** --radius-* */
const radius = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']

/** --shadow-* */
const shadows = ['xs', 'card', 'raised', 'header']

/** --font-* : both families resolve through the same stack. */
const font = ['sans', 'display']

/** --leading-* */
const leading = ['paragraph']

/** --tracking-* */
const tracking = ['brand', 'brand-wide']

/** --ease-* */
const ease = ['standard', 'emphasized', 'out-soft']

/** --animate-* */
const animate = ['fade-up', 'reveal', 'shimmer', 'dot']

/** --breakpoint-* */
const breakpoint = ['sm', 'md', 'lg', 'xl', '2xl']

/** The z-index layering scale, exposed through @utility rules. */
const zLayers = [
  'base',
  'raised',
  'sticky',
  'nav',
  'dropdown',
  'overlay',
  'modal',
  'toast',
]

/**
 * The Latin-only typographic utilities. They all write `letter-spacing`, so
 * they belong in the same group as Tailwind's own `tracking-*`.
 */
const trackingUtilities = ['latin', 'latin-wide', 'latin-tight']

export type ClassValue = ClassNameValue

export const cn = extendTailwindMerge({
  extend: {
    theme: {
      text,
      color,
      spacing,
      container,
      radius,
      shadow: shadows,
      font,
      leading,
      tracking,
      ease,
      animate,
      breakpoint,
    },
    classGroups: {
      z: [{ z: zLayers }],
      tracking: [{ tracking: trackingUtilities }],
      // bg-grid paints a background image, not a background color.
      'bg-image': ['bg-grid'],
    },
  },
})
