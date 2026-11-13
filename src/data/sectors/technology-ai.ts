import { copy, draft } from '@/lib/i18n/localized'
import { defineSector } from './defineSector'

/*
 * Sector 07. Arabic from the storyboard's sector page, English from the
 * company profile; `draft` marks English written here, listed in
 * docs/copy-review.md.
 */
export default defineSector('technologyAi', {
  lead: copy(
    'الأنظمة الذكية، والمحتوى المدعوم بالذكاء الاصطناعي، والدعم التقني.',
    'Smart systems, AI-powered content and technical support',
  ),

  ctaTitle: draft('محتاج حل تقني؟', 'Need a technology solution?'),

  services: [
    {
      id: 'digital-support',
      title: copy('التكنولوجيا والدعم الرقمي', 'Technology & Digital Support'),
      body: copy(
        'حلول تكنولوجيا المعلومات والأنظمة الذكية والدعم التقني.',
        'Information technology and smart systems solutions, management of government e-platforms in Saudi Arabia, and preparation of presentations and content design leveraging AI technologies.',
      ),
    },
    {
      id: 'government-platforms',
      title: draft('إدارة المنصات الحكومية الإلكترونية', 'Government E-Platform Management'),
      body: draft(
        'إدارة المنصات الإلكترونية الحكومية في السعودية.',
        'Managing government e-platforms in Saudi Arabia.',
      ),
    },
    {
      id: 'ai-content',
      title: draft('المحتوى والعروض بالذكاء الاصطناعي', 'AI-Powered Content & Presentations'),
      body: draft(
        'إعداد العروض التقديمية وتصميم المحتوى بالاستفادة من تقنيات الذكاء الاصطناعي.',
        'Preparing presentations and designing content leveraging AI technologies.',
      ),
    },
    {
      id: 'icasco',
      title: copy('iCASCO والتحول الرقمي', 'iCASCO & Digital Transformation'),
      body: copy(
        'رقمنة دورة المنح والتفتيش والمطابقة من الطلب حتى إصدار الشهادة والمراقبة والتجديد.',
        'Digitizing the certification, inspection and conformity cycle: application, scope review, quotation and agreement, audit or inspection planning, competence, nonconformities and CAPA, technical review, decision, issuance of the certificate or CoC, surveillance and renewal, complaints, finance and reporting.',
      ),
    },
  ],
})
