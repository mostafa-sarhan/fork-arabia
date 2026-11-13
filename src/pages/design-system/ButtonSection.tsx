import type { ReactNode } from 'react'
import {
  Button,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import {
  ArrowRightIcon,
  CheckIcon,
  GlobeIcon,
  MailIcon,
} from '@/components/ui/icons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { PATHS } from '@/config/paths'
import type { TranslationKey } from '@/lib/i18n/translations'
import { DocSection } from './DocSection'

const variantLabels: Record<ButtonVariant, TranslationKey> = {
  primary: 'btn.primary',
  secondary: 'btn.secondary',
  outline: 'btn.outline',
  'outline-navy': 'btn.outlineNavy',
  'outline-on-navy': 'btn.outlineOnNavy',
  ghost: 'btn.ghost',
  destructive: 'btn.destructive',
}

const sizeLabels: Record<ButtonSize, TranslationKey> = {
  sm: 'btn.small',
  md: 'btn.medium',
  lg: 'btn.large',
}

const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'outline',
  'outline-navy',
  'ghost',
  'destructive',
]

const sizes: ButtonSize[] = ['sm', 'md', 'lg']

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <SectionHeading level={3} title={title} />
      <div className="mt-4 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export function ButtonSection() {
  const { t } = useLanguage()

  return (
    <DocSection
      id="buttons"
      title={t('ds.buttons.title')}
      description={t('ds.buttons.desc')}
    >
      <div className="space-y-8">
        <Group title={t('ds.buttons.variants')}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {t(variantLabels[variant])}
            </Button>
          ))}
        </Group>

        <Group title={t('ds.buttons.sizes')}>
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {t(sizeLabels[size])}
            </Button>
          ))}
        </Group>

        <Group title={t('ds.buttons.states')}>
          <Button loading>{t('btn.loading')}</Button>
          <Button disabled>{t('btn.disabled')}</Button>
          <Button variant="outline" disabled>
            {t('btn.disabled')}
          </Button>
        </Group>

        <div>
          <SectionHeading
            level={3}
            title={t('ds.buttons.links')}
            description={t('ds.buttons.linksDesc')}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button to={PATHS.contact} variant="primary">
              {t('btn.internalLink')}
            </Button>
            <Button
              href="https://wa.me/966500941484"
              target="_blank"
              variant="outline"
            >
              {t('btn.externalLink')}
            </Button>
            <IconButton
              to={PATHS.contact}
              label={t('btn.internalLink')}
              variant="outline"
            >
              <ArrowRightIcon className="rtl:-scale-x-100" />
            </IconButton>
          </div>
        </div>

        <Group title={t('ds.buttons.icon')}>
          <IconButton label={t('icon.mail')} variant="solid">
            <MailIcon />
          </IconButton>
          <IconButton label={t('icon.globe')} variant="outline">
            <GlobeIcon />
          </IconButton>
          <IconButton label={t('icon.check')} variant="ghost">
            <CheckIcon />
          </IconButton>
          <IconButton label={t('icon.mail')} variant="outline" size="sm">
            <MailIcon className="size-4" />
          </IconButton>
          <IconButton label={t('btn.disabled')} variant="solid" disabled>
            <CheckIcon />
          </IconButton>
        </Group>
      </div>
    </DocSection>
  )
}
