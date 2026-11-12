import type { AnchorHTMLAttributes, HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const surface = 'rounded-lg border border-line bg-surface shadow-xs'

/**
 * The lift is a change of elevation, not of position, so nothing moves for
 * someone who has asked for reduced motion. motion-reduce:transition-none
 * drops the fade as well, so the shadow simply snaps.
 */
const lift =
  'transition-shadow duration-200 ease-standard hover:shadow-raised motion-reduce:transition-none'

/** Identical to Button's ring, so a focused card reads the same. */
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface'

/**
 * A plain card surface. `interactive` is deliberately unavailable here: a
 * card that lifts under the pointer reads as one clickable target, and a
 * <div> cannot be focused or activated, so the lift would be a promise the
 * card cannot keep for anyone using a keyboard. Render the card as a link
 * instead.
 */
type CardSurfaceProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div'
  href?: never
  interactive?: never
}

/**
 * The whole card as a single link: one focusable element, Button's focus
 * ring, and the hover lift unless it is turned off.
 */
type CardLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a'
  href: string
  interactive?: boolean
}

export type CardProps = CardSurfaceProps | CardLinkProps

export function Card(props: CardProps) {
  if (props.as === 'a') {
    const {
      as: _as,
      interactive = true,
      className,
      ...anchorProps
    } = props

    return (
      <a
        className={cn(
          surface,
          'block',
          focusRing,
          interactive && lift,
          className,
        )}
        {...anchorProps}
      />
    )
  }

  const {
    as: _as,
    interactive: _interactive,
    className,
    ...divProps
  } = props

  return <div className={cn(surface, className)} {...divProps} />
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-h4 font-semibold text-heading', className)}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('mt-2 text-body-sm text-ink-muted', className)}
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 border-t border-line px-6 py-4',
        className,
      )}
      {...props}
    />
  )
}
