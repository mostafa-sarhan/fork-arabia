/**
 * The one field surface, shared by Input, Textarea and the custom Select
 * and DatePicker triggers, so every form on the site looks the same: a
 * white field, 12px radius and a soft grey border that darkens a little on
 * hover. On focus the border turns petrol (it carries the contrast a focus
 * indicator needs) inside a soft turquoise ring, the site's focus accent.
 *
 * Horizontal padding is written as logical ps/pe rather than px so a consumer
 * can override a single side: `pe-10` replaces `pe-4` outright. px-* and
 * pe-* write different CSS properties, so both would survive the merge and
 * the outcome would fall back to stylesheet order.
 */
export const fieldBase =
  'w-full rounded-xl border border-line-strong bg-surface ps-4 pe-4 text-body text-ink transition-[border-color,box-shadow] duration-(--duration-hover) placeholder:text-ink-muted/70 hover:border-ink-muted/45 focus:border-petrol focus:outline-none focus:ring-4 focus:ring-turquoise/25 disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled-bg disabled:text-disabled-fg'

/** Applied on top of fieldBase while a field is invalid: the error red, focused or not. */
export const fieldInvalid =
  'border-danger-strong hover:border-danger-strong focus:border-danger-strong focus:ring-danger/20'
