import { copy, draft } from '@/lib/i18n/localized'
import { defineSector } from './defineSector'

/*
 * Sector 04. Arabic from the storyboard's sector page, English from the
 * company profile; `draft` marks English written here, listed in
 * docs/copy-review.md.
 */
export default defineSector('governanceOrganization', {
  lead: copy(
    'مجالس الإدارة والجمعيات العمومية والبناء التنظيمي والسياسات.',
    'Boards of directors, general assemblies, organizational structuring and policies',
  ),

  ctaTitle: draft('محتاج تنظّم منشأتك؟', 'Looking to structure your organization?'),

  services: [
    {
      id: 'boards-assemblies',
      title: copy('مجالس الإدارة والجمعيات العمومية', 'Boards of Directors & General Assemblies'),
      body: copy(
        'تنظيم الجمعيات العمومية العادية وغير العادية واجتماعات مجالس الإدارة، وسكرتارية المجالس (الدعوات، جداول الأعمال، المحاضر)، وإعداد العروض التقديمية وتوفير الترجمة الفورية عند الحاجة.',
        'Managing and organizing ordinary and extraordinary general assemblies and board meetings; board secretarial services: preparing invitations, agendas and minutes; preparing professional presentations and providing simultaneous interpretation when needed.',
      ),
    },
    {
      id: 'board-governance',
      country: 'sa',
      title: copy('حوكمة مجالس الإدارة', 'Board Governance'),
      body: copy(
        'صياغة لوائح الحوكمة، وتنظيم أعمال مجالس الإدارة والجمعيات العمومية، وتوثيق القرارات والمحاضر عبر منصات وزارة التجارة.',
        'Drafting governance regulations, organizing the work of boards of directors and general assemblies, and documenting resolutions and minutes through the Ministry of Commerce platforms.',
      ),
    },
    {
      id: 'governance-structuring',
      title: copy('الحوكمة والاستدامة والبناء التنظيمي', 'Governance, sustainability and organizational structuring'),
      body: copy(
        'وضع وتطبيق أطر الحوكمة ووضوح الصلاحيات والمسؤوليات، ودمج مبادئ الاستدامة، وبناء الهيكل التنظيمي وإعداد اللوائح ودعم التوظيف والاستقطاب.',
        'Establishing and applying suitable governance frameworks and standards, and clarifying authorities and responsibilities; supporting the integration of sustainability principles into institutional policies and practices; building the organizational and administrative structure, preparing regulations, and supporting recruitment and talent acquisition.',
      ),
    },
    {
      id: 'saeb-standard',
      title: copy('معيار صائب لقياس نضج الإدارة المالية', 'SAEB Standard | Financial Management Maturity Assessment'),
      body: copy(
        'أداة لتقييم نضج الممارسات المالية عبر خمسة أبعاد: الحوكمة، الرقابة والإشراف، التحليل والتخطيط، كفاءة الموارد، العمليات المحاسبية.',
        'A tool for assessing the maturity of financial management practices within organizations, turning the assessment into a clear picture of gaps, priorities and improvement opportunities. It is based on five core dimensions: Governance, Oversight & Control, Analysis & Planning, Resource Efficiency, Accounting Operations.',
      ),
    },
  ],
})
