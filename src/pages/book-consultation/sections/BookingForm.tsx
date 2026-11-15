import { useId, useState } from 'react'
import { useSearchParams } from 'react-router'
import { DateField } from '@/components/forms/DateField'
import { FormIncomplete, Honeypot } from '@/components/forms/FormStates'
import { FormSubmit } from '@/components/forms/FormSubmit'
import { FORM_COPY } from '@/components/forms/formCopy'
import { CountryPhoneFields } from '@/components/forms/CountryPhoneFields'
import { SectorTile } from '@/components/forms/SectorTile'
import { RadioCards } from '@/components/forms/RadioCards'
import { SelectField } from '@/components/forms/SelectField'
import { SuccessDialog } from '@/components/forms/SuccessDialog'
import { TextareaField } from '@/components/forms/TextareaField'
import { TextField } from '@/components/forms/TextField'
import { GlobeIcon, PhoneIcon, UsersIcon } from '@/components/ui/icons'
import { CONSULTATION_METHODS } from '@/config/consultation'
import { getSectorBySlug, SECTOR_INDEX } from '@/data/sectorIndex'
import { addDays, formatDate, isFriday, todayValue } from '@/lib/forms/dates'
import { countryForEmail } from '@/lib/forms/countries'
import { fullPhone, phonePrefix } from '@/lib/forms/phone'
import { submitForm } from '@/lib/forms/submitForm'
import { useForm } from '@/lib/forms/useForm'
import { countryFirst, email, notFriday, notPast, phone, required } from '@/lib/forms/validation'
import type { Language } from '@/lib/i18n/languageConfig'
import { draft, localizeAll, proposed, resolveCopy, type Localized } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * What the form says beyond the shared contact labels (formCopy.ts). The
 * Arabic labels, button, note and success message are the storyboard's
 * booking page (English written here, `draft`); the block headings, time
 * words and success summary are `proposed` (the success title is shared,
 * in formCopy.ts). All are in
 * docs/copy-review.md.
 */
const COPY = {
  yourDetails: proposed('بياناتك', 'Your details'),
  consultation: proposed('تفاصيل الاستشارة', 'Consultation details'),
  sector: draft('مجال الاستشارة المطلوبة', 'Consultation area'),
  date: draft('التاريخ المفضل', 'Preferred date'),
  time: draft('الوقت المفضل (بتوقيت السعودية)', 'Preferred time (Saudi time)'),
  method: draft('طريقة الاستشارة', 'Consultation format'),
  details: draft('تفاصيل إضافية عن الطلب', 'Additional details about your request'),
  submit: draft('إرسال طلب الحجز', 'Send booking request'),
  note: draft(
    'الموعد لا يُعتبر مؤكدًا إلا بعد تواصل فريقنا معك.',
    'Your appointment is confirmed only once our team has contacted you.',
  ),
  success: draft(
    'شكرًا لك، تم استلام طلبك. سيتواصل معك فريقنا خلال يوم عمل لتأكيد موعد الاستشارة.',
    'Thank you, we have received your request. Our team will contact you within one business day to confirm your consultation.',
  ),
  summaryArea: proposed('المجال', 'Area'),
  summaryWhen: proposed('الموعد', 'Appointment'),
  summaryMethod: proposed('الطريقة', 'Format'),
  am: proposed('صباحًا', 'am'),
  pm: proposed('مساءً', 'pm'),
}

/*
 * The start times offered, on the hour in Saudi time: 10:00 to 17:00, the
 * last start that ends a 50-minute session before 18:00.
 */
const FIRST_HOUR = 10
const LAST_HOUR = 17
const HOURS = Array.from({ length: LAST_HOUR - FIRST_HOUR + 1 }, (_, index) => FIRST_HOUR + index)

/* Each format's icon on its card. */
const METHOD_ICONS = {
  online: <GlobeIcon size={18} />,
  phone: <PhoneIcon size={18} />,
  'in-person': <UsersIcon size={18} />,
}

/* The email always reaches the team in Arabic, whatever the page language. */
const EMAIL_LANGUAGE: Language = 'ar'

/* A white card on the page tone. */
const CARD = 'rounded-2xl border border-line bg-surface p-5 md:p-8 lg:p-10'

/*
 * Two quiet blocks, "your details" then "the consultation": each a small
 * heading (the aside's) over its fields; a hairline between them.
 */
const BLOCK = 'flex flex-col gap-5'
const BLOCK_NEXT = 'mt-8 border-t border-line pt-8'
const BLOCK_HEADING = 'text-h4 font-extrabold text-heading'

/* One column held to the card, two from 768; long fields span both. */
const GRID = 'grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-5 md:gap-y-6'
const WIDE = 'md:col-span-2'


/**
 * The booking form. `?sector=<slug>` opens it with that sector chosen.
 * Sent, a dialog confirms it; closing that clears the form. In development
 * `?preview=success` opens the dialog with sample choices, without sending.
 */
