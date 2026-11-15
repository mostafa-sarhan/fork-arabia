# Pre-launch QA report

Audit of the production build (`npm run build`, served locally with Vercel's
URL rules: clean URLs, no trailing slash, `404.html` with status 404).
The audit itself changed no code; the fix pass after it is summarised next.

- **Pages:** all 34 prerendered pages (17 Arabic, 17 English) and the 404
  page in both languages.
- **Widths:** 320, 375, 390, 768, 1024, 1280, 1440, 1920.
- **Browsers:** Chromium (Chrome), WebKit (Safari engine, desktop) and
  WebKit with iPhone 13 emulation.
- **Tools:** Playwright, axe-core 4.14, Lighthouse 12 (mobile, 3 runs per
  page type, median shown).

## Fix pass (15 November 2026)

Fixed: Y1–Y7, Y11, G1, G2, G4, G6, G7, G9, G11, G12. Partly fixed: Y10
(one alt text sits in `WhyForkSection.tsx`, which is not to be touched)
and G5 (`logo-reference.png` is still referenced). Skipped as instructed:
G3, G8, G10. Still open: the 🔴 items and Y8 and Y9, which need the
client. Each item below carries one line on what changed.

- **Build and lint:** `npm run build` and `npm run lint` pass with no
  warnings.
- **Hydration:** no errors in Chrome or WebKit on `/privacy`,
  `/en/privacy`, `/`, `/en`, two sector pages, `/services`, both quote
  pages (now lazy), `/contact`, `/presence` and the 404.
- **axe:** no violations on Contact (AR and EN, 1440 and 375) or Presence.
  Services is down to one rule, the decorative card numbers (G3, skipped).
- **Lighthouse Accessibility:** Contact 100. Services 96–97: the only
  failing audit is the `aria-hidden` «01» number at 1.23:1, which is G3.
  Services reaches 100 only if G3 is fixed.
- **Interactions** (navbar, language switch, menus, forms, select, date
  picker, WhatsApp, marquee, reveal, maps, navigation), re-run after the
  fixes: Chrome 28/29, WebKit 32/32, iPhone 26/29. The four failures are
  the same test artifacts as in the audit (see "Not issues": the marquee
  hover locator in Chrome, the iPhone viewport offset and smooth-scroll
  reveal). Chrome's console stayed clean with the CSP header on, form
  sends included; WebKit's only messages are the report-only notice
  described under Y6.
- **No visual change:** pixel comparison of Contact (375, 768, 1440, AR and
  EN), Presence and Services before and after. Identical except the darker
  placeholder (Y3) and the re-encoded partner logos (Y7). The 4px gap from
  Y5 only shows where phone numbers wrap.

## Summary (audit)

| Severity | Count |
|---|---|
| 🔴 Must fix before launch | 4 |
| 🟡 Should fix | 11 |
| 🟢 Nice to have | 12 |

Four 🔴 items: two are launch tasks (lift `noindex`, approve the privacy
policy) and two are checks that only work on the live site or a real device.
None is a broken page.

What passed everywhere:

- **Layout (612 runs across all browsers):** no horizontal scroll, nothing
  past the screen edge, no cut-off text, phone numbers always read left to
  right. The overlap warnings were checked by eye and are false positives
  (two-line logo, hero line spacing, About facts).
- **Interactions** in all three browsers: navbar hides and returns (and
  stays pinned on sector pages), language switch keeps the page (all 34
  pages in Chrome), services dropdown and mobile menu, all three forms with
  errors and success, select, date picker, WhatsApp button, marquee
  (pauses on hover and focus), reveal, lazy maps, client-side navigation.
- **Links:** 152 internal targets return 200; all 51 `#anchors` exist.
  External links open in a new tab with `noopener noreferrer`.
- **Head and SEO:** all 35 pages have a unique title and description;
  canonical equals `og:url`; `hreflang` and `og:locale` are right; JSON-LD
  is valid; `sitemap.xml` (34 URLs) and `robots.txt` are fine; unknown URLs
  return 404; a trailing slash gets a 301.
- **Keyboard (Chrome, 72 runs):** skip link first, no traps, footer
  reachable, focus ring on everything except the map iframes (🟢 below).
- **Console:** clean except the Safari hydration error below. The local 404s
  for `/_vercel/*` scripts are expected off Vercel.
