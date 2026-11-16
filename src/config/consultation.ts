import { copy } from '@/lib/i18n/localized'

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
const DURATION = copy('50 دقيقة', '50 minutes')

/** The six details, in the booking page's order. */
export const CONSULTATION_DETAILS = [
  { id: 'days', label: copy('الأيام', 'Days'), value: copy('السبت إلى الخميس', 'Saturday to Thursday') },
  {
    id: 'hours',
    label: copy('الساعات', 'Hours'),
    value: copy('10ص إلى 6م (توقيت السعودية)', '10 am to 6 pm (Saudi time)'),
  },
  { id: 'duration', label: copy('المدة', 'Duration'), value: DURATION },
  {
    id: 'method',
    label: copy('الطريقة', 'Format'),
    value: copy('حضوري · أونلاين · تليفون', 'In person · Online · Phone'),
  },
  { id: 'cost', label: copy('التكلفة', 'Cost'), value: copy('مجانية', 'Free') },
  { id: 'reply', label: copy('الرد', 'Reply'), value: copy('خلال يوم عمل', 'Within one business day') },
] as const

/** The one-line timing under a sector's booking card title. */
export const CONSULTATION_TIMING = copy(
  'استشارة مجانية مدتها 50 دقيقة، من السبت للخميس، 10 صباحًا إلى 6 مساءً بتوقيت السعودية.',
  'A free 50-minute consultation, Saturday to Thursday, 10 am to 6 pm Saudi time.',
)

/** The services page's invitation, reused by the sector consultation card. */
export const CONSULTATION_INVITE = copy(
  'احجز استشارة مجانية وفريقنا يحدد معاك الخدمات المناسبة لاحتياجك.',
  'Book a free consultation and our team will help you identify the services that fit your needs.',
)

/** The two consultation facts in a sector hero: value, then label. */
export const CONSULTATION_FACTS = {
  duration: { value: DURATION, label: copy('استشارة مجانية', 'free consultation') },
  reply: { value: copy('يوم عمل', '1 business day'), label: copy('للرد', 'to reply') },
}

/**
 * The three ways to hold the consultation, in the booking form's order
 * (online first, its default). Arabic from the storyboard's booking page.
 */
export const CONSULTATION_METHODS = [
  { id: 'online', label: copy('أونلاين', 'Online') },
  { id: 'phone', label: copy('تليفون', 'Phone') },
  { id: 'in-person', label: copy('حضوري', 'In person') },
] as const

export type ConsultationMethodId = (typeof CONSULTATION_METHODS)[number]['id']
