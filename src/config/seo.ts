import { PRIVACY_TITLE } from '@/config/legal'
import type { PageName } from '@/config/routes'
import type { SectorSlug } from '@/data/sectorIndex'
import { copy, type Localized } from '@/lib/i18n/localized'
import type { TranslationKey } from '@/lib/i18n/translations'

/*
 * What each page says about itself in search results and link previews:
 * its name (the title becomes «{name} | فورك العربية» / "{name} | FORK
 * ARABIA") and its description, 140 to 160 characters (the build fails
 * outside that range; scripts/prerender.mjs). src/lib/seo/pageHead.ts
 * turns this into the head tags. New wording is `proposed`, listed in
 * docs/copy-review.md.
 */

/** A page's name: a label from the translation table, or copy of its own. */
export type PageLabel = TranslationKey | Localized

/** The home page's title: the company's name, then this tagline (storyboard). */
export const BRAND_TAGLINE = copy('خدمات مهنية متكاملة', 'Integrated Professional Services')

/** The 404's name, shared with its heading (NotFoundPage). */
export const NOT_FOUND_TITLE = copy('الصفحة غير موجودة', 'Page not found')

/** The share image (scripts/brand-assets.mjs) and what it shows, for og:image:alt. */
export const SHARE_IMAGE = {
  path: '/og/default.png',
  width: 1200,
  height: 630,
  alt: copy(
    'شعار فورك العربية المحدودة وعبارة: خدمات مهنية متكاملة',
    'The FORK ARABIA LIMITED logo and the line: Integrated Professional Services',
  ),
}

/*
 * A sector's description is its own summary (storyboard, src/data/
 * sectorIndex.ts) followed by one of these sentences, which brings it into
 * range.
 */
export const SECTOR_DESCRIPTION_ENDINGS: Record<SectorSlug, Localized> = {
  'legal-corporate': copy(
    'خدمات قانونية متكاملة للشركات والأفراد من فورك العربية في السعودية ومصر.',
    'Legal support for companies and individuals from FORK ARABIA.',
  ),
  'business-setup': copy(
    'نؤسس شركتك ونتابع تراخيصها ومتطلباتها الحكومية في السعودية ومصر والإمارات وعُمان.',
    'We set up your company in Saudi Arabia, Egypt, the UAE and Oman.',
  ),
  'financial-accounting': copy(
    'حلول مالية ومحاسبية متكاملة من فورك العربية للشركات في السعودية ومصر والخليج.',
    'Integrated financial and accounting solutions for companies in Saudi Arabia and Egypt.',
  ),
  'governance-organization': copy(
    'نبني لشركتك حوكمة واضحة وهيكلًا تنظيميًا يدعم القرار والنمو المستدام، مع فورك العربية.',
    'Clear governance and structures that support decisions and growth.',
  ),
  'quality-excellence': copy(
    'نرافق مؤسستك من التخطيط والاعتماد إلى التميز المؤسسي والنمو المستدام، مع فورك العربية.',
    'We guide your organization from planning and certification to lasting excellence.',
  ),
  'training-education': copy(
    'برامج عملية من فورك العربية تبني مهارات فرقكم وتواكب احتياجات سوق العمل.',
    'Practical programs from FORK ARABIA that build your team’s skills.',
  ),
  'technology-ai': copy(
    'حلول تقنية حديثة من فورك العربية تساعد شركتك على العمل بكفاءة أعلى وتكلفة أقل.',
    'Technology solutions from FORK ARABIA that help your business work faster and more efficiently.',
  ),
  'operational-support': copy(
    'نتولى عنك المهام التشغيلية لتتفرغ لإدارة أعمالك، مع فورك العربية في السعودية ومصر والإمارات.',
    'We take on the operational work so you can focus on growing and running your business.',
  ),
  'premium-residency': copy(
    'نرافقك في كل خطوة من تقديم الطلب حتى الإصدار، مع فورك العربية في الرياض.',
    'We guide you through every step, from application to issue, from Riyadh.',
  ),
}

/** Every other page but home, whose description is COMPANY_DESCRIPTION (src/data/siteCopy.ts). */
export const PAGE_SEO: Record<Exclude<PageName, 'home' | 'sector'>, { name: PageLabel; description: Localized }> = {
  about: {
    name: 'nav.about',
    description: copy(
      'تعرّف على فورك العربية: شركة خدمات مهنية تأسست عام 2016، تقدم حلولًا قانونية ومالية وإدارية متكاملة للشركات في السعودية ومصر والإمارات وعُمان.',
      'Meet FORK ARABIA: a professional services company founded in 2016, offering integrated legal, financial and administrative solutions across four countries.',
    ),
  },
  services: {
    name: 'nav.services',
    description: copy(
      'تسعة قطاعات تحت سقف واحد: قانونية، تأسيس، مالية، حوكمة، جودة، تدريب، تقنية، دعم تشغيلي، وإقامة مميزة. اختر القطاع واطلب الخدمة التي تحتاجها.',
      'Nine sectors under one roof: legal, business setup, finance, governance, quality, training, technology, operations and premium residency. Find what you need.',
    ),
  },
  presence: {
    name: 'nav.presence',
    description: copy(
      'مقرنا الرئيسي في الرياض وفرعنا في طنطا، ونقدم خدماتنا في 8 دول. تعرّف على مكاتبنا وعناوينها وأرقام هواتفها وطرق التواصل معها، والدول الثماني التي نخدمها.',
      'Our head office is in Riyadh, with a branch in Tanta and services in 8 countries. Find our offices, their addresses and contacts, and the countries we serve.',
    ),
  },
  bookConsultation: {
    name: 'nav.bookConsultation',
    description: copy(
      'احجز استشارة مجانية مع فريق فورك العربية: اختر القطاع والموعد المناسب، وسيتواصل معك فريقنا خلال يوم عمل واحد لتأكيد موعد الاستشارة وتفاصيلها.',
      'Book a free consultation with FORK ARABIA: choose your sector and a convenient time, and our team will contact you within one working day to confirm it.',
    ),
  },
  requestQuote: {
    name: 'nav.requestQuote',
    description: copy(
      'اطلب عرض سعر من فورك العربية: اختر الخدمة التي تحتاجها واكتب تفاصيل طلبك، وسنرسل إليك عرض السعر المناسب على بريدك الإلكتروني في أقرب وقت ممكن.',
      'Request a quote from FORK ARABIA: choose the service you need and describe your request, and we will email you a price quote as soon as possible.',
    ),
  },
  contact: {
    name: 'nav.contact',
    description: copy(
      'تواصل مع فورك العربية: فريقنا في الرياض وطنطا جاهز للرد على استفساراتك عبر الهاتف أو البريد الإلكتروني أو واتساب، أو أرسل لنا رسالتك من هنا.',
      'Contact FORK ARABIA: our team in Riyadh and Tanta is ready to answer your questions by phone, email or WhatsApp, or you can send us a message here.',
    ),
  },
  privacy: {
    name: PRIVACY_TITLE,
    description: copy(
      'سياسة الخصوصية لموقع فورك العربية: ما البيانات التي نجمعها عبر النماذج، ولماذا نجمعها، وكيف نرسلها ونحفظها، وحقوقك في الاطلاع عليها وتصحيحها وحذفها.',
      'The FORK ARABIA privacy policy: what our forms collect, why we collect it, how it is sent and stored, and your rights to access, correct and delete your data.',
    ),
  },
}
