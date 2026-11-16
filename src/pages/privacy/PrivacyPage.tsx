import { Container } from '@/components/layout/Container'
import { PageHero } from '@/components/PageHero'
import { PRIVACY_TITLE, PRIVACY_UPDATED } from '@/config/legal'
import { localizeAll, resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { PRIVACY_COPY, PRIVACY_EMAIL, PRIVACY_SECTIONS } from './privacyContent'

/* The body on the plain surface, under the hero. */
const SECTION = 'bg-surface py-section-sm lg:py-section'

/*
 * Phones and tablets: the contents, then the article, in one column.
 * From 1024 the contents take 3 of 12 columns at the inline start and the
 * article 8 from the fifth, held to about 720px for comfortable lines.
 */
const LAYOUT = 'grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-10'
const ARTICLE = 'min-w-0 max-w-180 lg:col-span-8 lg:col-start-5'

/*
 * The contents: a small list in a quiet card. On desktop it stays 24px
 * under the header while the article scrolls (the sector page's rule).
 */
const TOC =
  'rounded-xl border border-line bg-page p-5 lg:col-span-3 lg:sticky lg:top-[calc(var(--header-height-mobile)+1.5rem)] xl:top-[calc(var(--header-height)+1.5rem)]'
const TOC_TITLE = 'text-label font-bold text-heading'
const TOC_LIST = 'mt-3 flex flex-col gap-1 text-body-sm'
const TOC_LINK =
  'block rounded-md px-2 py-1.5 -mx-2 text-ink-muted transition-colors duration-(--duration-hover) hover:bg-surface hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol'

/*
 * One section: its heading clear of the sticky header when a contents
 * link jumps to it, then paragraphs at a reading size and line height.
 */
const BLOCK = 'border-t border-line pt-8 mt-8 first:mt-0 first:border-t-0 first:pt-0'
const HEADING =
  'scroll-mt-[calc(var(--header-height-mobile)+1.5rem)] xl:scroll-mt-[calc(var(--header-height)+1.5rem)] font-display text-h3 font-bold text-heading'
const PARAGRAPH = 'mt-4 text-body-lg leading-paragraph text-ink text-pretty'
const LIST = 'mt-4 flex list-disc flex-col gap-2 ps-6 text-body-lg leading-paragraph text-ink marker:text-turquoise'
const EMAIL_LINK = 'font-semibold text-petrol underline underline-offset-4 hover:text-navy'

/** A paragraph with the policy's contact address made a mail link wherever it appears. */
function WithEmailLink({ text }: { text: string }) {
  const parts = text.split(PRIVACY_EMAIL)
  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 ? (
        <a href={`mailto:${PRIVACY_EMAIL}`} dir="ltr" className={EMAIL_LINK}>
          {PRIVACY_EMAIL}
        </a>
      ) : null}
    </span>
  ))
}

/**
 * The privacy policy: the hero with its last update, then the policy as a
 * readable article with its contents beside it (above it on phones).
 * Approved by the client (copy and legal) on 2026-11-16.
 */
export default function PrivacyPage() {
  const { language } = useLanguage()
  const text = localizeAll(PRIVACY_COPY, language)
  const title = resolveCopy(PRIVACY_TITLE, language)
  const sections = localizeAll(PRIVACY_SECTIONS, language)
  const updated = text.updated.replace('{date}', PRIVACY_UPDATED[language])

  return (
    <>
      <PageHero title={title} crumb={text.crumb} lead={updated} />

      <section className={SECTION}>
        <Container className={LAYOUT}>
          <nav aria-labelledby="privacy-contents" className={TOC}>
            <h2 id="privacy-contents" className={TOC_TITLE}>
              {text.contents}
            </h2>
            <ol className={TOC_LIST}>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={TOC_LINK}>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className={ARTICLE}>
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className={BLOCK}>
                <h2 id={section.id} className={HEADING}>
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={PARAGRAPH}>
                    <WithEmailLink text={paragraph} />
                  </p>
                ))}
                {section.items ? (
                  <ul className={LIST}>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.closing?.map((paragraph) => (
                  <p key={paragraph} className={PARAGRAPH}>
                    <WithEmailLink text={paragraph} />
                  </p>
                ))}
              </section>
            ))}
          </article>
        </Container>
      </section>
    </>
  )
}
