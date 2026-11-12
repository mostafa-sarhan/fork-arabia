import { createContext, useContext } from 'react'

export type NavbarContextValue = {
  isMenuOpen: boolean
  /** Ties the toggle's `aria-controls` to the sheet it opens. */
  menuId: string
  openMenu: () => void
  /** Closes the sheet and hands focus back to the toggle that opened it. */
  closeMenu: () => void
  toggleMenu: () => void
  /** The toggle registers itself here so `closeMenu` can refocus it. */
  registerToggle: (node: HTMLButtonElement | null) => void
}

export const NavbarContext = createContext<NavbarContextValue | null>(null)

export function useNavbar(): NavbarContextValue {
  const context = useContext(NavbarContext)

  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider')
  }

  return context
}
