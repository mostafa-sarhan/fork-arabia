import { useId } from 'react'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { FieldShell, type FieldBinding } from './Field'
import { FORM_COPY } from './formCopy'
import { Select, type SelectOption } from './Select'

type SelectFieldProps = {
  /** From `useForm().field(name)`. */
  field: FieldBinding
  label: string
  options: readonly SelectOption[]
  required?: boolean
  hint?: string
  className?: string
}

/** A dropdown field, opening on a muted "Select an option". */
export function SelectField({ field, label, options, required, hint, className }: SelectFieldProps) {
  const id = useId()
  const { language } = useLanguage()

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
      {(control, labelId) => (
        <Select
          {...control}
          labelId={labelId}
          name={field.name}
          value={field.value}
          onChange={field.setValue}
          options={options}
          placeholder={resolveCopy(FORM_COPY.choose, language)}
        />
      )}
    </FieldShell>
  )
}
