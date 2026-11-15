import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { CheckIcon, ChevronDownIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import {
  panelClass,
  TRIGGER_ICON,
  TRIGGER_PLACEHOLDER,
  TRIGGER_VALUE,
  triggerClass,
  usePopover,
} from './popover'

export type SelectOption = { value: string; label: string; icon?: ReactNode }

/* The list scrolls past 288px (about six rows). */
const MAX_HEIGHT = 288

/* The list inside the panel: 6px around the rows, scrolling on its own. */
const LIST = 'overflow-y-auto overscroll-contain p-1.5 scrollbar-slim focus:outline-none'

/*
 * One option: at least 44px, an optional icon at the start, the check at
 * the end. The row under the pointer or the arrow keys turns soft
 * turquoise; the chosen one is bold with a turquoise check.
 */
const OPTION =
  'group flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-body text-ink data-active:bg-turquoise-soft aria-selected:font-bold aria-selected:text-heading'
const OPTION_CHECK = 'ms-auto size-4 shrink-0 text-turquoise'

/* The chosen option's icon, repeated in the trigger. */
const TRIGGER_OPTION_ICON = 'shrink-0'

/* How long typed letters build one search ("su" → Sudan, not Saudi then U…). */
const TYPEAHEAD_MS = 600

type SelectProps = {
  id: string
  /** Also written to a hidden input, so the value is part of the form's data. */
  name?: string
  value: string
  onChange: (value: string) => void
  options: readonly SelectOption[]
  /** Shown, muted, while nothing is chosen. */
  placeholder: string
  /** The visible label's id: the trigger and the list are named by it. */
  labelId: string
  invalid?: boolean
  disabled?: boolean
  'aria-required'?: true
  'aria-describedby'?: string
  className?: string
}

/**
 * The site's dropdown (ARIA collapsible listbox). The trigger is a button;
 * opening it moves focus to the list, where the arrows, Home and End move,
 * Enter or Space chooses, a letter jumps to the next option starting with
 * it, and Escape closes. Choosing or Escape returns focus to the trigger;
 * Tab, or a press outside, simply closes it.
 */
export function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  labelId,
  invalid = false,
  disabled = false,
  'aria-required': ariaRequired,
  'aria-describedby': describedBy,
  className,
}: SelectProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const typed = useRef({ text: '', at: 0 })

  const listId = `${id}-list`
  const optionId = (index: number) => `${id}-option-${index}`
  const selectedIndex = options.findIndex((option) => option.value === value)
  const selected = options[selectedIndex]

  const dismiss = useCallback(() => setOpen(false), [])
  const { side, room } = usePopover({ open, onDismiss: dismiss, rootRef, panelRef: listRef, maxHeight: MAX_HEIGHT })

  /* Opened: focus goes to the list (once it is visible). */
  useEffect(() => {
    if (open) {
      listRef.current?.focus({ preventScroll: true })
    }
  }, [open])

  /* Keep the active row in view as the arrows or typing move it. */
  useEffect(() => {
    if (open && active >= 0) {
      document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, active, id])

  function openAt(index: number) {
    setActive(index)
    setOpen(true)
  }

  function close(returnFocus: boolean) {
    setOpen(false)
    if (returnFocus) {
      triggerRef.current?.focus()
    }
  }

  function choose(index: number) {
    const option = options[index]
    if (option) {
      onChange(option.value)
    }
    close(true)
  }

  /** The next option, after `from`, whose label starts with the typed letters. */
  function typeahead(key: string, from: number) {
    const now = Date.now()
    const text = now - typed.current.at < TYPEAHEAD_MS ? typed.current.text + key : key
    typed.current = { text, at: now }

    const query = text.toLocaleLowerCase()
    const start = text.length === 1 ? from + 1 : Math.max(from, 0)
    for (let step = 0; step < options.length; step++) {
      const index = (start + step) % options.length
      if (options[index].label.toLocaleLowerCase().startsWith(query)) {
        return index
      }
    }
    return -1
  }

  /* A space typed mid-search ("united a…") belongs to the search, not a choice. */
  const isSearching = () => Date.now() - typed.current.at < TYPEAHEAD_MS

  const isLetter = (event: KeyboardEvent) =>
    event.key.length === 1 && (event.key !== ' ' || isSearching()) && !event.ctrlKey && !event.metaKey && !event.altKey

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const fallback = event.key === 'ArrowUp' ? options.length - 1 : 0
      openAt(selectedIndex >= 0 ? selectedIndex : fallback)
    } else if (isLetter(event)) {
      const match = typeahead(event.key, selectedIndex)
      openAt(match >= 0 ? match : Math.max(selectedIndex, 0))
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const last = options.length - 1
    const moves: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      Home: 0,
      End: last,
    }

    if (event.key in moves) {
      event.preventDefault()
      setActive(moves[event.key])
    } else if (event.key === 'Enter' || (event.key === ' ' && !isSearching())) {
      event.preventDefault()
      choose(active)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      close(true)
    } else if (event.key === 'Tab') {
      close(false)
    } else if (isLetter(event)) {
      const match = typeahead(event.key, active)
      if (match >= 0) {
        setActive(match)
      }
    }
  }

  /* Each opening starts a fresh search. */
  useEffect(() => {
    if (!open) {
      typed.current = { text: '', at: 0 }
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      {name ? <input type="hidden" name={name} value={value} /> : null}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        onClick={() => (open ? close(true) : openAt(selectedIndex >= 0 ? selectedIndex : 0))}
        onKeyDown={onTriggerKeyDown}
        className={triggerClass(invalid, className)}
      >
        {selected?.icon ? <span className={TRIGGER_OPTION_ICON}>{selected.icon}</span> : null}
        <span className={selected ? TRIGGER_VALUE : TRIGGER_PLACEHOLDER}>{selected?.label ?? placeholder}</span>
        <ChevronDownIcon
          className={cn(
            TRIGGER_ICON,
            'transition-[rotate] duration-(--duration-hover) ease-out-soft motion-reduce:transition-none',
            open && 'rotate-180',
          )}
        />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={labelId}
        aria-required={ariaRequired}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        onKeyDown={onListKeyDown}
        onBlur={(event) => {
          if (!rootRef.current?.contains(event.relatedTarget)) {
            setOpen(false)
          }
        }}
        style={{ maxHeight: room }}
        className={panelClass(open, side, cn('inset-x-0', LIST))}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            id={optionId(index)}
            role="option"
            aria-selected={option.value === value}
            data-active={index === active || undefined}
            onMouseMove={() => setActive(index)}
            onClick={() => choose(index)}
            className={OPTION}
          >
            {option.icon}
            <span className="min-w-0 flex-1">{option.label}</span>
            {option.value === value ? <CheckIcon aria-hidden="true" className={OPTION_CHECK} /> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
