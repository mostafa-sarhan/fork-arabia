import { Button } from '@/components/ui/Button'
import { AlertIcon } from '@/components/ui/icons'
import { localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { FORM_COPY } from './formCopy'

/* Fields to complete: a one-line soft red band. */
const INCOMPLETE =
  'flex items-center gap-2 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-body-sm font-semibold text-danger-strong'

/* The send failed: a soft red panel above the button. */
const ALERT =
  'flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-danger/30 bg-danger-soft p-4 text-body-sm font-medium text-danger-strong'

/**
 * A submit was tried with fields still missing or wrong: one short line at
 * the top of the form, announced as it appears. Focus goes to the first
 * such field; each says what is wrong under it.
 */
export function FormIncomplete() {
  const { language } = useLanguage()

  return (
    <p role="alert" className={INCOMPLETE}>
      <AlertIcon size={18} className="shrink-0" />
      {resolveCopy(FORM_COPY.incomplete, language)}
    </p>
  )
}

/**
 * The form could not be sent. Announced when it appears; the retry sends
 * the same values again.
 */
export function FormSendError({ onRetry }: { onRetry: () => void }) {
  const { language } = useLanguage()
  const text = localizeAll(FORM_COPY, language)

  return (
    <div role="alert" className={ALERT}>
      <p className="flex flex-1 items-start gap-2">
        <AlertIcon size={18} className="mt-0.5 shrink-0" />
        {text.sendError}
      </p>
      <Button variant="outline" size="sm" onClick={onRetry} className="shrink-0">
        {text.retry}
      </Button>
    </div>
  )
}

/**
 * The spam trap: a checkbox no person sees or reaches. Web3Forms drops any
 * message that arrives with it ticked.
 */
export function Honeypot() {
  return <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
}
