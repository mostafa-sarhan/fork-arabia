import { ICONS, type IconName } from '@/components/ui/iconRegistry'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { TranslationKey } from '@/lib/i18n/translations'
import { DocSection } from './DocSection'

/**
 * A name for every icon in the registry. Typed against it, so adding an
 * icon without naming it — or naming one that no longer exists — fails to
 * compile, and the gallery can never fall behind the set.
 */
const LABELS: Record<IconName, TranslationKey> = {
  fork: 'icon.fork',
  globe: 'icon.globe',
  arrowRight: 'icon.arrow',
  chevronDown: 'icon.chevronDown',
  chevronRight: 'icon.chevronRight',
  check: 'icon.check',
  info: 'icon.info',
  mail: 'icon.mail',
  phone: 'icon.phone',
  photo: 'icon.photo',
  pin: 'icon.pin',
  shield: 'icon.shield',
  briefcase: 'icon.briefcase',
  menu: 'icon.menu',
  close: 'icon.close',
  chat: 'icon.chat',
  calendar: 'icon.calendar',
  scale: 'icon.scale',
  foundation: 'icon.foundation',
  ledger: 'icon.ledger',
  orgChart: 'icon.orgChart',
  medal: 'icon.medal',
  academic: 'icon.academic',
  chip: 'icon.chip',
  supply: 'icon.supply',
  passport: 'icon.passport',
  eye: 'icon.eye',
  target: 'icon.target',
}

export function IconSection() {
  const { t } = useLanguage()

  return (
    <DocSection
      id="icons"
      title={t('ds.icons.title')}
      description={t('ds.icons.desc')}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(ICONS) as IconName[]).map((name) => {
          const Icon = ICONS[name]

          return (
          <div
            key={name}
            className="flex items-center gap-3 rounded-md border border-line bg-surface p-4"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-navy-soft text-petrol">
              <Icon className="size-5" />
            </span>
            <span className="text-body-sm font-medium text-ink">
              {t(LABELS[name])}
            </span>
            <code
              dir="ltr"
              className="ms-auto text-caption text-ink-muted/70"
            >
              {name}
            </code>
          </div>
          )
        })}
      </div>
    </DocSection>
  )
}
