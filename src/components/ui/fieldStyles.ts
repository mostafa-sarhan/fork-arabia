/**
 * The one field surface, shared by Input, Textarea and Select.
 *
 * Horizontal padding is written as logical ps/pe rather than px so a consumer
 * can override a single side: `pe-10` replaces `pe-3.5` outright. px-* and
 * pe-* write different CSS properties, so both would survive the merge and
 * the outcome would fall back to stylesheet order.
 */
export const fieldBase =
  'w-full rounded-md border border-line-strong bg-surface ps-3.5 pe-3.5 text-body text-ink transition-colors duration-200 placeholder:text-ink-muted/70 focus:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/20 disabled:cursor-not-allowed disabled:bg-page disabled:text-ink-muted'

/** Applied on top of fieldBase while a field is invalid. */
export const fieldInvalid =
  'border-danger focus:border-danger focus:ring-danger/20'