- **Content:** Arabic body copy matches the storyboard; every phone number
  and the email match it; no lorem ipsum, TODO or stray Arabic on English
  pages.

### Lighthouse (mobile, median of 3)

| Page type | Perf | A11y | Best pr. | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home `/` | 93 | 100 | 96 | 100 | 2.8 s | 0.001 | 88 ms |
| Home `/en` | 92 | 100 | 96 | 100 | 2.8 s | 0.001 | 88 ms |
| About | 93 | 100 | 96 | 100 | 2.7 s | 0 | 78 ms |
| Services | 94 | 95 | 96 | 100 | 2.3 s | 0 | 168 ms |
| Sector (financial) | 92 | 100 | 96 | 100 | 2.5 s | 0 | 180 ms |
| Sector (premium residency) | 93 | 100 | 96 | 100 | 2.5 s | 0 | 148 ms |
| Sector EN (technology) | 94 | 100 | 96 | 100 | 2.3 s | 0 | 170 ms |
| Presence | 94 | 100 | 96 | 100 | 2.6 s | 0 | 74 ms |
| Book consultation | 93 | 100 | 96 | 100 | 2.3 s | 0 | 167 ms |
| Request quote | 92 | 100 | 96 | 100 | 2.6 s | 0 | 174 ms |
| Contact | 95 | 100 | 96 | 100 | 2.3 s | 0 | 145 ms |
| Privacy | 94 | 100 | 96 | 100 | 2.3 s | 0 | 142 ms |
| 404 | n/a: Lighthouse won't score a 404 response; axe covered it | | | | | | |

- **Best Practices 96** everywhere: the only failing audit is the console
  404 for `/_vercel/insights/script.js` and
  `/_vercel/speed-insights/script.js`, which exist only on Vercel. Expected
  to be 100 on the deployed site.
- **Services A11y 95:** see 🟡 heading order and 🟢 decorative numbers.

### JavaScript and CSS

| File | Raw | Gzip |
|---|---|---|
| `index-*.js` (app) | 423 KB | 129 KB |
| `SectionTitle-*.js` (holds all sector data, loaded on every page) | 153 KB | 51 KB |
| `DesignSystemPage-*.js` (not linked from the site) | — | 9 KB |
| `SectorPage-*.js` | — | 4 KB |
| CSS | 108 KB | 18 KB |
| Fonts: Cairo Arabic + Latin (woff2) | 31 + 34 KB | — |

Lighthouse estimates 46 KB of the app bundle is unused on first load.

---

## 🔴 Must fix before launch

### R1. The site still tells search engines not to index it
- **Where:** every page, both languages, all browsers (`vercel.json`).
- **What's wrong:** `X-Robots-Tag: noindex, nofollow` is sent on `/(.*)`.
  This was added on purpose for the pre-launch period. Left in place at
  launch, Google won't list the site, and all the SEO work does nothing.
- **Screenshot:** none (an HTTP header).
- **Fix:** delete the `X-Robots-Tag` entry from `vercel.json` in the launch
  deploy, then submit `https://www.forkarabia.sa/sitemap.xml` in Google
  Search Console.

### R2. Privacy Policy not yet approved
- **Where:** `/privacy`, `/en/privacy`, and the consent line under all three
  forms.
- **What's wrong:** the forms collect names, emails, phone numbers and
  request details, and the policy that covers them is still marked "pending
  client/legal approval" (28 strings in `docs/copy-review.md`). Under the
  Saudi PDPL, collecting personal data needs an approved privacy notice.
- **Screenshot:** none.
- **Fix:** get client and legal sign-off on the policy text and the
  "Last updated" date, then mark the strings approved.

### R3. Real form delivery not verified
- **Where:** `/book-consultation`, `/request-quote`, `/contact` (AR and EN).
- **What's wrong:** for this audit the form service was mocked, so nothing
  left the machine. The forms behave correctly, but nobody has confirmed
  that a real submission from the live domain reaches the company inbox.
  Web3Forms can also restrict which domains may use the key.
- **Screenshot:** none.
- **Fix:** after deploying to the production domain, send one real
  submission from each form in each language (6 in total) and confirm all
  six arrive at the right inbox with every field.

### R4. Safari with "Reduce Motion" turned on: unconfirmed crash
- **Where:** every page with JavaScript; WebKit only, only when reduced
  motion is emulated.
