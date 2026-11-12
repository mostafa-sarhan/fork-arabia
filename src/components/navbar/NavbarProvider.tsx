import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router'
import { NavbarContext, useNavbar, type NavbarMenu } from './useNavbar'

/**
 * The state of the whole navbar: which popover is open, and whether the
 * mobile sheet is open.
 *
 * Both are stored as the page they were opened on, so a navigation closes
 * them by definition rather than through an effect chasing the router. One
 * `openMenu` value is also what keeps the services panel and the language
 * menu from ever covering each other: opening one closes the other.
 *
 * The sheet's state lives here rather than in the navbar because opening it
 * has to make the rest of the page inert, and that is the navbar's sibling —
 * which is what `InertWhileMenuOpen` wraps.
 */
export function NavbarProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const mobileMenuId = useId()
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const [opened, setOpened] = useState<{
    menu: NavbarMenu
    pathname: string
  } | null>(null)
  const [mobileOpenedOn, setMobileOpenedOn] = useState<string | null>(null)

  const openMenu = opened?.pathname === pathname ? opened.menu : null
  const isMobileMenuOpen = mobileOpenedOn === pathname

  const setOpenMenu = useCallback(
    (menu: NavbarMenu | null) => setOpened(menu ? { menu, pathname } : null),
    [pathname],
  )

  const closeMobileMenu = useCallback(() => {
    setMobileOpenedOn(null)
    toggleRef.current?.focus()
  }, [])

  const toggleMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      closeMobileMenu()
      return
    }

    setMobileOpenedOn(pathname)
  }, [closeMobileMenu, isMobileMenuOpen, pathname])

  const registerMobileToggle = useCallback(
    (node: HTMLButtonElement | null) => {
      toggleRef.current = node
    },
    [],
  )

  const value = useMemo(
    () => ({
      openMenu,
      setOpenMenu,
      isMobileMenuOpen,
      mobileMenuId,
      toggleMobileMenu,
      closeMobileMenu,
      registerMobileToggle,
    }),
    [
      closeMobileMenu,
      isMobileMenuOpen,
      mobileMenuId,
      openMenu,
      registerMobileToggle,
      setOpenMenu,
      toggleMobileMenu,
    ],
  )

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  )
}

/**
 * Everything the mobile sheet covers. `inert` — not merely `hidden` — takes
 * it out of the focus order and the accessibility tree while the sheet is
 * open.
 */
export function InertWhileMenuOpen({ children }: { children: ReactNode }) {
  const { isMobileMenuOpen } = useNavbar()

  return <div inert={isMobileMenuOpen}>{children}</div>
}
