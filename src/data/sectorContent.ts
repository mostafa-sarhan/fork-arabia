import { proposed, type Localized } from '@/lib/i18n/localized'
import type { SectorId } from './sectorIndex'

const copy = (arabic: string, english: string): Localized => ({
    ar: arabic,
    en: english,
  })

const draft = (arabic: string, english: string): Localized => ({
    ar: arabic,
    en: proposed(english),
  })

export type SectorService = {
  readonly title: Localized
  readonly body: Localized
}

export type SectorTrack = {
  readonly tag: Localized
  readonly title: Localized
  readonly body: Localized
}


export type SectorExtraBlock =
| {
  readonly kind: 'tracks'
  readonly title: Localized
  readonly intro: Localized
  readonly items: readonly SectorTrack[]
}
| {
  readonly kind: 'steps'
  readonly title: Localized
  readonly items: readonly Localized[]
}
| {
  readonly kind: 'benefits'
  readonly title: Localized
  readonly items: readonly Localized[]
}
| { readonly kind: 'disclaimer'; readonly text: Localized }

export type SectorContent = {
  readonly cta: { readonly title: Localized }
  readonly services: readonly SectorService[]
  readonly extra?: readonly SectorExtraBlock[]
}

export const SECTOR_CONTENT = {
  legalCorporate: {
    cta: {
      title: draft(
        'محتاج استشارة قانونية؟',
        'Need legal advice?',
      ),
    },
    services: [
      {
        title: copy(
          'التقاضي والتحكيم التجاري (مصر)',
          'Litigation & Commercial Arbitration',
        ),
        body: copy(
          'مباشرة القضايا التجارية والمدنية والإدارية أمام المحاكم المختصة والمحاكم الاقتصادية ومجلس الدولة، وخدمات التحكيم التجاري وإدارة النزاعات.',
          'Handling commercial, civil and administrative cases before the competent courts, the economic courts and the State Council, and providing commercial arbitration and dispute management services.',
        ),
      },
      {
        title: copy(
          'المحاماة والتقاضي التجاري (السعودية)',
          'Advocacy & Commercial Litigation',
        ),
        body: copy(
          'الترافع أمام المحاكم التجارية والعمالية واللجان شبه القضائية ولجان المنازعات التمويلية والمصرفية، وإدارة ملفات التحكيم التجاري.',
          'Pleading and handling cases before commercial courts, labour courts, quasi-judicial committees and banking & finance dispute committees, and managing commercial arbitration files.',
        ),
      },
      {
        title: copy(
          'العقود والترجمة القانونية',
          'Contracts & Legal Translation',
        ),
        body: copy(
          'صياغة ومراجعة وتنقيح العقود والاتفاقيات الدولية والمحلية، وترجمة قانونية معتمدة للمستندات والمحاضر.',
          'Drafting, reviewing and revising international and local contracts and agreements, and providing certified legal translation of documents and minutes.',
        ),
      },
      {
        title: copy(
          'صياغة العقود والامتثال الأنظمي (السعودية)',
          'Contract Drafting & Regulatory Compliance',
        ),
        body: copy(
          'صياغة وتدقيق العقود التجارية بما يتوافق مع الأنظمة السعودية، والاستشارات القانونية الوقائية لضمان الامتثال.',
          'Drafting and reviewing commercial contracts and agreements in line with Saudi regulations, and providing preventive legal advice to ensure compliance with regulatory requirements.',
        ),
      },
      {
        title: copy(
          'الملكية الفكرية والتراخيص',
          'Intellectual Property & Licensing',
        ),
        body: copy(
          'تسجيل وحماية العلامات التجارية وبراءات الاختراع والنماذج الصناعية، واستخراج التراخيص الصناعية والفنية.',
          'Registering and protecting trademarks, patents and industrial designs; obtaining industrial and technical licences and following up compliance requirements with government authorities.',
        ),
      },
      {
        title: copy(
          'الملكية الفكرية وحماية الأعمال (السعودية)',
          'Intellectual Property & Business Protection',
        ),
        body: copy(
          'تسجيل العلامات التجارية وبراءات الاختراع لدى الهيئة السعودية للملكية الفكرية (SAIP)، وصياغة اتفاقيات عدم الإفشاء وحماية الأسرار التجارية.',
          'Registering trademarks and patents with the Saudi Authority for Intellectual Property (SAIP), drafting non-disclosure agreements and protecting trade secrets.',
        ),
      },
      {
        title: copy(
          'إعادة الهيكلة والاندماج والاستحواذ',
          'Restructuring, Mergers & Acquisitions',
        ),
        body: copy(
          'حوكمة وهيكلة الشركات العائلية والمساهمة، وصياغة ميثاق العائلة، وإدارة عمليات الاندماج والاستحواذ والتحقق القانوني النافي للجهالة.',
          'Governance and structuring of family and joint-stock companies, drafting family charters, managing M&A transactions and legal due diligence, and supporting procedures under the Saudi Bankruptcy Law.',
        ),
      },
      {
        title: copy(
          'الاستشارات وإقامات المستثمرين',
          'Consultancy & Investor Residency',
        ),
        body: copy(
          'الاستشارات القانونية المستمرة للشركات، ودعم إجراءات إقامات الأجانب، وبرامج الجنسية الاستثمارية وفق القوانين السارية.',
          'Providing ongoing legal consultancy to companies, and supporting foreign residency procedures and investment citizenship programs in accordance with applicable laws.',
        ),
      },
      {
        title: copy(
          'إنشاء وتأهيل الإدارات القانونية',
          'Establishing & Developing Legal Departments',
        ),
        body: copy(
          'بناء الإدارات القانونية الداخلية، وصياغة اللوائح والسياسات، وتدريب الفرق القانونية، وقياس وتحسين الأداء القانوني.',
          'Building in-house legal departments for companies, drafting regulations and policies, training legal teams, and measuring and improving the organization’s legal performance. We link the legal track with the entity’s financial and administrative structure to reduce conflicts and accelerate execution.',
        ),
      },
    ],
  },
  businessSetup: {
    cta: {
      title: draft(
        'عايز تؤسس شركتك؟',
        'Ready to set up your company?',
      ),
    },
    services: [
      {
        title: copy(
          'تأسيس الشركات وإعادة الهيكلة (مصر)',
          'Company Formation & Restructuring',
        ),
        body: copy(
          'تأسيس الشركات بكافة أشكالها القانونية، وفتح الفروع المحلية والدولية (GAFI: تمويل، أشخاص، مناطق حرة، استثمار أجنبي)، وإعادة الهيكلة والاندماج والاستحواذ، ودعم إجراءات الإفلاس والتصفية.',
          'Forming companies in all legal forms; opening local and international branches (GAFI: financing, individuals, free zones and foreign investment); restructuring, mergers and acquisitions, and support for bankruptcy and liquidation procedures.',
        ),
      },
      {
        title: copy(
          'تأسيس الشركات والاستثمار الأجنبي (السعودية)',
          'Company Formation & Foreign Investment',
        ),
        body: copy(
          'تأسيس الشركات بكافة أنواعها وفق نظام الشركات الجديد، وإصدار تراخيص الاستثمار الأجنبي عبر وزارة الاستثمار (MISA)، وتأسيس الشركات ذات الترخيص الريادي.',
          'Forming all types of companies under the new Companies Law, issuing foreign investment licences through the Ministry of Investment (MISA), and establishing companies with an entrepreneurship licence.',
        ),
      },
      {
        title: copy(
          'إجراءات التأسيس (السعودية)',
          'Incorporation Procedures',
        ),
        body: copy(
          'حجز الاسم التجاري، وإعداد عقد التأسيس، واستكمال التسجيل في الغرفة التجارية، والتسجيل لدى الجهات المختصة بالزكاة والضرائب والتأمينات الاجتماعية.',
          'Reserving the trade name, preparing the articles of association, completing Chamber of Commerce registration, and registering with the competent Zakat, tax and social insurance authorities.',
        ),
      },
      {
        title: copy(
          'إدارة المنصات والامتثال (السعودية)',
          'Platform Management & Compliance',
        ),
        body: copy(
          'إدارة ومتابعة منصات مقيم وقوى ومدد والعنوان الوطني، ودعم فتح الحساب البنكي، وإمساك الدفاتر وربط العمليات بالأنظمة المحاسبية المناسبة.',
          'Managing and following up on the Muqeem, Qiwa, Mudad and National Address platforms; supporting bank account opening, bookkeeping, and linking operations to suitable accounting systems.',
        ),
      },
      {
        title: copy(
          'التسجيلات والتراخيص (السعودية)',
          'Registrations & Licences',
        ),
        body: copy(
          'التسجيل لدى الهيئة السعودية للمقاولين، ودعم التسجيل كمطور عقاري، واستخراج التراخيص البلدية والبيئية، ومتطلبات شهادات الأمن السيبراني والمحتوى المحلي.',
          'Registration with the Saudi Contractors Authority, support for registration as a real estate developer, municipal and environmental licences, and issuing and supporting cybersecurity certificate and local content requirements.',
        ),
      },
      {
        title: copy(
          'التصنيف والتأهيل (السعودية)',
          'Classification & Qualification',
        ),
        body: copy(
          'تصنيف المنشأة ورفع جاهزيتها للتأهيل والتسجيل لدى الشركة الوطنية للإسكان والشركة السعودية للكهرباء وأرامكو.',
          'Classifying the entity and raising its readiness for qualification and registration with the National Housing Company, the Saudi Electricity Company and Aramco, in line with approved requirements.',
        ),
      },
      {
        title: copy(
          'تأسيس الأعمال في الإمارات',
          'United Arab Emirates',
        ),
        body: copy(
          'تأسيس الشركات في البر الرئيسي والمناطق الحرة في دبي والشارقة وأبوظبي، وحجز الاسم التجاري، والتسجيل الضريبي، وإصدار بطاقة المنشأة والهوية الإماراتية، ودعم فتح الحساب البنكي، والإمساك المحاسبي، وإغلاق المنشآت وتصفيتها قانونيًا.',
          'Company formation on the mainland and in free zones in Dubai, Sharjah and Abu Dhabi; trade name reservation and provision of temporary lease requirements according to the setup path; completing tax registration and issuing the establishment card and Emirates ID; registering the entity with the insurance and labour authorities; supporting bank account opening and fulfilling the requirements to start operations; integrated bookkeeping, and closing and liquidating entities legally when needed.',
        ),
      },
      {
        title: copy(
          'تأسيس الأعمال في سلطنة عُمان',
          'Sultanate of Oman',
        ),
        body: copy(
          'تأسيس وتدشين الشركات بمختلف أنواعها واستكمال الإجراءات القانونية والتنظيمية، مع نقطة اتصال واحدة حتى جاهزية الشركة للعمل.',
          'Forming and launching companies of all types and completing the related legal and regulatory procedures; a single point of contact to coordinate incorporation steps and follow-up until the company is ready to operate.',
        ),
      },
    ],
  },
  financialAccounting: {
    cta: {
      title: draft(
        'محتاج استشارة مالية؟',
        'Need financial advice?',
      ),
    },
    services: [
      {
        title: copy(
          'المراجعة والتدقيق وخدمات التأكيد',
          'Audit, Review & Assurance Services',
        ),
        body: copy(
          'مراجعة وتدقيق القوائم المالية، وأعمال الفحص المحدود، وتقارير الإجراءات المتفق عليها وخدمات التأكيد الأخرى.',
          'Review and audit of financial statements and execution of limited review engagements; preparation of agreed-upon procedures reports and provision of other assurance services.',
        ),
      },
      {
        title: copy(
          'الاستشارات المالية والاندماج والاستحواذ',
          'Financial Advisory and M&A Transactions',
        ),
        body: copy(
          'استشارات مالية لصفقات الاندماج والاستحواذ وبيع الشركات، والفحص المالي النافي للجهالة، والتحليل المالي والاستثماري لدعم القرار.',
          'Financial advisory on mergers, acquisitions and company sales; financial due diligence and analysis of the quality of information and financial results; financial and investment analysis to support decisions and evaluate alternatives.',
        ),
      },
      {
        title: copy(
          'تطوير الإدارة المالية',
          'Financial Management Development',
        ),
        body: copy(
          'هيكلة الإدارة المالية وتحديد الأدوار، وإعداد التقارير والموازنات، وبناء السياسات والإجراءات، وتهيئة الأنظمة المحاسبية مع إمساك الدفاتر.',
          'Developing and restructuring financial management and defining roles and responsibilities; preparing and developing periodic financial reports and budgets; building financial policies and procedures that strengthen control and consistency; setting up accounting systems and software, aligning them with management’s needs, together with bookkeeping.',
        ),
      },
      {
        title: copy(
          'المحاسب السحابي',
          'Cloud Accountant',
        ),
        body: copy(
          'خدمة محاسبية متكاملة تعمل مع المنشأة عن بُعد: الأعمال اليومية وتحديث السجلات وإعداد التقارير، بديلًا عن بناء فريق محاسبي كامل.',
          'An integrated accounting service that works with your entity remotely, giving you continuity and clearer financial visibility. A flexible solution that reduces the need to build a full in-house accounting team.',
        ),
      },
      {
        title: copy(
          'الخدمات الزكوية والضريبية',
          'Zakat & Tax Services',
        ),
        body: copy(
          'التسجيل والتخطيط الضريبي، وإعداد الإقرارات الضريبية والزكوية، ومتابعة طلبات الاسترداد، ومعالجة الملاحظات.',
          'Tax registration and tax planning services; preparing tax and Zakat returns and reviewing their data; preparing and following up refund claims for eligible individuals and entities; Zakat and tax advice, and support in handling observations and improving records.',
        ),
      },
      {
        title: copy(
          'الخبرة المحاسبية للجهات القضائية',
          'Accounting Expertise for Judicial Authorities',
        ),
        body: copy(
          'خبرة محاسبية وتقارير مالية متخصصة للقضايا والنزاعات، ودعم أعمال التصفية القضائية للشركات.',
          'Accounting expertise for judicial authorities and parties to disputes; support for judicial liquidation of companies and analysis of financial rights and obligations.',
        ),
      },
    ],
  },
  governanceOrganization: {
    cta: {
      title: draft(
        'محتاج تنظّم منشأتك؟',
        'Looking to structure your organization?',
      ),
    },
    services: [
      {
        title: copy(
          'مجالس الإدارة والجمعيات العمومية',
          'Boards of Directors & General Assemblies',
        ),
        body: copy(
          'تنظيم الجمعيات العمومية العادية وغير العادية واجتماعات مجالس الإدارة، وسكرتارية المجالس (الدعوات، جداول الأعمال، المحاضر)، وإعداد العروض التقديمية وتوفير الترجمة الفورية عند الحاجة.',
          'Managing and organizing ordinary and extraordinary general assemblies and board meetings; board secretarial services: preparing invitations, agendas and minutes; preparing professional presentations and providing simultaneous interpretation when needed.',
        ),
      },
      {
        title: copy(
          'حوكمة مجالس الإدارة (السعودية)',
          'Board Governance',
        ),
        body: copy(
          'صياغة لوائح الحوكمة، وتنظيم أعمال مجالس الإدارة والجمعيات العمومية، وتوثيق القرارات والمحاضر عبر منصات وزارة التجارة.',
          'Drafting governance regulations, organizing the work of boards of directors and general assemblies, and documenting resolutions and minutes through the Ministry of Commerce platforms.',
        ),
      },
      {
        title: copy(
          'الحوكمة والاستدامة والبناء التنظيمي',
          'Governance, sustainability and organizational structuring',
        ),
        body: copy(
          'وضع وتطبيق أطر الحوكمة ووضوح الصلاحيات والمسؤوليات، ودمج مبادئ الاستدامة، وبناء الهيكل التنظيمي وإعداد اللوائح ودعم التوظيف والاستقطاب.',
          'Establishing and applying suitable governance frameworks and standards, and clarifying authorities and responsibilities; supporting the integration of sustainability principles into institutional policies and practices; building the organizational and administrative structure, preparing regulations, and supporting recruitment and talent acquisition.',
        ),
      },
      {
        title: copy(
          'معيار صائب لقياس نضج الإدارة المالية',
          'SAEB Standard | Financial Management Maturity Assessment',
        ),
        body: copy(
          'أداة لتقييم نضج الممارسات المالية عبر خمسة أبعاد: الحوكمة، الرقابة والإشراف، التحليل والتخطيط، كفاءة الموارد، العمليات المحاسبية.',
          'A tool for assessing the maturity of financial management practices within organizations, turning the assessment into a clear picture of gaps, priorities and improvement opportunities. It is based on five core dimensions: Governance, Oversight & Control, Analysis & Planning, Resource Efficiency, Accounting Operations.',
        ),
      },
    ],
  },
  qualityExcellence: {
    cta: {
      title: draft(
        'محتاج شهادة أو مطابقة؟',
        'Need certification or product conformity?',
      ),
    },
    services: [
      {
        title: copy(
          'مطابقة المنتجات السعودية',
          'Saudi Product Conformity',
        ),
        body: copy(
          'إدارة رحلة المطابقة من طلب المصدّر أو المصنّع حتى الإفراج عن الشحنة: تصنيف المنتج، الملف الفني، البطاقة العربية، الفحص والاختبار، ومسارات SFDA/FaSeH و SASO/SABER وشهادات PCoC و SCoC وعلامة الجودة السعودية G-Mark والحلال.',
          'We manage the conformity journey from the first request by the exporter or manufacturer until the shipment is released and delivered to the importer: product classification and HS code, verification of manufacturer and importer registration, review of the technical file, Arabic labelling and INCI ingredients, free sale certificate and GMP, then inspection, sampling and testing through ISO/IEC 17025 laboratories. We coordinate SFDA/FaSeH pathways and shipment conformity certificates for food and cosmetics, SASO/SABER pathways and PCoC and SCoC certificates for products subject to technical regulations, as well as the Saudi Quality Mark, GSO/G-Mark, IECEE, energy and water efficiency cards and Halal.',
        ),
      },
      {
        title: copy(
          'المطابقة في مصر والأسواق الدولية',
          'Egypt & International Markets',
        ),
        body: copy(
          'ربط الملف الفني بمنظومة ACI/ACID ونافذة، ومتطلبات NFSA للأغذية و EDA لمستحضرات التجميل و GOEIC/EOS للمنتجات الصناعية، وتحديد متطلبات دولة المقصد حتى دخول السوق.',
          'In Egypt, we link the technical file with the ACI/ACID and CARGOX/NAFEZA systems, NFSA requirements for food, EDA notifications for cosmetics and GOEIC/EOS for industrial products, together with conformity certificates or pre-shipment inspection. Outside Saudi Arabia and Egypt, we identify the destination country’s regulations, language and labelling, testing, conformity assessment body, CoC, GSO/G-Mark or any pre-shipment verification programme, and manage nonconformities until market entry.',
        ),
      },
      {
        title: copy(
          'نظم الإدارة والشهادات',
          'Management Systems & Certification',
        ),
        body: copy(
          'تأهيل المنشآت من تحليل الفجوة حتى المراجعة الخارجية لشهادات ISO 9001 و 14001 و 45001 و 22000 و 27001 و 37001 و 13485 وغيرها وفق أحدث الإصدارات.',
          'We qualify organizations from gap analysis to external audit: designing processes, policies and records, training, implementation, internal audit, management review and closing nonconformities. Scope includes ISO 9001, 14001, 45001, 50001, 22000/FSSC 22000, 27001, 22301, 37001, 37301, 55001, 13485, 21001, 41001, 39001, 20000-1, 28000, 20121, 46001 and others, in line with the latest editions.',
        ),
      },
      {
        title: copy(
          'اعتماد جهات تقويم المطابقة',
          'Accreditation of Conformity Assessment Bodies',
        ),
        body: copy(
          'بناء أنظمة فنية وإدارية قابلة للتقييم لجهات المنح والتفتيش والمختبرات (ISO/IEC 17025 و 17020 و 17065 و 17024 وغيرها)، ودعم إغلاق ملاحظات جهة الاعتماد.',
          'Building assessable technical and administrative systems for certification, inspection and testing bodies, laboratories and product and personnel certification bodies: ISO/IEC 17029, ISO 17034, ISO 15189, 17043, 17024, 17065, 17025, 17020, ISO/IEC 17021-1 and GSO 2055-2. The service covers defining activities and scope, impartiality, competence matrices, schemes and technical methods, documents and records, internal audit, pre-assessment, and support in closing accreditation body findings.',
        ),
      },
      {
        title: draft(
          'التميز المؤسسي والاستراتيجية والمخاطر',
          'Institutional Excellence, Strategy & Risk',
        ),
        body: draft(
          'خدمات التميز المؤسسي والاستراتيجية وإدارة المخاطر والاستدامة.',
          'Institutional excellence, strategy, risk management and sustainability services.',
        ),
      },
    ],
  },
  trainingEducation: {
    cta: {
      title: draft(
        'عايز تطوّر فريقك؟',
        'Ready to develop your team?',
      ),
    },
    services: [
      {
        title: draft(
          'البرامج المالية والمحاسبية',
          'Financial & Accounting Programs',
        ),
        body: copy(
          'برامج متخصصة ورحلات تعليمية تفاعلية في المجالات المالية والمحاسبية.',
          'Specialized programs and interactive learning journeys in finance and accounting',
        ),
      },
      {
        title: copy(
          'تدريب كبير المراجعين',
          'Lead Auditor Training',
        ),
        body: copy(
          'دورات LEAD AUDITOR لجميع المخططات ضمن النطاق النشط للشريكين المعتمدين CQI و IRCA في المملكة المتحدة.',
          'We offer LEAD AUDITOR courses for all schemes within the active scope of our accredited partners CQI and IRCA in the United Kingdom.',
        ),
      },
    ],
  },
  technologyAi: {
    cta: {
      title: draft(
        'محتاج حل تقني؟',
        'Need a technology solution?',
      ),
    },
    services: [
      {
        title: copy(
          'التكنولوجيا والدعم الرقمي',
          'Technology & Digital Support',
        ),
        body: copy(
          'حلول تكنولوجيا المعلومات والأنظمة الذكية والدعم التقني.',
          'Information technology and smart systems solutions, management of government e-platforms in Saudi Arabia, and preparation of presentations and content design leveraging AI technologies.',
        ),
      },
      {
        title: draft(
          'إدارة المنصات الحكومية الإلكترونية',
          'Government E-Platform Management',
        ),
        body: draft(
          'إدارة المنصات الإلكترونية الحكومية في السعودية.',
          'Managing government e-platforms in Saudi Arabia.',
        ),
      },
      {
        title: draft(
          'المحتوى والعروض بالذكاء الاصطناعي',
          'AI-Powered Content & Presentations',
        ),
        body: draft(
          'إعداد العروض التقديمية وتصميم المحتوى بالاستفادة من تقنيات الذكاء الاصطناعي.',
          'Preparing presentations and designing content leveraging AI technologies.',
        ),
      },
      {
        title: copy(
          'iCASCO والتحول الرقمي',
          'iCASCO & Digital Transformation',
        ),
        body: copy(
          'رقمنة دورة المنح والتفتيش والمطابقة من الطلب حتى إصدار الشهادة والمراقبة والتجديد.',
          'Digitizing the certification, inspection and conformity cycle: application, scope review, quotation and agreement, audit or inspection planning, competence, nonconformities and CAPA, technical review, decision, issuance of the certificate or CoC, surveillance and renewal, complaints, finance and reporting.',
        ),
      },
    ],
  },
  operationalSupport: {
    cta: {
      title: draft(
        'محتاج دعم تشغيلي؟',
        'Need operational support?',
      ),
    },
    services: [
      {
        title: copy(
          'المشتريات وسلاسل الإمداد',
          'Procurement & Supply Chains',
        ),
        body: copy(
          'استشارات المشتريات ورفع كفاءة سلاسل الإمداد.',
          'Procurement consulting and improving supply chain efficiency.',
        ),
      },
      {
        title: copy(
          'توفير الكفاءات',
          'Talent Provision',
        ),
        body: copy(
          'توفير كوادر بشرية مؤهلة وخبرات متخصصة وفق متطلبات المنشأة ونموذج تشغيل تنافسي.',
          'Providing qualified human resources with specialized expertise according to the entity’s requirements and a competitive operating model.',
        ),
      },
    ],
  },
  premiumResidency: {
    cta: {
      title: draft(
        'عايز تحصل على الإقامة المميزة؟',
        'Interested in Saudi Premium Residency?',
      ),
    },
    services: [],
    extra: [
      {
        kind: 'tracks',
        title: copy(
          'مسارات الإقامة المميزة',
          'Premium Residency Tracks',
        ),
        intro: draft(
          'ستة مسارات، ونساعدك تختار الأنسب لوضعك الاستثماري.',
          'Six tracks — we help you choose the one that best fits your investment profile.',
        ),
        items: [
          {
            tag: draft(
              'استثمار',
              'Investment',
            ),
            title: copy(
              'إقامة مستثمر الأعمال',
              'Business Investor',
            ),
            body: copy(
              'استثمار لا يقل عن 7 ملايين ريال برخصة استثمار سارية، مع توفير 10 وظائف خلال سنتين.',
              'Investment of at least SAR 7 million under a valid investment licence, creating 10 jobs within two years',
            ),
          },
          {
            tag: draft(
              'تملّك',
              'Ownership',
            ),
            title: copy(
              'إقامة مالك العقار',
              'Real Estate Owner',
            ),
            body: copy(
              'تملّك عقار سكني مطوّر وغير مرهون بقيمة لا تقل عن 4 ملايين ريال.',
              'Ownership of a developed, mortgage-free residential property worth at least SAR 4 million',
            ),
          },
          {
            tag: draft(
              'ريادة',
              'Entrepreneurship',
            ),
            title: copy(
              'إقامة رائد الأعمال',
              'Entrepreneur',
            ),
            body: copy(
              'لمؤسسي الشركات الناشئة والمبتكرين، وفق اشتراطات الاستثمار والملكية المعتمدة.',
              'For start-up founders and innovators, subject to the approved investment and ownership criteria',
            ),
          },
          {
            tag: draft(
              'رسوم سنوية',
              'Limited duration',
            ),
            title: copy(
              'الإقامة محددة المدة',
              'Limited Duration',
            ),
            body: copy(
              'برسوم سنوية قدرها 100 ألف ريال، قابلة للتجديد.',
              'Annual fee of SAR 100,000, renewable',
            ),
          },
          {
            tag: draft(
              'رسم لمرة واحدة',
              'Unlimited duration',
            ),
            title: copy(
              'الإقامة غير محددة المدة',
              'Unlimited Duration',
            ),
            body: copy(
              'إقامة دائمة برسم لمرة واحدة قدره 800 ألف ريال.',
              'Permanent residency for a one-time fee of SAR 800,000',
            ),
          },
          {
            tag: draft(
              'كفاءات',
              'Talent',
            ),
            title: copy(
              'الكفاءات الاستثنائية والموهوبون',
              'Special Talent & Gifted',
            ),
            body: copy(
              'للكفاءات في القطاعات الصحية والعلمية والقيادية، والموهوبين في الثقافة والرياضة.',
              'For exceptional professionals in healthcare, science and leadership, and gifted individuals in culture and sport',
            ),
          },
        ],
      },
      {
        kind: 'steps',
        title: copy(
          'دورنا في ملف إقامتك',
          'Our Role in Your Residency File',
        ),
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
      {
        kind: 'benefits',
        title: copy(
          'أبرز المزايا',
          'Key Benefits',
        ),
        items: [
          copy(
            'الإقامة مع الأسرة واستضافة الأقارب',
            'Residence with family & hosting relatives',
          ),
          copy(
            'ممارسة الأعمال التجارية دون كفيل',
            'Doing business without a sponsor',
          ),
          copy(
            'تملّك العقارات السكنية والتجارية',
            'Owning residential & commercial property',
          ),
          copy(
            'حرية الخروج والعودة إلى المملكة',
            'Free exit and re-entry',
          ),
          copy(
            'استقدام العمالة المنزلية',
            'Recruiting domestic workers',
          ),
          copy(
            'الإعفاء من المقابل المالي للمرافقين',
            'Exemption from dependants’ fees',
          ),
        ],
      },
      {
        kind: 'disclaimer',
        text: copy(
          '* الاشتراطات والرسوم وفق آخر ما أعلنه المركز السعودي للإقامة المميزة، وقابلة للتحديث.',
          '* Requirements and fees as last announced by the Saudi Premium Residency Center and subject to change.',
        ),
      },
    ],
  },
} as const satisfies Record<SectorId, SectorContent>

export function getSectorContent(id: SectorId): SectorContent {
  return SECTOR_CONTENT[id]
}
