/**
 * Holds the page still under a sheet: the body is pinned in place
 * (position: fixed, moved up by the scroll it had), so the page cannot
 * scroll on any browser, iOS Safari included — and no touchmove is
 * blocked, so the sheet's own list still scrolls with a finger. The
 * returned function frees the page and puts it back where it was.
 */
export function lockPageScroll() {
  const { body } = document
  const scrollY = window.scrollY
  const before = {
    position: body.style.position,
    top: body.style.top,
    insetInline: body.style.insetInline,
    width: body.style.width,
  }

  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.insetInline = '0'
  body.style.width = '100%'

  return () => {
    Object.assign(body.style, before)
    /* Instantly: the page's smooth scrolling would otherwise animate the jump back. */
    window.scrollTo({ top: scrollY, behavior: 'instant' })
  }
}
