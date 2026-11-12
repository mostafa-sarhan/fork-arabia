import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import { useLanguageSwap } from '@/lib/i18n/languageSwap'

/**
 * The language control in the footer's bottom bar: a plain link to the
 * other language, not the dropdown the header carries.
 *
 * The dropdown exists to say which language is in use before offering the
 * rest, and at the foot of the page that question is already answered —
 * the visitor has just read a page of it. What is left is the one thing a
 * footer link should be: somewhere to go. It names the other language in
 * its own script and carries that language's `lang`, `dir` and `hrefLang`,
 * so the label and the accessible name are both announced in the voice of
 * the language being offered.
 */
export function LanguageFooterLink({ className }: { className?: string }) {
  const swap = useLanguageSwap()

  return (
    <Link
      to={swap.to}
      lang={swap.language}
      dir={swap.direction}
      hrefLang={swap.language}
      rel="alternate"
      aria-label={swap.action}
      className={cn(
        'inline-flex items-center rounded-sm text-on-navy-muted transition-colors duration-200 hover:text-on-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-navy',
        className,
      )}
    >
      {swap.endonym}
    </Link>
  )
}
