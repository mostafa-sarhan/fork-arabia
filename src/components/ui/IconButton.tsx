import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'
import { cn } from '@/lib/cn'
import { LocalizedLink } from '@/components/LocalizedLink'
import type { SitePath } from '@/config/paths'

export type IconButtonVariant = 'solid' | 'outline' | 'ghost'
export type IconButtonSize = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center rounded-md transition-colors duration-200 ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-fg'

/** The pressed states mirror Button's, variant for variant. */
const variants: Record<IconButtonVariant, string> = {
  solid: 'bg-navy text-white hover:bg-navy-strong active:bg-navy-strong',
  outline:
    'border border-line-strong bg-surface text-ink hover:border-petrol hover:text-petrol active:bg-navy-soft',
  ghost:
    'text-ink-muted hover:bg-navy-soft hover:text-ink active:bg-navy-soft active:text-ink',
}

const sizes: Record<IconButtonSize, string> = {
  sm: 'size-9',
  md: 'size-11',
}

type SharedProps = {
  /*
   * aria-label alone: a title duplicating it made assistive technology
   * announce the same string twice and added a hover tooltip that never
   * appears for keyboard or touch users.
   */
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
  className?: string
  children?: ReactNode
}

type AsButton = SharedProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children' | 'aria-label'
  > & {
    to?: never
    href?: never
    ref?: Ref<HTMLButtonElement>
  }

type AsInternalLink = SharedProps & {
  to: SitePath
  href?: never
  ref?: Ref<HTMLAnchorElement>
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
  target?: string
  rel?: string
}

type AsExternalLink = SharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'className' | 'children' | 'aria-label'
  > & {
    href: string
    to?: never
    ref?: Ref<HTMLAnchorElement>
  }

export type IconButtonProps = AsButton | AsInternalLink | AsExternalLink

/** The icon-only counterpart of `Button`, with the same three shapes. */
export function IconButton(props: IconButtonProps) {
  const { label, variant = 'ghost', size = 'md', className: extra } = props
  const className = cn(base, variants[variant], sizes[size], extra)

  if (props.to !== undefined) {
    const {
      to,
      label: _label,
      variant: _variant,
      size: _size,
      className: _className,
      ...rest
    } = props

    return (
      <LocalizedLink to={to} aria-label={label} className={className} {...rest}>
        {props.children}
      </LocalizedLink>
    )
  }

  if (props.href !== undefined) {
    const {
      href,
      label: _label,
      variant: _variant,
      size: _size,
      className: _className,
      target,
      rel,
      ...rest
    } = props

    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
        aria-label={label}
        className={className}
        {...rest}
      >
        {props.children}
      </a>
    )
  }

  const {
    label: _label,
    variant: _variant,
    size: _size,
    className: _className,
    type = 'button',
    children,
    ...rest
  } = props

  return (
    <button
      type={type}
      aria-label={label}
      className={className}
      {...rest}
    >
      {children}
    </button>
  )
}
