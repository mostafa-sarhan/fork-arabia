import type { IconName } from '@/components/ui/iconRegistry'
import { copy, draft, type Localized } from '@/lib/i18n/localized'

/*
 * "Why FORK?": the label, the one-line heading and the five points, read
 * by the home page's WhyForkSection and every sector page's strip.
 *
 * Arabic is transcribed from the client's storyboard and English from the
 * company profile. `draft` marks English written here because the profile
 * had no equivalent; it is listed in `docs/copy-review.md` for approval.
 * The profile has the five lines but not their short titles.
 */
export const WHY_FORK = {
  eyebrow: copy('لماذا فورك؟', 'Why FORK?'),

  heading: draft(
    'من الاستشارة للتنفيذ للمتابعة، مع فريق واحد',
    'From consultation to implementation and follow-up, with one team',
  ),

  points: [
    {
      icon: 'users',
      title: draft('شريك واحد', 'One Partner'),
      line: copy(
        'شريك واحد يغطي احتياجات قانونية ومالية وإدارية وتقنية متعددة.',
        'One partner covering multiple legal, financial, administrative and technology needs.',
      ),
    },
    {
      icon: 'globe',
      title: draft('فهم الأسواق', 'Market Understanding'),
      line: copy(
        'فهم لبيئات الأعمال المختلفة في مصر والأسواق الخليجية التي نخدمها.',
        'Understanding of the different business environments in Egypt and the Gulf markets we serve.',
      ),
    },
    {
      icon: 'puzzle',
      title: draft('حلول مصممة لك', 'Solutions Built for You'),
      line: copy(
        'حلول عملية تُبنى حسب احتياج المنشأة بدلًا من القوالب الجاهزة.',
        'Practical solutions built around the entity’s needs rather than ready-made templates.',
      ),
    },
    {
      icon: 'route',
      title: draft('من الاستشارة للتنفيذ', 'From Consultation to Implementation'),
      line: copy(
        'تكامل بين الاستشارة والتنفيذ والمتابعة.',
        'Integration between consultancy, implementation and follow-up.',
      ),
    },
    {
      icon: 'barChart',
      title: draft('تقنية وتحليل', 'Technology and Analytics'),
      line: copy(
        'توظيف التكنولوجيا والتحليل لرفع جودة المخرجات وسرعة الإنجاز.',
        'Leveraging technology and analytics to raise output quality and speed of delivery.',
      ),
    },
  ],
} as const satisfies {
  eyebrow: Localized
  heading: Localized
  points: ReadonlyArray<{ icon: IconName; title: Localized; line: Localized }>
}
