import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import {
  EyeIcon,
  LeafIcon,
  LightbulbIcon,
  LinkIcon,
  ShieldIcon,
  UsersIcon,
} from '@/components/ui/icons'
import { copy, localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'

/*
 * Everything this section says: Arabic from the storyboard's About page,
 * English from the company profile.
 */
const COPY = {
  heading: copy('قيمنا', 'Our Values'),

  values: [
    {
      title: copy('الاحترافية', 'Professionalism'),
      line: copy('نلتزم بالدقة والجودة والمسؤولية.', 'We are committed to accuracy, quality and accountability.'),
    },
    {
      title: copy('المصداقية', 'Credibility'),
      line: copy('نقدم المعلومة والتوصية بوضوح وشفافية.', 'We provide information and recommendations with clarity and transparency.'),
    },
    {
      title: copy('التكامل', 'Integration'),
      line: copy('نربط التخصصات المختلفة داخل حل واحد متناسق.', 'We connect different specialisms within one coherent solution.'),
    },
    {
      title: copy('الشراكة', 'Partnership'),
      line: copy('نبني حلولنا حول أهداف العميل وواقع أعماله.', 'We build our solutions around the client’s goals and business reality.'),
    },
    {
      title: copy('الابتكار', 'Innovation'),
      line: copy('نوظف الأدوات الحديثة لتطوير التجربة والنتائج.', 'We employ modern tools to improve experience and results.'),
    },
    {
      title: copy('الاستدامة', 'Sustainability'),
      line: copy('نوازن بين النمو والحوكمة واستمرارية الأعمال.', 'We balance growth, governance and business continuity.'),
    },
  ],
}

/* One icon per value, in the order of COPY.values. */
const VALUE_ICONS = [ShieldIcon, EyeIcon, LinkIcon, UsersIcon, LightbulbIcon, LeafIcon]

/*
 * Six tiles, 20px apart: one column on phones, two from 768, three from
 * 1024. 32px under the heading, 56px from 1024.
 */
const GRID = 'grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 lg:mt-14'

/*
 * One value: a page-tone tile with 20px corners. Under a pointer it turns
 * white with a turquoise hairline and a soft navy-tinted shadow (the
 * hairline is there, transparent, at rest, so nothing shifts). Only
 * colours change, so reduced motion needs no exception.
 */
const TILE =
  'group h-full rounded-2xl border border-transparent p-7 md:p-8 bg-page transition-[background-color,border-color,box-shadow] duration-(--duration-hover) ease-out-soft hover:bg-surface hover:border-turquoise hover:shadow-card'

/* 52px white square; navy with a turquoise icon while its tile is hovered. */
const ICON_SQUARE =
  'flex size-13 items-center justify-center rounded-xl bg-surface text-petrol transition-colors duration-(--duration-hover) ease-out-soft group-hover:bg-navy group-hover:text-turquoise'

/* 22px, a size used only on the About page. */
const TITLE = 'mt-6 text-[1.375rem] leading-[1.4] font-extrabold text-balance text-heading'

export function ValuesSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="pt-16 pb-18 lg:py-28 bg-surface">
      <Container>
        <Reveal>
          <SectionTitle>{text.heading}</SectionTitle>
        </Reveal>

        <ul className={GRID}>
          {text.values.map((value, index) => {
            const Icon = VALUE_ICONS[index]
            return (
              <li key={value.title}>
                {/* 60ms apart, row by row. */}
                <Reveal delay={index * 60} className={TILE}>
                  <div className="flex items-center justify-between">
                    <span aria-hidden="true" className={ICON_SQUARE}>
                      <Icon size={24} />
                    </span>
                    <span aria-hidden="true" className="text-body-sm font-bold tabular-nums text-ink-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className={TITLE}>{value.title}</h3>
                  <p className="mt-2 text-body leading-paragraph text-ink-muted">{value.line}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
