import { useId, type ChangeEvent, type InputHTMLAttributes } from 'react'
import { Input } from '@/components/ui/Input'
import { cleanPhoneInput } from '@/lib/forms/phone'
import { FieldShell, type FieldBinding } from './Field'

type TextFieldProps = {
  /** From `useForm().field(name)`. */
  field: FieldBinding
  label: string
  required?: boolean
  hint?: string
  /*
   * A dial code shown inside the field at its left ("+966"), as part of
   * it. Hidden once the visitor types their own "+…"; the form adds it to
   * the number it sends (lib/forms/phone.ts).
   */
  prefix?: string
  className?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'inputMode' | 'autoComplete' | 'dir' | 'placeholder' | 'disabled'
>

/*
 * The dial code: muted, tabular, set off from the number by a hairline.
 * Its own left-to-right island (dir="ltr" and unicode-bidi: isolate), so
 * the "+" stays in front ("+966", never "966+") on both sites.
 */
const PREFIX =
  'pointer-events-none absolute inset-y-3 start-0 flex items-center border-e border-line-strong ps-4 pe-3 text-body font-semibold tabular-nums text-ink-muted'
const PREFIX_TEXT = '[unicode-bidi:isolate]'

/**
 * A one-line field: text, email or tel. Email and phone are given
 * `dir="ltr"` by their caller, so an address or a number reads left to
 * right inside an Arabic form. A tel field keeps Western digits only
 * (cleanPhoneInput), on every form.
 */
export function TextField({ field, label, required, hint, prefix, className, type = 'text', ...input }: TextFieldProps) {
  const id = useId()
  const shownPrefix = prefix && !field.value.trim().startsWith('+') ? prefix : ''

  /*
   * A phone's text is cleaned as it changes (typed or pasted). The clean
   * text and caret go on the input first, so React finds nothing to
   * change and the caret stays where the visitor is typing.
   */
  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target
    const clean = cleanPhoneInput(input.value, input.selectionStart ?? input.value.length)
    if (clean.value !== input.value) {
      input.value = clean.value
      input.setSelectionRange(clean.caret, clean.caret)
    }
    field.setValue(clean.value)
  }

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={field.error} className={className}>
      {(control) => {
        const fieldInput = (
          <Input
            {...control}
            type={type}
            name={field.name}
            value={field.value}
            onChange={type === 'tel' ? handlePhoneChange : field.onChange}
            {...input}
            /* The prefix is read out after the label, as part of the field's description. */
            aria-describedby={[control['aria-describedby'], shownPrefix ? `${id}-prefix` : ''].filter(Boolean).join(' ') || undefined}
            /* Room for the prefix: its digits, its padding and the divider. */
            style={shownPrefix ? { paddingInlineStart: `calc(${shownPrefix.length}ch + 2.5rem)` } : undefined}
          />
        )

        return prefix !== undefined ? (
          /* Numbers read left to right on both sites, so the prefix sits at the left. */
          <div dir="ltr" className="relative">
            {shownPrefix ? (
              <span id={`${id}-prefix`} className={PREFIX}>
                <bdi dir="ltr" className={PREFIX_TEXT}>
                  {shownPrefix}
                </bdi>
              </span>
            ) : null}
            {fieldInput}
          </div>
        ) : (
          fieldInput
        )
      }}
    </FieldShell>
  )
}
