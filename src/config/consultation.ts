import { draft, proposed } from '@/lib/i18n/localized'

/*
 * The free consultation, as every page describes it. Change a day, an
 * hour or the reply time here and the booking cards, the hero facts and
 * the detail tiles all follow.
 *
 * Arabic is the storyboard's (the booking page's "تفاصيل الاستشارة" and
 * the sector pages' booking card); `draft` marks English written here and
 * `proposed` wording written here in both languages, all listed in
 * docs/copy-review.md.
 */

/* Shared by the duration tile and the hero fact, so the two cannot drift. */
const DURATION = draft('50 دقيقة', '50 minutes')

/** The six details, in the booking page's order. */
export const CONSULTATION_DETAILS = [
  { id: 'days', label: draft('الأيام', 'Days'), value: draft('السبت إلى الخميس', 'Saturday to Thursday') },
  {
    id: 'hours',
    label: draft('الساعات', 'Hours'),
    value: draft('10ص إلى 6م (توقيت السعودية)', '10 am to 6 pm (Saudi time)'),
  },
  { id: 'duration', label: draft('المدة', 'Duration'), value: DURATION },
  {
    id: 'method',
    label: draft('الطريقة', 'Format'),
    value: draft('حضوري · أونلاين · تليفون', 'In person · Online · Phone'),
  },
  { id: 'cost', label: draft('التكلفة', 'Cost'), value: draft('مجانية', 'Free') },
  { id: 'reply', label: draft('الرد', 'Reply'), value: draft('خلال يوم عمل', 'Within one business day') },
] as const

/** The one-line timing under a sector's booking card title. */
export const CONSULTATION_TIMING = draft(
  'استشارة مجانية مدتها 50 دقيقة، من السبت للخميس، 10 صباحًا إلى 6 مساءً بتوقيت السعودية.',
  'A free 50-minute consultation, Saturday to Thursday, 10 am to 6 pm Saudi time.',
)

/** The services page's invitation, reused by the sector consultation card. */
export const CONSULTATION_INVITE = draft(
  'احجز استشارة مجانية وفريقنا يحدد معاك الخدمات المناسبة لاحتياجك.',
  'Book a free consultation and our team will help you identify the services that fit your needs.',
)

/** The two consultation facts in a sector hero: value, then label. */
export const CONSULTATION_FACTS = {
  duration: { value: DURATION, label: draft('استشارة مجانية', 'free consultation') },
  reply: { value: proposed('يوم عمل', '1 business day'), label: proposed('للرد', 'to reply') },
}
