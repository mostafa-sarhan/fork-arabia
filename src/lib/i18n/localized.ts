import type { Language } from './languageConfig'

/**
 * English this project wrote, waiting for the client to approve it.
 *
 * A handful of strings exist in the storyboard but not in the company
 * profile — the sector calls to action, a few service names, the residency
 * track tags. Rather than leave the English site with holes in it, each has a
 * professional English version written in the profile's register and marked
 * here as proposed. It renders exactly like approved copy; the marker exists
 * so `scripts/copy-review.mjs` can list every one of them for review in
 * `docs/copy-review.md`.
 */
type ProposedCopy = {
  readonly text: string
  readonly status: 'proposed'
}

/**
 * A piece of client copy in both languages. Both halves are required, so a
 * string can never be forgotten — only written, or written and marked
 * proposed.
 */
export type Localized = {
  readonly ar: string | ProposedCopy
  readonly en: string | ProposedCopy
}

/** The same text in both languages, each from its own source document. */
export function copy(arabic: string, english: string): Localized {
  return { ar: arabic, en: english }
}

/** Arabic from the client; English written here and awaiting approval. */
export function draft(arabic: string, english: string): Localized {
  return { ar: arabic, en: { text: english, status: 'proposed' } }
}

/**
 * Both languages written here: the storyboard has no Arabic for it either.
 * `docs/copy-review.md` lists these apart, as the Arabic needs approval too.
 */
export function proposed(arabic: string, english: string): Localized {
  return {
    ar: { text: arabic, status: 'proposed' },
    en: { text: english, status: 'proposed' },
  }
}

/** The text to render, approved or proposed alike. */
export function resolveCopy(value: Localized, language: Language): string {
  const text = value[language]

  return typeof text === 'string' ? text : text.text
}

/** The type of a COPY object once every copy()/draft() pair is a string. */
export type LocalizedText<T> = T extends Localized
  ? string
  : T extends readonly (infer Item)[]
    ? LocalizedText<Item>[]
    : T extends object
      ? { [Key in keyof T]: LocalizedText<T[Key]> }
      : T

/**
 * A section's whole COPY in one language, ready for the JSX:
 *
 *   const text = localizeAll(COPY, language)
 *   <h2>{text.heading}</h2>
 *
 * Every copy()/draft() pair becomes the string to render, inside arrays
 * and nested objects too. Anything else, such as a number or a plain
 * string, is passed through as it is.
 */
export function localizeAll<T>(source: T, language: Language): LocalizedText<T> {
  return localizeValue(source, language) as LocalizedText<T>
}

function localizeValue(value: unknown, language: Language): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => localizeValue(item, language))
  }

  if (isLocalized(value)) {
    return resolveCopy(value, language)
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        localizeValue(item, language),
      ]),
    )
  }

  return value
}

function isLocalized(value: unknown): value is Localized {
  return (
    typeof value === 'object' && value !== null && 'ar' in value && 'en' in value
  )
}
