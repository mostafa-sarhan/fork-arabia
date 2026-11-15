import { useEffect, useRef, useState } from 'react'
import { phonePrefix } from '@/lib/forms/phone'
import { COUNTRY_FIRST } from '@/lib/forms/validation'
import { localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { countryOptions, rankCountry } from './countryOptions'
import type { FieldBinding } from './Field'
import { FORM_COPY } from './formCopy'
import { SelectField } from './SelectField'
import { TextField } from './TextField'

type CountryPhoneFieldsProps = {
  /** From `useForm().field('country')`. */
  country: FieldBinding
  /** From `useForm().field('phone')`, with `countryFirst('country')` among its rules. */
  phone: FieldBinding
}

/**
 * The country, then the phone, which waits for it. Until a country is
 * chosen the phone is locked (the disabled field look) and says "Choose
 * the country first". A country unlocks it with that country's dial code
 * as its prefix. The list: the eight served countries, then every other
 * country; the search ranks by dial code and name (Arabic or English).
 * Changing the country keeps the digits and swaps the prefix.
 * Picked with the keyboard, the country hands focus on to the phone.
 * Shared by the booking and quote forms; two grid cells.
 */
export function CountryPhoneFields({ country, phone }: CountryPhoneFieldsProps) {
  const { language } = useLanguage()
  const text = localizeAll({ ...FORM_COPY, countryFirst: COUNTRY_FIRST }, language)
  const phoneRef = useRef<HTMLDivElement>(null)
  /* Bumped by each keyboard choice; the phone takes focus once it is enabled. */
  const [focusRequest, setFocusRequest] = useState(0)

  useEffect(() => {
    if (focusRequest > 0) {
      phoneRef.current?.querySelector('input')?.focus()
    }
  }, [focusRequest])

  const isLocked = !country.value

  return (
    <>
      <SelectField
        field={country}
        label={text.country}
        options={countryOptions(language)}
        searchable
        rank={rankCountry}
        required
        onChoose={(_value, how) => {
          if (how === 'keyboard') {
            setFocusRequest((count) => count + 1)
          }
        }}
      />
      <div ref={phoneRef}>
        <TextField
          field={phone}
          label={text.phone}
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          disabled={isLocked}
          prefix={phonePrefix(country.value)}
          /* The lock's reason, until a submit shows the same words as the error. */
          hint={isLocked && !phone.error ? text.countryFirst : undefined}
        />
      </div>
    </>
  )
}
