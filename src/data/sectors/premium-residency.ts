import { copy, draft } from '@/lib/i18n/localized'
import { defineSector } from './defineSector'

/*
 * Sector 09. Arabic from the storyboard's sector page, English from the
 * company profile; `draft` marks English written here, listed in
 * docs/copy-review.md.
 *
 * The storyboard gives this sector no sub-services: its page is the six
 * tracks, our role in the file and the key benefits, all in `extras`.
 * Fees and thresholds live here only, never in a component.
 */
export default defineSector('premiumResidency', {
  lead: copy(
    'نرافق المستثمرين ورواد الأعمال وملاك العقارات في الحصول على الإقامة المميزة بالمملكة العربية السعودية، بدءًا من دراسة الأهلية واختيار المسار الأنسب، وحتى صدور الإقامة وتأسيس النشاط والتمتع بمزاياها.',
    'We guide investors, entrepreneurs and property owners through obtaining Saudi Premium Residency — from eligibility assessment and choosing the right track, to residency issuance, business setup and enjoying its benefits.',
  ),

  ctaTitle: draft('عايز تحصل على الإقامة المميزة؟', 'Interested in Saudi Premium Residency?'),

  services: [],

  extras: {
    tracks: {
      title: copy('مسارات الإقامة المميزة', 'Premium Residency Tracks'),
      intro: draft(
        'ستة مسارات، ونساعدك تختار الأنسب لوضعك الاستثماري.',
        'Six tracks — we help you choose the one that best fits your investment profile.',
      ),
      items: [
        {
          tag: draft('استثمار', 'Investment'),
          title: copy('إقامة مستثمر الأعمال', 'Business Investor'),
          body: copy(
            'استثمار لا يقل عن 7 ملايين ريال برخصة استثمار سارية، مع توفير 10 وظائف خلال سنتين.',
            'Investment of at least SAR 7 million under a valid investment licence, creating 10 jobs within two years',
          ),
        },
        {
          tag: draft('تملّك', 'Ownership'),
          title: copy('إقامة مالك العقار', 'Real Estate Owner'),
          body: copy(
            'تملّك عقار سكني مطوّر وغير مرهون بقيمة لا تقل عن 4 ملايين ريال.',
            'Ownership of a developed, mortgage-free residential property worth at least SAR 4 million',
          ),
        },
        {
          tag: draft('ريادة', 'Entrepreneurship'),
          title: copy('إقامة رائد الأعمال', 'Entrepreneur'),
          body: copy(
            'لمؤسسي الشركات الناشئة والمبتكرين، وفق اشتراطات الاستثمار والملكية المعتمدة.',
            'For start-up founders and innovators, subject to the approved investment and ownership criteria',
          ),
        },
        {
          tag: draft('رسوم سنوية', 'Limited duration'),
          title: copy('الإقامة محددة المدة', 'Limited Duration'),
          body: copy(
            'برسوم سنوية قدرها 100 ألف ريال، قابلة للتجديد.',
            'Annual fee of SAR 100,000, renewable',
          ),
        },
        {
          tag: draft('رسم لمرة واحدة', 'Unlimited duration'),
          title: copy('الإقامة غير محددة المدة', 'Unlimited Duration'),
          body: copy(
            'إقامة دائمة برسم لمرة واحدة قدره 800 ألف ريال.',
            'Permanent residency for a one-time fee of SAR 800,000',
          ),
        },
        {
          tag: draft('كفاءات', 'Talent'),
          title: copy('الكفاءات الاستثنائية والموهوبون', 'Special Talent & Gifted'),
          body: copy(
            'للكفاءات في القطاعات الصحية والعلمية والقيادية، والموهوبين في الثقافة والرياضة.',
            'For exceptional professionals in healthcare, science and leadership, and gifted individuals in culture and sport',
          ),
        },
      ],
    },

    steps: {
      title: copy('دورنا في ملف إقامتك', 'Our Role in Your Residency File'),
      items: [
        copy(
          'دراسة الأهلية واختيار مسار الإقامة الأنسب لوضعك الاستثماري',
          'Eligibility assessment and selecting the track that best fits your investment profile',
        ),
        copy(
          'تجهيز المستندات ومراجعتها وترجمتها ترجمة قانونية معتمدة',
          'Preparing and reviewing documents, with certified legal translation',
        ),
        copy(
          'تقديم الطلب ومتابعته لدى المركز السعودي للإقامة المميزة حتى صدور القرار',
          'Submitting and following up the application with the Premium Residency Center until a decision is issued',
        ),
        copy(
          'تأسيس الشركة واستخراج رخصة الاستثمار (MISA) عند الحاجة',
          'Company formation and obtaining the investment licence (MISA) when required',
        ),
        copy(
          'التحقق القانوني من العقار وإتمام إجراءات التملّك',
          'Legal due diligence on the property and completing ownership procedures',
        ),
        copy(
          'خدمات ما بعد الإصدار: إضافة أفراد الأسرة والتجديد وإدارة المنصات الحكومية',
          'Post-issuance services: adding family members, renewal and managing government platforms',
        ),
      ],
    },

    benefits: {
      title: copy('أبرز المزايا', 'Key Benefits'),
      items: [
        copy('الإقامة مع الأسرة واستضافة الأقارب', 'Residence with family & hosting relatives'),
        copy('ممارسة الأعمال التجارية دون كفيل', 'Doing business without a sponsor'),
        copy('تملّك العقارات السكنية والتجارية', 'Owning residential & commercial property'),
        copy('حرية الخروج والعودة إلى المملكة', 'Free exit and re-entry'),
        copy('استقدام العمالة المنزلية', 'Recruiting domestic workers'),
        copy('الإعفاء من المقابل المالي للمرافقين', 'Exemption from dependants’ fees'),
      ],
    },

    disclaimer: copy(
      '* الاشتراطات والرسوم وفق آخر ما أعلنه المركز السعودي للإقامة المميزة، وقابلة للتحديث.',
      '* Requirements and fees as last announced by the Saudi Premium Residency Center and subject to change.',
    ),
  },
})