- **What's wrong:** in the test browser (Playwright's WebKit build for
  macOS 13), every page crashed at the first frame when reduced motion was
  on, before the site's own script had started. It did not crash with
  JavaScript blocked, with only the CSS, or on a blank page. The marquee,
  the global reduced-motion CSS rule, hydration and analytics were each
  ruled out. Most likely a bug in this old test build, but it can't be
  ruled out here. If it happens on real devices, every iPhone and Mac
  visitor with Reduce Motion on gets a broken site.
- **Screenshot:** none (the tab crashes).
- **Fix:** a 5-minute check: on a real iPhone (Settings → Accessibility →
  Motion → Reduce Motion) and a Mac (System Settings → Accessibility →
  Display → Reduce motion), open Home, a sector page and a form page in
  Safari. If they load, close this item.

---

## 🟡 Should fix

### ✅ Y1. Hydration error on the Arabic Privacy page in Safari
- **Fixed:** the date is now fixed text per language in `src/config/legal.ts` (`PRIVACY_UPDATED.ar` / `.en`), no `Intl` at runtime. No hydration error in Chrome or WebKit.
- **Where:** `/privacy` (AR), Safari / WebKit and iPhone, all widths.
- **What's wrong:** the "Last updated" date is formatted by
  `Intl.DateTimeFormat` both at build time and in the browser. Node and
  Chrome give «15 نوفمبر 2026»; Safari gives «15 نوفمبر، 2026» (with an
  Arabic comma). React sees different text, logs error #418, and throws
  away the prerendered HTML to re-render the page from scratch (a flash,
  and the prerender benefit is lost on that page). English is unaffected.
- **Screenshot:** `docs/qa-screenshots/privacy-date-webkit-ar.png`
- **Fix:** store the formatted date as a fixed string per language (or
  format it only at build time and pass the text), so no browser formats it
  again.

### ✅ Y2. Footer year is fixed at build time and can break hydration on every page
- **Fixed:** `__BUILD_YEAR__` is set once at build time (`vite.config.ts` `define`), so the server and the browser print the same year; the `new Date()` and `suppressHydrationWarning` are gone.
- **Where:** every page, both languages (`Footer.tsx`, `YEAR = new Date().getFullYear()`).
- **What's wrong:** the prerendered HTML holds the year of the build, and
  the browser computes the current year. A build from 2026 still being
  served in 2027 gives a text mismatch on every page (the same #418
  re-render as Y1), and the copyright year stays wrong until the next
  deploy.
- **Screenshot:** `docs/qa-screenshots/footer-ar-1440.png`
- **Fix:** render the build year as fixed text in both places (a
  build-time constant), or a fixed year range; redeploy each January.

### ✅ Y3. Placeholder text in selects and the date picker is too faint
- **Fixed:** placeholders now use full `ink-muted` (5.44:1 on white) in Select, DatePicker and the select search box, and in the shared text-field style (`fieldStyles.ts`, which covers the Contact phone placeholder too). Both languages.
- **Where:** Book, Quote and Contact forms, **AR and EN**, all widths and
  browsers ("اختر من القائمة" / "Select an option", "اختر التاريخ" /
  "Choose a date", the "اكتب للبحث" / "Type to search" field).
- **What's wrong:** the colour is `ink-muted` at 70% opacity on white, a
  2.96:1 contrast; WCAG AA needs 4.5:1 for text. axe flagged only the
  English pages, but the Arabic uses the same colour.
- **Screenshots:** `docs/qa-screenshots/placeholder-contrast-ar.png`,
  `docs/qa-screenshots/placeholder-contrast-en.png`
- **Fix:** use full `ink-muted` (no opacity) for placeholder text, a
  one-token change in Select, DatePicker and the search input.

### ✅ Y4. Services page skips from h1 to h3
- **Fixed:** a visually hidden h2 «جميع القطاعات» / "All sectors" (`proposed`) above the grid names the section; card titles stay h3. axe `heading-order` is gone.
- **Where:** `/services`, `/en/services`, all widths.
- **What's wrong:** the sector cards are `h3` with no `h2` above them, so
  screen-reader heading navigation has a gap. This is the only page with a
  skipped level, and it costs 5 points of Lighthouse Accessibility.
- **Screenshot:** `docs/qa-screenshots/services-heading-order.png`
- **Fix:** make the card titles `h2`, or add a visually hidden `h2` such as
  «جميع الخدمات» / "All services" above the grid (keep the same text
  style).

