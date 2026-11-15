import { useId, type InputHTMLAttributes } from 'react'
import { Input } from '@/components/ui/Input'
import { FieldShell, type FieldBinding } from './Field'

type TextFieldProps = {
  /** From `useForm().field(name)`. */
  field: FieldBinding
  label: string
  required?: boolean
  hint?: string
  className?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'inputMode' | 'autoComplete' | 'dir' | 'placeholder'
>

/**
 * A one-line field: text, email or tel. Email and phone are given
 * `dir="ltr"` by their caller, so an address or a number reads left to
 * right inside an Arabic form.
 */
export function TextField({ field, label, required, hint, className, type = 'text', ...input }: TextFieldProps) {
  const id = useId()

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={field.error} className={className}>
      {(control) => (
        <Input
          {...control}
          type={type}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          {...input}
        />
      )}
    </FieldShell>
  )
}