export function BookingForm() {
  const { language } = useLanguage()
  const text = localizeAll({ ...FORM_COPY, ...COPY }, language)
  const [searchParams] = useSearchParams()
  const [isPreview, setIsPreview] = useState(import.meta.env.DEV && searchParams.get('preview') === 'success')
  const detailsId = useId()
  const consultationId = useId()

  const { formRef, field, values, status, isIncomplete, handleSubmit, retry, reset } = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      sector: getSectorBySlug(searchParams.get('sector') ?? undefined)?.slug ?? '',
      date: '',
      time: '',
      method: 'online',
      details: '',
    },
    rules: {
      name: [required],
      email: [required, email],
      phone: [countryFirst('country'), required, phone],
      country: [required],
      sector: [required],
      date: [required, notPast, notFriday],
      time: [required],
    },
    send: (sent, botcheck) =>
      submitForm({
        form: 'booking',
        subject: `حجز استشارة — ${sent.name.trim()}`,
        replyTo: sent.email.trim(),
        language,
        botcheck,
        fields: emailFields(sent, phonePrefix(sent.country)),
      }),
  })

  const sectorOptions = SECTOR_INDEX.map((sector) => ({
    value: sector.slug,
    label: resolveCopy(sector.title, language),
    icon: <SectorTile icon={sector.icon} />,
  }))
  const timeOptions = HOURS.map((hour) => ({ value: String(hour), label: timeLabel(hour, language) }))
  const methodOptions = CONSULTATION_METHODS.map((method) => ({
    value: method.id,
    label: resolveCopy(method.label, language),
    icon: METHOD_ICONS[method.id],
  }))

  const chosen = isPreview ? previewValues() : values
  const summary = [
    { label: text.summaryArea, value: sectorOptions.find((option) => option.value === chosen.sector)?.label ?? '' },
    /* Date, then time on its own line: "10:00 صباحًا" never splits. */
    { label: text.summaryWhen, value: `${formatDate(chosen.date, language)}\n${timeLabel(Number(chosen.time), language)}` },
    { label: text.summaryMethod, value: methodOptions.find((option) => option.value === chosen.method)?.label ?? '' },
  ]

  function closeDialog() {
    setIsPreview(false)
    reset()
  }

  return (
    <>
      <form ref={formRef} noValidate onSubmit={handleSubmit} className={CARD}>
        <Honeypot />
        {isIncomplete ? (
          <div className="mb-6">
            <FormIncomplete />
          </div>
        ) : null}

        <div role="group" aria-labelledby={detailsId} className={BLOCK}>
          <h2 id={detailsId} className={BLOCK_HEADING}>
            {text.yourDetails}
          </h2>
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
            <CountryPhoneFields country={field('country')} phone={field('phone')} />
          </div>
        </div>

        <div role="group" aria-labelledby={consultationId} className={`${BLOCK} ${BLOCK_NEXT}`}>
          <h2 id={consultationId} className={BLOCK_HEADING}>
            {text.consultation}
          </h2>
          <div className={GRID}>
            <SelectField
              field={field('sector')}
              label={text.sector}
              options={sectorOptions}
              required
              className={WIDE}
            />
            <DateField field={field('date')} label={text.date} isDayOff={isFriday} required />
            <SelectField field={field('time')} label={text.time} options={timeOptions} required />
            <RadioCards field={field('method')} label={text.method} options={methodOptions} className={WIDE} />
            <TextareaField field={field('details')} label={text.details} className={WIDE} />
          </div>
        </div>

        <FormSubmit
          label={text.submit}
          sending={status === 'sending'}
          onRetry={status === 'error' ? retry : undefined}
          note={text.note}
        />
      </form>

      <SuccessDialog
        open={status === 'success' || isPreview}
        onClose={closeDialog}
        title={text.successTitle}
        message={text.success}
        summary={summary}
        returnFocus={() => formRef.current?.querySelector<HTMLElement>('input[name="name"]')}
      />
    </>
  )
}

/** "10:00 صباحًا", "1:00 pm": a start hour as the visitor reads it. */
function timeLabel(hour: number, language: Language) {
  const hour12 = hour > 12 ? hour - 12 : hour
  const half = resolveCopy(hour < 12 ? COPY.am : COPY.pm, language)
  return `${hour12}:00 ${half}`
}

/** The sample choices `?preview=success` shows: the next working day at 11. */
function previewValues() {
  let date = addDays(todayValue(), 1)
  while (isFriday(date)) {
    date = addDays(date, 1)
  }
  return { sector: SECTOR_INDEX[0].slug as string, date, time: '11', method: 'online' }
}

/**
 * The request as the team reads it: Arabic labels, and readable values —
 * names and dates in words, not ids or slugs; the phone with its dial code.
 */
function emailFields(values: Record<string, string>, phonePrefixUsed: string) {
  const ar = (value: Localized) => resolveCopy(value, EMAIL_LANGUAGE)
  const sector = getSectorBySlug(values.sector)
  const method = CONSULTATION_METHODS.find((item) => item.id === values.method)

  return {
    [ar(FORM_COPY.name)]: values.name.trim(),
    [ar(FORM_COPY.email)]: values.email.trim(),
    [ar(FORM_COPY.phone)]: fullPhone(values.phone, phonePrefixUsed),
    [ar(FORM_COPY.country)]: countryForEmail(values.country),
    [ar(COPY.sector)]: sector ? ar(sector.title) : '',
    [ar(COPY.date)]: formatDate(values.date, EMAIL_LANGUAGE),
    [ar(COPY.time)]: timeLabel(Number(values.time), EMAIL_LANGUAGE),
    [ar(COPY.method)]: method ? ar(method.label) : '',
    [ar(COPY.details)]: values.details.trim() || '—',
  }
}
