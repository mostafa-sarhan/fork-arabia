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
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

/* One file per sector, in the index's order (01–09). */
const SECTOR_FILES = [
  'legal-corporate',
  'business-setup',
  'financial-accounting',
  'governance-organization',
  'quality-excellence',
  'training-education',
  'technology-ai',
  'operational-support',
  'premium-residency',
].map((slug) => `src/data/sectors/${slug}.ts`)

const SECTOR_PAGE_FILES = readdirSync('src/pages/sector/sections')
  .sort()
  .map((name) => `src/pages/sector/sections/${name}`)

const FILES = [
  'src/data/sectorIndex.ts',
  ...SECTOR_FILES,
  'src/data/sectors/countries.ts',
  'src/data/siteCopy.ts',
  'src/data/whyFork.ts',
  'src/config/consultation.ts',
  'src/pages/home/sections/HeroSection.tsx',
  'src/pages/home/sections/StatsSection.tsx',
  'src/pages/home/sections/AboutSection.tsx',
  'src/pages/home/sections/ServicesSection.tsx',
  'src/pages/home/sections/WhyForkSection.tsx',
  'src/pages/home/sections/PresenceSection.tsx',
  'src/components/sections/PartnersSection.tsx',
  'src/components/sections/CtaSection.tsx',
  'src/pages/about/AboutPage.tsx',
  'src/pages/about/sections/IntroSection.tsx',
  'src/pages/about/sections/VisionMissionSection.tsx',
  'src/pages/about/sections/ValuesSection.tsx',
  'src/pages/about/sections/PhilosophySection.tsx',
  'src/components/sections/MethodologySection.tsx',
  'src/pages/sector/sectorCounts.ts',
  ...SECTOR_PAGE_FILES,
]


/* draft('ar', 'en') marks the English; proposed('ar', 'en') marks both. */
const DRAFT = /draft\(\s*'((?:[^'\\]|\\.)*)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*,?\s*\)/gs

/**
 * The sector a character offset falls inside, for the first column.
 *
 * A sector's own file (`src/data/sectors/<slug>.ts`) names it outright with
 * `defineSector('<id>', …)`. In the index the nearest `id` field above the
 * match owns it. Copy that belongs to no sector keeps the dash.
 */
function sectorAt(source, offset) {
  const own = source.match(/defineSector\('(\w+)'/)
  if (own) return own[1]

  let current = '—'
  for (const match of source.matchAll(/^ {4}id: '(\w+)'/gm)) {
    if (match.index > offset) break
    current = match[1]
  }
  return current
}

const PROPOSED = /proposed\(\s*'((?:[^'\\]|\\.)*)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*,?\s*\)/gs

function collect(pattern) {
  const found = []
  for (const file of FILES) {
    const source = readFileSync(file, 'utf8')
    for (const match of source.matchAll(pattern)) {
      found.push({
        sector: sectorAt(source, match.index),
        file,
        ar: match[1],
        en: match[2],
      })
    }
  }
  return found
}

const rows = collect(DRAFT)
const bothRows = collect(PROPOSED)

const fileName = (row) => `\`${row.file.split('/').pop()}\``

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
  `${rows.length + bothRows.length} strings await approval.`,
  '',
  '## Arabic and English both proposed',
  '',
  'The storyboard has no Arabic for these either, so both languages were',
  "written here, with `proposed('…', '…')`. Approving one means changing it to",
  "`copy('…', '…')`.",
  '',
  '| Proposed Arabic | Proposed English | File |',
  '| --- | --- | --- |',
  ...bothRows.map((row) => `| ${row.ar} | ${row.en} | ${fileName(row)} |`),
  '',
  '## English proposed',
  '',
  '| Sector | Arabic (approved) | Proposed English | File |',
  '| --- | --- | --- | --- |',
  ...rows.map(
    (row) =>
      `| \`${row.sector}\` | ${row.ar} | ${row.en} | ${fileName(row)} |`,
  ),
  '',
]

writeFileSync('docs/copy-review.md', lines.join('\n'))
console.log(`docs/copy-review.md: ${rows.length + bothRows.length} proposed strings`)
