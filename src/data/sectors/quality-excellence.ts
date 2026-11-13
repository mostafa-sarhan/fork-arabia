import { copy, draft } from '@/lib/i18n/localized'
import { defineSector } from './defineSector'

/*
 * Sector 05. Arabic from the storyboard's sector page, English from the
 * company profile; `draft` marks English written here, listed in
 * docs/copy-review.md.
 */
export default defineSector('qualityExcellence', {
  lead: draft(
    'الأيزو، والتميز المؤسسي، والاستراتيجية، والمخاطر والاستدامة، ومطابقة المنتجات، ضمن حلول CASCO المتكاملة.',
    'ISO, institutional excellence, strategy, risk and sustainability, and product conformity, within CASCO integrated solutions.',
  ),

  ctaTitle: draft('محتاج شهادة أو مطابقة؟', 'Need certification or product conformity?'),

  services: [
    {
      id: 'saudi-product-conformity',
      title: copy('مطابقة المنتجات السعودية', 'Saudi Product Conformity'),
      body: copy(
        'إدارة رحلة المطابقة من طلب المصدّر أو المصنّع حتى الإفراج عن الشحنة: تصنيف المنتج، الملف الفني، البطاقة العربية، الفحص والاختبار، ومسارات SFDA/FaSeH و SASO/SABER وشهادات PCoC و SCoC وعلامة الجودة السعودية G-Mark والحلال.',
        'We manage the conformity journey from the first request by the exporter or manufacturer until the shipment is released and delivered to the importer: product classification and HS code, verification of manufacturer and importer registration, review of the technical file, Arabic labelling and INCI ingredients, free sale certificate and GMP, then inspection, sampling and testing through ISO/IEC 17025 laboratories. We coordinate SFDA/FaSeH pathways and shipment conformity certificates for food and cosmetics, SASO/SABER pathways and PCoC and SCoC certificates for products subject to technical regulations, as well as the Saudi Quality Mark, GSO/G-Mark, IECEE, energy and water efficiency cards and Halal.',
      ),
    },
    {
      id: 'egypt-international-conformity',
      title: copy('المطابقة في مصر والأسواق الدولية', 'Egypt & International Markets'),
      body: copy(
        'ربط الملف الفني بمنظومة ACI/ACID ونافذة، ومتطلبات NFSA للأغذية و EDA لمستحضرات التجميل و GOEIC/EOS للمنتجات الصناعية، وتحديد متطلبات دولة المقصد حتى دخول السوق.',
        'In Egypt, we link the technical file with the ACI/ACID and CARGOX/NAFEZA systems, NFSA requirements for food, EDA notifications for cosmetics and GOEIC/EOS for industrial products, together with conformity certificates or pre-shipment inspection. Outside Saudi Arabia and Egypt, we identify the destination country’s regulations, language and labelling, testing, conformity assessment body, CoC, GSO/G-Mark or any pre-shipment verification programme, and manage nonconformities until market entry.',
      ),
    },
    {
      id: 'management-systems',
      title: copy('نظم الإدارة والشهادات', 'Management Systems & Certification'),
      body: copy(
        'تأهيل المنشآت من تحليل الفجوة حتى المراجعة الخارجية لشهادات ISO 9001 و 14001 و 45001 و 22000 و 27001 و 37001 و 13485 وغيرها وفق أحدث الإصدارات.',
        'We qualify organizations from gap analysis to external audit: designing processes, policies and records, training, implementation, internal audit, management review and closing nonconformities. Scope includes ISO 9001, 14001, 45001, 50001, 22000/FSSC 22000, 27001, 22301, 37001, 37301, 55001, 13485, 21001, 41001, 39001, 20000-1, 28000, 20121, 46001 and others, in line with the latest editions.',
      ),
    },
    {
      id: 'conformity-body-accreditation',
      title: copy('اعتماد جهات تقويم المطابقة', 'Accreditation of Conformity Assessment Bodies'),
      body: copy(
        'بناء أنظمة فنية وإدارية قابلة للتقييم لجهات المنح والتفتيش والمختبرات (ISO/IEC 17025 و 17020 و 17065 و 17024 وغيرها)، ودعم إغلاق ملاحظات جهة الاعتماد.',
        'Building assessable technical and administrative systems for certification, inspection and testing bodies, laboratories and product and personnel certification bodies: ISO/IEC 17029, ISO 17034, ISO 15189, 17043, 17024, 17065, 17025, 17020, ISO/IEC 17021-1 and GSO 2055-2. The service covers defining activities and scope, impartiality, competence matrices, schemes and technical methods, documents and records, internal audit, pre-assessment, and support in closing accreditation body findings.',
      ),
    },
    {
      id: 'excellence-strategy-risk',
      title: draft('التميز المؤسسي والاستراتيجية والمخاطر', 'Institutional Excellence, Strategy & Risk'),
      body: draft(
        'خدمات التميز المؤسسي والاستراتيجية وإدارة المخاطر والاستدامة.',
        'Institutional excellence, strategy, risk management and sustainability services.',
      ),
    },
  ],
})
