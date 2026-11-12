import { Fragment, useCallback, useEffect, useId, useRef } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import { useLanguageOptions, type LanguageOption } from '@/lib/i18n/languageSwap'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { useNavbar } from './useNavbar'

/** ArrowDown and ArrowUp, as the step they take through the options. */
const STEPS: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 }

export type LanguageMenuState = {
  isOpen: boolean
  panelId: string
  toggle: () => void
  openNow: () => void
  closeNow: () => void
  registerTrigger: (node: HTMLButtonElement | null) => void
  registerPanel: (node: HTMLDivElement | null) => void
}

/**
 * The open/closed state of the language menu, shared by its trigger and its
 * panel.
 *
 * Unlike the services panel it has no hover behaviour: the language control
 * is not an item a pointer crosses on its way somewhere else, so a panel
 * that opened on hover would appear whenever someone crossed the gap between
 * the navigation and the buttons. It opens on click, Enter or Space, and on
 * ArrowDown.
 */
function useLanguageMenu(): LanguageMenuState {
  const { openMenu, setOpenMenu } = useNavbar()
  const panelId = useId()
  const isOpen = openMenu === 'language'
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  /* Callback refs: the trigger and the panel are two different components. */
  const registerTrigger = useCallback((node: HTMLButtonElement | null) => {
    triggerRef.current = node
  }, [])

  const registerPanel = useCallback((node: HTMLDivElement | null) => {
    panelRef.current = node
  }, [])

  const openNow = useCallback(() => setOpenMenu('language'), [setOpenMenu])
  const closeNow = useCallback(() => setOpenMenu(null), [setOpenMenu])

  const toggle = useCallback(() => {
    if (isOpen) {
      closeNow()
      return
    }

    openNow()
  }, [closeNow, isOpen, openNow])

  /*
   * Focus enters the menu when it opens, landing on the language already in
   * use — the menu-button pattern, and the only arrangement the arrow keys
   * have somewhere to start from.
   */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const panel = panelRef.current
    const landing =
      panel?.querySelector<HTMLElement>('[data-menu-item][aria-current]') ??
      panel?.querySelector<HTMLElement>('[data-menu-item]')

    landing?.focus()
  }, [isOpen])

  /*
   * Escape, a click outside and focus leaving all close it. Escape is the
   * only one that returns focus to the trigger: it is the only one where the
   * visitor has not already said where they want to be.
   */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const isInside = (target: EventTarget | null) =>
      target instanceof Node &&
      (triggerRef.current?.contains(target) === true ||
        panelRef.current?.contains(target) === true)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeNow()
        triggerRef.current?.focus()
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!isInside(event.target)) {
        closeNow()
      }
    }

    const onFocusIn = (event: FocusEvent) => {
      if (!isInside(event.target)) {
        closeNow()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [closeNow, isOpen])

  return {
    isOpen,
    panelId,
    toggle,
    openNow,
    closeNow,
    registerTrigger,
    registerPanel,
  }
}

/**
 * One option: its two-letter code, and nothing else on screen.
 *
 * The language's own name is there for a screen reader, carrying its own
 * `lang` so "العربية" is announced in Arabic on an English page. It comes
 * before the code, which keeps the visible text inside the accessible name
 * (WCAG 2.5.3). Both options are real links to this same page, so the choice
 * is a navigation a browser can open in a new tab and the back button can
 * undo.
 */
function LanguageOptionLink({
  option,
  inMenu = false,
  onSelect,
  className,
}: {
  option: LanguageOption
  /**
   * Inside the dropdown, which manages focus itself — so no option is a tab
   * stop of its own. In the sheet the rows are plain links and stay tabbable.
   */
  inMenu?: boolean
  onSelect?: () => void
  className?: string
}) {
  return (
    <Link
      to={option.to}
      hrefLang={option.language}
      rel="alternate"
      role={inMenu ? 'menuitem' : undefined}
      tabIndex={inMenu ? -1 : undefined}
      data-menu-item={inMenu ? '' : undefined}
      aria-current={option.isCurrent ? 'true' : undefined}
      onClick={onSelect}
      className={cn(
        'rounded-md text-nav transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        option.isCurrent
          ? 'font-semibold text-navy'
          : 'font-medium text-ink-muted hover:text-navy',
        className,
      )}
    >
      <span lang={option.language} className="sr-only">
        {option.endonym}
      </span>
      <span dir="ltr">{option.code}</span>
    </Link>
  )
}

/**
 * The trigger: the code of the language in use, at the navigation's size,
 * weight and muted colour.
 *
 * It names where you are and opens a list, rather than naming where you
 * would go — the arrangement that answers "what am I reading?" first.
 */
