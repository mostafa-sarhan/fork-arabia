import { localizeAll, proposed } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/* The block's heading, the same on every form (`proposed`, docs/copy-review.md). */
const COPY = {
  heading: proposed('بعد إرسال طلبك', 'After you send'),
}

/* A white card, as the asides' other cards. */
const CARD = 'rounded-2xl border border-line bg-surface p-5 md:p-6 lg:p-8'
const HEADING = 'text-h4 font-extrabold text-heading'

/*
 * One step: a small turquoise circle with its number, the text beside it,
 * and a thin turquoise line down to the next circle (none after the last).
 */
const LIST = 'mt-4 lg:mt-5'
const STEP =
  'relative flex gap-3 pb-5 last:pb-0 before:absolute before:start-3.5 before:top-8 before:bottom-1 before:w-px before:bg-turquoise/45 last:before:hidden'
const NUMBER = 'grid size-7 shrink-0 place-items-center rounded-full bg-turquoise text-caption font-bold text-navy'
const TEXT = 'pt-0.5 text-body-sm md:text-body font-semibold leading-snug text-heading'

/**
 * What happens after a form is sent, as three numbered steps joined by a
 * line. At the top of every form page's aside; each page passes its steps.
 */
export function NextSteps({ steps }: { steps: readonly string[] }) {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <div className={CARD}>
      <h2 className={HEADING}>{text.heading}</h2>
      <ol className={LIST}>
        {steps.map((step, index) => (
          <li key={step} className={STEP}>
            <span aria-hidden="true" className={NUMBER}>
              {index + 1}
            </span>
            <p className={TEXT}>{step}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
