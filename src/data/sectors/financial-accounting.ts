import { copy, draft } from '@/lib/i18n/localized'
import { defineSector } from './defineSector'

/*
 * Sector 03. Arabic from the storyboard's sector page, English from the
 * company profile; `draft` marks English written here, listed in
 * docs/copy-review.md.
 */
export default defineSector('financialAccounting', {
  lead: draft(
    'الاستشارات المالية، ومحاسبة الزكاة والضرائب، والقوائم المالية، ونقل الوظيفة المحاسبية التقليدية إلى إدارة مالية تدعم القرار والنمو.',
    'Financial advisory, Zakat and tax accounting and financial statements — moving from a traditional accounting function to financial management that supports decisions and growth.',
  ),

  ctaTitle: draft('محتاج استشارة مالية؟', 'Need financial advice?'),

  services: [
    {
      id: 'audit-assurance',
      title: copy('المراجعة والتدقيق وخدمات التأكيد', 'Audit, Review & Assurance Services'),
      body: copy(
        'مراجعة وتدقيق القوائم المالية، وأعمال الفحص المحدود، وتقارير الإجراءات المتفق عليها وخدمات التأكيد الأخرى.',
        'Review and audit of financial statements and execution of limited review engagements; preparation of agreed-upon procedures reports and provision of other assurance services.',
      ),
    },
    {
      id: 'financial-advisory-mergers',
      title: copy('الاستشارات المالية والاندماج والاستحواذ', 'Financial Advisory and M&A Transactions'),
      body: copy(
        'استشارات مالية لصفقات الاندماج والاستحواذ وبيع الشركات، والفحص المالي النافي للجهالة، والتحليل المالي والاستثماري لدعم القرار.',
        'Financial advisory on mergers, acquisitions and company sales; financial due diligence and analysis of the quality of information and financial results; financial and investment analysis to support decisions and evaluate alternatives.',
      ),
    },
    {
      id: 'financial-management',
      title: copy('تطوير الإدارة المالية', 'Financial Management Development'),
      body: copy(
        'هيكلة الإدارة المالية وتحديد الأدوار، وإعداد التقارير والموازنات، وبناء السياسات والإجراءات، وتهيئة الأنظمة المحاسبية مع إمساك الدفاتر.',
        'Developing and restructuring financial management and defining roles and responsibilities; preparing and developing periodic financial reports and budgets; building financial policies and procedures that strengthen control and consistency; setting up accounting systems and software, aligning them with management’s needs, together with bookkeeping.',
      ),
    },
    {
      id: 'cloud-accountant',
      title: copy('المحاسب السحابي', 'Cloud Accountant'),
      body: copy(
        'خدمة محاسبية متكاملة تعمل مع المنشأة عن بُعد: الأعمال اليومية وتحديث السجلات وإعداد التقارير، بديلًا عن بناء فريق محاسبي كامل.',
        'An integrated accounting service that works with your entity remotely, giving you continuity and clearer financial visibility. A flexible solution that reduces the need to build a full in-house accounting team.',
      ),
    },
    {
      id: 'zakat-tax',
      title: copy('الخدمات الزكوية والضريبية', 'Zakat & Tax Services'),
      body: copy(
        'التسجيل والتخطيط الضريبي، وإعداد الإقرارات الضريبية والزكوية، ومتابعة طلبات الاسترداد، ومعالجة الملاحظات.',
        'Tax registration and tax planning services; preparing tax and Zakat returns and reviewing their data; preparing and following up refund claims for eligible individuals and entities; Zakat and tax advice, and support in handling observations and improving records.',
      ),
    },
    {
      id: 'judicial-accounting',
      title: copy('الخبرة المحاسبية للجهات القضائية', 'Accounting Expertise for Judicial Authorities'),
      body: copy(
        'خبرة محاسبية وتقارير مالية متخصصة للقضايا والنزاعات، ودعم أعمال التصفية القضائية للشركات.',
        'Accounting expertise for judicial authorities and parties to disputes; support for judicial liquidation of companies and analysis of financial rights and obligations.',
      ),
    },
  ],
})
