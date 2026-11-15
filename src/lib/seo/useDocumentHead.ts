import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { PAGE_HEAD_ATTRIBUTE, pageHead } from './pageHead'

/**
 * Keeps the document's head in step with the page, from the same
 * pageHead() the prerender used. On arrival the prerendered tags are
 * already right; on each navigation they are swapped for the new page's,
 * so no stale title or canonical survives. Mounted once, in the layout.
 */
export function useDocumentHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    for (const element of document.head.querySelectorAll(`[${PAGE_HEAD_ATTRIBUTE}]`)) {
      element.remove()
    }

    for (const tag of pageHead(pathname)) {
      const element = document.createElement(tag.tag)
      element.setAttribute(PAGE_HEAD_ATTRIBUTE, '')
      for (const [key, value] of Object.entries(tag)) {
        if (key === 'text') element.textContent = String(value)
        else if (key !== 'tag') element.setAttribute(key, String(value))
      }
      document.head.append(element)
    }
  }, [pathname])
}
