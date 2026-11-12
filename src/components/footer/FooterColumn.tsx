import type { ReactNode } from 'react'

/**
 * One link treatment for the whole footer. The focus ring is turquoise
 * rather than the petrol used on light surfaces: petrol on navy is 1.6:1 and
 * would be invisible, where turquoise is 4.9:1 — above the 3:1 a focus
 * indicator owes the surface behind it.
 */
export const footerLink =
  'rounded-sm text-on-navy-muted transition-colors duration-200 hover:text-on-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-navy'

/** A titled column of the footer grid. */
export function FooterColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <h2 className="text-overline tracking-latin-wide text-on-navy">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}
