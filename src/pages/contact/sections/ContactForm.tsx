import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { FormIncomplete, Honeypot } from '@/components/forms/FormStates'
import { FormSubmit } from '@/components/forms/FormSubmit'
import { FORM_COPY } from '@/components/forms/formCopy'
import { SuccessDialog } from '@/components/forms/SuccessDialog'
import { TextareaField } from '@/components/forms/TextareaField'
import { TextField } from '@/components/forms/TextField'
import { CONTACT_PHONE_PLACEHOLDER, fullPhone } from '@/lib/forms/phone'
import { submitForm } from '@/lib/forms/submitForm'
import { useForm } from '@/lib/forms/useForm'
import { email, minLength, phone, required } from '@/lib/forms/validation'
import type { Language } from '@/lib/i18n/languageConfig'
import { copy, localizeAll, type Localized, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * What the form says beyond the shared labels (formCopy.ts). The heading,
 * labels and button are the storyboard's contact page (English written
 * here, `draft`); the success title and text are `proposed`. All are in
 * docs/copy-review.md.
 */
const COPY = {
  heading: copy('أرسل رسالة', 'Send a message'),
  name: copy('الاسم', 'Name'),
  message: copy('رسالتك', 'Your message'),
  submit: copy('إرسال', 'Send'),
  successTitle: copy('تم إرسال رسالتك بنجاح', 'Your message has been sent'),
  success: copy(
    'شكرًا لتواصلك معنا، سيرد عليك فريقنا خلال يوم عمل.',
    'Thank you for getting in touch. Our team will reply within one business day.',
  ),
}

/* A message must say something: 10 characters at least. */
const MIN_MESSAGE = 10

/* The email always reaches the team in Arabic, whatever the page language. */
const EMAIL_LANGUAGE: Language = 'ar'

/* A white card on the page tone, its heading over the fields. */
const CARD = 'rounded-2xl border border-line bg-surface p-5 md:p-8 lg:p-10'
const HEADING = 'mb-5 text-h4 font-extrabold text-heading'

/* One column held to the card, two from 768; long fields span both. */
const GRID = 'grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-5 md:gap-y-6'
const WIDE = 'md:col-span-2'


/**
 * The contact form: name, email, an optional phone and the message. Sent,
 * a dialog confirms it; closing that clears the form. In development
 * `?preview=success` opens the dialog without sending.
 */
export function ContactForm() {
  const { language } = useLanguage()
  const text = localizeAll({ ...FORM_COPY, ...COPY }, language)
  const [searchParams] = useSearchParams()
  const [isPreview, setIsPreview] = useState(import.meta.env.DEV && searchParams.get('preview') === 'success')

  const { formRef, field, status, isIncomplete, handleSubmit, retry, reset } = useForm({
    initialValues: { name: '', email: '', phone: '', message: '' },
    rules: {
      name: [required],
      email: [required, email],
      /* Optional: checked only when given. */
      phone: [phone],
      message: [required, minLength(MIN_MESSAGE)],
    },
    send: (sent, botcheck) =>
      submitForm({
        form: 'contact',
        subject: `رسالة تواصل — ${sent.name.trim()}`,
        replyTo: sent.email.trim(),
        language,
        botcheck,
        fields: emailFields(sent),
      }),
  })

  function closeDialog() {
    setIsPreview(false)
    reset()
  }

  return (
    <>
      <form ref={formRef} noValidate onSubmit={handleSubmit} aria-labelledby="contact-form-heading" className={CARD}>
        <Honeypot />
        <h2 id="contact-form-heading" className={HEADING}>
          {text.heading}
        </h2>
        {isIncomplete ? (
          <div className="mb-6">
            <FormIncomplete />
          </div>
        ) : null}

        <div className={GRID}>
          <TextField field={field('name')} label={text.name} required autoComplete="name" />
          <TextField
            field={field('email')}
            label={text.email}
            required
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
          />
          <TextField
            field={field('phone')}
            label={text.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            /* No country here: the full number, code first, typed freely. */
            placeholder={CONTACT_PHONE_PLACEHOLDER}
            className={WIDE}
          />
          <TextareaField field={field('message')} label={text.message} required rows={5} className={WIDE} />
        </div>

        <FormSubmit
          label={text.submit}
          sending={status === 'sending'}
          onRetry={status === 'error' ? retry : undefined}
        />
      </form>

      <SuccessDialog
        open={status === 'success' || isPreview}
        onClose={closeDialog}
        title={text.successTitle}
        message={text.success}
        returnFocus={() => formRef.current?.querySelector<HTMLElement>('input[name="name"]')}
      />
    </>
  )
}

/** The message as the team reads it: Arabic labels; an empty phone as a dash. */
function emailFields(values: Record<string, string>) {
  const ar = (value: Localized) => resolveCopy(value, EMAIL_LANGUAGE)

  return {
    [ar(COPY.name)]: values.name.trim(),
    [ar(FORM_COPY.email)]: values.email.trim(),
    [ar(FORM_COPY.phone)]: fullPhone(values.phone, '') || '—',
    [ar(COPY.message)]: values.message.trim(),
  }
}
