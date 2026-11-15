# Copy awaiting approval

Every English string below was written for this website because the
company profile has no equivalent. The Arabic beside it is transcribed
verbatim from the storyboard and is **not** up for review here — only the
English is.

Each is written with `draft('…', '…')` in the data. Approving one means
changing that call to `copy('…', '…')` in the file named; editing one means
changing the English string in place. Re-run `node scripts/copy-review.mjs`
afterwards to regenerate this list.

185 strings await approval.

## Arabic and English both proposed

The storyboard has no Arabic for these either, so both languages were
written here, with `proposed('…', '…')`. Approving one means changing it to
`copy('…', '…')`.

| Proposed Arabic | Proposed English | File |
| --- | --- | --- |
| يوم عمل | 1 business day | `consultation.ts` |
| للرد | to reply | `consultation.ts` |
| خريطة مقر الرياض | Map of the Riyadh head office | `offices.ts` |
| خريطة فرع طنطا | Map of the Tanta branch | `offices.ts` |
| سنة التأسيس | Year founded | `AboutPage.tsx` |
| دول نقدم فيها خدماتنا | Countries we serve | `AboutPage.tsx` |
| قطاعات خدمات | Service sectors | `AboutPage.tsx` |
| خدمة | services | `ServicesPage.tsx` |
| دولة أخرى | Other country | `formCopy.ts` |
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
| هذا الحقل مطلوب. | This field is required. | `validation.ts` |
| اكتب بريدًا إلكترونيًا صحيحًا، مثل name@example.com. | Enter a valid email address, like name@example.com. | `validation.ts` |
| اكتب رقم الهاتف بالأرقام فقط (7 أرقام على الأقل)، ويمكن أن يبدأ بعلامة +. | Use digits only (at least 7); the number may start with +. | `validation.ts` |
| اكتب {n} حرفًا على الأقل. | Write at least {n} characters. | `validation.ts` |
| اختر اليوم أو تاريخًا بعده. | Choose today or a later date. | `validation.ts` |
| يوم الجمعة إجازة؛ اختر يومًا من السبت إلى الخميس. | Friday is a day off; choose a day from Saturday to Thursday. | `validation.ts` |
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
| القطاع | Sector | `SectorHero.tsx` |
| الكل | All | `SectorServices.tsx` |
| تصفية الخدمات حسب الدولة | Filter services by country | `SectorServices.tsx` |

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
| `—` | فورك العربية شركة خدمات مهنية متكاملة: قانونية، مالية، إدارية، وتقنية في السعودية ومصر والإمارات وعُمان. | FORK ARABIA is an integrated professional services firm — legal, financial, administrative and technology — in Saudi Arabia, Egypt, the UAE and Oman. | `siteCopy.ts` |
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
| `tanta` | فرع | Branch | `offices.ts` |
| `tanta` | طنطا | Tanta | `offices.ts` |
| `tanta` | طنطا، مصر | Tanta, Egypt | `offices.ts` |
| `tanta` | طنطا، جمهورية مصر العربية | Tanta, Arab Republic of Egypt | `offices.ts` |
| `tanta` | ميدان المحطة، أبراج عبد المنعم رياض، برج A، الدور الحادي عشر (أعلى هيئة قضايا الدولة)، طنطا، الغربية | 11th Floor, Tower A, Abdel Moneim Riad Towers (above the State Lawsuits Authority), Station Square, Tanta, Gharbia | `offices.ts` |
| `ae` | الأردن | Jordan | `countries.ts` |
| `ae` | الولايات المتحدة | United States | `countries.ts` |
| `ae` | جنوب أفريقيا | South Africa | `countries.ts` |
| `—` | نرافق شركاءنا من الفكرة والتأسيس إلى التشغيل والحوكمة والنمو، في مصر والسعودية والإمارات وعُمان وأسواق أخرى. | We accompany our partners from idea and incorporation through operation, governance and growth — in Egypt, Saudi Arabia, the UAE, Oman and other markets. | `HeroSection.tsx` |
| `—` | مقر رئيسي في الرياض، وفرع في طنطا، وخدمات في 8 دول. | Head office in Riyadh, a branch in Tanta, and services across 8 countries. | `HeroSection.tsx` |
| `—` | فريق فورك العربية في اجتماع عمل بمكتب الرياض | The FORK ARABIA team in a business meeting at the Riyadh office | `HeroSection.tsx` |
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
| `—` | آفاق | Afaq | `PartnersSection.tsx` |
| `—` | الخبراء المحترفون للاستشارات المالية | Professional Experts Financial Consulting | `PartnersSection.tsx` |
| `—` | جاهز تبدأ؟ | Ready to get started? | `CtaSection.tsx` |
| `—` | احجز استشارة مجانية مدتها 50 دقيقة، حضوريًا أو أونلاين أو بالتليفون، وسيتواصل معك فريقنا خلال يوم عمل لتأكيد الموعد. | Book a free 50-minute consultation — in person, online or by phone — and our team will contact you within one business day to confirm the time. | `CtaSection.tsx` |
| `—` | 50 دقيقة | 50 minutes | `CtaSection.tsx` |
| `—` | مجانية | Free | `CtaSection.tsx` |
| `—` | حضوري · أونلاين · تليفون | In person · Online · Phone | `CtaSection.tsx` |
| `—` | منذ 2016 | Since 2016 | `IntroSection.tsx` |
| `—` | شركة خدمات مهنية رائدة في مصر والخليج | A leading professional services company in Egypt and the Gulf | `IntroSection.tsx` |
| `—` | فورك شركة خدمات مهنية رائدة، تقدم منظومة حلول متكاملة من الحلول القانونية والمالية والمحاسبية والإدارية والتقنية لقطاع الأعمال في مصر والسعودية والإمارات وعُمان. تأسست الشركة عام 2016. | FORK is a leading professional services company offering an integrated suite of legal, financial, accounting, administrative and technology solutions for the business sector in Egypt, Saudi Arabia, the UAE and Oman. The company was founded in 2016. | `IntroSection.tsx` |
| `—` | فريق فورك العربية في اجتماع عمل بمكتب الرياض | The FORK ARABIA team in a business meeting at the Riyadh office | `IntroSection.tsx` |
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
