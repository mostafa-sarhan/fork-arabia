/*
 * Search that forgives how a word was typed: case, Latin accents, Arabic
 * diacritics (tashkeel) and the tatweel are ignored, and the hamza and
 * other letter variants are folded to one form, so «اسيس» finds «تأسيس»
 * and "regle" finds "Règle".
 */
const LATIN_MARKS = /[̀-ͯ]/g
const ARABIC_MARKS = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g
const FOLDS: [RegExp, string][] = [
  [/[أإآٱ]/g, 'ا'],
  [/ؤ/g, 'و'],
  [/[ئى]/g, 'ي'],
  [/ء/g, ''],
  [/ة/g, 'ه'],
]

/** `text` folded for comparison: lower case, no marks, one form per letter. */
export function normalizeForSearch(text: string) {
  let folded = text.normalize('NFD').replace(LATIN_MARKS, '').replace(ARABIC_MARKS, '').toLocaleLowerCase()
  for (const [pattern, letter] of FOLDS) {
    folded = folded.replace(pattern, letter)
  }
  return folded.replace(/\s+/g, ' ').trim()
}

/** Whether `text` contains `query` (or, with 'start', begins with it), forgivingly. */
export function matchesSearch(text: string, query: string, mode: 'contains' | 'start' = 'contains') {
  const haystack = normalizeForSearch(text)
  const needle = normalizeForSearch(query)
  return mode === 'start' ? haystack.startsWith(needle) : haystack.includes(needle)
}
