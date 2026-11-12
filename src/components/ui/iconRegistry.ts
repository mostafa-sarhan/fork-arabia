import {
  AcademicIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChipIcon,
  CloseIcon,
  ForkIcon,
  FoundationIcon,
  GlobeIcon,
  InfoIcon,
  LedgerIcon,
  MailIcon,
  MedalIcon,
  MenuIcon,
  OrgChartIcon,
  PassportIcon,
  PhoneIcon,
  PhotoIcon,
  PinIcon,
  ScaleIcon,
  ShieldIcon,
  SupplyIcon,
} from './icons'

/**
 * Every icon, by name.
 *
 * Data modules — the sectors in particular — name an icon as a string so
 * they stay free of JSX, and the name is checked against this registry, so
 * a sector cannot point at an icon that does not exist. It lives apart from
 * the icons themselves because a module that exports both components and
 * plain values loses fast refresh.
 */
export const ICONS = {
  fork: ForkIcon,
  globe: GlobeIcon,
  arrowRight: ArrowRightIcon,
  chevronDown: ChevronDownIcon,
  chevronRight: ChevronRightIcon,
  check: CheckIcon,
  info: InfoIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  photo: PhotoIcon,
  pin: PinIcon,
  shield: ShieldIcon,
  briefcase: BriefcaseIcon,
  menu: MenuIcon,
  close: CloseIcon,
  chat: ChatIcon,
  calendar: CalendarIcon,
  scale: ScaleIcon,
  foundation: FoundationIcon,
  ledger: LedgerIcon,
  orgChart: OrgChartIcon,
  medal: MedalIcon,
  academic: AcademicIcon,
  chip: ChipIcon,
  supply: SupplyIcon,
  passport: PassportIcon,
} as const

export type IconName = keyof typeof ICONS
