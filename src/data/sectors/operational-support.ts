import { copy, draft } from '@/lib/i18n/localized'
import { defineSector } from './defineSector'

/*
 * Sector 08. Arabic from the storyboard's sector page, English from the
 * company profile; `draft` marks English written here, listed in
 * docs/copy-review.md.
 */
export default defineSector('operationalSupport', {
  lead: copy(
    'المشتريات وسلاسل الإمداد وتوفير الكفاءات المتخصصة.',
    'Procurement, supply chains and provision of specialized talent',
  ),

  ctaTitle: draft('محتاج دعم تشغيلي؟', 'Need operational support?'),

  services: [
    {
      id: 'procurement-supply',
      title: copy('المشتريات وسلاسل الإمداد', 'Procurement & Supply Chains'),
      body: copy(
        'استشارات المشتريات ورفع كفاءة سلاسل الإمداد.',
        'Procurement consulting and improving supply chain efficiency.',
      ),
    },
    {
      id: 'talent-provision',
      title: copy('توفير الكفاءات', 'Talent Provision'),
      body: copy(
        'توفير كوادر بشرية مؤهلة وخبرات متخصصة وفق متطلبات المنشأة ونموذج تشغيل تنافسي.',
        'Providing qualified human resources with specialized expertise according to the entity’s requirements and a competitive operating model.',
      ),
    },
  ],
})
