import type { Language } from '@/lib/i18n/languageConfig'

/*
 * Calendar dates as the forms keep them: "YYYY-MM-DD" strings in the
 * visitor's local time, the same format a native date input used, so
 * validation and the email read them unchanged.
 *
 * Day and month names are written out rather than taken from Intl: Intl's
 * Arabic varies by browser and region (Hijri calendars, Levantine month
 * names, Arabic-Indic digits), and the site always shows Gregorian months
 * with Latin digits.
 */
const WEEKDAYS: Record<Language, readonly string[]> = {
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
}

/* The calendar's column heads, short enough for a 40px column. */
const WEEKDAYS_SHORT: Record<Language, readonly string[]> = {
  ar: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
}

const MONTHS: Record<Language, readonly string[]> = {
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}

/* getDay() of the first column: Saturday, as the Saudi working week. */
export const WEEK_START = 6

/** "2026-11-18" for a Date, in local time. */
export function toDateValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** The local Date a "YYYY-MM-DD" names, or null for anything else. */
export function parseDateValue(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null
}

/** Today as "YYYY-MM-DD". */
export function todayValue() {
  return toDateValue(new Date())
}

/** `value` moved by whole days ("2026-11-30" + 1 → "2026-12-01"). */
export function addDays(value: string, days: number) {
  const date = parseDateValue(value) ?? new Date()
  date.setDate(date.getDate() + days)
  return toDateValue(date)
}

/** `value` moved by whole months, its day clamped to the new month's last. */
export function addMonths(value: string, months: number) {
  const date = parseDateValue(value) ?? new Date()
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1)
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  target.setDate(Math.min(date.getDate(), lastDay))
  return toDateValue(target)
}

/** Whether `value` is a Friday, the office's day off. */
export function isFriday(value: string) {
  return parseDateValue(value)?.getDay() === 5
}

/** "2026-11" — the month a date belongs to, comparable as a string. */
export function monthOf(value: string) {
  return value.slice(0, 7)
}

/** «الأربعاء 18 نوفمبر 2026», "Wednesday 18 November 2026". */
export function formatDate(value: string, language: Language) {
  const date = parseDateValue(value)
  if (!date) {
    return ''
  }
  return `${WEEKDAYS[language][date.getDay()]} ${date.getDate()} ${MONTHS[language][date.getMonth()]} ${date.getFullYear()}`
}

/** «نوفمبر 2026» for the month of `value`. */
export function formatMonth(value: string, language: Language) {
  const date = parseDateValue(value)
  return date ? `${MONTHS[language][date.getMonth()]} ${date.getFullYear()}` : ''
}

/** The seven column heads, from WEEK_START: [short, full] per column. */
export function weekdayHeads(language: Language) {
  return Array.from({ length: 7 }, (_, column) => {
    const day = (WEEK_START + column) % 7
    return { short: WEEKDAYS_SHORT[language][day], full: WEEKDAYS[language][day] }
  })
}

/**
 * The month of `value` as weeks of seven cells, each a "YYYY-MM-DD" or
 * null for the blanks before the 1st and after the last day.
 */
export function monthGrid(value: string) {
  const date = parseDateValue(value) ?? new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const lead = (new Date(year, month, 1).getDay() - WEEK_START + 7) % 7
  const days = new Date(year, month + 1, 0).getDate()

  const cells: (string | null)[] = Array.from({ length: lead }, () => null)
  for (let day = 1; day <= days; day++) {
    cells.push(toDateValue(new Date(year, month, day)))
  }
  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return Array.from({ length: cells.length / 7 }, (_, week) => cells.slice(week * 7, week * 7 + 7))
}