export function LanguageMenuTrigger({
  menu,
  className,
}: {
  menu: LanguageMenuState
  className?: string
}) {
  const { t } = useLanguage()
  const options = useLanguageOptions()
  const current = options.find((option) => option.isCurrent) ?? options[0]
  /* Taken out of the menu before the markup: a ref reached through a
     property in JSX would be a ref read during render. */
  const { registerTrigger, isOpen, panelId, toggle, openNow } = menu

  if (!current) {
    return null
  }

  return (
    <button
      ref={registerTrigger}
      type="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      aria-controls={panelId}
      /* "Language: EN" — the visible code is part of the name (WCAG 2.5.3). */
      aria-label={`${t('lang.label')}: ${current.code}`}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          openNow()
        }
      }}
      className={cn(
        'inline-flex h-10 items-center rounded-md px-3 text-nav font-medium transition-colors duration-200 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        isOpen ? 'text-navy' : 'text-ink-muted',
        className,
      )}
    >
      <span dir="ltr">{current.code}</span>
    </button>
  )
}

/**
 * The panel: two codes, centred under the trigger.
 *
 * It is as wide as its contents rather than as wide as a list of language
 * names, which is what lets it be centred at all — a panel this narrow
 * cannot reach past the viewport from anywhere in the bar, with no measuring
 * and no repositioning on resize.
 */
export function LanguageMenuPanel({
  menu,
  placement = 'anchored',
}: {
  menu: LanguageMenuState
  /** `inline` drops the positioning so the design system can show it. */
  placement?: 'anchored' | 'inline'
}) {
  const { t } = useLanguage()
  const options = useLanguageOptions()
  const { registerPanel, isOpen, panelId, closeNow } = menu

  /* The arrow keys walk the two options; the ends do not wrap. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = STEPS[event.key]

    if (step === undefined) {
      return
    }

    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[data-menu-item]'),
    )
    const current = items.indexOf(document.activeElement as HTMLElement)

    if (current === -1) {
      return
    }

    event.preventDefault()
    items[Math.min(Math.max(current + step, 0), items.length - 1)]?.focus()
  }

  return (
    <div
      id={panelId}
      ref={registerPanel}
      role="menu"
      aria-label={t('lang.label')}
      onKeyDown={onKeyDown}
      inert={!isOpen}
      className={cn(
        'w-18 rounded-lg border border-line bg-surface p-1 shadow-card',
        placement === 'anchored' && [
          /* `start-1/2` mirrors itself; only the pull back by half the
             panel's own width has to be flipped. */
          'absolute top-full start-1/2 z-dropdown mt-2 -translate-x-1/2 transition-all duration-200 ease-standard rtl:translate-x-1/2',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        ],
      )}
    >
      {options.map((option) => (
        <LanguageOptionLink
          key={option.language}
          option={option}
          inMenu
          /* Picking the current language navigates to the page it is already
             on, which the router treats as no change — so close here rather
             than wait for a route change that will not arrive. */
          onSelect={closeNow}
          className="flex min-h-9 items-center justify-center"
        />
      ))}
    </div>
  )
}

/**
 * Trigger and panel together, which is how the bar uses them: the panel is
 * positioned against this wrapper, so the pair can sit anywhere in the bar
 * without the bar knowing how a popover is anchored.
 */
export function LanguageMenu({ className }: { className?: string }) {
  const menu = useLanguageMenu()

  return (
    /* Full height of the bar, so the panel hangs from the bar's edge rather
       than from the trigger's own box. */
    <div className={cn('relative flex items-center self-stretch', className)}>
      <LanguageMenuTrigger menu={menu} />
      <LanguageMenuPanel menu={menu} />
    </div>
  )
}

/**
 * The same two codes inside the navigation sheet, as one inline pair.
 *
 * No popover here: the sheet is already a panel, and a menu opening out of a
 * menu would have nowhere to go. Two codes take a single row of it, at the
 * sheet's 48px targets.
 */
export function LanguageSheetOptions({ className }: { className?: string }) {
  const { t } = useLanguage()
  const options = useLanguageOptions()

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={cn(
        'flex items-center gap-1 border-t border-line pt-4',
        className,
      )}
    >
      {options.map((option, index) => (
        <Fragment key={option.language}>
          {index > 0 ? (
            <span aria-hidden="true" className="text-line-strong">
              |
            </span>
          ) : null}
          <LanguageOptionLink
            option={option}
            className="flex min-h-12 items-center px-3"
          />
        </Fragment>
      ))}
    </div>
  )
}
