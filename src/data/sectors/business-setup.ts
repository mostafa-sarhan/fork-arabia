import { copy, draft } from '@/lib/i18n/localized'
import { defineSector } from './defineSector'

/*
 * Sector 02. Arabic from the storyboard's sector page, English from the
 * company profile; `draft` marks English written here, listed in
 * docs/copy-review.md.
 */
export default defineSector('businessSetup', {
  lead: draft(
    'تأسيس الشركات وخدمات المستثمرين وإدارة المتطلبات الحكومية في مصر والسعودية والإمارات وعُمان، بمسار متكامل يبدأ باختيار الهيكل المناسب وينتهي بجاهزية المنشأة للتشغيل.',
    'Company formation, investor services and management of government requirements in Egypt, Saudi Arabia, the UAE and Oman — a complete path that begins with choosing the right structure and ends with the entity ready to operate.',
  ),

  ctaTitle: draft('عايز تؤسس شركتك؟', 'Ready to set up your company?'),

  services: [
    {
      id: 'company-formation-restructuring',
      country: 'eg',
      title: copy('تأسيس الشركات وإعادة الهيكلة', 'Company Formation & Restructuring'),
      body: copy(
        'تأسيس الشركات بكافة أشكالها القانونية، وفتح الفروع المحلية والدولية (GAFI: تمويل، أشخاص، مناطق حرة، استثمار أجنبي)، وإعادة الهيكلة والاندماج والاستحواذ، ودعم إجراءات الإفلاس والتصفية.',
        'Forming companies in all legal forms; opening local and international branches (GAFI: financing, individuals, free zones and foreign investment); restructuring, mergers and acquisitions, and support for bankruptcy and liquidation procedures.',
      ),
    },
    {
      id: 'company-formation-foreign-investment',
      country: 'sa',
      title: copy('تأسيس الشركات والاستثمار الأجنبي', 'Company Formation & Foreign Investment'),
      body: copy(
        'تأسيس الشركات بكافة أنواعها وفق نظام الشركات الجديد، وإصدار تراخيص الاستثمار الأجنبي عبر وزارة الاستثمار (MISA)، وتأسيس الشركات ذات الترخيص الريادي.',
        'Forming all types of companies under the new Companies Law, issuing foreign investment licences through the Ministry of Investment (MISA), and establishing companies with an entrepreneurship licence.',
      ),
    },
    {
      id: 'incorporation-procedures',
      country: 'sa',
      title: copy('إجراءات التأسيس', 'Incorporation Procedures'),
      body: copy(
        'حجز الاسم التجاري، وإعداد عقد التأسيس، واستكمال التسجيل في الغرفة التجارية، والتسجيل لدى الجهات المختصة بالزكاة والضرائب والتأمينات الاجتماعية.',
        'Reserving the trade name, preparing the articles of association, completing Chamber of Commerce registration, and registering with the competent Zakat, tax and social insurance authorities.',
      ),
    },
    {
      id: 'platform-management-compliance',
      country: 'sa',
      title: copy('إدارة المنصات والامتثال', 'Platform Management & Compliance'),
      body: copy(
        'إدارة ومتابعة منصات مقيم وقوى ومدد والعنوان الوطني، ودعم فتح الحساب البنكي، وإمساك الدفاتر وربط العمليات بالأنظمة المحاسبية المناسبة.',
        'Managing and following up on the Muqeem, Qiwa, Mudad and National Address platforms; supporting bank account opening, bookkeeping, and linking operations to suitable accounting systems.',
      ),
    },
    {
      id: 'registrations-licences',
      country: 'sa',
      title: copy('التسجيلات والتراخيص', 'Registrations & Licences'),
      body: copy(
        'التسجيل لدى الهيئة السعودية للمقاولين، ودعم التسجيل كمطور عقاري، واستخراج التراخيص البلدية والبيئية، ومتطلبات شهادات الأمن السيبراني والمحتوى المحلي.',
        'Registration with the Saudi Contractors Authority, support for registration as a real estate developer, municipal and environmental licences, and issuing and supporting cybersecurity certificate and local content requirements.',
      ),
    },
    {
      id: 'classification-qualification',
      country: 'sa',
      title: copy('التصنيف والتأهيل', 'Classification & Qualification'),
      body: copy(
        'تصنيف المنشأة ورفع جاهزيتها للتأهيل والتسجيل لدى الشركة الوطنية للإسكان والشركة السعودية للكهرباء وأرامكو.',
        'Classifying the entity and raising its readiness for qualification and registration with the National Housing Company, the Saudi Electricity Company and Aramco, in line with approved requirements.',
      ),
    },
    {
      id: 'uae-business-setup',
      country: 'ae',
      title: copy('تأسيس الأعمال في الإمارات', 'United Arab Emirates'),
      body: copy(
        'تأسيس الشركات في البر الرئيسي والمناطق الحرة في دبي والشارقة وأبوظبي، وحجز الاسم التجاري، والتسجيل الضريبي، وإصدار بطاقة المنشأة والهوية الإماراتية، ودعم فتح الحساب البنكي، والإمساك المحاسبي، وإغلاق المنشآت وتصفيتها قانونيًا.',
        'Company formation on the mainland and in free zones in Dubai, Sharjah and Abu Dhabi; trade name reservation and provision of temporary lease requirements according to the setup path; completing tax registration and issuing the establishment card and Emirates ID; registering the entity with the insurance and labour authorities; supporting bank account opening and fulfilling the requirements to start operations; integrated bookkeeping, and closing and liquidating entities legally when needed.',
      ),
    },
    {
      id: 'oman-business-setup',
      country: 'om',
      title: copy('تأسيس الأعمال في سلطنة عُمان', 'Sultanate of Oman'),
      body: copy(
        'تأسيس وتدشين الشركات بمختلف أنواعها واستكمال الإجراءات القانونية والتنظيمية، مع نقطة اتصال واحدة حتى جاهزية الشركة للعمل.',
        'Forming and launching companies of all types and completing the related legal and regulatory procedures; a single point of contact to coordinate incorporation steps and follow-up until the company is ready to operate.',
      ),
    },
  ],
})
