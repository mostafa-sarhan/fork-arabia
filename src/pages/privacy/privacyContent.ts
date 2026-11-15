import { proposed, type Localized } from '@/lib/i18n/localized'

/*
 * The privacy policy, section by section. Every word is `proposed` and
 * the whole page is pending client and legal approval (listed apart in
 * docs/copy-review.md). Plain and factual: what the site actually does.
 * The address in the text is linked where it appears (PrivacyPage).
 */
export type PrivacySection = {
  /** The section's anchor, for the table of contents (#who). */
  id: string
  title: Localized
  /** Paragraphs, then an optional list, then optional closing paragraphs. */
  paragraphs: readonly Localized[]
  items?: readonly Localized[]
  closing?: readonly Localized[]
}

/** The contact address the policy names; linked wherever it appears. */
export const PRIVACY_EMAIL = 'info@forkarabia.sa'

export const PRIVACY_COPY = {
  crumb: proposed('سياسة الخصوصية', 'Privacy Policy'),
  updated: proposed('آخر تحديث: {date}', 'Last updated: {date}'),
  contents: proposed('محتويات الصفحة', 'On this page'),
}

export const PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    id: 'who',
    title: proposed('من نحن', 'Who we are'),
    paragraphs: [
      proposed(
        'هذا الموقع تابع لشركة فورك العربية المحدودة (FORK ARABIA LIMITED)، شركة خدمات مهنية متكاملة. توضح هذه السياسة كيف نتعامل مع البيانات التي تشاركها معنا عبر الموقع.',
        'This website belongs to FORK ARABIA LIMITED, an integrated professional services company. This policy explains how we handle the information you share with us through the website.',
      ),
      proposed(
        'لأي سؤال عن خصوصيتك، راسلنا على info@forkarabia.sa.',
        'For any question about your privacy, email us at info@forkarabia.sa.',
      ),
    ],
  },
  {
    id: 'collect',
    title: proposed('البيانات التي نجمعها', 'What we collect'),
    paragraphs: [proposed('نجمع نوعين فقط من البيانات:', 'We collect two kinds of information only:')],
    items: [
      proposed(
        'ما تكتبه بنفسك في نماذج حجز الاستشارة وطلب عرض السعر والتواصل: الاسم، والبريد الإلكتروني، ورقم الهاتف، والدولة، وتفاصيل طلبك.',
        'What you type yourself into the booking, quote and contact forms: your name, email, phone number, country and the details of your request.',
      ),
      proposed(
        'إحصاءات زيارة مجهولة الهوية لا تكشف هويتك، دون استخدام ملفات تعريف الارتباط (الكوكيز).',
        'Anonymous visit statistics that do not identify you, with no cookies.',
      ),
    ],
  },
  {
    id: 'why',
    title: proposed('لماذا نستخدمها', 'Why we use it'),
    paragraphs: [
      proposed(
        'نستخدم بيانات النماذج للرد على طلباتك واستفساراتك، وتحديد مواعيد الاستشارات، وإرسال عروض الأسعار. ونستخدم إحصاءات الزيارة لفهم كيفية استخدام الموقع وتحسينه.',
        'We use what you send in the forms to reply to your requests and questions, schedule consultations and send quotes. We use the visit statistics to understand how the site is used and to improve it.',
      ),
    ],
  },
  {
    id: 'delivery',
    title: proposed('كيف تُرسل بياناتك وأين تُحفظ', 'How it is sent and stored'),
    paragraphs: [
      proposed(
        'عند إرسال أي نموذج، تصل بياناتك إلى بريدنا الإلكتروني عبر خدمة نماذج خارجية (Web3Forms). ويُستضاف الموقع على منصة Vercel.',
        'When you send a form, your information reaches our inbox by email through a form service (Web3Forms). The website is hosted on Vercel.',
      ),
    ],
  },
  {
    id: 'sharing',
    title: proposed('مشاركة البيانات', 'Sharing'),
    paragraphs: [
      proposed(
        'لا نبيع بياناتك، ولا نشاركها مع أي جهة لأغراض تسويقية.',
        'We do not sell your information, and we do not share it with anyone for marketing.',
      ),
    ],
  },
  {
    id: 'retention',
    title: proposed('مدة الاحتفاظ', 'How long we keep it'),
    paragraphs: [
      proposed(
        'نحتفظ ببياناتك طوال المدة اللازمة للتعامل مع طلبك فقط.',
        'We keep your information only as long as we need it to handle your request.',
      ),
    ],
  },
  {
    id: 'rights',
    title: proposed('حقوقك', 'Your rights'),
    paragraphs: [
      proposed(
        'وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية، يحق لك:',
        'Under the Saudi Personal Data Protection Law (PDPL), you have the right to:',
      ),
    ],
    items: [
      proposed('الاطلاع على بياناتك التي لدينا.', 'Access the information we hold about you.'),
      proposed('تصحيح أي بيانات غير دقيقة.', 'Correct any information that is wrong.'),
      proposed('طلب حذف بياناتك.', 'Ask us to delete your information.'),
    ],
    closing: [
      proposed(
        'لأي من هذه الطلبات، راسلنا على info@forkarabia.sa وسنرد عليك في أقرب وقت.',
        'For any of these requests, email us at info@forkarabia.sa and we will reply as soon as we can.',
      ),
    ],
  },
  {
    id: 'updates',
    title: proposed('تحديثات هذه السياسة', 'Updates to this policy'),
    paragraphs: [
      proposed(
        'قد نحدّث هذه السياسة من وقت لآخر، ويظهر تاريخ آخر تحديث أعلى الصفحة.',
        'We may update this policy from time to time; the date of the last update is shown at the top of the page.',
      ),
    ],
  },
]
