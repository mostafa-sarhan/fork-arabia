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
 * The privacy policy and its consent line: listed apart, as a whole
 * page pending client and legal approval.
 */
const LEGAL_FILES = [
  'src/config/legal.ts',
  'src/pages/privacy/privacyContent.ts',
  'src/components/forms/FormSubmit.tsx',
]

/*
 * Interface labels: words the site says that are no one's copy deck —
 * mostly heard by screen readers (link and landmark names), plus the
 * mobile footer's short button labels and the copyright line. They live
 * in translations.ts and social.ts, outside the draft/proposed markers,
 * so they are listed here by key for the client to approve too.
 */
const INTERFACE_KEYS = [
  'a11y.skipToContent',
  'a11y.loading',
  'a11y.openMenu',
  'a11y.closeMenu',
  'nav.primary',
  'nav.servicesMenu',
  'lang.label',
  'breadcrumb.label',
  'footer.call',
  'footer.email',
  'footer.rights',
]

/** One key's text in the `en` or `ar` table of translations.ts. */
function translation(source, table, key) {
  const start = source.indexOf(`const ${table}`)
  const escaped = key.replace(/\./g, '\\.')
  const match = source.slice(start).match(new RegExp(`'${escaped}':\\s*'((?:[^'\\\\]|\\\\.)*)'`))
  if (!match) throw new Error(`translations.ts has no ${table} text for ${key}`)
  return match[1]
}

const translationsSource = readFileSync('src/lib/i18n/translations.ts', 'utf8')
const interfaceRows = INTERFACE_KEYS.map((key) => ({
  where: `\`${key}\` (translations.ts)`,
  ar: translation(translationsSource, 'ar', key),
  en: translation(translationsSource, 'en', key),
}))

/* The social links' accessible names (config/social.ts). */
const COPY_CALL = /copy\(\s*'((?:[^'\\]|\\.)*)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*,?\s*\)/gs
for (const match of readFileSync('src/config/social.ts', 'utf8').matchAll(COPY_CALL)) {
  interfaceRows.push({ where: 'Social link name (social.ts)', ar: match[1], en: match[2] })
}

/* The copyright line, as the footer puts it together (Footer.tsx). */
interfaceRows.push({
  where: 'Copyright line (Footer.tsx)',
  ar: `© {السنة} ${translation(translationsSource, 'ar', 'brand.legal')}. ${translation(translationsSource, 'ar', 'footer.rights')}`,
  en: `© {year} ${translation(translationsSource, 'en', 'brand.legal')}. ${translation(translationsSource, 'en', 'footer.rights')}`,
})

const rows = collect(DRAFT)
const bothRows = collect(PROPOSED)
const legalRows = collect(PROPOSED, LEGAL_FILES)

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
  `${rows.length + bothRows.length + legalRows.length + interfaceRows.length} strings await approval.`,
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
  '## Privacy Policy — pending client/legal approval',
  '',
  '> **The whole Privacy Policy page (`/privacy`, `/en/privacy`) and the',
  '> forms\' consent line are pending client and legal approval.** Every word',
  '> was written here, in both languages, from what the site actually does;',
  '> none of it has been reviewed by the client or a lawyer. The policy\'s',
  '> date is `PRIVACY_UPDATED` in `src/config/legal.ts`.',
  '',
  '| Proposed Arabic | Proposed English | File |',
  '| --- | --- | --- |',
  ...legalRows.map((row) => `| ${row.ar} | ${row.en} | ${fileName(row)} |`),
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
  '## Interface labels',
  '',
  'Words the site uses that are in neither the storyboard nor the profile:',
  'most are heard rather than seen (screen-reader names for links, menus and',
  'landmarks); the rest are the mobile footer\'s button labels and the',
  'copyright line. Both languages were written here. Edit them in the file',
  'named; this list is regenerated from it.',
  '',
  '| Where | Proposed Arabic | Proposed English |',
  '| --- | --- | --- |',
  ...interfaceRows.map((row) => `| ${row.where} | ${row.ar} | ${row.en} |`),
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
console.log(
  `docs/copy-review.md: ${rows.length + bothRows.length} proposed strings, ${interfaceRows.length} interface labels, plus ${legalRows.length} privacy strings pending legal approval`,
)
