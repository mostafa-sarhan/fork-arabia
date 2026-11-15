import type { ReactNode } from 'react'
import { CheckIcon } from '@/components/ui/icons'
import type { FieldBinding } from './Field'

export type RadioCardOption = { value: string; label: string; icon?: ReactNode }

/* The legend reads as the other fields' labels do. */
const LEGEND = 'mb-2 text-label font-semibold text-heading'

/* As many cards as options, side by side, sharing the row. */
const GRID = 'grid auto-cols-fr grid-flow-col gap-2.5'

/*
 * One choice: a 52px card, like the inputs, its label on one line. The
 * real radio is visually hidden but stays the control, so arrow keys and
 * screen readers work as for any radio group. Chosen: turquoise border on
 * soft turquoise, and a check badge on the card's top inline-end corner.
 * Keyboard focus: the fields' ring. Below 640 three cards are about 90px
 * wide, so their icons are dropped there.
 */
const CARD =
  'group relative flex h-13 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-line-strong bg-surface px-2 sm:px-3 text-body font-semibold text-ink max-sm:[&>svg]:hidden transition-[border-color,background-color,color,box-shadow] duration-(--duration-hover) hover:border-ink-muted/45 has-checked:border-turquoise has-checked:bg-turquoise-soft has-checked:text-heading has-focus-visible:border-petrol has-focus-visible:ring-4 has-focus-visible:ring-turquoise/25'

/* The check: a turquoise disc straddling the corner, popping in when chosen. */
const CHECK =
  'absolute -top-2 -end-2 grid size-5 place-items-center rounded-full bg-turquoise text-navy scale-0 opacity-0 transition-[scale,opacity] duration-(--duration-hover) ease-out-soft group-has-checked:scale-100 group-has-checked:opacity-100 motion-reduce:transition-none'

type RadioCardsProps = {
  /** From `useForm().field(name)`. */
  field: FieldBinding
  label: string
  options: readonly RadioCardOption[]
  className?: string
}

/** A small set of choices as cards, one of which is always chosen. */
export function RadioCards({ field, label, options, className }: RadioCardsProps) {
  return (
    <fieldset className={className}>
      <legend className={LEGEND}>{label}</legend>

      <div className={GRID}>
        {options.map((option) => (
          <label key={option.value} className={CARD}>
            <input
              type="radio"
              name={field.name}
              value={option.value}
              checked={field.value === option.value}
              onChange={field.onChange}
              className="sr-only"
            />
            {option.icon}
            {option.label}
            <span aria-hidden="true" className={CHECK}>
              <CheckIcon size={12} strokeWidth={3} />
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
