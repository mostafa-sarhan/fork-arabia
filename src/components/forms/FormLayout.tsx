import type { ReactNode } from 'react'
import { Container } from '@/components/layout/Container'

/* The page tone, so the two white cards stand off it. */
const SECTION = 'py-12 lg:py-20 bg-page'

/*
 * Phones and tablets: the aside first (compact), then the form, in one
 * column held to the screen (grid-cols-1 is minmax(0, 1fr), so a long
 * chosen value is cut with an ellipsis rather than widening the page).
 * From 1024 the form takes 7 of 12 columns at the inline start and the
 * aside 5 at the end, sticky under the header.
 */
const LAYOUT = 'grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10'
const FORM_COLUMN = 'lg:col-span-7 lg:col-start-1 lg:row-start-1'
const ASIDE = 'lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]'

/** A form page's body under its hero: the form card and its aside. Shared by every form page. */
export function FormLayout({ aside, children }: { aside: ReactNode; children: ReactNode }) {
  return (
    <section className={SECTION}>
      <Container className={LAYOUT}>
        <aside className={ASIDE}>{aside}</aside>
        <div className={FORM_COLUMN}>{children}</div>
      </Container>
    </section>
  )
}
