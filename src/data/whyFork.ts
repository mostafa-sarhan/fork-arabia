import type { IconName } from '@/components/ui/iconRegistry'
import { copy, type Localized } from '@/lib/i18n/localized'

/*
 * "Why FORK?": the label, the one-line heading and the five points, read
 * by the home page's WhyForkSection and every sector page's strip.
 *
 * Arabic is transcribed from the client's storyboard and English from the
 * company profile. English written here because the profile had no
 * equivalent was approved by the client on 2026-11-16.
 * The profile has the five lines but not their short titles.
 */
export const WHY_FORK = {
  eyebrow: copy('لماذا فورك؟', 'Why FORK?'),

  heading: copy(
    'من الاستشارة للتنفيذ للمتابعة، مع فريق واحد',
    'From consultation to implementation and follow-up, with one team',
  ),

  points: [
    {
      icon: 'users',
      title: copy('شريك واحد', 'One Partner'),
      line: copy(
        'شريك واحد يغطي احتياجات قانونية ومالية وإدارية وتقنية متعددة.',
        'One partner covering multiple legal, financial, administrative and technology needs.',
      ),
    },
    {
      icon: 'globe',
      title: copy('فهم الأسواق', 'Market Understanding'),
      line: copy(
        'فهم لبيئات الأعمال المختلفة في مصر والأسواق الخليجية التي نخدمها.',
        'Understanding of the different business environments in Egypt and the Gulf markets we serve.',
      ),
    },
    {
      icon: 'puzzle',
      title: copy('حلول مصممة لك', 'Solutions Built for You'),
      line: copy(
        'حلول عملية تُبنى حسب احتياج المنشأة بدلًا من القوالب الجاهزة.',
        'Practical solutions built around the entity’s needs rather than ready-made templates.',
      ),
    },
    {
      icon: 'route',
      title: copy('من الاستشارة للتنفيذ', 'From Consultation to Implementation'),
      line: copy(
        'تكامل بين الاستشارة والتنفيذ والمتابعة.',
        'Integration between consultancy, implementation and follow-up.',
      ),
    },
    {
      icon: 'barChart',
      title: copy('تقنية وتحليل', 'Technology and Analytics'),
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
