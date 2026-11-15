import { useId } from 'react'
import { resolveCopy } from '@/lib/i18n/localized'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { FieldShell, type FieldBinding } from './Field'
import { FORM_COPY } from './formCopy'
import { Select, type SelectGroup, type SelectHow, type SelectOption, type SelectRank } from './Select'

type SelectFieldProps = {
  /** From `useForm().field(name)`. */
  field: FieldBinding
  label: string
  /** A flat list of options, or `groups` of them under headings. */
  options?: readonly SelectOption[]
  groups?: readonly SelectGroup[]
  /** A search box at the top of the list. */
  searchable?: boolean
  /** Orders the search's results (see Select). */
  rank?: SelectRank
  /** With nothing chosen, the list opens scrolled to this group. */
  openAtGroup?: string
  /** Called after a choice, with how it was made (keyboard or pointer). */
  onChoose?: (value: string, how: SelectHow) => void
  required?: boolean
  hint?: string
  className?: string
}

/** A dropdown field, opening on a muted "Select an option". */
export function SelectField({
  field,
  label,
  options,
  groups,
  searchable,
  rank,
  openAtGroup,
  onChoose,
  required,
  hint,
  className,
}: SelectFieldProps) {
  const id = useId()
  const { language } = useLanguage()

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={field.error}
      className={className}
      buttonControl
    >
      {(control, labelId) => (
        <Select
          {...control}
          labelId={labelId}
          name={field.name}
          value={field.value}
          onChange={(value, how) => {
            field.setValue(value)
            onChoose?.(value, how)
          }}
          options={options}
          groups={groups}
          searchable={searchable}
          rank={rank}
          openAtGroup={openAtGroup}
          placeholder={resolveCopy(FORM_COPY.choose, language)}
        />
      )}
    </FieldShell>
  )
}
