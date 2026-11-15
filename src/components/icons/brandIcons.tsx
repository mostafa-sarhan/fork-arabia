import type { ReactNode, SVGProps } from 'react'

/*
 * The three social networks' glyphs, simplified to one colour: each draws
 * in currentColor, so its link decides the colour. Decorative — the link
 * carries the accessible name.
 */
type BrandIconProps = SVGProps<SVGSVGElement> & { size?: number }

function BrandIconBase({ size = 20, children, ...props }: BrandIconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

/** The lowercase f. */
export function FacebookIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M13.5 22v-8.5h2.9l.45-3.4H13.5V7.95c0-.98.28-1.65 1.68-1.65H17V3.26A24 24 0 0 0 14.35 3.1c-2.6 0-4.4 1.6-4.4 4.55v2.45H7v3.4h2.95V22Z" />
    </BrandIconBase>
  )
}

/** The rounded camera: outline, lens and the flash dot. */
export function InstagramIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path
        fillRule="evenodd"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
      <circle cx="17.5" cy="6.5" r="1.25" />
    </BrandIconBase>
  )
}

/** The musical note. */
export function TikTokIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6.04.86.12V9.15a6.3 6.3 0 1 0 5.44 6.25V8.6a7.7 7.7 0 0 0 4.4 1.4V6.6a4.4 4.4 0 0 1-4.4-4.6Z" />
    </BrandIconBase>
  )
}
