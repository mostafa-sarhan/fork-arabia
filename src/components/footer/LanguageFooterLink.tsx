import { Link } from 'react-router'
import { footerLink } from '@/components/footer/FooterColumn'
import { cn } from '@/lib/cn'
import { useLanguageSwap } from '@/lib/i18n/languageSwap'

/**
 * The language control in the footer's bottom bar: a plain link to the other
 * language, not the dropdown the navbar carries.
 *
 * The dropdown exists to say which language is in use before offering the
 * rest, and at the foot of the page that question is already answered. What
 * is left is somewhere to go. It names the other language in its own script
 * and carries that language's `lang`, `dir` and `hrefLang`, so the label and
 * the accessible name are both announced in its voice.
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
      className={cn(footerLink, 'inline-flex items-center', className)}
    >
      {swap.endonym}
    </Link>
  )
}
