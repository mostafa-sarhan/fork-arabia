# Copy awaiting approval

Every English string below was written for this website because the
company profile has no equivalent. The Arabic beside it is transcribed
verbatim from the storyboard and is **not** up for review here — only the
English is.

Each is written with `draft('…', '…')` in the data. Approving one means
changing that call to `copy('…', '…')` in the file named; editing one means
changing the English string in place. Re-run `node scripts/copy-review.mjs`
afterwards to regenerate this list.

282 strings await approval.

## Changed by client request

These differ from `_source/storyboard-ar.md` on purpose: the client asked
for the change. They are approved copy, not a transcription mismatch.

| Where | Storyboard | Now | Notes |
| --- | --- | --- | --- |
| Home hero headline (`HeroSection.tsx`) | قانونية · مالية · إدارية · تقنية | قانونية · مالية · إدارية · جودة | Changed by client request. English: Legal · Financial · Administrative · Quality |

## Privacy Policy — pending client/legal approval

> **The whole Privacy Policy page (`/privacy`, `/en/privacy`) and the
> forms' consent line are pending client and legal approval.** Every word
> was written here, in both languages, from what the site actually does;
> none of it has been reviewed by the client or a lawyer. The policy's
> date is `PRIVACY_UPDATED` in `src/config/legal.ts`.

| Proposed Arabic | Proposed English | File |
| --- | --- | --- |
| سياسة الخصوصية | Privacy Policy | `legal.ts` |
| سياسة الخصوصية | Privacy Policy | `privacyContent.ts` |
| آخر تحديث: {date} | Last updated: {date} | `privacyContent.ts` |
| محتويات الصفحة | On this page | `privacyContent.ts` |
| من نحن | Who we are | `privacyContent.ts` |
| هذا الموقع تابع لشركة فورك العربية المحدودة (FORK ARABIA LIMITED)، شركة خدمات مهنية متكاملة. توضح هذه السياسة كيف نتعامل مع البيانات التي تشاركها معنا عبر الموقع. | This website belongs to FORK ARABIA LIMITED, an integrated professional services company. This policy explains how we handle the information you share with us through the website. | `privacyContent.ts` |
| لأي سؤال عن خصوصيتك، راسلنا على info@forkarabia.sa. | For any question about your privacy, email us at info@forkarabia.sa. | `privacyContent.ts` |
| البيانات التي نجمعها | What we collect | `privacyContent.ts` |
| نجمع نوعين فقط من البيانات: | We collect two kinds of information only: | `privacyContent.ts` |
| ما تكتبه بنفسك في نماذج حجز الاستشارة وطلب عرض السعر والتواصل: الاسم، والبريد الإلكتروني، ورقم الهاتف، والدولة، وتفاصيل طلبك. | What you type yourself into the booking, quote and contact forms: your name, email, phone number, country and the details of your request. | `privacyContent.ts` |
| إحصاءات زيارة مجهولة الهوية لا تكشف هويتك، دون استخدام ملفات تعريف الارتباط (الكوكيز). | Anonymous visit statistics that do not identify you, with no cookies. | `privacyContent.ts` |
| لماذا نستخدمها | Why we use it | `privacyContent.ts` |
| نستخدم بيانات النماذج للرد على طلباتك واستفساراتك، وتحديد مواعيد الاستشارات، وإرسال عروض الأسعار. ونستخدم إحصاءات الزيارة لفهم كيفية استخدام الموقع وتحسينه. | We use what you send in the forms to reply to your requests and questions, schedule consultations and send quotes. We use the visit statistics to understand how the site is used and to improve it. | `privacyContent.ts` |
| كيف تُرسل بياناتك وأين تُحفظ | How it is sent and stored | `privacyContent.ts` |
| عند إرسال أي نموذج، تصل بياناتك إلى بريدنا الإلكتروني عبر خدمة نماذج خارجية (Web3Forms). ويُستضاف الموقع على منصة Vercel، التي توفر أيضًا إحصاءات الزيارة المجهولة (Vercel Web Analytics وSpeed Insights) دون ملفات تعريف الارتباط. | When you send a form, your information reaches our inbox by email through a form service (Web3Forms). The website is hosted on Vercel, which also provides the anonymous visit statistics (Vercel Web Analytics and Speed Insights), with no cookies. | `privacyContent.ts` |
| مشاركة البيانات | Sharing | `privacyContent.ts` |
| لا نبيع بياناتك، ولا نشاركها مع أي جهة لأغراض تسويقية. | We do not sell your information, and we do not share it with anyone for marketing. | `privacyContent.ts` |
| مدة الاحتفاظ | How long we keep it | `privacyContent.ts` |
| نحتفظ ببياناتك طوال المدة اللازمة للتعامل مع طلبك فقط. | We keep your information only as long as we need it to handle your request. | `privacyContent.ts` |
| حقوقك | Your rights | `privacyContent.ts` |
| وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية، يحق لك: | Under the Saudi Personal Data Protection Law (PDPL), you have the right to: | `privacyContent.ts` |
| الاطلاع على بياناتك التي لدينا. | Access the information we hold about you. | `privacyContent.ts` |
| تصحيح أي بيانات غير دقيقة. | Correct any information that is wrong. | `privacyContent.ts` |
| طلب حذف بياناتك. | Ask us to delete your information. | `privacyContent.ts` |
| لأي من هذه الطلبات، راسلنا على info@forkarabia.sa وسنرد عليك في أقرب وقت. | For any of these requests, email us at info@forkarabia.sa and we will reply as soon as we can. | `privacyContent.ts` |
| تحديثات هذه السياسة | Updates to this policy | `privacyContent.ts` |
| قد نحدّث هذه السياسة من وقت لآخر، ويظهر تاريخ آخر تحديث أعلى الصفحة. | We may update this policy from time to time; the date of the last update is shown at the top of the page. | `privacyContent.ts` |
| بإرسال النموذج، أنت توافق على معالجة بياناتك وفق {privacy}. | By sending this form, you agree to the processing of your data under our {privacy}. | `FormSubmit.tsx` |

