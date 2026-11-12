import type { ReactNode } from 'react'
import { useParams } from 'react-router'
import { Container } from '@/components/layout/Container'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { Button, type ButtonVariant } from '@/components/ui/Button'
import { ICONS } from '@/components/ui/iconRegistry'
import { getSectorBySlug } from '@/data/sectorIndex'
import { getSectorContent } from '@/data/sectorContent'
import { Copy } from '@/lib/i18n/Copy'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import {
  ROUTE_PATHS,
  ROUTE_TITLE_KEYS,
  type PageRouteId,
} from '@/lib/routing/routes'
import NotFound from './NotFound'

/**
 * The page a declared route shows until its real content ships.
 *
 * Declaring the routes now and answering them with one branded page is what
 * lets the navigation be complete and correct from the first commit: every
 * link resolves, every URL is fixed, and nothing in the header has to be
 * disabled or hidden. All of these routes are `indexable: false` in the
 * route table, so none of them can be found in search while it says this.
 */
function PlaceholderShell({
  crumbs,
  eyebrow,
  title,
  lead,
  currentRouteId,
}: {
  crumbs: BreadcrumbItem[]
  eyebrow?: ReactNode
  title: ReactNode
  /** Shown above the actions, where a sector has its own question. */
  lead?: ReactNode
  /** The page does not offer a link to itself. */
  currentRouteId?: PageRouteId
}) {
  const { t } = useLanguage()

  const actions = (
    [
      { routeId: 'bookConsultation', variant: 'secondary' },
      { routeId: 'contact', variant: 'outline' },
    ] as const satisfies ReadonlyArray<{
      routeId: PageRouteId
      variant: ButtonVariant
    }>
  ).filter((action) => action.routeId !== currentRouteId)

  return (
    <main
      id="main"
      tabIndex={-1}
      className="min-h-main bg-page focus:outline-none"
    >
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
                key={action.routeId}
                to={ROUTE_PATHS[action.routeId]}
                variant={action.variant}
              >
                {t(ROUTE_TITLE_KEYS[action.routeId])}
              </Button>
            ))}
          </div>
        </Container>
      </div>
    </main>
  )
}

export default function PagePlaceholder({
  routeId,
}: {
  routeId: PageRouteId
}) {
  const { t } = useLanguage()

  return (
    <PlaceholderShell
      currentRouteId={routeId}
      crumbs={[
        { label: t('nav.home'), to: ROUTE_PATHS.home },
        { label: t(ROUTE_TITLE_KEYS[routeId]) },
      ]}
      title={t(ROUTE_TITLE_KEYS[routeId])}
    />
  )
}

/**
 * One sector, until its real template ships. The slug comes from the URL;
 * an unknown one is not a sector with no content, it is a page that does
 * not exist, so it renders the 404 rather than an empty shell.
 */
export function SectorPlaceholder() {
  const { t, language } = useLanguage()
  const { slug } = useParams()
  const sector = getSectorBySlug(slug)

  if (!sector) {
    return <NotFound />
  }

  const Icon = ICONS[sector.icon]
  /*
   * The sector's own question, from the content module — which is also
   * what keeps that module in this lazily loaded chunk rather than in the
   * bundle the header pulls in.
   */
  const { cta } = getSectorContent(sector.id)

  return (
    <PlaceholderShell
      lead={<Copy value={cta.title} />}
      crumbs={[
        { label: t('nav.home'), to: ROUTE_PATHS.home },
        { label: t('nav.services'), to: ROUTE_PATHS.services },
        { label: resolveCopy(sector.title, language).text },
      ]}
      eyebrow={
        <p className="mt-5 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-navy-soft text-petrol">
            <Icon className="size-5" />
          </span>
          <span
            dir="ltr"
            className="text-overline tracking-latin-wide text-subheading"
          >
            {sector.number}
          </span>
        </p>
      }
      title={<Copy value={sector.title} />}
    />
  )
}
