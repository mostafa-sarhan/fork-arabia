import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { CloseIcon, GlobeIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import { isLanguage, type Language } from '@/lib/i18n/languageConfig'
import { useLanguageSwap } from '@/lib/i18n/languageSwap'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { canonicalPathname, ROUTE_PATHS } from '@/lib/routing/routes'

const STORAGE_KEY = 'fork-arabia-language-suggestion'
const DELAY = 1500

/**
 * The visitor's own first choice among the languages this site has.
 *
 * `navigator.languages` is in preference order, so the first entry that
 * names one of ours is the one worth acting on; anything else means we
 * have nothing better to offer them than what they are already reading.
 */
function preferredLanguage(): Language | undefined {
  if (typeof navigator === 'undefined') {
    return undefined
  }

  for (const tag of navigator.languages ?? []) {
    const base = tag.slice(0, 2).toLowerCase()

    if (isLanguage(base)) {
      return base
    }
  }

  return undefined
}

function wasDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null
  } catch {
    return false
  }
}

function remember(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, 'seen')
  } catch {
    /* Storage is unavailable in restricted contexts; the card simply
       returns on the next visit, which is a smaller problem than failing. */
  }
}

/**
 * Offers the other language to the visitor whose browser asked for it.
 *
 * It appears for one kind of person only: someone whose browser says they
 * prefer the language this page is not in. Everyone else — including every
 * visitor who already reads Arabic on the Arabic site — never sees it. It
 * is shown once ever, after a pause long enough that it arrives as an
 * offer rather than as an interruption, and it never takes focus: it is a
 * region, not a dialog, so reading continues undisturbed and the control
 * is there when it is wanted.
 */
export function LanguageSuggestion({ isMenuOpen }: { isMenuOpen: boolean }) {
  const { language } = useLanguage()
  const location = useLocation()
  const [isOpen, setOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const isDesignSystem =
    canonicalPathname(location.pathname) === ROUTE_PATHS.designSystem

  const dismiss = useCallback(() => {
    remember()
    setOpen(false)
  }, [])

  useEffect(() => {
    if (isDesignSystem || wasDismissed()) {
      return
    }

    const preferred = preferredLanguage()

    if (!preferred || preferred === language) {
      return
    }

    const timer = window.setTimeout(() => setOpen(true), DELAY)

    return () => window.clearTimeout(timer)
  }, [isDesignSystem, language])

  /* Escape closes it, but only while the card itself holds focus — it has
     not taken over the page, so it must not take over the key either. */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const card = cardRef.current
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        card?.contains(document.activeElement) === true
      ) {
        dismiss()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [dismiss, isOpen])

  if (!isOpen || isMenuOpen) {
    return null
  }

  return (
    <LanguageSuggestionCard
      ref={cardRef}
      onDismiss={dismiss}
      className={cn(
        'fixed inset-x-gutter bottom-gutter z-toast ms-auto',
        'motion-safe:animate-fade-up',
      )}
    />
  )
}

/**
 * The card itself, with no opinion about where it sits — so the design
 * system can show the real thing in place rather than a drawing of it.
 */
export function LanguageSuggestionCard({
  ref,
  className,
  onDismiss,
}: {
  ref?: React.Ref<HTMLDivElement>
  className?: string
  onDismiss?: () => void
}) {
  const swap = useLanguageSwap()

  return (
    <div
      ref={ref}
      role="region"
      aria-label={swap.suggestion}
      lang={swap.language}
      dir={swap.direction}
      className={cn(
        'max-w-compact rounded-lg border border-line bg-surface p-4 shadow-raised',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-turquoise-soft text-petrol">
          <GlobeIcon aria-hidden="true" className="size-5" />
        </span>

        <p className="min-w-0 flex-1 text-body-sm text-ink text-pretty">
          {swap.suggestion}
        </p>

        <button
          type="button"
          onClick={onDismiss}
          aria-label={swap.dismiss}
          className="-me-1 -mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:bg-navy-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <CloseIcon aria-hidden="true" className="size-4" />
        </button>
      </div>

      <Link
        to={swap.to}
        hrefLang={swap.language}
        rel="alternate"
        onClick={remember}
        className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md bg-turquoise px-3.5 text-body-sm font-semibold text-on-accent transition-colors duration-200 hover:bg-turquoise-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {swap.action}
      </Link>
    </div>
  )
}
