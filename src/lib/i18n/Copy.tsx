import type { ElementType } from 'react'
import { useLanguage } from './useLanguage'
import { resolveCopy, type Localized } from './localized'

export type CopyProps = {
  value: Localized
  /** Defaults to a span; pass the element the copy belongs in. */
  as?: ElementType
  className?: string
}

/** Renders a piece of client copy in the current language. */
export function Copy({ value, as: Tag = 'span', className }: CopyProps) {
  const { language } = useLanguage()

  return <Tag className={className}>{resolveCopy(value, language).text}</Tag>
}
