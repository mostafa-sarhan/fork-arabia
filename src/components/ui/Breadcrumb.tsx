import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { LocalizedLink } from '@/components/LocalizedLink'
import type { SitePath } from '@/config/paths'
import { ChevronRightIcon } from './icons'

export type BreadcrumbItem = {
  label: string
  /** A page of this site, named by its canonical path. */
  to?: SitePath
  /** Anything the router does not own: a hash target or another origin. */
  href?: string
}

const crumbLink =
  'rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

/*
 * The colours for each surface: the trail, a link's hover and focus ring,
 * the current page and the chevron. `navy` is the inner pages' hero.
 */
const TONES = {
  light: {
    list: 'text-ink-muted',
    link: 'hover:text-link focus-visible:ring-petrol',
    current: 'text-ink',
    separator: 'text-line-strong',
  },
  navy: {
    list: 'text-white/72',
    link: 'hover:text-white focus-visible:ring-white focus-visible:ring-offset-navy',
    current: 'text-white',
    separator: 'text-white/40',
  },
} as const

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
  label?: string
  tone?: keyof typeof TONES
  className?: string
}

export function Breadcrumb({
  items,
  label,
  tone = 'light',
  className,
}: BreadcrumbProps) {
  const { t } = useLanguage()
  const colors = TONES[tone]

  return (
    <nav aria-label={label ?? t('breadcrumb.label')} className={className}>
      <ol className={cn('flex flex-wrap items-center gap-2 text-body-sm', colors.list)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {item.to && !isLast ? (
                <LocalizedLink to={item.to} className={cn(crumbLink, colors.link)}>
                  {item.label}
                </LocalizedLink>
              ) : item.href && !isLast ? (
                <a href={item.href} className={cn(crumbLink, colors.link)}>
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(isLast && ['font-medium', colors.current])}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRightIcon className={cn('size-3.5 rtl:-scale-x-100', colors.separator)} />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
