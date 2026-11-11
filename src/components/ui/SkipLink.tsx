import { useLanguage } from '../../lib/i18n/useLanguage'

/**
 * The first focusable element on the page, so a keyboard visitor can step
 * past the header in one Tab instead of walking the logo, the language
 * buttons and the whole section nav.
 *
 * It stays in the accessible tree and is moved out of sight with a translate
 * rather than with sr-only, so focus has one thing to change — no juggling of
 * position, clipping and size, and nothing that can lose to another utility.
 * The move is deliberately not animated: a focus indicator should be there
 * the instant focus arrives. It is only ever reached by keyboard, so :focus
 * is the right trigger.
 */
export function SkipLink() {
  const { t } = useLanguage()

  return (
    <a
      href="#main"
      className="fixed start-4 top-4 z-toast -translate-y-24 rounded-md bg-navy px-4 py-2 text-body-sm font-semibold text-white shadow-raised focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-petrol focus:ring-offset-2 focus:ring-offset-surface"
    >
      {t('a11y.skipToContent')}
    </a>
  )
}