### ✅ Y5. Phone links on Contact are smaller than the minimum touch target
- **Fixed:** phone, email and place-name links in the Contact aside get `py-3.5 -my-3.5` (47–54px tall touch areas, layout unmoved). One visible change: a 4px gap (`gap-y-1`) between phone numbers that wrap onto two lines on narrow phones, so their touch areas stay 24px apart. axe `target-size` is gone.
- **Where:** `/contact`, `/en/contact`, 375 (and other phone widths).
- **What's wrong:** the `tel:` links are 110 × 21.7 px, below WCAG 2.2's
  24 px minimum target size (axe `target-size`), so they're easy to miss
  with a thumb.
- **Screenshot:** `docs/qa-screenshots/contact-tel-target-375.png`
- **Fix:** give the links `min-h-11` (44 px) with vertical padding, or
  `inline-flex` with `py-1`. No visual change needed.

### ✅ Y6. No Content-Security-Policy header
- **Fixed:** `Content-Security-Policy-Report-Only` added in `vercel.json` (details below). The build warns if the inline boot script changes and its hash no longer matches.
- **Where:** all pages (`vercel.json`).
- **What's wrong:** the other security headers are set (nosniff,
  Referrer-Policy, X-Frame-Options, Permissions-Policy), but there's no CSP
  to limit where scripts can load from. Lighthouse lists it as "No CSP
  found in enforcement mode".
- **Screenshot:** none.
- **Fix:** add a CSP that allows `'self'`, the inline JSON-LD and the
  inline theme script (hashes), `api.web3forms.com` (connect), Google Maps
  (frame), and Vercel's `/_vercel/*`. Ship it as
  `Content-Security-Policy-Report-Only` first, check the console, then
  enforce it.
- **What the policy allows** (report-only, so nothing is blocked yet):

  | Directive | Allows | For |
  |---|---|---|
  | `default-src` | `'self'` | everything not listed below (the manifest, for one) |
  | `script-src` | `'self'`, `'sha256-RSanCtu5onhmu5Xe3CkHREcP6mxpY/5dpLpLE19CxyA='` | the site's bundles and Vercel's `/_vercel/insights` and `/_vercel/speed-insights` scripts (same origin); the inline language boot script, by hash |
  | `style-src` | `'self'`, `'unsafe-inline'` | the stylesheet; React `style` attributes (logo heights, marquee speed: about 750 across the site) |
  | `img-src` | `'self'`, `data:` | images; small assets Vite inlines |
  | `font-src` | `'self'` | the self-hosted Cairo |
  | `connect-src` | `'self'`, `https://api.web3forms.com` | the forms; analytics beacons to `/_vercel/*` |
  | `frame-src` | `https://www.google.com` | the two Google Maps embeds |
  | `form-action`, `base-uri` | `'self'` | |
  | `object-src` | `'none'` | |

  - **JSON-LD** needs no hash: `script-src` only applies to scripts that
    run, and `application/ld+json` blocks are data.
  - **`frame-ancestors`** is left out: browsers ignore it in a report-only
    policy (Safari says so in the console). `X-Frame-Options: SAMEORIGIN`
    already does that job; add `frame-ancestors 'self'` when the policy is
    enforced.
  - **Tested locally with the header on:** Chrome logs no violations on
    Home, About, Services, a sector page, the three forms (including a
    send), Presence (maps), Privacy and the 404.
  - **Safari** prints one console notice per page: a report-only policy
    with no `report-to` address has no effect there. That's expected; to
    enforce the policy later, rename the header to
    `Content-Security-Policy`.
  - **Maintenance:** if the boot script changes, the build prints
    "⚠ The Content-Security-Policy in vercel.json does not allow 1 inline
    script(s)" with the new hash to paste in.

### ✅ Y7. Partner logos are much larger than shown
- **Fixed:** `npm run brand` (scripts/brand-assets.mjs) now writes each logo as WebP at twice its drawn height, with width/height set: 297 KB → 17 KB in total (afaq 174 KB → 5.3 KB, casco 60 KB → 6.4 KB, professional-experts 63 KB → 5.6 KB). No PNG fallback needed.
- **Where:** Home (AR and EN), all widths, partners strip.
- **What's wrong:** `afaq.png` is 174 KB at 511×663 but shown at about
  60×78 (8.5× too big); `casco.png` is 900 px wide shown at 138 px;
  `professional-experts.png` is 63 KB. They're PNGs with no `srcset`.
  Lighthouse flags it under "image delivery".
