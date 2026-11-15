import { proposed, type Localized } from '@/lib/i18n/localized'
import { isFriday, parseDateValue, todayValue } from './dates'

/*
 * The forms' error messages. Not in the storyboard, so both languages are
 * `proposed` (docs/copy-review.md). `{n}` is filled in by the rule.
 */
const MESSAGES = {
  required: proposed('هذا الحقل مطلوب.', 'This field is required.'),
  email: proposed(
    'اكتب بريدًا إلكترونيًا صحيحًا، مثل name@example.com.',
    'Enter a valid email address, like name@example.com.',
  ),
  phone: proposed(
    'اكتب رقم الهاتف بالأرقام فقط (7 أرقام على الأقل)، ويمكن أن يبدأ بعلامة +.',
    'Use digits only (at least 7); the number may start with +.',
  ),
  minLength: proposed('اكتب {n} أحرف على الأقل.', 'Write at least {n} characters.'),
  pastDate: proposed('اختر اليوم أو تاريخًا بعده.', 'Choose today or a later date.'),
  friday: proposed(
    'يوم الجمعة إجازة؛ اختر يومًا من السبت إلى الخميس.',
    'Friday is a day off; choose a day from Saturday to Thursday.',
  ),
}

/** One check on a field's value: its message when it fails, null when it passes. */
export type Rule = (value: string) => Localized | null

/** Arabic-Indic digits (٠–٩) as Latin ones, so a phone typed on an Arabic keyboard passes. */
export function latinDigits(value: string) {
  return value.replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
}

export const required: Rule = (value) => (value.trim() ? null : MESSAGES.required)

/* Something@something.something: enough to catch a typo, not a full RFC check. */
export const email: Rule = (value) =>
  !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? null : MESSAGES.email

/* Digits and spaces, an optional leading +, and at least 7 digits. */
export const phone: Rule = (value) => {
  const text = latinDigits(value).trim()
  const digits = text.replace(/\D/g, '')

  return !text || (/^\+?[\d\s]+$/.test(text) && digits.length >= 7) ? null : MESSAGES.phone
}

export function minLength(n: number): Rule {
  return (value) => (!value.trim() || value.trim().length >= n ? null : fill(MESSAGES.minLength, n))
}

export const notPast: Rule = (value) => {
  const date = parseDateValue(value)
  return !date || value >= todayValue() ? null : MESSAGES.pastDate
}

/* The office works Saturday to Thursday. */
export const notFriday: Rule = (value) => (isFriday(value) ? MESSAGES.friday : null)

/** A message with its `{n}` filled in, in both languages. */
function fill(message: Localized, n: number): Localized {
  const swap = (text: Localized['ar']) =>
    typeof text === 'string'
      ? text.replace('{n}', String(n))
      : { ...text, text: text.text.replace('{n}', String(n)) }

  return { ar: swap(message.ar), en: swap(message.en) }
}
