import { useEffect, useId, useRef, type KeyboardEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { CheckIcon, CloseIcon } from '@/components/ui/icons'
import { PATHS } from '@/config/paths'
import { copy, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { FORM_COPY } from './formCopy'

/* The dialog's own words (`proposed`, docs/copy-review.md). */
const COPY = {
  close: copy('إغلاق', 'Close'),
  services: copy('تصفح خدماتنا', 'Browse our services'),
}

/*
 * A white card, centred over the page dimmed in navy, 480px at most and
 * 16px clear of a phone's edges; it scrolls inside if a short screen
 * cannot hold it. It rises in as the dim fades in (no motion if reduced).
 */
const DIALOG =
  'm-auto w-[calc(100%-2rem)] max-w-120 max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-2xl bg-surface p-0 text-ink shadow-raised focus:outline-none backdrop:bg-navy/55 motion-safe:animate-dialog-in motion-safe:backdrop:animate-fade-in'
const BODY = 'relative flex flex-col items-center px-6 pt-10 pb-6 text-center sm:px-10 sm:pt-12 sm:pb-10'
const CLOSE = 'absolute top-3 end-3'

/* The check: a turquoise disc in a soft halo, popping in a beat after the card. */
const CHECK =
  'grid size-16 place-items-center rounded-full bg-turquoise text-navy ring-8 ring-turquoise-soft motion-safe:animate-pop-in'

const TITLE = 'mt-6 font-display text-h3 text-heading text-balance'
const MESSAGE = 'mt-3 text-body leading-paragraph text-ink-muted text-pretty'

/* What was asked for, one line per item, on the page tone. */
const SUMMARY = 'mt-6 w-full divide-y divide-line rounded-xl border border-line bg-page px-4 text-start'
const SUMMARY_ROW = 'flex items-baseline justify-between gap-4 py-3'
const SUMMARY_LABEL = 'shrink-0 text-body-sm text-ink-muted'
/* A value may hold a line break ("date\ntime"); it is kept. */
const SUMMARY_VALUE = 'whitespace-pre-line text-body-sm font-bold text-heading text-end'

/* Two ways on: stacked on phones, side by side from 640. */
const ACTIONS = 'mt-7 flex w-full flex-col gap-2.5 sm:flex-row'
const ACTION = 'h-12 w-full sm:flex-1'

export type SummaryItem = { label: string; value: string }

type SuccessDialogProps = {
  open: boolean
  /** Esc, the close button or a press on the dimmed page. */
  onClose: () => void
  title: string
  message: string
  summary?: readonly SummaryItem[]
  /** Where focus goes once it closes; by default, back where it was before. */
  returnFocus?: () => HTMLElement | null | undefined
}

/**
 * A form was sent: a modal dialog with a check, a title, the message, a
 * summary of the request, and links home and to the services. Shared by
 * every form; each passes its own words and summary.
 */
export function SuccessDialog(props: SuccessDialogProps) {
  return props.open ? <OpenDialog {...props} /> : null
}

/**
 * The dialog while open. Native `<dialog>` in modal mode makes the page
 * behind it inert; on top of that, Tab is kept cycling inside, Esc closes,
 * the page cannot scroll, and focus goes back to the page on close.
 */
function OpenDialog({ onClose, title, message, summary, returnFocus }: SuccessDialogProps) {
  const { language } = useLanguage()
  const text = localizeAll({ ...COPY, backHome: FORM_COPY.backHome }, language)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const messageId = useId()

  /* The latest returnFocus, read when the dialog closes. */
  const returnFocusRef = useRef(returnFocus)
  useEffect(() => {
    returnFocusRef.current = returnFocus
  }, [returnFocus])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }
    const before = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow

    dialog.showModal()
    /* The card itself takes focus, so its title and message are read first. */
    dialog.focus()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
      if (dialog.open) {
        dialog.close()
      }
      /* Next frame: the page has re-rendered (a reset form is enabled again). */
      requestAnimationFrame(() => (returnFocusRef.current?.() ?? before)?.focus())
    }
  }, [])

  /* Tab and Shift+Tab wrap around inside the dialog. */
  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') {
      return
    }
    const items = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
    const first = items[0]
    const last = items[items.length - 1]
    const current = document.activeElement

    if (event.shiftKey && (current === first || current === event.currentTarget)) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && current === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={messageId}
      tabIndex={-1}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        /* A press on the dimmed page lands on the dialog element itself. */
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      className={DIALOG}
    >
      <div className={BODY}>
        <IconButton label={text.close} variant="ghost" onClick={onClose} className={CLOSE}>
          <CloseIcon size={20} />
        </IconButton>

        <span aria-hidden="true" className={CHECK}>
          <CheckIcon size={30} strokeWidth={2.5} />
        </span>

        <h2 id={titleId} className={TITLE}>
          {title}
        </h2>
        <p id={messageId} className={MESSAGE}>
          {message}
        </p>

        {summary?.length ? (
          <dl className={SUMMARY}>
            {summary.map((item) => (
              <div key={item.label} className={SUMMARY_ROW}>
                <dt className={SUMMARY_LABEL}>{item.label}</dt>
                <dd className={SUMMARY_VALUE}>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className={ACTIONS}>
          <Button to={PATHS.home} variant="primary" size="lg" className={ACTION}>
            {text.backHome}
          </Button>
          <Button to={PATHS.services} variant="outline-navy" size="lg" className={ACTION}>
            {text.services}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