- **Screenshot:** `docs/qa-screenshots/partner-logos.png`
- **Fix:** export each at 2× its shown size (about 160 px tall) as WebP or
  optimised PNG through the existing `sharp` script; expect under 15 KB
  each.

### Y8. Temporary photos still on the site (client)
- **Where:** Home hero, the About section on Home, and `/about`; AR and
  EN; all widths.
- **What's wrong:** `riyadh-meeting-*` (hero and About) and
  `client-meeting-*` are the storyboard's "temporary licensed photos until
  the company's own photos are available". The hero photo shows the
  company's logo on an office wall and the Riyadh skyline, so visitors will
  read it as the real Riyadh office.
- **Screenshot:** `docs/qa-screenshots/chromium-1024-home.png`
- **Fix:** the client supplies real photos (or explicitly approves
  launching with these); replace them in `src/assets/images/home/`.

### Y9. 265 strings of website copy are awaiting approval (client)
- **Where:** both languages, across the site; the list is in
  `docs/copy-review.md`.
- **What's wrong:** 146 English-only, 91 Arabic-and-English, 1 changed by
  client request, plus the 28 privacy strings in R2. None is approved yet.
- **Screenshot:** none.
- **Fix:** client reviews `docs/copy-review.md`; approved items change from
  `draft()`/`proposed()` to `copy()`; re-run
  `node scripts/copy-review.mjs`.

### ✅ (partly) Y10. Text marked "from the storyboard" that isn't in it (client)
- **Fixed in part:** the hero and About alt text and the two partner names are now `proposed()`. **Not done:** the alt text in `WhyForkSection.tsx` («مستشار من فورك العربية في اجتماع مع عميل بمكتب الرياض»), because that file is not to be touched; it still shows as `draft`.
- **Where:** Home and About images, and the partners strip; AR.
- **What's wrong:** these Arabic strings are marked `draft` (meaning "the
  Arabic is verbatim from the storyboard"), but they don't appear in the
  storyboard, so their Arabic was never approved:
  - alt text «فريق فورك العربية في اجتماع عمل بمكتب الرياض» and
    «مستشار من فورك العربية في اجتماع مع عميل بمكتب الرياض»;
  - partner names «آفاق» and «الخبراء المحترفون للاستشارات المالية».
- **Screenshot:** none.
- **Fix:** change these to `proposed()` so they appear in the
  both-languages section of the copy review, and confirm the partner names
  with the client.

### ✅ Y11. Interface text not tracked in the copy review
- **Fixed:** `docs/copy-review.md` has a new "Interface labels" section (15 rows: 11 translation keys, 3 social link names, the copyright line), generated by `scripts/copy-review.mjs`, so it stays current.
- **Where:** all pages, both languages.
- **What's wrong:** some visible or spoken text isn't in the storyboard and
  isn't `proposed()`, so it never reaches the client's review:
  - the social `aria-label`s «فورك العربية على فيسبوك / إنستغرام / تيك توك»;
  - interface labels in `translations.ts` (skip link, «التنقل الرئيسي»,
    «فتح القائمة», «اللغة», «اتصل», «إيميل», «مسار التنقل»);
  - the copyright line «© 2026 … جميع الحقوق محفوظة».
- **Screenshot:** `docs/qa-screenshots/footer-ar-1440.png`
- **Fix:** list them in `docs/copy-review.md` (an "Interface labels"
  section) so the client signs off on them too.

---

## 🟢 Nice to have

### ✅ G1. WhatsApp button is outside every landmark
- **Fixed:** the floating button sits in `<aside aria-label="تواصل سريع" / "Quick contact">` (`proposed`). axe `region` is gone.
- **Where:** all pages, both languages, all widths (axe `region`, 58 runs).
- **What's wrong:** the floating WhatsApp button sits outside `header`,
  `main`, `footer` or any `aside`, so screen-reader users browsing by
  landmark won't find it.
- **Screenshot:** `docs/qa-screenshots/whatsapp-dock.png`
- **Fix:** wrap it in `<aside aria-label="تواصل سريع / Quick contact">`.