## Arabic and English both proposed

The storyboard has no Arabic for these either, so both languages were
written here, with `proposed('…', '…')`. Approving one means changing it to
`copy('…', '…')`.

| Proposed Arabic | Proposed English | File |
| --- | --- | --- |
| فورك العربية المحدودة شركة خدمات مهنية متكاملة: قانونية، مالية، إدارية، وتقنية. نرافق الشركات والمستثمرين في السعودية ومصر والإمارات وعُمان منذ 2016. | FORK ARABIA is an integrated professional services firm — legal, financial, administrative and technology — in Saudi Arabia, Egypt, the UAE and Oman. | `siteCopy.ts` |
| يوم عمل | 1 business day | `consultation.ts` |
| للرد | to reply | `consultation.ts` |
| خريطة مقر الرياض | Map of the Riyadh head office | `offices.ts` |
| خريطة فرع طنطا | Map of the Tanta branch | `offices.ts` |
| تواصل سريع | Quick contact | `whatsapp.ts` |
| مرحبًا، أود الاستفسار عن خدمات فورك العربية. | Hello, I’d like to ask about FORK ARABIA’s services. | `whatsapp.ts` |
| مرحبًا، أود الاستفسار عن خدماتكم. | Hello, I’d like to ask about your services. | `whatsapp.ts` |
| مرحبًا، أود الاستفسار عن خدمات {sector}. | Hello, I’d like to ask about {sector}. | `whatsapp.ts` |
| مرحبًا، أود معرفة المزيد عن مكاتبكم وفروعكم. | Hello, I’d like to know more about your offices and branches. | `whatsapp.ts` |
| فريق فورك العربية في اجتماع عمل بمكتب الرياض | The FORK ARABIA team in a business meeting at the Riyadh office | `HeroSection.tsx` |
| آفاق | Afaq | `PartnersSection.tsx` |
| الخبراء المحترفون للاستشارات المالية | Professional Experts Financial Consulting | `PartnersSection.tsx` |
| سنة التأسيس | Year founded | `AboutPage.tsx` |
| دول نقدم فيها خدماتنا | Countries we serve | `AboutPage.tsx` |
| قطاعات خدمات | Service sectors | `AboutPage.tsx` |
| فريق فورك العربية في اجتماع عمل بمكتب الرياض | The FORK ARABIA team in a business meeting at the Riyadh office | `IntroSection.tsx` |
| خدمة | services | `ServicesPage.tsx` |
| جميع القطاعات | All sectors | `ServicesPage.tsx` |
| اختر من القائمة | Select an option | `formCopy.ts` |
| اكتب للبحث | Type to search | `formCopy.ts` |
| لا توجد نتائج | No results | `formCopy.ts` |
| تم إرسال طلبك بنجاح | Your request has been sent | `formCopy.ts` |
| يرجى استكمال الحقول المطلوبة | Please complete the required fields. | `formCopy.ts` |
| تعذّر إرسال الطلب. تحقق من اتصالك بالإنترنت وحاول مرة أخرى. | We couldn’t send your request. Check your connection and try again. | `formCopy.ts` |
| إعادة المحاولة | Try again | `formCopy.ts` |
| العودة إلى الرئيسية | Back to home | `formCopy.ts` |
| اختر التاريخ | Choose a date | `DatePicker.tsx` |
| الشهر السابق | Previous month | `DatePicker.tsx` |
| الشهر التالي | Next month | `DatePicker.tsx` |
| إغلاق | Close | `SuccessDialog.tsx` |
| تصفح خدماتنا | Browse our services | `SuccessDialog.tsx` |
| بعد إرسال طلبك | After you send | `NextSteps.tsx` |
| هذا الحقل مطلوب. | This field is required. | `validation.ts` |
| اكتب بريدًا إلكترونيًا صحيحًا، مثل name@example.com. | Enter a valid email address, like name@example.com. | `validation.ts` |
| اكتب رقم الهاتف بالأرقام فقط (7 أرقام على الأقل)، ويمكن أن يبدأ بعلامة +. | Use digits only (at least 7); the number may start with +. | `validation.ts` |
| اكتب {n} أحرف على الأقل. | Write at least {n} characters. | `validation.ts` |
| اكتب {n} حرفًا على الأقل. | Write at least {n} characters. | `validation.ts` |
| اختر اليوم أو تاريخًا بعده. | Choose today or a later date. | `validation.ts` |
| اختر الدولة أولًا | Choose the country first | `validation.ts` |
| يوم الجمعة إجازة؛ اختر يومًا من السبت إلى الخميس. | Friday is a day off; choose a day from Saturday to Thursday. | `validation.ts` |
| نستلم طلبك | We receive your request | `BookConsultationPage.tsx` |
| نتواصل معك خلال يوم عمل | We contact you within one business day | `BookConsultationPage.tsx` |
| نؤكد موعد الاستشارة | We confirm your consultation | `BookConsultationPage.tsx` |
| نستلم طلبك | We receive your request | `RequestQuotePage.tsx` |
| ندرس تفاصيل طلبك | We study the details of your request | `RequestQuotePage.tsx` |
| نرسل لك عرض السعر على بريدك الإلكتروني | We email you the quote | `RequestQuotePage.tsx` |
| نستلم رسالتك | We receive your message | `ContactPage.tsx` |
| نراجعها | We review it | `ContactPage.tsx` |
| نرد عليك خلال يوم عمل | We reply within one business day | `ContactPage.tsx` |
| تم إرسال رسالتك بنجاح | Your message has been sent | `ContactForm.tsx` |
| شكرًا لتواصلك معنا، سيرد عليك فريقنا خلال يوم عمل. | Thank you for getting in touch. Our team will reply within one business day. | `ContactForm.tsx` |
| بياناتك | Your details | `QuoteForm.tsx` |
| خدمة أخرى | Another service | `QuoteForm.tsx` |
| 20 حرفًا على الأقل | At least 20 characters | `QuoteForm.tsx` |
| الخدمة | Service | `QuoteForm.tsx` |
| القطاع | Sector | `QuoteForm.tsx` |
| بياناتك | Your details | `BookingForm.tsx` |
| تفاصيل الاستشارة | Consultation details | `BookingForm.tsx` |
| المجال | Area | `BookingForm.tsx` |
| الموعد | Appointment | `BookingForm.tsx` |
| الطريقة | Format | `BookingForm.tsx` |
| صباحًا | am | `BookingForm.tsx` |
| مساءً | pm | `BookingForm.tsx` |
| تواجدنا | Our Presence | `OfficesSection.tsx` |
| مكاتبنا | Our Offices | `OfficesSection.tsx` |
| السبت للخميس، 10 صباحًا إلى 6 مساءً | Saturday to Thursday, 10 am to 6 pm | `OfficesSection.tsx` |
| افتح في خرائط Google | Open in Google Maps | `OfficesSection.tsx` |
| مكتب | Office | `CountriesSection.tsx` |
| خدمة واحدة | 1 service | `sectorCounts.ts` |
| خدمات | services | `sectorCounts.ts` |
| دول | countries | `sectorCounts.ts` |
| ربما تم نقل الصفحة أو أن الرابط غير صحيح. | The page may have moved, or the link may be wrong. | `NotFoundPage.tsx` |
| العودة إلى الرئيسية | Back to home | `NotFoundPage.tsx` |
| تصفح خدماتنا | Browse our services | `NotFoundPage.tsx` |
| روابط سريعة | Quick links | `NotFoundPage.tsx` |
| الصفحة غير موجودة | Page not found | `seo.ts` |
| شعار فورك العربية المحدودة وعبارة: خدمات مهنية متكاملة | The FORK ARABIA LIMITED logo and the line: Integrated Professional Services | `seo.ts` |
| خدمات قانونية متكاملة للشركات والأفراد من فورك العربية في السعودية ومصر. | Legal support for companies and individuals from FORK ARABIA. | `seo.ts` |
| نؤسس شركتك ونتابع تراخيصها ومتطلباتها الحكومية في السعودية ومصر والإمارات وعُمان. | We set up your company in Saudi Arabia, Egypt, the UAE and Oman. | `seo.ts` |
| حلول مالية ومحاسبية متكاملة من فورك العربية للشركات في السعودية ومصر والخليج. | Integrated financial and accounting solutions for companies in Saudi Arabia and Egypt. | `seo.ts` |
| نبني لشركتك حوكمة واضحة وهيكلًا تنظيميًا يدعم القرار والنمو المستدام، مع فورك العربية. | Clear governance and structures that support decisions and growth. | `seo.ts` |
| نرافق مؤسستك من التخطيط والاعتماد إلى التميز المؤسسي والنمو المستدام، مع فورك العربية. | We guide your organization from planning and certification to lasting excellence. | `seo.ts` |
| برامج عملية من فورك العربية تبني مهارات فرقكم وتواكب احتياجات سوق العمل. | Practical programs from FORK ARABIA that build your team’s skills. | `seo.ts` |
| حلول تقنية حديثة من فورك العربية تساعد شركتك على العمل بكفاءة أعلى وتكلفة أقل. | Technology solutions from FORK ARABIA that help your business work faster and more efficiently. | `seo.ts` |
| نتولى عنك المهام التشغيلية لتتفرغ لإدارة أعمالك، مع فورك العربية في السعودية ومصر والإمارات. | We take on the operational work so you can focus on growing and running your business. | `seo.ts` |
| نرافقك في كل خطوة من تقديم الطلب حتى الإصدار، مع فورك العربية في الرياض. | We guide you through every step, from application to issue, from Riyadh. | `seo.ts` |
| تعرّف على فورك العربية: شركة خدمات مهنية تأسست عام 2016، تقدم حلولًا قانونية ومالية وإدارية متكاملة للشركات في السعودية ومصر والإمارات وعُمان. | Meet FORK ARABIA: a professional services company founded in 2016, offering integrated legal, financial and administrative solutions across four countries. | `seo.ts` |
| تسعة قطاعات تحت سقف واحد: قانونية، تأسيس، مالية، حوكمة، جودة، تدريب، تقنية، دعم تشغيلي، وإقامة مميزة. اختر القطاع واطلب الخدمة التي تحتاجها. | Nine sectors under one roof: legal, business setup, finance, governance, quality, training, technology, operations and premium residency. Find what you need. | `seo.ts` |
| مقرنا الرئيسي في الرياض وفرعنا في طنطا، ونقدم خدماتنا في 8 دول. تعرّف على مكاتبنا وعناوينها وأرقام هواتفها وطرق التواصل معها، والدول الثماني التي نخدمها. | Our head office is in Riyadh, with a branch in Tanta and services in 8 countries. Find our offices, their addresses and contacts, and the countries we serve. | `seo.ts` |
| احجز استشارة مجانية مع فريق فورك العربية: اختر القطاع والموعد المناسب، وسيتواصل معك فريقنا خلال يوم عمل واحد لتأكيد موعد الاستشارة وتفاصيلها. | Book a free consultation with FORK ARABIA: choose your sector and a convenient time, and our team will contact you within one working day to confirm it. | `seo.ts` |
| اطلب عرض سعر من فورك العربية: اختر الخدمة التي تحتاجها واكتب تفاصيل طلبك، وسنرسل إليك عرض السعر المناسب على بريدك الإلكتروني في أقرب وقت ممكن. | Request a quote from FORK ARABIA: choose the service you need and describe your request, and we will email you a price quote as soon as possible. | `seo.ts` |
| تواصل مع فورك العربية: فريقنا في الرياض وطنطا جاهز للرد على استفساراتك عبر الهاتف أو البريد الإلكتروني أو واتساب، أو أرسل لنا رسالتك من هنا. | Contact FORK ARABIA: our team in Riyadh and Tanta is ready to answer your questions by phone, email or WhatsApp, or you can send us a message here. | `seo.ts` |
| سياسة الخصوصية لموقع فورك العربية: ما البيانات التي نجمعها عبر النماذج، ولماذا نجمعها، وكيف نرسلها ونحفظها، وحقوقك في الاطلاع عليها وتصحيحها وحذفها. | The FORK ARABIA privacy policy: what our forms collect, why we collect it, how it is sent and stored, and your rights to access, correct and delete your data. | `seo.ts` |
| القطاع | Sector | `SectorHero.tsx` |
| الكل | All | `SectorServices.tsx` |
| تصفية الخدمات حسب الدولة | Filter services by country | `SectorServices.tsx` |

