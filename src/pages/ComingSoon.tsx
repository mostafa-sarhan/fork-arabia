import { useEffect } from 'react'
import { Logo } from '../components/brand/Logo'
import { Container } from '../components/layout/Container'
import { Badge } from '../components/ui/Badge'
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher'
import { useLanguage } from '../lib/i18n/useLanguage'

const YEAR = new Date().getFullYear()

export default function ComingSoon() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = `${t('brand.name')} — ${t('soon.eyebrow')}`
  }, [t])

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-turquoise"
      />

      <header className="relative z-nav">
        <Container className="flex items-center justify-between gap-4 py-5">
          <Logo />
          <LanguageSwitcher />
        </Container>
      </header>

      <main className="relative z-10 flex flex-1 items-center py-section-sm sm:py-section">
        <Container>
          <div className="mx-auto max-w-2xl animate-fade-up rounded-lg border border-line bg-surface p-8 text-center shadow-card sm:p-12 lg:p-16">
            <Badge variant="accent" className="tracking-latin-wide">
              <span
                className="size-1.5 rounded-full bg-turquoise"
                aria-hidden="true"
              />
              {t('soon.eyebrow')}
            </Badge>

            <h1 className="mt-6 font-display text-h1 font-bold tracking-latin-tight text-heading">
              {t('soon.titleA')}{' '}
              <span className="text-subheading">{t('soon.titleB')}</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-body-lg text-ink-muted text-pretty">
              {t('soon.description')}
            </p>

            <div className="mx-auto mt-10 max-w-sm">
              <div className="flex items-center justify-between gap-3 text-caption text-ink-muted">
                <span>{t('soon.progress')}</span>
                <span className="inline-flex items-center gap-1" aria-hidden="true">
                  <span className="size-1.5 animate-dot rounded-full bg-turquoise" />
                  <span
                    className="size-1.5 animate-dot rounded-full bg-turquoise"
                    style={{ animationDelay: '160ms' }}
                  />
                  <span
                    className="size-1.5 animate-dot rounded-full bg-turquoise"
                    style={{ animationDelay: '320ms' }}
                  />
                </span>
              </div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-navy-soft">
                <div className="h-full w-1/3 animate-shimmer rounded-full bg-turquoise" />
              </div>
            </div>
          </div>
        </Container>
      </main>

      <footer className="relative z-10 border-t border-line bg-surface">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-caption text-ink-muted sm:flex-row">
          <span>
            © {YEAR} {t('brand.legal')}. {t('soon.rights')}
          </span>
          <span>{t('soon.established')}</span>
        </Container>
      </footer>
    </div>
  )
}
