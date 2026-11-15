import type { ChangeEvent, ReactNode } from 'react'
import { FormLabel } from '@/components/ui/FormField'
import { AlertIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

/** What `useForm().field(name)` hands a field component. */
export type FieldBinding = {
  name: string
  value: string
  error?: string
  /** For native inputs and textareas. */
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  /** For the custom controls, which hand back a value rather than an event. */
  setValue: (value: string) => void
}

/** The attributes a field shell gives its control. */
export type ControlProps = {
  id: string
  invalid: boolean
  'aria-required': true | undefined
  'aria-describedby': string | undefined
}

/* Label, control, hint and error stacked 8px apart. */
const SHELL = 'flex flex-col gap-2'
const HINT = 'text-body-sm text-ink-muted'

/* The error red (danger-strong, 6.5:1 on white) with its icon. */
const ERROR = 'flex items-start gap-1.5 text-body-sm font-medium text-danger-strong'

type FieldShellProps = {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  /*
   * The control is a button (Select, DatePicker). A `<label for>` would
   * click it, opening its panel; so the label is tied to it by id instead
   * (the control's aria-labelledby) and a click on it only focuses it.
   */
  buttonControl?: boolean
  children: (control: ControlProps, labelId: string) => ReactNode
}

/**
 * One field's frame: a visible label (with a star when required), the
 * control, an optional hint and the error. The control is told which of
 * them describe it, the error first.
 */
export function FieldShell({ id, label, required, hint, error, className, buttonControl, children }: FieldShellProps) {
  const labelId = `${id}-label`
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={cn(SHELL, className)}>
      <FormLabel
        id={labelId}
        htmlFor={buttonControl ? undefined : id}
        onClick={buttonControl ? () => document.getElementById(id)?.focus() : undefined}
        required={required}
      >
        {label}
      </FormLabel>

      {children(
        {
          id,
          invalid: Boolean(error),
          'aria-required': required || undefined,
          'aria-describedby': [errorId, hintId].filter(Boolean).join(' ') || undefined,
        },
        labelId,
      )}

      {hint ? (
        <p id={hintId} className={HINT}>
          {hint}
        </p>
      ) : null}

      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  )
}

/** An error line under a field: icon, then the message. */
export function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className={ERROR}>
      <AlertIcon size={16} className="mt-0.5 shrink-0" />
      {children}
    </p>
  )
}
