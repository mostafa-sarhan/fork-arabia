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
  'src/config/offices.ts',
  'src/config/countries.ts',
  'src/config/whatsapp.ts',
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
  'src/pages/services/ServicesPage.tsx',
  'src/pages/presence/PresencePage.tsx',
  'src/components/forms/formCopy.ts',
  'src/components/forms/DatePicker.tsx',
  'src/components/forms/SuccessDialog.tsx',
  'src/components/forms/NextSteps.tsx',
  'src/components/forms/WhatsAppButton.tsx',
  'src/lib/forms/validation.ts',
  'src/pages/book-consultation/BookConsultationPage.tsx',
  'src/pages/request-quote/RequestQuotePage.tsx',
  'src/pages/contact/ContactPage.tsx',
  'src/pages/contact/sections/ContactForm.tsx',
  'src/pages/contact/sections/ContactDetails.tsx',
  'src/pages/request-quote/sections/QuoteForm.tsx',
  'src/pages/book-consultation/sections/BookingForm.tsx',
  'src/pages/book-consultation/sections/ConsultationDetails.tsx',
  'src/pages/presence/sections/OfficesSection.tsx',
  'src/pages/presence/sections/CountriesSection.tsx',
  'src/pages/sector/sectorCounts.ts',
  'src/pages/not-found/NotFoundPage.tsx',
  'src/config/seo.ts',
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

function collect(pattern, files = FILES) {
  const found = []
  for (const file of files) {
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

/*
 * The client approved all of the site's copy on this date: every string,
 * both languages, the privacy policy and the interface labels. Anything
 * marked draft() or proposed() after it is new wording awaiting approval.
 */
const APPROVED_ON = '2026-11-16'

/*
 * Every source file, not only the ones listed above, so new wording is
 * caught wherever it is written. The two marker functions themselves
 * (localized.ts) are not wording.
 */
const ALL_FILES = readdirSync('src', { recursive: true })
  .filter((name) => /\.(ts|tsx)$/.test(name))
  .map((name) => `src/${name}`)
  .filter((file) => file !== 'src/lib/i18n/localized.ts')
  .sort()

const englishRows = collect(DRAFT, ALL_FILES)
const bothRows = collect(PROPOSED, ALL_FILES)
const pending = englishRows.length + bothRows.length
const awaiting = `${pending} ${pending === 1 ? 'string awaits' : 'strings await'} approval`

const fileName = (row) => `\`${row.file.split('/').pop()}\``

const lines = [
  '# Copy review',
  '',
  `**Approved on ${APPROVED_ON}:** the client approved all of the site's copy —`,
  'every string in both languages, the privacy policy and the interface',
  'labels. In the code, approved copy is written `copy(\'…\', \'…\')`.',
  '',
  `${awaiting}.`,
  '',
  'New wording written for the site is marked `draft(\'…\', \'…\')` (English',
  "written here) or `proposed('…', '…')` (both languages written here) and",
  'appears below until the client approves it and it becomes `copy()`.',
  'Re-run `node scripts/copy-review.mjs` after touching the copy.',
  '',
  '## Changed by client request',
  '',
  'These differ from `_source/storyboard-ar.md` on purpose: the client asked',
  'for the change. They are approved copy, not a transcription mismatch.',
  '',
  '| Where | Storyboard | Now | Notes |',
  '| --- | --- | --- | --- |',
  "| Home hero headline (`HeroSection.tsx`) | قانونية · مالية · إدارية · تقنية | قانونية · مالية · إدارية · جودة | Changed by client request. English: Legal · Financial · Administrative · Quality |",
  '',
  '## Awaiting approval',
  '',
  ...(pending === 0
    ? ['None.']
    : [
        '| Marker | Arabic | English | File |',
        '| --- | --- | --- | --- |',
        ...englishRows.map((row) => `| \`draft\` (English written here) | ${row.ar} | ${row.en} | ${fileName(row)} |`),
        ...bothRows.map((row) => `| \`proposed\` (both written here) | ${row.ar} | ${row.en} | ${fileName(row)} |`),
      ]),
  '',
]

writeFileSync('docs/copy-review.md', lines.join('\n'))
console.log(`docs/copy-review.md: approved on ${APPROVED_ON}; ${awaiting}`)
