import photoFallback from '@/assets/images/home/riyadh-meeting-1400.jpg'
import photoWide from '@/assets/images/home/riyadh-meeting-1400.webp'
import photoNarrow from '@/assets/images/home/riyadh-meeting-800.webp'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { PinIcon } from '@/components/ui/icons'
import { copy, draft, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says.
 *
 * Arabic is transcribed from the storyboard's About page and English from
 * the company profile. `draft` marks English written here; it is listed in
 * `docs/copy-review.md` for approval.
 */
const COPY = {
  badge: draft('منذ 2016', 'Since 2016'),

  heading: draft(
    'شركة خدمات مهنية رائدة في مصر والخليج',
    'A leading professional services company in Egypt and the Gulf',
  ),

  /* The profile's sentence; the founding year after it is ours. */
  paragraph: draft(
    'فورك شركة خدمات مهنية رائدة، تقدم منظومة حلول متكاملة من الحلول القانونية والمالية والمحاسبية والإدارية والتقنية لقطاع الأعمال في مصر والسعودية والإمارات وعُمان. تأسست الشركة عام 2016.',
    'FORK is a leading professional services company offering an integrated suite of legal, financial, accounting, administrative and technology solutions for the business sector in Egypt, Saudi Arabia, the UAE and Oman. The company was founded in 2016.',
  ),

  countries: [
    copy('مصر', 'Egypt'),
    copy('السعودية', 'Saudi Arabia'),
    copy('الإمارات', 'UAE'),
    copy('عُمان', 'Oman'),
  ],

  imageAlt: draft(
    'فريق فورك العربية في اجتماع عمل بمكتب الرياض',
    'The FORK ARABIA team in a business meeting at the Riyadh office',
  ),

  offices: draft(
    'مقر رئيسي في الرياض، وفرع في طنطا',
    'Head office in Riyadh, and a branch in Tanta',
  ),
}

/* "Since 2016": a turquoise-tinted pill with petrol text and a small dot. */
const BADGE =
  'inline-flex items-center self-start rounded-full gap-2 px-3.5 py-1.5 text-body-sm font-semibold bg-turquoise-soft text-petrol'

/* One country: a hairline pill, navy and bold. */
const CHIP =
  'rounded-full border px-4 py-1.5 text-body-sm font-bold border-line text-heading'

/*
 * The card over the photograph's bottom inline-start corner, well below
 * the faces in the frame. Inside the
 * frame below 1024; from 1024 it hangs 32px past the photograph's edge,
 * into the gap between the columns. Below 1024 it is at most the
 * photograph's width less 12px a side (a calc: no width token says that).
 */
const PHOTO_CARD =
  'absolute start-3 bottom-3 max-w-[calc(100%-24px)] lg:-start-8 lg:bottom-8 lg:max-w-none flex items-center rounded-2xl gap-3 px-4 py-3 lg:py-4 bg-surface shadow-raised'

export function IntroSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="pt-16 pb-18 lg:py-28 bg-surface">
      <Container>
        {/* Text first, photograph after: below it on phones, at the inline
            end from 1024, where the text is centred against it. */}
        <div className="grid lg:grid-cols-2 lg:items-center gap-8 lg:gap-22">
          <Reveal className="flex flex-col gap-6 lg:gap-7">
            <span className={BADGE}>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-turquoise" />
              {text.badge}
            </span>

            <SectionTitle>{text.heading}</SectionTitle>

            <p className="max-w-measure text-body leading-paragraph lg:text-body-lg lg:leading-loose text-pretty text-ink-muted">
              {text.paragraph}
            </p>

            <ul className="flex flex-wrap gap-2.5">
              {text.countries.map((country) => (
                <li key={country} className={CHIP}>
                  {country}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="relative">
            {/*
              TEMPORARY: the home hero's photograph, until a dedicated
              office or team photograph replaces it. Below the fold, so it
              loads lazily; 4:3 below 1024, 5:4 from it.
            */}
            <picture className="block overflow-hidden rounded-3xl isolate">
              <source
                type="image/webp"
                srcSet={`${photoNarrow} 800w, ${photoWide} 1400w`}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <img
                src={photoFallback}
                width={1400}
                height={1120}
                alt={text.imageAlt}
                loading="lazy"
                decoding="async"
                className="reveal-media aspect-4/3 lg:aspect-5/4 w-full rounded-3xl object-cover object-top"
              />
            </picture>

            <p className={PHOTO_CARD}>
              <span
                aria-hidden="true"
                className="flex size-9 lg:size-10 shrink-0 items-center justify-center rounded-lg bg-turquoise-soft text-petrol"
              >
                <PinIcon size={20} />
              </span>
              <span className="text-body-sm font-semibold text-heading">
                {text.offices}
              </span>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
