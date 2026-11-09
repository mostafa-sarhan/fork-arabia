import { cn } from '../../lib/cn'
import { useLanguage } from '../../lib/i18n/useLanguage'
import { DocSection } from './DocSection'

type Swatch = {
  name: string
  value: string
  swatchClassName: string
  usage: string
  bordered?: boolean
}

function SwatchCard({ swatch }: { swatch: Swatch }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-xs">
      <div
        className={cn(
          'h-20 w-full',
          swatch.swatchClassName,
          swatch.bordered && 'border-b border-line',
        )}
      />
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-body-sm font-semibold text-ink">
            {swatch.name}
          </span>
          <code dir="ltr" className="text-caption text-ink-muted">
            {swatch.value}
          </code>
        </div>
        <p className="mt-1.5 text-caption text-ink-muted">{swatch.usage}</p>
      </div>
    </div>
  )
}

export function ColorSection() {
  const { t } = useLanguage()

  const official: Swatch[] = [
    {
      name: t('color.navy'),
      value: '#182F59',
      swatchClassName: 'bg-navy',
      usage: t('color.usage.primary'),
    },
    {
      name: t('color.petrol'),
      value: '#124E69',
      swatchClassName: 'bg-petrol',
      usage: t('color.usage.secondary'),
    },
    {
      name: t('color.turquoise'),
      value: '#19AFB0',
      swatchClassName: 'bg-turquoise',
      usage: t('color.usage.accent'),
    },
  ]

  const supporting: Swatch[] = [
    {
      name: t('color.white'),
      value: '#FFFFFF',
      swatchClassName: 'bg-surface',
      usage: t('color.usage.surface'),
      bordered: true,
    },
    {
      name: t('color.page'),
      value: '#F5F7FA',
      swatchClassName: 'bg-page',
      usage: t('color.usage.background'),
      bordered: true,
    },
    {
      name: t('color.surface'),
      value: '#FFFFFF',
      swatchClassName: 'bg-surface',
      usage: t('color.usage.surface'),
      bordered: true,
    },
    {
      name: t('color.ink'),
      value: '#182F59',
      swatchClassName: 'bg-ink',
      usage: t('color.usage.text'),
    },
    {
      name: t('color.muted'),
      value: '#5B6B80',
      swatchClassName: 'bg-ink-muted',
      usage: t('color.usage.muted'),
    },
    {
      name: t('color.border'),
      value: '#E2E8F0',
      swatchClassName: 'bg-line',
      usage: t('color.usage.border'),
      bordered: true,
    },
    {
      name: t('color.danger'),
      value: '#DC2626',
      swatchClassName: 'bg-danger',
      usage: t('color.usage.danger'),
    },
  ]

  return (
    <DocSection
      id="colors"
      title={t('ds.colors.title')}
      description={t('ds.colors.desc')}
    >
      <div className="space-y-10">
        <div>
          <h3 className="text-h4 font-semibold text-ink">
            {t('ds.colors.official')}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {official.map((swatch) => (
              <SwatchCard key={swatch.value} swatch={swatch} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-h4 font-semibold text-ink">
            {t('ds.colors.supporting')}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supporting.map((swatch) => (
              <SwatchCard
                key={`${swatch.name}-${swatch.value}`}
                swatch={swatch}
              />
            ))}
          </div>
        </div>
      </div>
    </DocSection>
  )
}
