import { useId, useState } from 'react'
import { useSearchParams } from 'react-router'
import { FormIncomplete, Honeypot } from '@/components/forms/FormStates'
import { FormSubmit } from '@/components/forms/FormSubmit'
import { FORM_COPY } from '@/components/forms/formCopy'
import { CountryPhoneFields } from '@/components/forms/CountryPhoneFields'
import { SectorTile } from '@/components/forms/SectorTile'
import { SelectField } from '@/components/forms/SelectField'
import { SuccessDialog } from '@/components/forms/SuccessDialog'
import { TextareaField } from '@/components/forms/TextareaField'
import { TextField } from '@/components/forms/TextField'
import { getSectorBySlug, SECTOR_INDEX } from '@/data/sectorIndex'
import { countryForEmail } from '@/lib/forms/countries'
import { fullPhone, phonePrefix } from '@/lib/forms/phone'
import { submitForm } from '@/lib/forms/submitForm'
import { useForm } from '@/lib/forms/useForm'
import { countryFirst, email, minLength, phone, required } from '@/lib/forms/validation'
import type { Language } from '@/lib/i18n/languageConfig'
import { draft, localizeAll, proposed, resolveCopy, type Localized } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { findQuoteService, OTHER_SERVICE, QUOTE_SERVICES, serviceLabel } from '../quoteServices'

/*
 * What the form says beyond the shared contact labels (formCopy.ts). The
 * Arabic labels, button and success message are the storyboard's quote
 * page (English written here, `draft`); the block heading «بياناتك», the
 * "other service" choice, the length hint and the summary labels are
 * `proposed`. All are in docs/copy-review.md.
 */
const COPY = {
  yourDetails: proposed('بياناتك', 'Your details'),
  service: draft('الخدمة المطلوبة', 'Service required'),
  details: draft('تفاصيل الطلب', 'Request details'),
  otherService: proposed('خدمة أخرى', 'Another service'),
  /* The details' hint; the count typed so far is added after it. */
  lengthHint: proposed('20 حرفًا على الأقل', 'At least 20 characters'),
  submit: draft('إرسال الطلب', 'Send request'),
  success: draft(
    'شكرًا لك، تم استلام طلبك وسيتواصل معك فريقنا قريبًا.',
    'Thank you, we have received your request and our team will contact you soon.',
  ),
  summaryService: proposed('الخدمة', 'Service'),
  summarySector: proposed('القطاع', 'Sector'),
}

/* The details must say enough to price: 20 characters at least (lengthHint says so). */
const MIN_DETAILS = 20

/* The email always reaches the team in Arabic, whatever the page language. */
const EMAIL_LANGUAGE: Language = 'ar'

/* A white card on the page tone. */
const CARD = 'rounded-2xl border border-line bg-surface p-5 md:p-8 lg:p-10'

/*
 * Two quiet blocks, "your details" then "the request": each a small
 * heading over its fields; a hairline between them.
 */
const BLOCK = 'flex flex-col gap-5'
const BLOCK_NEXT = 'mt-8 border-t border-line pt-8'
const BLOCK_HEADING = 'text-h4 font-extrabold text-heading'

/* One column held to the card, two from 768; long fields span both. */
const GRID = 'grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-5 md:gap-y-6'
const WIDE = 'md:col-span-2'


/**
 * The quote form. `?service=<id>` opens it with that service chosen;
 * `?sector=<slug>` opens the service list at that sector. Sent, a dialog
 * confirms it; closing that clears the form. In development
 * `?preview=success` opens the dialog with a sample service, without sending.
 */
export function QuoteForm() {
  const { language } = useLanguage()
  const text = localizeAll({ ...FORM_COPY, ...COPY }, language)
  const [searchParams] = useSearchParams()
  const [isPreview, setIsPreview] = useState(import.meta.env.DEV && searchParams.get('preview') === 'success')
  const detailsId = useId()
  const requestId = useId()

  const askedService = findQuoteService(searchParams.get('service') ?? '')?.value ?? ''
  const askedSector = getSectorBySlug(searchParams.get('sector') ?? undefined)?.slug

  const { formRef, field, values, status, isIncomplete, handleSubmit, retry, reset } = useForm({
    initialValues: { name: '', email: '', phone: '', country: '', service: askedService, details: '' },
    rules: {
      name: [required],
      email: [required, email],
      phone: [countryFirst('country'), required, phone],
      country: [required],
      service: [required],
      details: [required, minLength(MIN_DETAILS)],
    },
    send: (sent, botcheck) =>
      submitForm({
        form: 'quote',
        subject: `طلب عرض سعر — ${sent.name.trim()}`,
        replyTo: sent.email.trim(),
        language,
        botcheck,
        fields: emailFields(sent, phonePrefix(sent.country)),
      }),
  })

  /* Each sector a group under its icon and title; "Another service" last, on its own. */
  const serviceGroups = [
    ...SECTOR_INDEX.map((sector) => ({
      id: sector.slug,
      label: resolveCopy(sector.title, language),
      icon: <SectorTile icon={sector.icon} size="sm" />,
      options: QUOTE_SERVICES.filter((service) => service.sector.slug === sector.slug).map((service) => ({
        value: service.value,
        label: serviceLabel(service, language),
      })),
    })),
    { id: OTHER_SERVICE, options: [{ value: OTHER_SERVICE, label: text.otherService }] },
  ]

  const detailsLength = values.details.trim().length
  const chosen = isPreview ? QUOTE_SERVICES[0] : findQuoteService(values.service)
  const summary = chosen
    ? [
        { label: text.summaryService, value: serviceLabel(chosen, language) },
        /* A whole sector (residency) is its own sector: no second line. */
        ...(chosen.wholeSector ? [] : [{ label: text.summarySector, value: resolveCopy(chosen.sector.title, language) }]),
      ]
    : [{ label: text.summaryService, value: text.otherService }]

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

        <div role="group" aria-labelledby={requestId} className={`${BLOCK} ${BLOCK_NEXT}`}>
          <h2 id={requestId} className={BLOCK_HEADING}>
            {text.details}
          </h2>
          <div className={GRID}>
            <SelectField
              field={field('service')}
              label={text.service}
              groups={serviceGroups}
              searchable
              openAtGroup={askedSector}
              required
              className={WIDE}
            />
            <TextareaField
              field={field('details')}
              label={text.details}
              required
              rows={5}
              hint={`${text.lengthHint} · ${detailsLength}/${MIN_DETAILS}`}
              className={WIDE}
            />
          </div>
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
        summary={summary}
        returnFocus={() => formRef.current?.querySelector<HTMLElement>('input[name="name"]')}
      />
    </>
  )
}

/**
 * The request as the team reads it: Arabic labels, and readable values —
 * the service's title and its sector, not ids; the phone with its dial code.
 */
function emailFields(values: Record<string, string>, phonePrefixUsed: string) {
  const ar = (value: Localized) => resolveCopy(value, EMAIL_LANGUAGE)
  const service = findQuoteService(values.service)

  return {
    [ar(FORM_COPY.name)]: values.name.trim(),
    [ar(FORM_COPY.email)]: values.email.trim(),
    [ar(FORM_COPY.phone)]: fullPhone(values.phone, phonePrefixUsed),
    [ar(FORM_COPY.country)]: countryForEmail(values.country),
    [ar(COPY.service)]: service ? serviceLabel(service, EMAIL_LANGUAGE) : ar(COPY.otherService),
    [ar(COPY.summarySector)]: service ? ar(service.sector.title) : '—',
    [ar(COPY.details)]: values.details.trim(),
  }
}
