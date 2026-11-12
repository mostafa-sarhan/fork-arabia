import { useLocation } from 'react-router'
import { legacyLanguageRedirect } from './routes'

/**
 * The path-based URL to redirect to when the current one still carries the
 * retired `?lang=` parameter, or `null` when it is already canonical.
 */
export function useLegacyLanguageRedirect(): string | null {
  const location = useLocation()

  return legacyLanguageRedirect(location)
}
