/**
 * Regenerates docs/copy-review.md from the files that hold the copy.
 *
 * Every English string the client has not supplied is written in this
 * project and marked `proposed`. This script walks the data for those
 * markers and lists each one beside its Arabic source, so the review
 * document can never fall behind the code: run it after touching the copy.
 *
 *   node scripts/copy-review.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'

const FILES = [
  'src/data/sectorIndex.ts',
  'src/data/sectorContent.ts',
  'src/data/siteCopy.ts',
  'src/pages/home/sections/HeroSection.tsx',
  'src/pages/home/sections/StatsSection.tsx',
  'src/pages/home/sections/AboutSection.tsx',
]

/**
 * Matches draft('<arabic>', '<english>') across line breaks. `draft` is the
 * helper in `src/lib/i18n/localized.ts` that marks its English `proposed`;
 * `copy` is the same pair with both halves approved, and is not listed here.
 */
const DRAFT = /draft\(\s*'((?:[^'\\]|\\.)*)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*,?\s*\)/gs

/**
 * The sector a character offset falls inside, for the first column.
 *
 * The sector files key their entries by id — the index as an `id` field, the
 * content as the object key — so the nearest one above the match owns it.
 * Copy that belongs to no sector keeps the dash.
 */
function sectorAt(source, offset) {
  let current = '—'
  for (const match of source.matchAll(/^ {2}(\w+): \{|^ {4}id: '(\w+)'/gm)) {
    if (match.index > offset) break
    current = match[1] ?? match[2]
  }
  return current
}

const rows = []
for (const file of FILES) {
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(DRAFT)) {
    rows.push({
      sector: sectorAt(source, match.index),
      file,
      ar: match[1],
      en: match[2],
    })
  }
}

const lines = [
  '# Copy awaiting approval',
  '',
  'Every English string below was written for this website because the',
  'company profile has no equivalent. The Arabic beside it is transcribed',
  'verbatim from the storyboard and is **not** up for review here — only the',
  'English is.',
  '',
  "Each is written with `draft('…', '…')` in the data. Approving one means",
  "changing that call to `copy('…', '…')` in the file named; editing one means",
  'changing the English string in place. Re-run `node scripts/copy-review.mjs`',
  'afterwards to regenerate this list.',
  '',
  `${rows.length} strings await approval.`,
  '',
  '| Sector | Arabic (approved) | Proposed English | File |',
  '| --- | --- | --- | --- |',
  ...rows.map(
    (row) =>
      `| \`${row.sector}\` | ${row.ar} | ${row.en} | \`${row.file.split('/').pop()}\` |`,
  ),
  '',
]

writeFileSync('docs/copy-review.md', lines.join('\n'))
console.log(`docs/copy-review.md: ${rows.length} proposed strings`)
