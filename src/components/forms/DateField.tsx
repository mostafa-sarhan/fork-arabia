import { useId } from 'react'
import { DatePicker } from './DatePicker'
import { FieldShell, type FieldBinding } from './Field'

type DateFieldProps = {
  /** From `useForm().field(name)`. */
  field: FieldBinding
  label: string
  /** Days that cannot be chosen, beyond the past. */
  isDayOff?: (value: string) => boolean
  required?: boolean
  hint?: string
  className?: string
}

/** A date field: the chosen day in words, picked from a calendar. */
export function DateField({ field, label, isDayOff, required, hint, className }: DateFieldProps) {
  const id = useId()

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={field.error}
      className={className}
      buttonControl
    >
      {({ 'aria-required': _required, ...control }, labelId) => (
        <DatePicker
          {...control}
          labelId={labelId}
          name={field.name}
          value={field.value}
          onChange={field.setValue}
          isDayOff={isDayOff}
        />
      )}
    </FieldShell>
  )
}