### ✅ G2. Map iframes have no focus ring
- **Fixed:** a 3px petrol ring inside the map's edge while the keyboard is in it. CSS cannot see that state (focus moves into the map's own document, so no `:focus`/`:focus-within` matches in Chrome or Safari), so a small hook in `OfficesSection.tsx` sets `data-focused` after a Tab into the map. Screenshot: `docs/qa-screenshots/presence-map-focus.png`.
- **Where:** `/presence`, `/en/presence`, all widths.
- **What's wrong:** Tab lands on the two Google Maps iframes, but nothing
  shows focus.
- **Screenshot:** none (see keyboard data).
- **Fix:** add `focus-visible:ring-2 ring-petrol` (or an outline) to the
  map iframe.

### ⏭ G3. Faint decorative card numbers fail the automated contrast check
- **Skipped** (as instructed): this is the only thing keeping Lighthouse Accessibility on Services at 96–97 instead of 100.
- **Where:** `/services` and the sector card grids, both languages.
- **What's wrong:** the large «01»–«09» numbers are `aria-hidden`
  decoration at 1.23:1, which WCAG exempts. Lighthouse still counts them.
- **Screenshot:** `docs/qa-screenshots/services-heading-order.png`
- **Fix:** none needed. Optional: draw them as CSS `content` or an SVG so
  the audit ignores them.

### ✅ G4. All sector data loads on every page
- **Fixed (diagnosis corrected):** the full sector data was in the main `index` bundle, not in `SectionTitle`, because the eagerly loaded Request-a-Quote page imports it for its service list. That page is now lazy like Services and the sector pages, so the data (`sectors-*.js`, 33.0 kB / 10.7 kB gzip) loads only with those three page types. Main bundle: 423.3 kB → 387.5 kB (gzip 128.8 → 117.2 kB). The shared chunk (react-router, tailwind-merge, translations, icons; now named `Breadcrumb-*.js`) is unchanged at 152 kB / 50 kB gzip and is needed on every page.
- **Where:** all pages.
- **What's wrong:** the `SectionTitle-*` chunk (51 KB gzip) holds every
  sector's data and is imported on every page; the app bundle has about
  46 KB unused on first load.
- **Screenshot:** none.
- **Fix:** move the sector data import out of the shared component so it
  loads only with Services and sector pages.

### ✅ (partly) G5. Unused files in `public/`
- **Fixed in part:** `public/og-image.png` deleted. `public/brand/logo-reference.png` kept: `public/brand/mark.svg` names it as the image the mark's geometry was measured from.
- **Where:** `public/og-image.png` (45 KB) and
  `public/brand/logo-reference.png` (42 KB).
- **What's wrong:** nothing references them (the share image is
  `public/og/default.png`), but they're deployed and publicly reachable.
- **Fix:** delete them.

### ✅ G6. Footer domain link reloads the page and switches to Arabic
- **Fixed:** «forkarabia.sa» is a `LocalizedLink` to the home page of the current language (`/` or `/en`), with no reload.
- **Where:** footer, every page; matters on English pages.
- **What's wrong:** «forkarabia.sa» is an absolute link to
  `https://www.forkarabia.sa`, so clicking it does a full reload and takes
  English visitors to the Arabic home page.
- **Screenshot:** `docs/qa-screenshots/footer-ar-1440.png`
- **Fix:** make it a `LocalizedLink` to the home page, or plain text.

### ✅ G7. Facebook link goes through a share redirect
- **Fixed:** `src/config/social.ts` links `https://www.facebook.com/ForkBusiness` directly.
- **Where:** footer and Contact, both languages.
- **What's wrong:** `facebook.com/share/1C9ifZe3BE/` redirects to
  `facebook.com/ForkBusiness`.
