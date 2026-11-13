import { cn } from '@/lib/cn'

export type ServiceFilterOption = {
  /** 'all', or a country code. */
  value: string
  label: string
  count: number
}

type ServiceFilterProps = {
  label: string
  options: ServiceFilterOption[]
  active: string
  onChange: (value: string) => void
}

/*
 * The strip of pills. Below 1024 it is one row that scrolls sideways,
 * running to the screen edges (the negative margins cancel the
 * container's gutter) with its scrollbar hidden; from 1024 it wraps.
 * `scrollbar-width` has no utility, hence the arbitrary property.
 */
const STRIP =
  'flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] -mx-gutter px-gutter sm:-mx-gutter-sm sm:px-gutter-sm lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-visible'

/* One pill: 44px tall, fully rounded; navy when pressed. */
const PILL =
  'inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-5 text-body-sm font-bold transition-colors duration-(--duration-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 focus-visible:ring-offset-page'
const PILL_IDLE = 'border-line-strong bg-surface text-heading hover:border-navy'
const PILL_ACTIVE = 'border-navy bg-navy text-white'

/**
 * Toggle buttons that narrow a sector's services to one country. Each
 * pill is a button with aria-pressed; exactly one is pressed at a time.
 */
export function ServiceFilter({ label, options, active, onChange }: ServiceFilterProps) {
  return (
    <div role="group" aria-label={label} className={STRIP}>
      {options.map((option) => {
        const isActive = option.value === active

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(PILL, isActive ? PILL_ACTIVE : PILL_IDLE)}
          >
            {option.label}
            <span className="tabular-nums opacity-75">({option.count})</span>
          </button>
        )
      })}
    </div>
  )
}
