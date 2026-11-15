import { LocalizedLink } from '@/components/LocalizedLink'
import { Button } from '@/components/ui/Button'
import { LinkArrow } from '@/components/ui/LinkArrow'
import { PRIVACY_TITLE } from '@/config/legal'
import { PATHS } from '@/config/paths'
import { proposed, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { FormSendError } from './FormStates'

/*
 * The consent line under every form's button (`proposed`, pending client
 * and legal approval). {privacy} is the policy's name, linked.
 */
const CONSENT = proposed(
  'بإرسال النموذج، أنت توافق على معالجة بياناتك وفق {privacy}.',
  'By sending this form, you agree to the processing of your data under our {privacy}.',
)

/* The send error (when there is one), the button, then the small print. */
const ACTIONS = 'mt-8 flex flex-col gap-4'

/* The button full width on phones, its own width from 640. */
const SUBMIT = 'h-13 w-full sm:w-auto sm:min-w-56'

/* The form's own note and the consent: small and muted; the link a quiet underline. */
const SMALL_PRINT = 'text-body-sm text-ink-muted text-pretty'
const PRIVACY_LINK = 'font-semibold text-petrol underline underline-offset-4 hover:text-navy'

type FormSubmitProps = {
  /** The button's words. */
  label: string
  /** True while the form is being sent: the button shows its spinner. */
  sending: boolean
  /** Shown above the button with a retry when the last send failed. */
  onRetry?: () => void
  /** A note of the form's own, under the button (the booking form's). */
  note?: string
}

/**
 * The end of every form: a failed send's message, the submit button, the
 * form's own note if any, and the consent line linking the privacy policy
 * (same tab). Shared by Booking, Quote and Contact, so the consent is
 * written once.
 */
export function FormSubmit({ label, sending, onRetry, note }: FormSubmitProps) {
  const { language } = useLanguage()
  const [before, after] = resolveCopy(CONSENT, language).split('{privacy}')

  return (
    <div className={ACTIONS}>
      {onRetry ? <FormSendError onRetry={onRetry} /> : null}

      <div>
        <Button type="submit" variant="primary" size="lg" loading={sending} className={SUBMIT}>
          {label}
          <LinkArrow className="size-4" />
        </Button>
      </div>

      {note ? <p className={SMALL_PRINT}>{note}</p> : null}
      <p className={SMALL_PRINT}>
        {before}
        <LocalizedLink to={PATHS.privacy} className={PRIVACY_LINK}>
          {resolveCopy(PRIVACY_TITLE, language)}
        </LocalizedLink>
        {after}
      </p>
    </div>
  )
}
