import { useEffect, useId, useRef, type ReactNode } from 'react'
import { CloseIcon } from '@/components/ui/icons'
import { lockPageScroll } from '@/lib/scrollLock'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { useVisualViewport } from './sheet'

/*
 * The dialog fills the visible screen (above the keyboard, see the style
 * below) with a transparent body; its backdrop dims the page. A tap on
 * the dim area lands on the dialog itself and closes it.
 */
const DIALOG =
  'fixed inset-x-0 bottom-auto m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 backdrop:bg-navy/40 motion-safe:backdrop:animate-fade-in'

/*
 * The sheet: full width at the bottom, rounded top corners, as tall as
 * its content up to 85% of the screen — and never taller than the screen
 * above the keyboard, less a 16px gap. It slides up (motion tokens); with
 * reduced motion it simply appears. The home bar's safe area is kept clear.
 */
const SHEET =
  'absolute inset-x-0 bottom-0 flex max-h-[min(85dvh,calc(100%-(--spacing(4))))] flex-col rounded-t-2xl bg-surface pb-[env(safe-area-inset-bottom)] shadow-raised motion-safe:animate-sheet-in'

/* A small grab handle, centred on the top edge. */
const HANDLE = 'mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-line-strong'

/* The header: the field's label as the title, the 44px close button at the end. */
const HEADER = 'flex shrink-0 items-center gap-3 border-b border-line py-1 ps-5 pe-2'
const TITLE = 'min-w-0 flex-1 truncate text-body-lg font-bold text-heading'
const CLOSE =
  'grid size-11 shrink-0 place-items-center rounded-full text-ink-muted transition-colors duration-(--duration-hover) hover:bg-navy-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol'

type SelectSheetProps = {
  /** The field's label. */
  title: string
  /** Closes it (the Select then puts focus back on its trigger). */
  onClose: () => void
  /** The search box and the list. */
  children: ReactNode
}

/**
 * A Select's options as a bottom sheet, for phones and touch screens.
 * Shown, it is a modal dialog: the page behind is inert and held still
 * (lockPageScroll), the sheet stays above the on-screen keyboard, and it
 * closes from its backdrop, its close button, Escape, or the browser's
 * back gesture (opening it adds a history step, closing it takes that
 * step back). Mounted only while open.
 */
export function SelectSheet({ title, onClose, children }: SelectSheetProps) {
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const viewport = useVisualViewport(true)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }
    /*
     * The back gesture closes the sheet, not the page. The step is added
     * before the page is pinned, so the browser remembers the page's real
     * scroll for it (and restores that, not the top, on the way back).
     */
    let ownStep = true
    window.history.pushState({ ...window.history.state, selectSheet: true }, '')
    const unlock = lockPageScroll()
    dialog.showModal()
    function onPopState() {
      ownStep = false
      onCloseRef.current()
    }
    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
      if (dialog.open) {
        dialog.close()
      }
      unlock()
      /* Closed some other way: take back the step it added. */
      if (ownStep && window.history.state?.selectSheet) {
        window.history.back()
      }
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose()
        }
      }}
      /* Sized to the visible screen, so the sheet sits above the keyboard. */
      style={viewport ? { top: viewport.top, height: viewport.height } : undefined}
      className={DIALOG}
    >
      <div className={SHEET}>
        <span aria-hidden="true" className={HANDLE} />
        <div className={HEADER}>
          <h2 id={titleId} className={TITLE}>
            {title}
          </h2>
          {/* First in the sheet, so the dialog's own first focus lands here, not on the search box. */}
          <button type="button" aria-label={t('icon.close')} onClick={onClose} className={CLOSE}>
            <CloseIcon aria-hidden="true" className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
