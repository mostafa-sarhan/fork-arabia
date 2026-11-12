import { cn } from '@/lib/cn'

export type BrandLockupTone = 'brand' | 'white'

/**
 * Where the lockup is standing. Each maps to a height token; the header's
 * is a breakpoint pair because its bar has one height below 1280 and
 * another above it.
 */
export type BrandLockupSize = 'header' | 'footer'

const SIZES: Record<BrandLockupSize, string> = {
  header: 'lockup-sm xl:lockup-md',
  footer: 'lockup-lg',
}

/**
 * Whether the mark swaps to the leading side in English.
 *
 * The artwork puts the mark to the right of the name. Read in English that
 * places it after the text, which is why it follows the reading direction
 * here: `true` keeps it at the inline-end of the reading flow — right in
 * Arabic, left in English. Set it to `false` and the mark stays on the
 * right in both, exactly as the original file draws it.
 */
const MIRROR_LOCKUP_IN_LTR = true

/**
 * The brand lockup, drawn rather than loaded.
 *
 * It is one object: the F mark plus both name lines, Arabic above Latin,
 * always both and in both languages. There is no Arabic-only or
 * English-only variant — a logo is artwork, not a translatable string.
 *
 * Built in code rather than placed as an image so the mark stays sharp at
 * every size and on every display, the two lines use the project's own
 * type and colour tokens, and the whole thing scales from one height. The
 * supplied PNG remains in `src/assets/brand` as the reference these
 * proportions were measured from.
 *
 * Side is a matter of layout, never of transforms: the flex row follows
 * the page direction, so nothing is ever mirrored — the mark is drawn the
 * same way round in both languages.
 */
export function BrandLockup({
  tone = 'brand',
  size = 'header',
  className,
}: {
  tone?: BrandLockupTone
  size?: BrandLockupSize
  className?: string
}) {
  const fill = (token: string) =>
    tone === 'white' ? 'currentColor' : `var(${token})`

  return (
    <span
      className={cn(
        'lockup',
        SIZES[size],
        tone === 'white' ? 'text-white' : 'text-heading',
        !MIRROR_LOCKUP_IN_LTR && 'ltr:flex-row-reverse',
        className,
      )}
    >
      {/*
        The geometry is the artwork's, measured from it: a 474x501 box
        holding three shapes of equal height, the second bar 64% of the
        first, and gaps of 25 units.
      */}
      <svg
        data-lockup="mark"
        viewBox="0 0 474 501"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="0"
          y="0"
          width="474"
          height="150"
          rx="75"
          fill={fill('--color-navy')}
        />
        <rect
          x="0"
          y="175"
          width="304"
          height="150"
          rx="75"
          fill={fill('--color-petrol')}
        />
        <circle cx="75" cy="426" r="75" fill={fill('--color-turquoise')} />
      </svg>

      {/*
        Both lines are the accessible name of the link that wraps this, so
        neither is hidden and the mark beside them is decoration.
      */}
      <span
        data-lockup="text"
        className={cn(
          'font-display font-bold whitespace-nowrap',
          MIRROR_LOCKUP_IN_LTR ? 'text-start' : 'ltr:text-end',
        )}
      >
        <span data-lockup="ar" lang="ar" dir="rtl">
          فورك العربية المحدودة
        </span>
        <span
          data-lockup="en"
          lang="en"
          dir="ltr"
        >
          FORK ARABIA LIMITED
        </span>
      </span>
    </span>
  )
}
