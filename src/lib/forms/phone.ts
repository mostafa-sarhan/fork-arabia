import { dialCodeOf } from './countries'
import { latinDigits } from './validation'

/**
 * The phone field's dial-code prefix for the chosen country, or none
 * before a country is chosen (the field is locked then).
 */
export function phonePrefix(country: string) {
  return dialCodeOf(country)
}

/* What the contact form's free phone field suggests: a full number, code first. */
export const CONTACT_PHONE_PLACEHOLDER = '+966 5X XXX XXXX'

/** Whether the visitor typed their own international code, which then replaces the prefix. */
export function hasOwnCode(value: string) {
  return value.trim().startsWith('+')
}

/* What a phone field keeps while typing: digits, spaces, "+", "-" and "( )". */
const NOT_PHONE_CHARACTER = /[^\d\s+()-]/g

/**
 * The phone field's text as the visitor types or pastes it: Arabic-Indic
 * (٠–٩) and Eastern Arabic (۰–۹) digits become 0–9, anything else that is
 * not a phone character is dropped. `caret` is where the cursor was; the
 * result says where it goes, so editing mid-number does not jump to the
 * end. A converted digit keeps its place; only dropped characters before
 * the cursor move it back.
 */
export function cleanPhoneInput(value: string, caret: number) {
  const western = latinDigits(value)
  return {
    value: western.replace(NOT_PHONE_CHARACTER, ''),
    caret: western.slice(0, caret).replace(NOT_PHONE_CHARACTER, '').length,
  }
}

/** Digits and single spaces only, a leading "+" kept: "(010) 445-1996" → "010 445 1996". */
function phoneDigits(value: string) {
  const text = latinDigits(value).trim()
  const sign = text.startsWith('+') ? '+' : ''
  return sign + text.replace(/[^\d]+/g, ' ').trim()
}

/**
 * The number as the email gives it: digits and spaces only, after the
 * prefix, the national leading 0 dropped after a code ("+20" and
 * "0100 445 1996" → "+20 100 445 1996"). Empty stays empty.
 */
export function fullPhone(value: string, prefix: string) {
  const number = phoneDigits(value)
  if (!number || !prefix || hasOwnCode(number)) {
    return number
  }
  return `${prefix} ${number.replace(/^0+/, '')}`
}
