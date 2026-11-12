import type { ReactNode } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'

export type DocSectionProps = {
  id: string
  title: string
  description?: string
  children: ReactNode
}

export function DocSection({
  id,
  title,
  description,
  children,
}: DocSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <SectionHeading level={2} title={title} description={description} />
      <div className="mt-8">{children}</div>
    </section>
  )
}
