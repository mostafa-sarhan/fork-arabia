import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { resolveCopy, type Localized } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { Rule } from './validation'

export type FormStatus = 'idle' | 'sending' | 'success' | 'error'

type FieldElement = HTMLInputElement | HTMLTextAreaElement

type UseFormOptions<Name extends string> = {
  /** Every field's starting value; also the list of its fields. */
  initialValues: Record<Name, string>
  /** The checks per field, run in order; the first failure is its error. */
  rules: Partial<Record<Name, Rule[]>>
  /**
   * Sends the valid values. Resolves true when they were delivered.
   * `botcheck` is the hidden honeypot's state.
   */
  send: (values: Record<Name, string>, botcheck: boolean) => Promise<boolean>
}

/**
 * A form's state, for every form on the site.
 *
 * Nothing is flagged while the visitor first fills it in. Submitting checks
 * every field and moves focus to the first invalid one; from then on each
 * error follows its field's value live. A failed send keeps every value, so
 * a retry needs nothing retyped. `reset` brings back the starting values.
 */
export function useForm<Name extends string>({ initialValues, rules, send }: UseFormOptions<Name>) {
  const { language } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [startValues] = useState(initialValues)
  const [values, setValues] = useState(initialValues)
  const [submitCount, setSubmitCount] = useState(0)
  const [status, setStatus] = useState<FormStatus>('idle')

  const errors = validate(values, rules)
  const hasErrors = Object.keys(errors).length > 0

  /* After a submit with errors, focus the first invalid field on the page. */
  useEffect(() => {
    if (submitCount === 0) {
      return
    }
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  }, [submitCount])

  function setValue(name: Name, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  /**
   * What a field component needs: its value, its visible error and two
   * ways to change it — `onChange` for native inputs, `setValue` for the
   * custom controls (Select, DatePicker).
   */
  function field(name: Name) {
    const error = submitCount > 0 ? errors[name] : undefined

    return {
      name,
      value: values[name],
      error: error ? resolveCopy(error, language) : undefined,
      onChange: (event: ChangeEvent<FieldElement>) => setValue(name, event.target.value),
      setValue: (value: string) => setValue(name, value),
    }
  }

  async function deliver() {
    const honeypot = formRef.current?.elements.namedItem('botcheck')
    const botcheck = honeypot instanceof HTMLInputElement && honeypot.checked

    setStatus('sending')
    setStatus((await send(values, botcheck)) ? 'success' : 'error')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitCount((count) => count + 1)

    if (!hasErrors) {
      void deliver()
    }
  }

  /** Back to the starting values, with no errors showing. */
  function reset() {
    setValues(startValues)
    setSubmitCount(0)
    setStatus('idle')
  }

  return {
    formRef,
    field,
    values,
    status,
    /** True once a submit has been tried while something is still invalid. */
    isIncomplete: submitCount > 0 && hasErrors,
    handleSubmit,
    retry: deliver,
    reset,
  }
}

/** Each field's first failing rule, for the fields that fail one. */
function validate<Name extends string>(
  values: Record<Name, string>,
  rules: Partial<Record<Name, Rule[]>>,
) {
  const errors: Partial<Record<Name, Localized>> = {}

  for (const name of Object.keys(rules) as Name[]) {
    for (const rule of rules[name] ?? []) {
      const message = rule(values[name])
      if (message) {
        errors[name] = message
        break
      }
    }
  }

  return errors
}
