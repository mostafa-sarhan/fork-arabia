import type { ReactNode } from 'react'
import { Container } from '@/components/layout/Container'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { PATHS, type SitePath } from '@/config/paths'
import type { TranslationKey } from '@/lib/i18n/translations'
import { useLanguage } from '@/lib/i18n/useLanguage'

/** The two actions every placeholder offers, unless it is that page. */
const ACTIONS = [
  {
    path: PATHS.bookConsultation,
    labelKey: 'nav.bookConsultation',
    variant: 'secondary',
  },
  { path: PATHS.contact, labelKey: 'nav.contact', variant: 'outline' },
] as const satisfies ReadonlyArray<{
  path: SitePath
  labelKey: TranslationKey
  variant: 'secondary' | 'outline'
}>

export type PlaceholderShellProps = {
  /** Breadcrumbs, Home first, this page last. */
  crumbs: BreadcrumbItem[]
  /** The page's heading. */
  title: ReactNode
  eyebrow?: ReactNode
  /** Shown above the actions, where a sector has its own question. */
  lead?: ReactNode
  /** This page's own path, so it does not offer a link to itself. */
  currentPath?: SitePath
}

/**
 * The page a declared route shows until its real content ships.
 *
 * Answering every route with one branded page is what lets the navigation be
 * complete from the first commit: every link resolves, every URL is fixed,
 * and nothing in the navbar has to be disabled or hidden. All of these pages
 * pass `indexable: false`, so none of them can be found in search while it
 * says this.
 */
export function PlaceholderShell({
  crumbs,
  title,
  eyebrow,
  lead,
  currentPath,
}: PlaceholderShellProps) {
  const { t } = useLanguage()
  const actions = ACTIONS.filter((action) => action.path !== currentPath)

  return (
    <div className="min-h-main bg-page">
      <div className="border-b border-line bg-surface">
        <Container className="py-section-sm sm:py-section">
          <Breadcrumb items={crumbs} />

          {eyebrow}

          <h1 className="mt-5 font-display text-h1 font-bold tracking-latin-tight text-heading">
            {title}
          </h1>

          <p className="mt-4 max-w-measure text-body-lg text-ink-muted text-pretty">
            {t('page.preparing')}
          </p>

          {lead ? (
            <p className="mt-8 font-display text-h4 font-semibold text-heading">
              {lead}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {actions.map((action) => (
              <Button
                key={action.path}
                to={action.path}
                variant={action.variant}
              >
                {t(action.labelKey)}
              </Button>
            ))}
          </div>
        </Container>
      </div>
    </div>
  )
}

/** The placeholder for a plain page: Home, its own name, and the actions. */
export function PagePlaceholder({
  titleKey,
  path,
}: {
  titleKey: TranslationKey
  path: SitePath
}) {
  const { t } = useLanguage()

  return (
    <PlaceholderShell
      currentPath={path}
      title={t(titleKey)}
      crumbs={[
        { label: t('nav.home'), to: PATHS.home },
        { label: t(titleKey) },
      ]}
    />
  )
}
