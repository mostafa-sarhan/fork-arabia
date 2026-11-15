import { useId } from 'react'
import { Textarea } from '@/components/ui/Textarea'
import { FieldShell, type FieldBinding } from './Field'

type TextareaFieldProps = {
  /** From `useForm().field(name)`. */
  field: FieldBinding
  label: string
  required?: boolean
  hint?: string
  rows?: number
  className?: string
}

/** A multi-line field; the visitor can make it taller. */
export function TextareaField({ field, label, required, hint, rows = 4, className }: TextareaFieldProps) {
  const id = useId()

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={field.error} className={className}>
      {(control) => (
        <Textarea
          {...control}
          rows={rows}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    </FieldShell>
  )
}
