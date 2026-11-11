import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn } from '../../lib/cn'
import { useLanguage } from '../../lib/i18n/useLanguage'
import { translations } from '../../lib/i18n/translations'
import { DocSection } from './DocSection'

export function TypographySection() {
  const { t } = useLanguage()

  const rows = [
    {
      label: t('type.display'),
      token: 'text-display',
      className: 'text-display font-bold tracking-latin-tight',
      sample: t('type.sample.display'),
    },
    {
      label: t('type.h1'),
      token: 'text-h1',
      className: 'text-h1 font-bold tracking-latin-tight',
      sample: t('type.sample.heading'),
    },
    {
      label: t('type.h2'),
      token: 'text-h2',
      className: 'text-h2 font-semibold tracking-latin-tight',
      sample: t('type.sample.heading'),
    },
    {
      label: t('type.h3'),
      token: 'text-h3',
      className: 'text-h3 font-semibold tracking-latin-tight',
      sample: t('type.sample.short'),
    },
    {
      label: t('type.h4'),
      token: 'text-h4',
      className: 'text-h4 font-semibold',
      sample: t('type.sample.short'),
    },
    {
      label: t('type.bodyLarge'),
      token: 'text-body-lg',
      className: 'text-body-lg',
      sample: t('type.sample.body'),
    },
    {
      label: t('type.body'),
      token: 'text-body',
      className: 'text-body',
      sample: t('type.sample.body'),
    },
    {
      label: t('type.bodySmall'),
      token: 'text-body-sm',
      className: 'text-body-sm',
      sample: t('type.sample.body'),
    },
    {
      label: t('type.caption'),
      token: 'text-caption',
      className: 'text-caption text-ink-muted',
      sample: t('type.sample.body'),
    },
    {
      label: t('type.button'),
      token: 'text-button',
      className: 'text-button font-semibold',
      sample: t('btn.primary'),
    },
    {
      label: t('type.label'),
      token: 'text-label',
      className: 'text-label font-medium',
      sample: t('form.email'),
    },
    {
      label: t('type.nav'),
      token: 'text-nav',
      className: 'text-nav font-medium',
      sample: t('nav.services'),
    },
    {
      label: t('type.overline'),
      token: 'text-overline',
      className:
        'text-overline font-semibold tracking-latin-wide text-subheading',
      sample: t('heading.eyebrow'),
    },
  ]

  return (
    <DocSection
      id="typography"
      title={t('ds.type.title')}
      description={t('ds.type.desc')}
    >
      <div className="space-y-10">
        <div>
          <SectionHeading level={3} title={t('ds.type.bilingual')} />
          <div className="mt-4 grid gap-6 rounded-lg border border-line bg-surface p-6 sm:p-8 md:grid-cols-2">
            <div
              dir="rtl"
              lang="ar"
              className="md:border-e md:border-line md:pe-8"
            >
              <p className="text-overline font-semibold tracking-latin-wide text-subheading">
                {translations.ar['type.overline']}
              </p>
              <p className="mt-3 text-h3 font-semibold tracking-latin-tight text-ink">
                {translations.ar['type.sample.display']}
              </p>
              <p className="mt-3 text-body text-ink-muted">
                {translations.ar['type.sample.body']}
              </p>
            </div>
            <div dir="ltr" lang="en" className="md:ps-2">
              <p className="text-overline font-semibold tracking-latin-wide text-subheading">
                {translations.en['type.overline']}
              </p>
              <p className="mt-3 text-h3 font-semibold tracking-latin-tight text-ink">
                {translations.en['type.sample.display']}
              </p>
              <p className="mt-3 text-body text-ink-muted">
                {translations.en['type.sample.body']}
              </p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading level={3} title={t('ds.type.scale')} />
          <div className="mt-2">
            {rows.map((row) => (
              <div
                key={row.token}
                className="grid gap-2 border-t border-line py-5 md:grid-cols-[12rem_minmax(0,1fr)] md:items-baseline md:gap-8"
              >
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-caption font-semibold text-ink-muted">
                    {row.label}
                  </span>
                  <code dir="ltr" className="text-caption text-ink-muted/70">
                    {row.token}
                  </code>
                </div>
                <p className={cn('text-ink', row.className)}>{row.sample}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DocSection>
  )
}
