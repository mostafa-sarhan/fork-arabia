import { Link, type LinkProps } from 'react-router'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { localizedPath, type CanonicalPath } from './routes'

export type LocalizedLinkProps = Omit<LinkProps, 'to'> & {
  /** A canonical, unprefixed route path. The language prefix is added here. */
  to: CanonicalPath
}

/**
 * The only way to link to another page of this site.
 *
 * It takes the canonical path and resolves the language prefix itself, so no
 * component has to know that English lives under `/en` — and a link can
 * never drop the visitor into the other language, which a hand-written
 * `href="/design-system"` would do on an English page. `to` is typed against
 * the declared routes, so a link to a path that does not exist fails to
 * compile.
 */
export function LocalizedLink({ to, ...props }: LocalizedLinkProps) {
  const { language } = useLanguage()

  return <Link to={localizedPath(to, language)} {...props} />
}
