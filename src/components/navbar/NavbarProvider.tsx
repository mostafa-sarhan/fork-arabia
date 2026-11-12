import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router'
import { NavbarContext, useNavbar } from '@/components/navbar/NavbarContext'

/**
 * Owns the mobile menu's open state.
 *
 * The state belongs to the navbar, but opening the sheet also has to make the
 * rest of the page inert — and that is the navbar's sibling, not its child.
 * So the state lives in context and the layout reads it through
 * `InertWhileMenuOpen`.
 */
export function NavbarProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  /*
   * The state is "which page the sheet was opened on", not "is it open", so a
   * route change closes it by definition rather than through an effect
   * chasing the router.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const isMenuOpen = openedOn === pathname

  const openMenu = useCallback(() => setOpenedOn(pathname), [pathname])

  const closeMenu = useCallback(() => {
    setOpenedOn(null)
    toggleRef.current?.focus()
  }, [])

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMenu()
      return
    }

    openMenu()
  }, [closeMenu, isMenuOpen, openMenu])

  const registerToggle = useCallback((node: HTMLButtonElement | null) => {
    toggleRef.current = node
  }, [])

  const value = useMemo(
    () => ({
      isMenuOpen,
      menuId,
      openMenu,
      closeMenu,
      toggleMenu,
      registerToggle,
    }),
    [closeMenu, isMenuOpen, menuId, openMenu, registerToggle, toggleMenu],
  )

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  )
}

/**
 * Everything the sheet covers. `inert` — not merely `hidden` — takes it out
 * of the focus order and the accessibility tree while the sheet is open.
 */
export function InertWhileMenuOpen({ children }: { children: ReactNode }) {
  const { isMenuOpen } = useNavbar()

  return <div inert={isMenuOpen}>{children}</div>
}