## Interface labels

Words the site uses that are in neither the storyboard nor the profile:
most are heard rather than seen (screen-reader names for links, menus and
landmarks); the rest are the mobile footer's button labels and the
copyright line. Both languages were written here. Edit them in the file
named; this list is regenerated from it.

| Where | Proposed Arabic | Proposed English |
| --- | --- | --- |
| `a11y.skipToContent` (translations.ts) | تخطَّ إلى المحتوى | Skip to content |
| `a11y.loading` (translations.ts) | جارٍ التحميل… | Loading… |
| `a11y.openMenu` (translations.ts) | فتح القائمة | Open menu |
| `a11y.closeMenu` (translations.ts) | إغلاق القائمة | Close menu |
| `nav.primary` (translations.ts) | التنقل الرئيسي | Main navigation |
| `nav.servicesMenu` (translations.ts) | قائمة الخدمات | Services menu |
| `lang.label` (translations.ts) | اللغة | Language |
| `breadcrumb.label` (translations.ts) | مسار التنقل | Breadcrumb |
| `footer.call` (translations.ts) | اتصل | Call |
| `footer.email` (translations.ts) | إيميل | Email |
| `footer.rights` (translations.ts) | جميع الحقوق محفوظة. | All rights reserved. |
| Social link name (social.ts) | فورك العربية على فيسبوك | FORK ARABIA on Facebook |
| Social link name (social.ts) | فورك العربية على إنستغرام | FORK ARABIA on Instagram |
| Social link name (social.ts) | فورك العربية على تيك توك | FORK ARABIA on TikTok |
| Copyright line (Footer.tsx) | © {السنة} فورك العربية المحدودة. جميع الحقوق محفوظة. | © {year} FORK ARABIA LIMITED. All rights reserved. |

