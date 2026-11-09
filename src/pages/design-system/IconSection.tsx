import type { ComponentType } from 'react'
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ForkIcon,
  GlobeIcon,
  InfoIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  type IconProps,
} from '../../components/ui/icons'
import { useLanguage } from '../../lib/i18n/useLanguage'
import type { TranslationKey } from '../../lib/i18n/translations'
import { DocSection } from './DocSection'

const icons: Array<{ labelKey: TranslationKey; Icon: ComponentType<IconProps> }> =
  [
    { labelKey: 'icon.fork', Icon: ForkIcon },
    { labelKey: 'icon.globe', Icon: GlobeIcon },
    { labelKey: 'icon.arrow', Icon: ArrowRightIcon },
    { labelKey: 'icon.chevronDown', Icon: ChevronDownIcon },
    { labelKey: 'icon.chevronRight', Icon: ChevronRightIcon },
    { labelKey: 'icon.check', Icon: CheckIcon },
    { labelKey: 'icon.info', Icon: InfoIcon },
    { labelKey: 'icon.mail', Icon: MailIcon },
    { labelKey: 'icon.phone', Icon: PhoneIcon },
    { labelKey: 'icon.shield', Icon: ShieldIcon },
    { labelKey: 'icon.briefcase', Icon: BriefcaseIcon },
  ]

export function IconSection() {
  const { t } = useLanguage()

  return (
    <DocSection
      id="icons"
      title={t('ds.icons.title')}
      description={t('ds.icons.desc')}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {icons.map(({ labelKey, Icon }) => (
          <div
            key={labelKey}
            className="flex items-center gap-3 rounded-md border border-line bg-surface p-4"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-navy-soft text-petrol">
              <Icon className="size-5" />
            </span>
            <span className="text-body-sm font-medium text-ink">
              {t(labelKey)}
            </span>
          </div>
        ))}
      </div>
    </DocSection>
  )
}
