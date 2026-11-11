import { cn } from '../../lib/cn'
import { useLanguage } from '../../lib/i18n/useLanguage'
import { ChevronRightIcon } from './icons'

export type BreadcrumbItem = {
  label: string
  href?: string
}

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
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="rounded-sm transition-colors duration-200 hover:text-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2"
                >
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
