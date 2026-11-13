import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ArrowRightIcon, BriefcaseIcon } from '@/components/ui/icons'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { TranslationKey } from '@/lib/i18n/translations'
import { DocSection } from './DocSection'

const badgeLabels: Record<BadgeVariant, TranslationKey> = {
  neutral: 'badge.neutral',
  accent: 'badge.accent',
  outline: 'badge.outline',
  danger: 'badge.danger',
}

const badgeVariants: BadgeVariant[] = [
  'neutral',
  'accent',
  'outline',
  'danger',
]

export function ComponentSection() {
  const { t } = useLanguage()

  return (
    <DocSection
      id="components"
      title={t('ds.components.title')}
      description={t('ds.components.desc')}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card as="a" href="#components" className="group">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-navy-soft text-petrol">
                <BriefcaseIcon className="size-5" />
              </span>
              <Badge variant="accent">{t('badge.accent')}</Badge>
            </div>
            <CardTitle className="mt-5">{t('card.serviceTitle')}</CardTitle>
            <CardDescription>{t('card.serviceDesc')}</CardDescription>
          </CardHeader>
          <CardFooter>
            {/*
              The card itself is the link, so this stays a span: a nested
              anchor would be invalid and would put two tab stops on one
              target. The colour still answers a hover on the card.
            */}
            <span className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-link transition-colors duration-200 group-hover:text-link-hover">
              {t('card.learnMore')}
              <ArrowRightIcon className="size-4 rtl:-scale-x-100" />
            </span>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <div>
            <SectionHeading level={3} title={t('ds.components.badges')} />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {badgeVariants.map((variant) => (
                <Badge key={variant} variant={variant}>
                  {t(badgeLabels[variant])}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading level={3} title={t('ds.components.breadcrumb')} />
            <Breadcrumb
              className="mt-3"
              items={[
                { label: t('breadcrumb.home'), href: '#components' },
                { label: t('breadcrumb.services'), href: '#components' },
                { label: t('breadcrumb.current') },
              ]}
            />
          </div>

          <div>
            <SectionHeading
              level={3}
              title={t('ds.components.sectionTitle')}
              description={t('heading.desc')}
            />
            {/* The one heading pattern: label, title, turquoise bar. The
                label is optional; the bar never appears without a title. */}
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-dashed border-line-strong bg-surface p-6">
                <SectionTitle as="h4" label={t('heading.eyebrow')}>
                  {t('heading.title')}
                </SectionTitle>
              </div>
              <div className="rounded-lg bg-navy p-6">
                <SectionTitle as="h4" align="center" tone="navy">
                  {t('heading.title')}
                </SectionTitle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocSection>
  )
}
