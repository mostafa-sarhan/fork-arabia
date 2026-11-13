import type { ReactNode, SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number
}

function IconBase({
  size = 20,
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ForkIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z" />
      <path d="M21 15v7" />
    </IconBase>
  )
}

export function GlobeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </IconBase>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 6 6 6-6 6" />
    </IconBase>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m20 6-11 11-5-5" />
    </IconBase>
  )
}

export function InfoIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </IconBase>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </IconBase>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.2Z" />
    </IconBase>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </IconBase>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </IconBase>
  )
}

export function ChatIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.8L3 21l1.9-5a8.2 8.2 0 0 1-.9-3.8 8.4 8.4 0 0 1 8.4-9 8.4 8.4 0 0 1 8.6 8.3Z" />
    </IconBase>
  )
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </IconBase>
  )
}

/** The booking action's icon. */
export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
      <path d="M8 14h3" />
    </IconBase>
  )
}

/** A photograph: the placeholder an undelivered image stands behind. */
export function PhotoIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.8" />
      <path d="m3 17 5-4.5 4 3.5 3-2.5 6 5" />
    </IconBase>
  )
}

/** A place on a map, for a line about where the company is. */
export function PinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </IconBase>
  )
}

/* -------------------------------------------------------------------------- */
/* Sector icons — one per service sector, drawn on the same 24px grid         */
/* -------------------------------------------------------------------------- */

/** 01 — Legal and corporate services. */
export function ScaleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M5 7h14" />
      <path d="M5 7 2 14h6L5 7Z" />
      <path d="M19 7l-3 7h6l-3-7Z" />
    </IconBase>
  )
}

/** 02 — Company formation. */
export function FoundationIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V9l7-5 7 5v12" />
      <path d="M10 21v-6h4v6" />
      <path d="M9 11h2M13 11h2" />
    </IconBase>
  )
}

/** 03 — Financial and accounting solutions. */
export function LedgerIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2V3Z" />
      <path d="M5 17h14" />
      <path d="M9 7h6" />
      <path d="M9 11h6" />
    </IconBase>
  )
}

/** 04 — Governance and organisation. */
export function OrgChartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="9" y="3" width="6" height="5" rx="1.5" />
      <rect x="2" y="16" width="6" height="5" rx="1.5" />
      <rect x="16" y="16" width="6" height="5" rx="1.5" />
      <path d="M12 8v4" />
      <path d="M5 16v-2h14v2" />
    </IconBase>
  )
}

/** 05 — Quality and excellence. */
export function MedalIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14-2 7 5-3 5 3-2-7" />
      <path d="m12 6 1.3 2.6 2.7.4-2 1.9.5 2.8-2.5-1.4-2.5 1.4.5-2.8-2-1.9 2.7-.4L12 6Z" />
    </IconBase>
  )
}

/** 06 — Training and education. */
export function AcademicIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 4 10 5-10 5L2 9l10-5Z" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 9v6" />
    </IconBase>
  )
}

/** 07 — Technology and artificial intelligence. */
export function ChipIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 10h4v4h-4z" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4" />
      <path d="M3 10h4M3 14h4M17 10h4M17 14h4" />
    </IconBase>
  )
}

/** 08 — Operational support. */
export function SupplyIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
      <path d="M3 15.5 12 20l9-4.5" />
      <path d="M3 12l9 4.5 9-4.5" />
    </IconBase>
  )
}

/** 09 — Saudi premium residency. */
export function PassportIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <circle cx="12" cy="10" r="3.2" />
      <path d="M8.5 17.5h7" />
      <path d="M12 6.8v6.4M8.8 10h6.4" />
    </IconBase>
  )
}

export function EyeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  )
}

export function TargetIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </IconBase>
  )
}

/* -------------------------------------------------------------------------- */
/* Why FORK icons — one per point                                             */
/* -------------------------------------------------------------------------- */

/** Two people side by side: one partner. */
export function UsersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" />
      <path d="M18.5 14.2a6.5 6.5 0 0 1 3 5.8" />
    </IconBase>
  )
}

/**
 * A puzzle piece: a solution that fits. A rounded square with a knob on
 * its top and on its inline end, each wider than its neck.
 */
export function PuzzleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 9h2a2.6 2.6 0 1 1 3 0h2a2 2 0 0 1 2 2v2a2.6 2.6 0 1 1 0 3v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
    </IconBase>
  )
}

/** A route: two stops joined by a winding path. */
export function RouteIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="18.5" r="2.5" />
      <path d="M8.5 18.5H17a3.25 3.25 0 0 0 0-6.5H7a3.25 3.25 0 0 1 0-6.5h8.5" />
      <circle cx="18" cy="5.5" r="2.5" />
    </IconBase>
  )
}

/** A bar chart on its axes. */
export function BarChartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 3v18h18" />
      <path d="M8 17v-4" />
      <path d="M12.5 17V8" />
      <path d="M17 17v-6" />
    </IconBase>
  )
}
