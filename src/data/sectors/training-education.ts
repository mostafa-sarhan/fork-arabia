import { copy, draft } from '@/lib/i18n/localized'
import { defineSector } from './defineSector'

/*
 * Sector 06. Arabic from the storyboard's sector page, English from the
 * company profile; `draft` marks English written here, listed in
 * docs/copy-review.md.
 */
export default defineSector('trainingEducation', {
  lead: draft(
    'برامج متخصصة ورحلات تعليمية تفاعلية في المجالات المالية والمحاسبية، ودورات كبير المراجعين.',
    'Specialized programs and interactive learning journeys in finance and accounting, and Lead Auditor courses.',
  ),

  ctaTitle: draft('عايز تطوّر فريقك؟', 'Ready to develop your team?'),

  services: [
    {
      id: 'finance-accounting-programs',
      title: draft('البرامج المالية والمحاسبية', 'Financial & Accounting Programs'),
      body: copy(
        'برامج متخصصة ورحلات تعليمية تفاعلية في المجالات المالية والمحاسبية.',
        'Specialized programs and interactive learning journeys in finance and accounting',
      ),
    },
    {
      id: 'lead-auditor',
      title: copy('تدريب كبير المراجعين', 'Lead Auditor Training'),
      body: copy(
        'دورات LEAD AUDITOR لجميع المخططات ضمن النطاق النشط للشريكين المعتمدين CQI و IRCA في المملكة المتحدة.',
        'We offer LEAD AUDITOR courses for all schemes within the active scope of our accredited partners CQI and IRCA in the United Kingdom.',
      ),
    },
  ],
})
