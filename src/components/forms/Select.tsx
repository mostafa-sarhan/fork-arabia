import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { CheckIcon, ChevronDownIcon, SearchIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import { matchesSearch } from '@/lib/forms/search'
import { localizeAll } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { FORM_COPY } from './formCopy'
import {
  panelClass,
  TRIGGER_ICON,
  TRIGGER_PLACEHOLDER,
  TRIGGER_VALUE,
  triggerClass,
  usePopover,
} from './popover'
import { hasFinePointer, prefersSheet } from './sheet'
import { SelectSheet } from './SelectSheet'

export type SelectHow = 'keyboard' | 'pointer'

export type SelectOption = {
  value: string
  label: string
  icon?: ReactNode
  /** A short muted note at the row's end, read left to right ("+49"). */
  detail?: string
}

/**
 * How well an option answers a search: a tier (0 is best), or null when
 * it does not match. Results show by tier, in list order within each.
 */
export type SelectRank = (option: SelectOption, query: string) => number | null

/** Options under one heading. A group with no label shows no heading. */
export type SelectGroup = { id: string; label?: string; icon?: ReactNode; options: readonly SelectOption[] }

/* An option's note: muted, tabular digits, its own left-to-right island ("+49", never "49+"). */
const OPTION_DETAIL = 'shrink-0 text-body-sm tabular-nums text-ink-muted [unicode-bidi:isolate]'

/* The list scrolls past 288px (about six rows); with a search box, 360px. */
const MAX_HEIGHT = 288
const MAX_HEIGHT_SEARCHABLE = 360

/* The panel stacks the search box over the list, which scrolls on its own. */
const PANEL = 'inset-x-0 overflow-hidden'
const LIST = 'relative min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5 scrollbar-slim focus:outline-none'
/* In a sheet the list is the one thing that scrolls, by finger: vertical panning is its own. */
const LIST_IN_SHEET = 'touch-pan-y'

/* The search box: a quiet field across the panel's top, its icon at the start. */
const SEARCH = 'relative shrink-0 border-b border-line p-2'
const SEARCH_INPUT =
  'h-11 w-full rounded-lg bg-page ps-10 pe-3 text-body text-ink placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-turquoise/40'
const SEARCH_ICON = 'pointer-events-none absolute start-5 top-1/2 size-4 -translate-y-1/2 text-ink-muted'

/*
 * A group heading: icon and title, small and petrol, held at the list's
 * top while its options scroll under it.
 */
const GROUP_HEADING =
  'sticky top-0 z-raised -mx-1.5 flex items-center gap-2.5 bg-surface px-4.5 pt-3 pb-2 text-label font-bold text-petrol'

/*
 * One option: at least 44px, an optional icon at the start, the check at
 * the end. The row under the pointer or the arrow keys turns soft
 * turquoise; the chosen one is bold with a turquoise check.
 */
const OPTION =
  'group flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-body text-ink data-active:bg-turquoise-soft aria-selected:font-bold aria-selected:text-heading'
const OPTION_CHECK = 'ms-auto size-4 shrink-0 text-turquoise'

/* No option matches the search. */
const EMPTY = 'px-3 py-6 text-center text-body-sm text-ink-muted'

/* The chosen option's icon, repeated in the trigger. */
const TRIGGER_OPTION_ICON = 'shrink-0'

/* How long typed letters build one search ("su" → Sudan, not Saudi then U…). */
const TYPEAHEAD_MS = 600

type SelectProps = {
  id: string
  /** Also written to a hidden input, so the value is part of the form's data. */
  name?: string
  value: string
  /** The new value, and whether it was chosen with the keyboard or a pointer (mouse, touch). */
  onChange: (value: string, how: SelectHow) => void
  /** A flat list of options… */
  options?: readonly SelectOption[]
  /** …or options under headings (one or the other). */
  groups?: readonly SelectGroup[]
  /** A search box at the top of the panel that filters the options. */
  searchable?: boolean
  /** Ranks search results (SelectRank); without it, matches keep the list's order. */
  rank?: SelectRank
  /** With nothing chosen, the list opens scrolled to this group. */
  openAtGroup?: string
  /** Shown, muted, while nothing is chosen. */
  placeholder: string
  /** The field's label, as the title of the phone sheet. */
  title?: string
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
 * opening it moves focus into the panel, where the arrows, Home and End
 * move, Enter (or Space) chooses, and Escape closes. Choosing or Escape
 * returns focus to the trigger; Tab, or a press outside, simply closes it.
 *
 * Without a search box, a letter jumps to the next option starting with
 * it. With one (`searchable`), focus goes to the box instead, typing
 * filters the options (ignoring case, diacritics and hamza forms), and the
 * keys above work from the box.
 *
 * On phones and touch screens it opens as a bottom sheet instead
 * (SelectSheet): the same search box and list, the list the one scroll
 * area, the search box focused only when tapped (so the keyboard does not
 * jump up uninvited). The desktop dropdown is unchanged.
 */
export function Select({
  id,
  name,
  value,
  onChange,
  options,
  groups,
  searchable = false,
  rank,
  openAtGroup,
  placeholder,
  title = '',
  labelId,
  invalid = false,
  disabled = false,
  'aria-required': ariaRequired,
  'aria-describedby': describedBy,
  className,
}: SelectProps) {
  const { language } = useLanguage()
  const text = localizeAll(FORM_COPY, language)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  /* Decided as it opens: a bottom sheet (phones, touch) or the dropdown. */
  const [asSheet, setAsSheet] = useState(false)
  const [query, setQuery] = useState('')
  /* The active row, as a position in the rows now shown. */
  const [active, setActive] = useState(-1)
  const typed = useRef({ text: '', at: 0 })
  const headingId = useId()

  const listId = `${id}-list`
  const optionId = (index: number) => `${id}-option-${index}`

  /* Every option once, numbered in order (its id), with its group. */
  const allGroups = useMemo(() => groups ?? [{ id: '', options: options ?? [] }], [groups, options])
  const all = useMemo(
    () =>
      allGroups.flatMap((group) => group.options.map((option) => ({ option, group }))).map((row, index) => ({ ...row, index })),
    [allGroups],
  )

  /*
   * The rows shown: all, or those matching the search — by their own
   * label or its group's label; or, with `rank`, those it ranks,
   * best tier first (a stable sort keeps the list's order within a tier).
   */
  const shown = useMemo(() => {
    if (!query.trim()) {
      return all
    }
    if (rank) {
      return all
        .map((row) => ({ row, tier: rank(row.option, query) }))
        .filter((ranked): ranked is { row: (typeof all)[number]; tier: number } => ranked.tier !== null)
        .sort((a, b) => a.tier - b.tier)
        .map((ranked) => ranked.row)
    }
    return all.filter(
      (row) =>
        matchesSearch(row.option.label, query) ||
        matchesSearch(row.group.label ?? '', query),
    )
  }, [all, query, rank])

  const selectedRow = all.find((row) => row.option.value === value)
  const selected = selectedRow?.option
  const activeRow = shown[active]

  /* Closing also clears the search, so the next opening shows every option. */
  const dismiss = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])
  const { side, room } = usePopover({
    open: open && !asSheet,
    onDismiss: dismiss,
    rootRef,
    panelRef,
    maxHeight: searchable ? MAX_HEIGHT_SEARCHABLE : MAX_HEIGHT,
  })

  /*
   * Opened: focus goes to the search box or the list (once it is shown).
   * In a sheet on a touch screen, to the list: the keyboard opens only
   * when the visitor taps the search box.
   */
  useEffect(() => {
    if (open) {
      const toSearch = searchable && (!asSheet || hasFinePointer())
      ;(toSearch ? searchRef.current : listRef.current)?.focus({ preventScroll: true })
    } else {
      typed.current = { text: '', at: 0 }
    }
  }, [open, searchable, asSheet])

  /* Keep the active row in view as the arrows or typing move it. */
  const activeIndex = activeRow?.index
  useEffect(() => {
    if (open && activeIndex !== undefined) {
      document.getElementById(`${id}-option-${activeIndex}`)?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, activeIndex, id])

  /* Opened with nothing chosen and a group asked for: that group at the top. */
  useEffect(() => {
    if (open && !value && openAtGroup) {
      const heading = document.getElementById(`${headingId}-${openAtGroup}`)
      if (heading && listRef.current) {
        listRef.current.scrollTop = heading.parentElement?.offsetTop ?? 0
      }
    }
  }, [open, value, openAtGroup, headingId])

  function openPanel(fallback: 'first' | 'last' = 'first') {
    const groupStart = openAtGroup && !value ? all.findIndex((row) => row.group.id === openAtGroup) : -1
    const start = selectedRow?.index ?? (groupStart >= 0 ? groupStart : fallback === 'last' ? all.length - 1 : 0)
    setActive(start)
    setAsSheet(prefersSheet())
    setOpen(true)
  }

  function close(returnFocus: boolean) {
    dismiss()
    if (!returnFocus) {
      return
    }
    if (asSheet) {
      /*
       * After the sheet has gone and the page is back in place, unless the
       * choice already sent focus on (the country hands it to the phone).
       */
      requestAnimationFrame(() => {
        if (!document.activeElement || document.activeElement === document.body) {
          triggerRef.current?.focus({ preventScroll: true })
        }
      })
    } else {
      triggerRef.current?.focus()
    }
  }

  function choose(position: number, how: SelectHow) {
    const row = shown[position]
    if (!row) {
      return
    }
    onChange(row.option.value, how)
    close(true)
  }

  /* A space typed mid-search ("united a…") belongs to the search, not a choice. */
  const isSearching = () => Date.now() - typed.current.at < TYPEAHEAD_MS

  const isLetter = (event: KeyboardEvent) =>
    event.key.length === 1 && (event.key !== ' ' || isSearching()) && !event.ctrlKey && !event.metaKey && !event.altKey

  /** The next shown option, after `from`, whose label starts with the typed letters. */
  function typeahead(key: string, from: number) {
    const now = Date.now()
    const letters = now - typed.current.at < TYPEAHEAD_MS ? typed.current.text + key : key
    typed.current = { text: letters, at: now }

    const start = letters.length === 1 ? from + 1 : Math.max(from, 0)
    for (let step = 0; step < shown.length; step++) {
      const position = (start + step) % shown.length
      if (matchesSearch(shown[position].option.label, letters, 'start')) {
        return position
      }
    }
    return -1
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      openPanel(event.key === 'ArrowUp' ? 'last' : 'first')
    } else if (isLetter(event) && !searchable) {
      const match = typeahead(event.key, selectedRow?.index ?? -1)
      setActive(match >= 0 ? match : Math.max(selectedRow?.index ?? 0, 0))
      setAsSheet(prefersSheet())
      setOpen(true)
    }
  }

  /** The panel's keys, from the list or from the search box. */
  function onPanelKeyDown(event: KeyboardEvent<HTMLElement>) {
    const last = shown.length - 1
    const moves: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      /* In the search box Home and End move the caret, as in any text box. */
      ...(searchable ? {} : { Home: 0, End: last }),
    }

    if (event.key in moves) {
      event.preventDefault()
      setActive(moves[event.key])
    } else if (event.key === 'Enter' || (event.key === ' ' && !searchable && !isSearching())) {
      event.preventDefault()
      choose(active, 'keyboard')
    } else if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      close(true)
    } else if (event.key === 'Tab') {
      close(false)
    } else if (isLetter(event) && !searchable) {
      const match = typeahead(event.key, active)
      if (match >= 0) {
        setActive(match)
      }
    }
  }

  function renderOption({ option, index }: (typeof all)[number], position: number) {
    return (
      <div
        key={option.value}
        id={optionId(index)}
        role="option"
        aria-selected={option.value === value}
        data-active={position === active || undefined}
        onMouseMove={() => setActive(position)}
        onClick={() => choose(position, 'pointer')}
        className={OPTION}
      >
        {option.icon}
        <span className="min-w-0 flex-1">{option.label}</span>
        {option.detail ? (
          <bdi dir="ltr" className={OPTION_DETAIL}>
            {option.detail}
          </bdi>
        ) : null}
        {option.value === value ? <CheckIcon aria-hidden="true" className={OPTION_CHECK} /> : null}
      </div>
    )
  }

  /* The shown rows, under their group headings when there are groups. */
  function renderRows() {
    if (!groups) {
      return shown.map(renderOption)
    }
    return allGroups.map((group) => {
      const rows = shown.filter((row) => row.group === group)
      if (!rows.length) {
        return null
      }
      const groupHeadingId = `${headingId}-${group.id}`
      return (
        <div key={group.id} role="group" aria-labelledby={group.label ? groupHeadingId : undefined}>
          {group.label ? (
            <div id={groupHeadingId} role="presentation" className={GROUP_HEADING}>
              {group.icon}
              {group.label}
            </div>
          ) : null}
          {rows.map((row) => renderOption(row, shown.indexOf(row)))}
        </div>
      )
    })
  }

  /* The search box and the list: in the dropdown, or in the phone sheet. */
  const panelBody = (
    <>
      {searchable ? (
        <div className={SEARCH}>
          <SearchIcon aria-hidden="true" className={SEARCH_ICON} />
          <input
            ref={searchRef}
            type="search"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open && activeRow ? optionId(activeRow.index) : undefined}
            aria-label={text.search}
            placeholder={text.search}
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            onKeyDown={onPanelKeyDown}
            className={SEARCH_INPUT}
          />
        </div>
      ) : null}

      <div
        ref={listRef}
        id={listId}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={labelId}
        aria-required={ariaRequired}
        aria-activedescendant={!searchable && open && activeRow ? optionId(activeRow.index) : undefined}
        onKeyDown={searchable ? undefined : onPanelKeyDown}
        /* With a search box, a press on the list leaves focus (and the
           phone keyboard) in the box. */
        onMouseDown={searchable ? (event) => event.preventDefault() : undefined}
        className={cn(LIST, asSheet && LIST_IN_SHEET)}
      >
        {renderRows()}
      </div>
      {searchable ? (
        <p role="status" className={shown.length ? 'sr-only' : EMPTY}>
          {shown.length ? '' : text.noResults}
        </p>
      ) : null}
    </>
  )

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
        onClick={() => (open ? close(true) : openPanel())}
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

      {open && asSheet ? (
        <SelectSheet title={title} onClose={() => close(true)}>
          {panelBody}
        </SelectSheet>
      ) : (
        <div
          ref={panelRef}
          onBlur={(event) => {
            if (!rootRef.current?.contains(event.relatedTarget)) {
              dismiss()
            }
          }}
          style={{ maxHeight: room }}
          className={panelClass(open, side, PANEL, 'column')}
        >
          {panelBody}
        </div>
      )}
    </div>
  )
}
