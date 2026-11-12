import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { ROUTE_PATHS } from '@/lib/routing/routes'

/**
 * Rendered for every path no route claims, in the language the path asks for:
 * `/typo` is Arabic, `/en/typo` is English. The header is the site's own, so
 * a wrong URL still looks like the company rather than like a server error,
 * and the visitor can switch language or walk back without using the back
 * button.
 */
export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="relative flex min-h-main flex-col bg-page">
      <main
        id="main"
        tabIndex={-1}
        className="relative flex flex-1 items-center py-section-sm focus:outline-none sm:py-section"
      >
        <Container>
          <div className="mx-auto max-w-panel text-center">
            <Badge variant="outline">{t('notFound.badge')}</Badge>

            <h1 className="mt-6 font-display text-h1 font-bold tracking-latin-tight text-heading">
              {t('notFound.title')}
            </h1>

            <p className="mx-auto mt-5 max-w-measure text-body-lg text-ink-muted text-pretty">
              {t('notFound.desc')}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button to={ROUTE_PATHS.home} variant="secondary">
                {t('notFound.home')}
              </Button>
              <Button to={ROUTE_PATHS.contact} variant="outline">
                {t('nav.contact')}
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
