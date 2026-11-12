import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'
import { cn } from '@/lib/cn'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import type { CanonicalPath } from '@/lib/routing/routes'
import { Spinner } from './Spinner'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'

export type ButtonSize = 'sm' | 'md' | 'lg'

/*
 * `not-aria-busy` keeps the inactive treatment off a loading button. Loading
 * sets `disabled` as well — the control genuinely cannot be used yet — but it
 * is a busy action, not an unavailable one, so it keeps its variant colour
 * behind the spinner. The guard is a selector rather than a prop test, so it
 * also holds for a consumer that sets `aria-busy` itself.
 */
const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors duration-200 ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:not-aria-busy:border-disabled-border disabled:not-aria-busy:bg-disabled-bg disabled:not-aria-busy:text-disabled-fg'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-strong active:bg-navy-strong',
  secondary:
    'bg-turquoise text-on-accent hover:bg-turquoise-lift active:bg-turquoise-lift',
  outline:
    'border border-line-strong bg-surface text-ink hover:border-petrol hover:text-petrol active:bg-navy-soft',
  ghost: 'text-ink hover:bg-navy-soft active:bg-navy-soft',
  destructive:
    'bg-danger text-white hover:bg-danger-strong active:bg-danger-strong',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-body-sm',
  md: 'h-11 px-5 text-button',
  lg: 'h-12 px-6 text-body',
}

type SharedProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children?: ReactNode
}

/**
 * An action. Only a real `<button>` can be busy or unavailable, which is why
 * `loading` and `disabled` live on this member alone.
 */
type AsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: never
    href?: never
    loading?: boolean
    ref?: Ref<HTMLButtonElement>
  }

/** A link to another page of this site, by canonical path. */
type AsInternalLink = SharedProps & {
  to: CanonicalPath
  href?: never
  ref?: Ref<HTMLAnchorElement>
  'aria-label'?: string
  'aria-current'?: AnchorHTMLAttributes<HTMLAnchorElement>['aria-current']
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
  target?: string
  rel?: string
}

/** A link to somewhere else: another origin, a tel:, a mailto:. */
type AsExternalLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string
    to?: never
    ref?: Ref<HTMLAnchorElement>
  }

export type ButtonProps = AsButton | AsInternalLink | AsExternalLink

function buttonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: SharedProps): string {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
}

/**
 * One set of styles for every shape an action can take.
 *
 * A call to action is sometimes a submit button and sometimes a link to
 * another page, and the two must be indistinguishable to the eye and
 * identical under focus — but not to the browser: a link has to be an
 * anchor so it can be opened in a new tab, copied, and read as a link by a
 * screen reader. Restyling an anchor to look like a button at each call
 * site is how those two drift apart, so the element is chosen here from the
 * props: `to` for an internal route, `href` for anything else, neither for
 * a button.
 */
export function Button(props: ButtonProps) {
  const className = buttonClassName(props)

  if (props.to !== undefined) {
    const {
      to,
      variant: _variant,
      size: _size,
      fullWidth: _fullWidth,
      className: _className,
      ...rest
    } = props

    return (
      <LocalizedLink to={to} className={className} {...rest}>
        {props.children}
      </LocalizedLink>
    )
  }

  if (props.href !== undefined) {
    const {
      href,
      variant: _variant,
      size: _size,
      fullWidth: _fullWidth,
      className: _className,
      target,
      rel,
      ...rest
    } = props

    return (
      <a
        href={href}
        target={target}
        /*
         * A new tab opened from this document would otherwise share its
         * browsing context with it.
         */
        rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
        className={className}
        {...rest}
      >
        {props.children}
      </a>
    )
  }

  const {
    variant: _variant,
    size: _size,
    fullWidth: _fullWidth,
    className: _className,
    loading = false,
    disabled,
    type = 'button',
    children,
    ...rest
  } = props

  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner className="size-4" /> : null}
      {children}
    </button>
  )
}
