import { Link, type LinkProps } from 'react-router'
import type { SitePath } from '@/config/paths'
import { localizePath } from '@/lib/i18n/localizePath'
import { useLanguage } from '@/lib/i18n/useLanguage'

export type LocalizedLinkProps = Omit<LinkProps, 'to'> & {
  /** A path from `src/config/paths.ts`. The `/en` prefix is added here. */
  to: SitePath
}

/**
 * The only way to link to another page of this site.
 *
 * It adds the language prefix itself, so no component has to know that
 * English lives under `/en` — and a link can never drop the visitor into the
 * other language, which a hand-written `href="/about"` would do on an
 * English page.
 */
export function LocalizedLink({ to, ...props }: LocalizedLinkProps) {
  const { language } = useLanguage()

  return <Link to={localizePath(to, language)} {...props} />
}
