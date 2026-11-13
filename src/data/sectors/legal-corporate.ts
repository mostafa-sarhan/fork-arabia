import { copy, draft } from '@/lib/i18n/localized'
import { defineSector } from './defineSector'

/*
 * Sector 01. Arabic from the storyboard's sector page, English from the
 * company profile; `draft` marks English written here, listed in
 * docs/copy-review.md.
 */
export default defineSector('legalCorporate', {
  lead: draft(
    'التقاضي والتحكيم، والعقود، والملكية الفكرية، والتراخيص، والإدارات القانونية، في مصر والسعودية.',
    'Litigation and arbitration, contracts, intellectual property, licensing and legal departments, in Egypt and Saudi Arabia.',
  ),

  ctaTitle: draft('محتاج استشارة قانونية؟', 'Need legal advice?'),

  services: [
    {
      id: 'litigation-arbitration',
      country: 'eg',
      title: copy('التقاضي والتحكيم التجاري', 'Litigation & Commercial Arbitration'),
      body: copy(
        'مباشرة القضايا التجارية والمدنية والإدارية أمام المحاكم المختصة والمحاكم الاقتصادية ومجلس الدولة، وخدمات التحكيم التجاري وإدارة النزاعات.',
        'Handling commercial, civil and administrative cases before the competent courts, the economic courts and the State Council, and providing commercial arbitration and dispute management services.',
      ),
    },
    {
      id: 'advocacy-litigation',
      country: 'sa',
      title: copy('المحاماة والتقاضي التجاري', 'Advocacy & Commercial Litigation'),
      body: copy(
        'الترافع أمام المحاكم التجارية والعمالية واللجان شبه القضائية ولجان المنازعات التمويلية والمصرفية، وإدارة ملفات التحكيم التجاري.',
        'Pleading and handling cases before commercial courts, labour courts, quasi-judicial committees and banking & finance dispute committees, and managing commercial arbitration files.',
      ),
    },
    {
      id: 'contracts-translation',
      title: copy('العقود والترجمة القانونية', 'Contracts & Legal Translation'),
      body: copy(
        'صياغة ومراجعة وتنقيح العقود والاتفاقيات الدولية والمحلية، وترجمة قانونية معتمدة للمستندات والمحاضر.',
        'Drafting, reviewing and revising international and local contracts and agreements, and providing certified legal translation of documents and minutes.',
      ),
    },
    {
      id: 'contract-drafting-compliance',
      country: 'sa',
      title: copy('صياغة العقود والامتثال الأنظمي', 'Contract Drafting & Regulatory Compliance'),
      body: copy(
        'صياغة وتدقيق العقود التجارية بما يتوافق مع الأنظمة السعودية، والاستشارات القانونية الوقائية لضمان الامتثال.',
        'Drafting and reviewing commercial contracts and agreements in line with Saudi regulations, and providing preventive legal advice to ensure compliance with regulatory requirements.',
      ),
    },
    {
      id: 'intellectual-property-licensing',
      title: copy('الملكية الفكرية والتراخيص', 'Intellectual Property & Licensing'),
      body: copy(
        'تسجيل وحماية العلامات التجارية وبراءات الاختراع والنماذج الصناعية، واستخراج التراخيص الصناعية والفنية.',
        'Registering and protecting trademarks, patents and industrial designs; obtaining industrial and technical licences and following up compliance requirements with government authorities.',
      ),
    },
    {
      id: 'intellectual-property-protection',
      country: 'sa',
      title: copy('الملكية الفكرية وحماية الأعمال', 'Intellectual Property & Business Protection'),
      body: copy(
        'تسجيل العلامات التجارية وبراءات الاختراع لدى الهيئة السعودية للملكية الفكرية (SAIP)، وصياغة اتفاقيات عدم الإفشاء وحماية الأسرار التجارية.',
        'Registering trademarks and patents with the Saudi Authority for Intellectual Property (SAIP), drafting non-disclosure agreements and protecting trade secrets.',
      ),
    },
    {
      id: 'restructuring-mergers',
      title: copy('إعادة الهيكلة والاندماج والاستحواذ', 'Restructuring, Mergers & Acquisitions'),
      body: copy(
        'حوكمة وهيكلة الشركات العائلية والمساهمة، وصياغة ميثاق العائلة، وإدارة عمليات الاندماج والاستحواذ والتحقق القانوني النافي للجهالة.',
        'Governance and structuring of family and joint-stock companies, drafting family charters, managing M&A transactions and legal due diligence, and supporting procedures under the Saudi Bankruptcy Law.',
      ),
    },
    {
      id: 'consultancy-investor-residency',
      title: copy('الاستشارات وإقامات المستثمرين', 'Consultancy & Investor Residency'),
      body: copy(
        'الاستشارات القانونية المستمرة للشركات، ودعم إجراءات إقامات الأجانب، وبرامج الجنسية الاستثمارية وفق القوانين السارية.',
        'Providing ongoing legal consultancy to companies, and supporting foreign residency procedures and investment citizenship programs in accordance with applicable laws.',
      ),
    },
    {
      id: 'legal-departments',
      title: copy('إنشاء وتأهيل الإدارات القانونية', 'Establishing & Developing Legal Departments'),
      body: copy(
        'بناء الإدارات القانونية الداخلية، وصياغة اللوائح والسياسات، وتدريب الفرق القانونية، وقياس وتحسين الأداء القانوني.',
        'Building in-house legal departments for companies, drafting regulations and policies, training legal teams, and measuring and improving the organization’s legal performance. We link the legal track with the entity’s financial and administrative structure to reduce conflicts and accelerate execution.',
      ),
    },
  ],
})
