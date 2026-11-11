import type { ReactNode } from 'react'
import { Divider } from '../../components/layout/Divider'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn } from '../../lib/cn'
import { useLanguage } from '../../lib/i18n/useLanguage'
import { DocSection } from './DocSection'

const spacingScale = [
  { label: 'space-1', className: 'w-1' },
  { label: 'space-2', className: 'w-2' },
  { label: 'space-3', className: 'w-3' },
  { label: 'space-4', className: 'w-4' },
  { label: 'space-6', className: 'w-6' },
  { label: 'space-8', className: 'w-8' },
  { label: 'space-12', className: 'w-12' },
  { label: 'space-16', className: 'w-16' },
]

const radiusScale = [
  { label: 'rounded-sm', className: 'rounded-sm' },
  { label: 'rounded-md', className: 'rounded-md' },
  { label: 'rounded-lg', className: 'rounded-lg' },
  { label: 'rounded-xl', className: 'rounded-xl' },
  { label: 'rounded-full', className: 'rounded-full' },
]

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <p className="text-body-sm font-semibold text-ink">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export function LayoutSection() {
  const { t } = useLanguage()

  return (
    <DocSection
      id="layout"
      title={t('ds.layout.title')}
      description={t('ds.layout.desc')}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Demo title={t('layout.container')}>
          <div className="rounded-md border border-dashed border-line-strong p-3">
            <div className="mx-auto max-w-content rounded-md bg-navy-soft px-4 py-8 text-center text-body-sm font-medium text-petrol">
              max-w-content · 1280px
            </div>
          </div>
        </Demo>

        <Demo title={t('layout.section')}>
          <div className="overflow-hidden rounded-md border border-line">
            <Section
              spacing="sm"
              tone="surface"
              className="px-4 text-center text-body-sm text-ink-muted"
            >
              py-section-sm
            </Section>
          </div>
        </Demo>

        <Demo title={t('layout.stack')}>
          <Stack gap="sm">
            <div className="h-8 rounded bg-navy-soft" />
            <div className="h-8 rounded bg-navy-soft" />
            <div className="h-8 rounded bg-navy-soft" />
          </Stack>
        </Demo>

        <Demo title={t('layout.grid')}>
          <Grid cols={3} gap="sm">
            <div className="h-16 rounded bg-navy-soft" />
            <div className="h-16 rounded bg-navy-soft" />
            <div className="h-16 rounded bg-navy-soft" />
          </Grid>
        </Demo>
      </div>

      <div className="mt-8">
        <Divider />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading level={3} title={t('layout.spacing')} />
          <ul className="mt-4 space-y-3">
            {spacingScale.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <div
                  className={cn(
                    'h-2 rounded-full bg-turquoise',
                    item.className,
                  )}
                />
                <code dir="ltr" className="text-caption text-ink-muted">
                  {item.label}
                </code>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading level={3} title={t('layout.radius')} />
          <div className="mt-4 flex flex-wrap gap-4">
            {radiusScale.map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className={cn(
                    'size-16 border border-line-strong bg-navy-soft',
                    item.className,
                  )}
                />
                <code
                  dir="ltr"
                  className="mt-2 block text-caption text-ink-muted"
                >
                  {item.label}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DocSection>
  )
}
