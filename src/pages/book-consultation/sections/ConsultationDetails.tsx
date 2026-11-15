import { IconRow } from '@/components/IconRow'
import {
  CalendarIcon,
  ChatIcon,
  ClockIcon,
  GiftIcon,
  HourglassIcon,
  UsersIcon,
  type IconProps,
} from '@/components/ui/icons'
import { CONSULTATION_DETAILS } from '@/config/consultation'
import { draft, localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { ReactNode } from 'react'

/* The aside's heading, from the storyboard (English written here, `draft`). */
const COPY = {
  heading: draft('تفاصيل الاستشارة', 'Consultation details'),
}

/* Each detail's icon, by its id in config/consultation.ts. */
const ICONS: Record<(typeof CONSULTATION_DETAILS)[number]['id'], (props: IconProps) => ReactNode> = {
  days: CalendarIcon,
  hours: ClockIcon,
  duration: HourglassIcon,
  method: UsersIcon,
  cost: GiftIcon,
  reply: ChatIcon,
}

/* A white card; tighter on phones, where it sits above the form. */
const CARD = 'rounded-2xl border border-line bg-surface p-5 md:p-6 lg:p-8'
const HEADING = 'text-h4 font-extrabold text-heading'

/* Two columns on phones and tablets (compact), one in the desktop aside. */
const LIST = 'mt-4 lg:mt-6 grid grid-cols-2 lg:grid-cols-1 gap-x-3 gap-y-4 lg:gap-y-5'

const TILE = 'rounded-lg bg-turquoise-soft text-petrol'
const LABEL = 'text-body-sm text-ink-muted'
const VALUE = 'text-body-sm md:text-body font-bold text-heading'

/** The consultation's six details: days, hours, length, format, cost and reply time. */
export function ConsultationDetails() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <div className={CARD}>
      <h2 className={HEADING}>{text.heading}</h2>

      <ul className={LIST}>
        {CONSULTATION_DETAILS.map((detail) => {
          const Icon = ICONS[detail.id]

          return (
            <li key={detail.id}>
              <IconRow icon={<Icon size={20} />} tileClassName={TILE}>
                <p className={LABEL}>{resolveCopy(detail.label, language)}</p>
                <p className={VALUE}>{resolveCopy(detail.value, language)}</p>
              </IconRow>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
