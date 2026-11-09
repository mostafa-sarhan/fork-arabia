import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode
  description?: ReactNode
}

type ChoiceControlProps = ChoiceProps & {
  type: 'checkbox' | 'radio'
}

function ChoiceControl({
  type,
  label,
  description,
  className,
  id,
  ...props
}: ChoiceControlProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = description ? `${inputId}-description` : undefined

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <input
        id={inputId}
        type={type}
        aria-describedby={descriptionId}
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
      <div className="min-w-0">
        <label htmlFor={inputId} className="text-body-sm font-medium text-ink">
          {label}
        </label>
        {description ? (
          <p id={descriptionId} className="mt-0.5 text-caption text-ink-muted">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function Checkbox(props: ChoiceProps) {
  return <ChoiceControl type="checkbox" {...props} />
}

export function Radio(props: ChoiceProps) {
  return <ChoiceControl type="radio" {...props} />
}