- **Fix:** link `https://www.facebook.com/ForkBusiness` directly (after the
  client confirms it's the official page).

### ⏭ G8. Safari with always-visible scrollbars shows the tablet layout at 1024–1033 px
- **Skipped** (as instructed).
- **Where:** all pages, WebKit desktop, window width 1024–1033 px.
- **What's wrong:** WebKit leaves the 10 px scrollbar out when it matches
  breakpoints, so a 1024 px Safari window uses the stacked tablet layout
  (Chrome uses two columns). It still looks correct; only the layout
  differs. The same happens at 768–777 px.
- **Screenshots:** `docs/qa-screenshots/webkit-1024-home.png` vs
  `docs/qa-screenshots/chromium-1024-home.png`
- **Fix:** no action needed.

### ✅ G9. Partners marquee can't be paused on touch screens
- **Fixed:** the strip pauses while pressed or touched (pointerdown sets `data-held`; pointerup, leave or cancel clears it; the pause rule sits with the hover rule in `index.css`). A swipe that becomes a scroll cancels the press.
- **Where:** Home, phones and tablets.
- **What's wrong:** it pauses on hover and on keyboard focus, and stays
  still with Reduce Motion, but a touch user can't stop it. That's a
  borderline case of WCAG 2.2.2 (moving content longer than 5 s).
- **Fix:** optionally pause it while it's being touched
  (`:active`/`pointerdown`), or add a small pause button.

### ⏭ G10. HSTS not set in the project
- **Skipped** (as instructed): Vercel sends HSTS on the domain.
- **Where:** all pages.
- **What's wrong:** `vercel.json` has no `Strict-Transport-Security`.
  Vercel sends HSTS by default, but this should be confirmed on the custom
  domain.
- **Fix:** after the domain is live, check the response headers; add
  `max-age=63072000; includeSubDomains` in `vercel.json` if it's missing.

### ✅ G11. The language switch on the 404 page leads to another 404
- **Fixed:** on a 404 the switch links to the other language's home (`/en` or `/`); the current-language option stays on the page. Every real page still switches to the same page.
- **Where:** `/qa-missing-page` (any wrong Arabic URL), both directions.
- **What's wrong:** the switch links to `/en/404` (and back), which is
  correctly an English "page not found", but it's still a dead end.
- **Fix:** on the 404 page, point the switch at the other language's home.

### ✅ G12. WhatsApp button briefly focusable while invisible
- **Fixed:** the button's `aside` is `inert` while away (footer near, a dialog or the menu open, form pages), so nothing can focus it during the 300ms fade. While waiting on the first screen it stays focusable by design, and shows on focus.
- **Where:** `/en/services/premium-residency` at 1440 and `/presence` at
  375, Chrome (2 of 72 runs).
- **What's wrong:** Tab landed on the button while it was still fading in.
  Low confidence; likely just the fade timing.
- **Fix:** add `inert` (or `tabindex=-1`) while the button is hidden.

---

## Not issues (checked and dismissed)

These came up in automated runs and turned out to be test artifacts, not
site problems:

- **Overlapping text:** the two-line logo, the tight hero line spacing and
  the About facts. Checked by eye at every width.
- **10 px strip on the right:** the site's styled scrollbar
  (`scrollbar-gutter: stable`).
- **iPhone navbar "10 px off" on sector pages:** the emulator's visual
  viewport moving; the header shows correctly at the top.
- **iPhone reveal "28 sections hidden":** the test scrolled too fast for
  smooth scrolling. With realistic scrolling, all 38 appear.
- **Language-switch click failures:** the test clicked the closed language
  menu, which is correctly invisible, inert and unclickable.
- **WebKit Tab reaching only form fields:** Safari's default ("Press Tab to
  highlight each item" is off), not the site.
- **Sticky CTA and header jumps in the keyboard order:** they follow the DOM
  order on purpose.

---

## Needs the client

1. **Privacy Policy approval** (client + legal), including the "Last
   updated" date (R2).
2. **Real photos** for the Home hero, the Home About section and `/about`,
   or written approval to launch with the temporary ones (Y8). Files:
   `src/assets/images/home/riyadh-meeting-*`, `client-meeting-*`.
3. **Client logos:** the storyboard says they'll be added later. Confirm
   whether the three partner logos now shown (CASCO, آفاق, الخبراء
   المحترفون للاستشارات المالية) are approved to show, with their names
   spelled correctly, and send any others (ideally SVG or high-resolution
   PNG).
4. **Copy approval:** the 265 strings in `docs/copy-review.md` (Y9), plus
   the alt texts and partner names in Y10 and the interface labels in Y11.
5. **«تقنية» elsewhere on the site:** the hero changed to «جودة» at the
   client's request; confirm whether the other uses (footer description,
   sector names and lists) stay as «تقنية».
6. **Inbox for form submissions:** confirm which address should receive
   Booking, Quote and Contact entries, and be ready to confirm the 6 test
   submissions arrive (R3).
7. **Official social accounts:** confirm Facebook (`ForkBusiness`),
   Instagram (`fork.business`) and TikTok (`forkbusiness`) are the right
   accounts (G7).
8. **Launch date and domain:** needed to lift `noindex`, check HSTS on
   `www.forkarabia.sa`, and submit the sitemap (R1, G10).
