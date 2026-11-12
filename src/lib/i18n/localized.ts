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

/** The text to render, approved or proposed alike. */
export function resolveCopy(value: Localized, language: Language): string {
  const text = value[language]

  return typeof text === 'string' ? text : text.text
}
