import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { CalendarIcon, ChevronRightIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import {
  addDays,
  addMonths,
  formatDate,
  formatMonth,
  monthGrid,
  monthOf,
  todayValue,
  weekdayHeads,
} from '@/lib/forms/dates'
import { localizeAll, proposed } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import {
  panelClass,
  TRIGGER_ICON,
  TRIGGER_PLACEHOLDER,
  TRIGGER_VALUE,
  triggerClass,
  usePopover,
} from './popover'

/* The calendar's own words, not in the storyboard (`proposed`, docs/copy-review.md). */
const COPY = {
  placeholder: proposed('اختر التاريخ', 'Choose a date'),
  previous: proposed('الشهر السابق', 'Previous month'),
  next: proposed('الشهر التالي', 'Next month'),
}

/*
 * The calendar panel: 336px, or the screen less 32px on phones, so seven
 * day columns stay at least 40px wide. 12px inside.
 */
const PANEL = 'start-0 w-[min(21rem,calc(100vw-2rem))] p-3'

/* Month header: previous, the month's name, next. */
const HEADER = 'mb-2 flex items-center justify-between gap-2'
const MONTH = 'text-body font-bold text-heading'
const MONTH_BUTTON =
  'grid size-10 place-items-center rounded-lg text-ink transition-colors duration-(--duration-hover) hover:bg-turquoise-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol disabled:pointer-events-none disabled:text-ink-muted/35'

/* Seven equal columns; the day names small and muted. */
const GRID = 'w-full table-fixed border-collapse'
const HEAD = 'pb-1 text-caption font-medium text-ink-muted'

/*
 * A day: a 40px button. Today has a thin turquoise ring; the chosen day is
 * navy with white text; past days and Fridays are muted and cannot be
 * chosen (they can still be reached by the arrows, and say so).
 */
const DAY =
  'mx-auto grid h-10 w-full max-w-11 place-items-center rounded-lg text-body-sm font-semibold tabular-nums transition-colors duration-(--duration-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol'
const DAY_OPEN = 'cursor-pointer text-ink hover:bg-turquoise-soft'
const DAY_OFF = 'cursor-not-allowed text-ink-muted/40'
const DAY_TODAY = 'ring-1 ring-inset ring-turquoise'
const DAY_CHOSEN = 'bg-navy text-white hover:bg-navy-strong'

type DatePickerProps = {
  id: string
  /** Also written to a hidden input, so the value is part of the form's data. */
  name?: string
  /** "YYYY-MM-DD", or "" for none. */
  value: string
  onChange: (value: string) => void
  /** Days that cannot be chosen. Days before today never can. */
  isDayOff?: (value: string) => boolean
  /** The visible label's id: the trigger and the calendar are named by it. */
  labelId: string
  invalid?: boolean
  'aria-describedby'?: string
  className?: string
}

/**
 * A date field: a trigger showing the chosen date in words, and a calendar
 * popover (ARIA date picker dialog, non-modal). In the calendar the arrows
 * move by day and week, Home and End to the week's ends, PageUp and
 * PageDown by month; Enter or Space chooses, Escape closes. Choosing or
 * Escape returns focus to the trigger.
 */
export function DatePicker({
  id,
  name,
  value,
  onChange,
  isDayOff,
  labelId,
  invalid = false,
  'aria-describedby': describedBy,
  className,
}: DatePickerProps) {
  const { language, direction } = useLanguage()
  const text = localizeAll(COPY, language)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLTableElement>(null)
  const [open, setOpen] = useState(false)
  const today = todayValue()
  const [focused, setFocused] = useState(value || today)
  const moveFocus = useRef(false)

  const dismiss = useCallback(() => setOpen(false), [])
  const { side, shift } = usePopover({ open, onDismiss: dismiss, rootRef, panelRef })

  const isOff = (day: string) => day < today || Boolean(isDayOff?.(day))
  const shownMonth = monthOf(focused)
  const canGoBack = shownMonth > monthOf(today)

  /* Arrow keys and opening move real focus to the focused day once it is drawn. */
  useEffect(() => {
    if (open && moveFocus.current) {
      moveFocus.current = false
      gridRef.current?.querySelector<HTMLElement>(`[data-day="${focused}"]`)?.focus({ preventScroll: true })
    }
  }, [open, focused])

  function openCalendar() {
    moveFocus.current = true
    setFocused(value || today)
    setOpen(true)
  }

  function close(returnFocus: boolean) {
    setOpen(false)
    if (returnFocus) {
      triggerRef.current?.focus()
    }
  }

  function choose(day: string) {
    if (isOff(day)) {
      return
    }
    onChange(day)
    close(true)
  }

  /** Moves the focused day, never before the first of this month. */
  function focusDay(day: string) {
    moveFocus.current = true
    setFocused(day < `${monthOf(today)}-01` ? `${monthOf(today)}-01` : day)
  }

  function onGridKeyDown(event: KeyboardEvent<HTMLTableElement>) {
    /* In Arabic the week runs right to left, so → is the day before. */
    const forward = direction === 'rtl' ? -1 : 1
    const column = Number(gridRef.current?.querySelector(`[data-day="${focused}"]`)?.getAttribute('data-column')) || 0
    const moves: Record<string, () => string> = {
      ArrowRight: () => addDays(focused, forward),
      ArrowLeft: () => addDays(focused, -forward),
      ArrowDown: () => addDays(focused, 7),
      ArrowUp: () => addDays(focused, -7),
      Home: () => addDays(focused, -column),
      End: () => addDays(focused, 6 - column),
      PageDown: () => addMonths(focused, 1),
      PageUp: () => addMonths(focused, -1),
    }

    if (event.key in moves) {
      event.preventDefault()
      focusDay(moves[event.key]())
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      choose(focused)
    }
  }

  function onPanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      close(true)
    }
  }

  function showMonth(months: number) {
    setFocused((day) => {
      const next = addMonths(day, months)
      return next < `${monthOf(today)}-01` ? today : next
    })
  }

  const weeks = monthGrid(focused)
  const heads = weekdayHeads(language)

  return (
    <div ref={rootRef} className="relative">
      {name ? <input type="hidden" name={name} value={value} /> : null}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-calendar`}
        aria-labelledby={`${labelId} ${id}`}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        onClick={() => (open ? close(true) : openCalendar())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            openCalendar()
          }
        }}
        className={triggerClass(invalid, className)}
      >
        <span className={value ? TRIGGER_VALUE : TRIGGER_PLACEHOLDER}>
          {value ? formatDate(value, language) : text.placeholder}
        </span>
        <CalendarIcon className={TRIGGER_ICON} />
      </button>

      <div
        ref={panelRef}
        id={`${id}-calendar`}
        role="dialog"
        aria-modal="false"
        aria-labelledby={labelId}
        onKeyDown={onPanelKeyDown}
        onBlur={(event) => {
          if (!rootRef.current?.contains(event.relatedTarget)) {
            setOpen(false)
          }
        }}
        style={{ insetInlineStart: shift }}
        className={panelClass(open, side, PANEL)}
      >
        <div className={HEADER}>
          <button
            type="button"
            aria-label={text.previous}
            disabled={!canGoBack}
            onClick={() => showMonth(-1)}
            className={MONTH_BUTTON}
          >
            <ChevronRightIcon size={18} className="ltr:-scale-x-100" />
          </button>
          <p aria-live="polite" className={MONTH}>
            {formatMonth(focused, language)}
          </p>
          <button type="button" aria-label={text.next} onClick={() => showMonth(1)} className={MONTH_BUTTON}>
            <ChevronRightIcon size={18} className="rtl:-scale-x-100" />
          </button>
        </div>

        <table ref={gridRef} role="grid" aria-label={formatMonth(focused, language)} onKeyDown={onGridKeyDown} className={GRID}>
          <thead>
            <tr>
              {heads.map((head) => (
                <th key={head.full} scope="col" abbr={head.full} className={HEAD}>
                  {head.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, row) => (
              <tr key={row}>
                {week.map((day, column) =>
                  day ? (
                    <td key={day} aria-selected={day === value} className="p-0.5">
                      <button
                        type="button"
                        data-day={day}
                        data-column={column}
                        tabIndex={day === focused ? 0 : -1}
                        aria-label={formatDate(day, language)}
                        aria-disabled={isOff(day) || undefined}
                        aria-current={day === today ? 'date' : undefined}
                        onClick={() => choose(day)}
                        onFocus={() => setFocused(day)}
                        className={cn(
                          DAY,
                          isOff(day) ? DAY_OFF : DAY_OPEN,
                          day === today && DAY_TODAY,
                          day === value && DAY_CHOSEN,
                        )}
                      >
                        {Number(day.slice(8))}
                      </button>
                    </td>
                  ) : (
                    <td key={`blank-${column}`} />
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
