import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/layout/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import {
  EyeIcon,
  LeafIcon,
  LightbulbIcon,
  LinkIcon,
  ShieldIcon,
  UsersIcon,
} from '@/components/ui/icons'
import { cn } from '@/lib/cn'
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
 * The grid is ruled, not boxed: a hairline above it, one under every
 * value, and vertical hairlines between columns (added per index below).
 * One column on phones, two from 768, three from 1024.
 */
const GRID = 'grid md:grid-cols-2 lg:grid-cols-3 mt-10 lg:mt-14 border-t border-line'
const ITEM = 'group border-b py-8 md:px-8 lg:py-10 border-line'

/*
 * 52px tinted square. Under a pointer the value's square turns navy with a
 * turquoise icon.
 */
const ICON_SQUARE =
  'flex size-13 items-center justify-center rounded-xl bg-turquoise-soft text-petrol transition-colors duration-(--duration-hover) ease-out-soft group-hover:bg-navy group-hover:text-turquoise'

/* 22px, a size used only on the About page. */
const TITLE = 'mt-6 text-[1.375rem] leading-[1.4] font-extrabold text-heading'

export function ValuesSection() {
  const { language } = useLanguage()
  const text = localizeAll(COPY, language)

  return (
    <section className="py-16 lg:py-30 bg-surface">
      <Container>
        <Reveal className="flex flex-col gap-4 lg:gap-5">
          <Eyebrow />
          <h2 className="font-display text-section-title text-balance text-heading">
            {text.heading}
          </h2>
        </Reveal>

        <ul className={GRID}>
          {text.values.map((value, index) => {
            const Icon = VALUE_ICONS[index]
            return (
              <li
                key={value.title}
                className={cn(
                  ITEM,
                  // Hairlines between columns: the second of each pair from
                  // 768, the second and third of each trio from 1024.
                  index % 2 === 1 && 'md:max-lg:border-s',
                  index % 3 !== 0 && 'lg:border-s',
                )}
              >
                {/* 60ms apart, row by row. */}
                <Reveal delay={index * 60}>
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