## English proposed

| Sector | Arabic (approved) | Proposed English | File |
| --- | --- | --- | --- |
| `legalCorporate` | التقاضي والتحكيم، والعقود، والملكية الفكرية، والتراخيص، والإدارات القانونية، في مصر والسعودية. | Litigation and arbitration, contracts, intellectual property, licensing and legal departments, in Egypt and Saudi Arabia. | `legal-corporate.ts` |
| `legalCorporate` | محتاج استشارة قانونية؟ | Need legal advice? | `legal-corporate.ts` |
| `businessSetup` | تأسيس الشركات وخدمات المستثمرين وإدارة المتطلبات الحكومية في مصر والسعودية والإمارات وعُمان، بمسار متكامل يبدأ باختيار الهيكل المناسب وينتهي بجاهزية المنشأة للتشغيل. | Company formation, investor services and management of government requirements in Egypt, Saudi Arabia, the UAE and Oman — a complete path that begins with choosing the right structure and ends with the entity ready to operate. | `business-setup.ts` |
| `businessSetup` | عايز تؤسس شركتك؟ | Ready to set up your company? | `business-setup.ts` |
| `financialAccounting` | الاستشارات المالية، ومحاسبة الزكاة والضرائب، والقوائم المالية، ونقل الوظيفة المحاسبية التقليدية إلى إدارة مالية تدعم القرار والنمو. | Financial advisory, Zakat and tax accounting and financial statements — moving from a traditional accounting function to financial management that supports decisions and growth. | `financial-accounting.ts` |
| `financialAccounting` | محتاج استشارة مالية؟ | Need financial advice? | `financial-accounting.ts` |
| `governanceOrganization` | محتاج تنظّم منشأتك؟ | Looking to structure your organization? | `governance-organization.ts` |
| `qualityExcellence` | الأيزو، والتميز المؤسسي، والاستراتيجية، والمخاطر والاستدامة، ومطابقة المنتجات، ضمن حلول CASCO المتكاملة. | ISO, institutional excellence, strategy, risk and sustainability, and product conformity, within CASCO integrated solutions. | `quality-excellence.ts` |
| `qualityExcellence` | محتاج شهادة أو مطابقة؟ | Need certification or product conformity? | `quality-excellence.ts` |
| `qualityExcellence` | التميز المؤسسي والاستراتيجية والمخاطر | Institutional Excellence, Strategy & Risk | `quality-excellence.ts` |
| `qualityExcellence` | خدمات التميز المؤسسي والاستراتيجية وإدارة المخاطر والاستدامة. | Institutional excellence, strategy, risk management and sustainability services. | `quality-excellence.ts` |
| `trainingEducation` | برامج متخصصة ورحلات تعليمية تفاعلية في المجالات المالية والمحاسبية، ودورات كبير المراجعين. | Specialized programs and interactive learning journeys in finance and accounting, and Lead Auditor courses. | `training-education.ts` |
| `trainingEducation` | عايز تطوّر فريقك؟ | Ready to develop your team? | `training-education.ts` |
| `trainingEducation` | البرامج المالية والمحاسبية | Financial & Accounting Programs | `training-education.ts` |
| `technologyAi` | محتاج حل تقني؟ | Need a technology solution? | `technology-ai.ts` |
| `technologyAi` | إدارة المنصات الحكومية الإلكترونية | Government E-Platform Management | `technology-ai.ts` |
| `technologyAi` | إدارة المنصات الإلكترونية الحكومية في السعودية. | Managing government e-platforms in Saudi Arabia. | `technology-ai.ts` |
| `technologyAi` | المحتوى والعروض بالذكاء الاصطناعي | AI-Powered Content & Presentations | `technology-ai.ts` |
| `technologyAi` | إعداد العروض التقديمية وتصميم المحتوى بالاستفادة من تقنيات الذكاء الاصطناعي. | Preparing presentations and designing content leveraging AI technologies. | `technology-ai.ts` |
| `operationalSupport` | محتاج دعم تشغيلي؟ | Need operational support? | `operational-support.ts` |
| `premiumResidency` | عايز تحصل على الإقامة المميزة؟ | Interested in Saudi Premium Residency? | `premium-residency.ts` |
| `premiumResidency` | ستة مسارات، ونساعدك تختار الأنسب لوضعك الاستثماري. | Six tracks — we help you choose the one that best fits your investment profile. | `premium-residency.ts` |
| `premiumResidency` | استثمار | Investment | `premium-residency.ts` |
| `premiumResidency` | تملّك | Ownership | `premium-residency.ts` |
| `premiumResidency` | ريادة | Entrepreneurship | `premium-residency.ts` |
| `premiumResidency` | رسوم سنوية | Limited duration | `premium-residency.ts` |
| `premiumResidency` | رسم لمرة واحدة | Unlimited duration | `premium-residency.ts` |
| `premiumResidency` | كفاءات | Talent | `premium-residency.ts` |
| `—` | من الاستشارة للتنفيذ للمتابعة، مع فريق واحد | From consultation to implementation and follow-up, with one team | `whyFork.ts` |
| `—` | شريك واحد | One Partner | `whyFork.ts` |
| `—` | فهم الأسواق | Market Understanding | `whyFork.ts` |
| `—` | حلول مصممة لك | Solutions Built for You | `whyFork.ts` |
| `—` | من الاستشارة للتنفيذ | From Consultation to Implementation | `whyFork.ts` |
| `—` | تقنية وتحليل | Technology and Analytics | `whyFork.ts` |
| `—` | 50 دقيقة | 50 minutes | `consultation.ts` |
| `—` | الأيام | Days | `consultation.ts` |
| `—` | السبت إلى الخميس | Saturday to Thursday | `consultation.ts` |
| `hours` | الساعات | Hours | `consultation.ts` |
| `hours` | 10ص إلى 6م (توقيت السعودية) | 10 am to 6 pm (Saudi time) | `consultation.ts` |
| `hours` | المدة | Duration | `consultation.ts` |
| `method` | الطريقة | Format | `consultation.ts` |
| `method` | حضوري · أونلاين · تليفون | In person · Online · Phone | `consultation.ts` |
| `method` | التكلفة | Cost | `consultation.ts` |
| `method` | مجانية | Free | `consultation.ts` |
| `method` | الرد | Reply | `consultation.ts` |
| `method` | خلال يوم عمل | Within one business day | `consultation.ts` |
| `method` | استشارة مجانية مدتها 50 دقيقة، من السبت للخميس، 10 صباحًا إلى 6 مساءً بتوقيت السعودية. | A free 50-minute consultation, Saturday to Thursday, 10 am to 6 pm Saudi time. | `consultation.ts` |
| `method` | احجز استشارة مجانية وفريقنا يحدد معاك الخدمات المناسبة لاحتياجك. | Book a free consultation and our team will help you identify the services that fit your needs. | `consultation.ts` |
| `method` | استشارة مجانية | free consultation | `consultation.ts` |
| `method` | أونلاين | Online | `consultation.ts` |
| `method` | تليفون | Phone | `consultation.ts` |
| `method` | حضوري | In person | `consultation.ts` |
| `riyadh` | المقر الرئيسي | Head Office | `offices.ts` |
| `riyadh` | الرياض | Riyadh | `offices.ts` |
| `riyadh` | الرياض، السعودية | Riyadh, Saudi Arabia | `offices.ts` |
| `riyadh` | الرياض، المملكة العربية السعودية | Riyadh, Kingdom of Saudi Arabia | `offices.ts` |
| `riyadh` | الرياض، المربع، حي الوشام، برج الوشم، مبنى أوقاف الراجحي، المدخل التجاري للشركات، شركة فورك العربية، مكتب 110 | Office 110, FORK ARABIA, Corporate Business Entrance, Al Rajhi Awqaf Building, Al Washm Tower, Al Wisham District, Al Murabba, Riyadh | `offices.ts` |
| `riyadh` | المربع، حي الوشام، برج الوشم، مبنى أوقاف الراجحي، مكتب 110 | Office 110, Al Rajhi Awqaf Building, Al Washm Tower, Al Wisham, Al Murabba | `offices.ts` |
| `tanta` | فرع | Branch | `offices.ts` |
| `tanta` | طنطا | Tanta | `offices.ts` |
| `tanta` | طنطا، مصر | Tanta, Egypt | `offices.ts` |
| `tanta` | طنطا، جمهورية مصر العربية | Tanta, Arab Republic of Egypt | `offices.ts` |
| `tanta` | ميدان المحطة، أبراج عبد المنعم رياض، برج A، الدور الحادي عشر (أعلى هيئة قضايا الدولة)، طنطا، الغربية | 11th Floor, Tower A, Abdel Moneim Riad Towers (above the State Lawsuits Authority), Station Square, Tanta, Gharbia | `offices.ts` |
| `tanta` | ميدان المحطة، أبراج عبد المنعم رياض، برج A، الدور 11 | 11th Floor, Tower A, Abdel Moneim Riad Towers, Station Square | `offices.ts` |
| `uae` | الإمارات | United Arab Emirates | `offices.ts` |
| `uae` | خدمات في دبي والشارقة وأبوظبي | Services in Dubai, Sharjah and Abu Dhabi | `offices.ts` |
| `ae` | الأردن | Jordan | `countries.ts` |
| `ae` | الولايات المتحدة | United States | `countries.ts` |
| `ae` | جنوب أفريقيا | South Africa | `countries.ts` |
| `—` | راسلنا على واتساب | Message us on WhatsApp | `whatsapp.ts` |
| `—` | نرافق شركاءنا من الفكرة والتأسيس إلى التشغيل والحوكمة والنمو، في مصر والسعودية والإمارات وعُمان وأسواق أخرى. | We accompany our partners from idea and incorporation through operation, governance and growth — in Egypt, Saudi Arabia, the UAE, Oman and other markets. | `HeroSection.tsx` |
| `—` | مقر رئيسي في الرياض، وفرع في طنطا، وخدمات في 8 دول. | Head office in Riyadh, a branch in Tanta, and services across 8 countries. | `HeroSection.tsx` |
| `—` | شريك مهني واحد منذ 2016 | One professional partner since 2016 | `HeroSection.tsx` |
| `—` | من الاستشارة للتنفيذ للمتابعة | From consultation to implementation and follow-up | `HeroSection.tsx` |
| `—` | سنوات خبرة | Years of experience | `StatsSection.tsx` |
| `—` | عميل | Clients | `StatsSection.tsx` |
| `—` | مشروع | Projects | `StatsSection.tsx` |
| `—` | دول | Countries | `StatsSection.tsx` |
| `—` | شريك مهني واحد لكل مراحل أعمالك منذ | One professional partner for every stage of your business since | `AboutSection.tsx` |
| `—` | حلول مترابطة تتحول من توصيات إلى إجراءات واضحة ومخرجات عملية تدعم القرار. | Interconnected solutions that turn recommendations into clear actions and practical outputs that support decision-making. | `AboutSection.tsx` |
| `—` | اعرف أكثر عن فورك | Learn more about FORK | `AboutSection.tsx` |
| `—` | كل الخدمات | All Services | `ServicesSection.tsx` |
| `—` | التفاصيل | Details | `ServicesSection.tsx` |
| `—` | مستشار من فورك العربية في اجتماع مع عميل بمكتب الرياض | A FORK ARABIA consultant meeting a client at the Riyadh office | `WhyForkSection.tsx` |
| `—` | تواجدنا | Our Presence | `PresenceSection.tsx` |
| `—` | نقدم خدماتنا في 8 دول | We serve clients in 8 countries | `PresenceSection.tsx` |
| `—` | عناوين المكاتب | Office Addresses | `PresenceSection.tsx` |
| `—` | المربع، حي الوشام، برج الوشم، مبنى أوقاف الراجحي، مكتب 110 | Al Murabba, Al Wisham District, Al Washm Tower, Al Rajhi Awqaf Building, Office 110 | `PresenceSection.tsx` |
| `—` | ميدان المحطة، أبراج عبد المنعم رياض، برج A، الدور الحادي عشر | Station Square, Abdel Moneim Riad Towers, Tower A, 11th Floor | `PresenceSection.tsx` |
| `—` | مقر رئيسي | Head office | `PresenceSection.tsx` |
| `—` | فرع | Branch | `PresenceSection.tsx` |
| `—` | خدمات | Services | `PresenceSection.tsx` |
| `—` | شركاؤنا وعملاؤنا | Our Partners & Clients | `PartnersSection.tsx` |
| `—` | جاهز تبدأ؟ | Ready to get started? | `CtaSection.tsx` |
| `—` | احجز استشارة مجانية مدتها 50 دقيقة، حضوريًا أو أونلاين أو بالتليفون، وسيتواصل معك فريقنا خلال يوم عمل لتأكيد الموعد. | Book a free 50-minute consultation — in person, online or by phone — and our team will contact you within one business day to confirm the time. | `CtaSection.tsx` |
| `—` | 50 دقيقة | 50 minutes | `CtaSection.tsx` |
| `—` | مجانية | Free | `CtaSection.tsx` |
| `—` | حضوري · أونلاين · تليفون | In person · Online · Phone | `CtaSection.tsx` |
| `—` | منذ 2016 | Since 2016 | `IntroSection.tsx` |
| `—` | شركة خدمات مهنية رائدة في مصر والخليج | A leading professional services company in Egypt and the Gulf | `IntroSection.tsx` |
| `—` | فورك شركة خدمات مهنية رائدة، تقدم منظومة حلول متكاملة من الحلول القانونية والمالية والمحاسبية والإدارية والتقنية لقطاع الأعمال في مصر والسعودية والإمارات وعُمان. تأسست الشركة عام 2016. | FORK is a leading professional services company offering an integrated suite of legal, financial, accounting, administrative and technology solutions for the business sector in Egypt, Saudi Arabia, the UAE and Oman. The company was founded in 2016. | `IntroSection.tsx` |
| `—` | مقر رئيسي في الرياض، وفرع في طنطا | Head office in Riyadh, and a branch in Tanta | `IntroSection.tsx` |
| `—` | احتياجات متعددة تُدار من خلال شريك واحد ورؤية واحدة، عبر 9 قطاعات. | Multiple needs, managed through one partner and one vision, across 9 sectors. | `ServicesPage.tsx` |
| `—` | قطاعات | sectors | `ServicesPage.tsx` |
| `—` | تفاصيل القطاع | Sector details | `ServicesPage.tsx` |
| `—` | مش متأكد أنهي خدمة تناسبك؟ | Not sure which service fits you? | `ServicesPage.tsx` |
| `—` | مقر رئيسي في الرياض، وفرع في طنطا، وخدمات في 8 دول. | Head office in Riyadh, a branch in Tanta, and services across 8 countries. | `PresencePage.tsx` |
| `—` | الاسم الكامل | Full name | `formCopy.ts` |
| `—` | البريد الإلكتروني | Email | `formCopy.ts` |
| `—` | رقم الهاتف | Phone number | `formCopy.ts` |
| `—` | الدولة | Country | `formCopy.ts` |
| `—` | حجز استشارة | Book a consultation | `BookConsultationPage.tsx` |
| `—` | احجز استشارة مجانية | Book a free consultation | `BookConsultationPage.tsx` |
| `—` | املأ البيانات وسيتواصل معك فريقنا خلال يوم عمل لتأكيد الموعد. | Fill in your details and our team will contact you within one business day to confirm the appointment. | `BookConsultationPage.tsx` |
| `—` | طلب عرض سعر | Request a quote | `RequestQuotePage.tsx` |
| `—` | اطلب عرض سعر | Request a quote | `RequestQuotePage.tsx` |
| `—` | اختر الخدمة واكتب تفاصيل طلبك، وسنرسل لك عرض السعر على بريدك الإلكتروني. | Choose the service and describe your request, and we will email you a quote. | `RequestQuotePage.tsx` |
| `—` | تواصل معنا | Contact us | `ContactPage.tsx` |
| `—` | تواصل معنا | Contact us | `ContactPage.tsx` |
| `—` | فريقنا في الرياض وطنطا جاهز يرد على استفساراتك. | Our team in Riyadh and Tanta is ready to answer your questions. | `ContactPage.tsx` |
| `—` | أرسل رسالة | Send a message | `ContactForm.tsx` |
| `—` | الاسم | Name | `ContactForm.tsx` |
| `—` | رسالتك | Your message | `ContactForm.tsx` |
| `—` | إرسال | Send | `ContactForm.tsx` |
| `—` | للاستفسارات والطلبات | Enquiries and requests | `ContactDetails.tsx` |
| `—` | الخدمة المطلوبة | Service required | `QuoteForm.tsx` |
| `—` | تفاصيل الطلب | Request details | `QuoteForm.tsx` |
| `—` | إرسال الطلب | Send request | `QuoteForm.tsx` |
| `—` | شكرًا لك، تم استلام طلبك وسيتواصل معك فريقنا قريبًا. | Thank you, we have received your request and our team will contact you soon. | `QuoteForm.tsx` |
| `—` | مجال الاستشارة المطلوبة | Consultation area | `BookingForm.tsx` |
| `—` | التاريخ المفضل | Preferred date | `BookingForm.tsx` |
| `—` | الوقت المفضل (بتوقيت السعودية) | Preferred time (Saudi time) | `BookingForm.tsx` |
| `—` | طريقة الاستشارة | Consultation format | `BookingForm.tsx` |
| `—` | تفاصيل إضافية عن الطلب | Additional details about your request | `BookingForm.tsx` |
| `—` | إرسال طلب الحجز | Send booking request | `BookingForm.tsx` |
| `—` | الموعد لا يُعتبر مؤكدًا إلا بعد تواصل فريقنا معك. | Your appointment is confirmed only once our team has contacted you. | `BookingForm.tsx` |
| `—` | شكرًا لك، تم استلام طلبك. سيتواصل معك فريقنا خلال يوم عمل لتأكيد موعد الاستشارة. | Thank you, we have received your request. Our team will contact you within one business day to confirm your consultation. | `BookingForm.tsx` |
| `—` | تفاصيل الاستشارة | Consultation details | `ConsultationDetails.tsx` |
| `—` | نقدم خدماتنا في 8 دول | We serve clients in 8 countries | `CountriesSection.tsx` |
| `—` | خدمات | Services | `CountriesSection.tsx` |
| `—` | قطاعات أخرى | Other sectors | `SectorOthers.tsx` |
| `—` | خدمات القطاع | Sector services | `SectorServices.tsx` |
