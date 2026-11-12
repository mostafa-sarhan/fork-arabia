import { cn } from '@/lib/cn'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { LocalizedLink } from '@/lib/routing/LocalizedLink'
import type { CanonicalPath } from '@/lib/routing/routes'
import { ChevronRightIcon } from './icons'

export type BreadcrumbItem = {
  label: string
  /** A page of this site, named by its canonical path. */
  to?: CanonicalPath
  /** Anything the router does not own: a hash target or another origin. */
  href?: string
}

const crumbLink =
  'rounded-sm transition-colors duration-200 hover:text-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2'

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
  label?: string
  className?: string
}

export function Breadcrumb({ items, label, className }: BreadcrumbProps) {
  const { t } = useLanguage()

  return (
    <nav aria-label={label ?? t('breadcrumb.label')} className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-body-sm text-ink-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {item.to && !isLast ? (
                <LocalizedLink to={item.to} className={crumbLink}>
                  {item.label}
                </LocalizedLink>
              ) : item.href && !isLast ? (
                <a href={item.href} className={crumbLink}>
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(isLast && 'font-medium text-ink')}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRightIcon className="size-3.5 text-line-strong rtl:-scale-x-100" />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
