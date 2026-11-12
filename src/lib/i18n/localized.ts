import type { Language } from './languageConfig'

/**
 * Copy this project wrote, waiting for the client to approve it.
 *
 * A handful of strings exist in the storyboard but not in the company
 * profile — the sector calls to action, a few service names, the residency
 * track tags. Rather than leave the English site with holes in it, each has
 * a professional English version written in the profile's register and
 * marked here as proposed. It renders exactly like approved copy; the
 * marker exists so every one of them can be listed for review
 * (`docs/copy-review.md`) and so "which words are ours" stays a question
 * the type system can answer.
 */
export type ProposedCopy = {
  readonly text: string
  readonly status: 'proposed'
}

export function proposed(text: string): ProposedCopy {
  return { text, status: 'proposed' }
}

/**
 * A piece of client copy in both languages.
 *
 * Both keys are required, so a string can never be forgotten — only
 * written, or written and marked proposed.
 */
export type Localized = {
  readonly ar: string | ProposedCopy
  readonly en: string | ProposedCopy
}

export type ResolvedCopy = {
  readonly text: string
  /** True when this wording is ours and still awaiting approval. */
  readonly isProposed: boolean
}

export function resolveCopy(
  value: Localized,
  language: Language,
): ResolvedCopy {
  const text = value[language]

  return typeof text === 'string'
    ? { text, isProposed: false }
    : { text: text.text, isProposed: true }
}
