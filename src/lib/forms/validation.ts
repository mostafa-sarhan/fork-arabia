import { copy, type Localized } from '@/lib/i18n/localized'
import { isFriday, parseDateValue, todayValue } from './dates'

/*
 * The forms' error messages. Not in the storyboard, so both languages are
 * `proposed` (docs/copy-review.md). `{n}` is filled in by the rule.
 */
const MESSAGES = {
  required: copy('هذا الحقل مطلوب.', 'This field is required.'),
  email: copy(
    'اكتب بريدًا إلكترونيًا صحيحًا، مثل name@example.com.',
    'Enter a valid email address, like name@example.com.',
  ),
  phone: copy(
    'اكتب رقم الهاتف بالأرقام فقط (7 أرقام على الأقل)، ويمكن أن يبدأ بعلامة +.',
    'Use digits only (at least 7); the number may start with +.',
  ),
  /* Arabic counts 3 to 10 with a plural noun («10 أحرف»), 11 and up with a singular one («20 حرفًا»). */
  minLengthFew: copy('اكتب {n} أحرف على الأقل.', 'Write at least {n} characters.'),
  minLength: copy('اكتب {n} حرفًا على الأقل.', 'Write at least {n} characters.'),
  pastDate: copy('اختر اليوم أو تاريخًا بعده.', 'Choose today or a later date.'),
  countryFirst: copy('اختر الدولة أولًا', 'Choose the country first'),
  friday: copy(
    'يوم الجمعة إجازة؛ اختر يومًا من السبت إلى الخميس.',
    'Friday is a day off; choose a day from Saturday to Thursday.',
  ),
}

/**
 * One check on a field's value: its message when it fails, null when it
 * passes. `values` is the whole form, for checks that depend on another field.
 */
export type Rule = (value: string, values: Record<string, string>) => Localized | null

/** Arabic-Indic digits (٠–٩) as Latin ones, so a phone typed on an Arabic keyboard passes. */
export function latinDigits(value: string) {
  return value
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660)) /* Arabic-Indic ٠–٩ */
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0)) /* Eastern Arabic / Persian ۰–۹ */
}

export const required: Rule = (value) => (value.trim() ? null : MESSAGES.required)

/* Something@something.something: enough to catch a typo, not a full RFC check. */
export const email: Rule = (value) =>
  !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? null : MESSAGES.email

/* Digits, spaces, "-" and "( )", an optional leading +, and at least 7 digits. */
export const phone: Rule = (value) => {
  const text = latinDigits(value).trim()
  const digits = text.replace(/\D/g, '')

  return !text || (/^\+?[\d\s()-]+$/.test(text) && digits.length >= 7) ? null : MESSAGES.phone
}

export function minLength(n: number): Rule {
  const message = n <= 10 ? MESSAGES.minLengthFew : MESSAGES.minLength
  return (value) => (!value.trim() || value.trim().length >= n ? null : fill(message, n))
}

export const notPast: Rule = (value) => {
  const date = parseDateValue(value)
  return !date || value >= todayValue() ? null : MESSAGES.pastDate
}

/* The office works Saturday to Thursday. */
export const notFriday: Rule = (value) => (isFriday(value) ? MESSAGES.friday : null)

/** The phone waits for the country: flagged while `countryField` is empty. */
export function countryFirst(countryField: string): Rule {
  return (_value, values) => (values[countryField] ? null : MESSAGES.countryFirst)
}

/** The message `countryFirst` gives, also shown as the locked phone field's hint. */
export const COUNTRY_FIRST = MESSAGES.countryFirst

/** A message with its `{n}` filled in, in both languages. */
function fill(message: Localized, n: number): Localized {
  const swap = (text: Localized['ar']) =>
    typeof text === 'string'
      ? text.replace('{n}', String(n))
      : { ...text, text: text.text.replace('{n}', String(n)) }

  return { ar: swap(message.ar), en: swap(message.en) }
}
