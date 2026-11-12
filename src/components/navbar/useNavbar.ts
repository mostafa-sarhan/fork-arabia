import { createContext, useContext } from 'react'

/** The two popovers the bar can open. Only one is ever open. */
export type NavbarMenu = 'services' | 'language'

export type NavbarContextValue = {
  /** Which popover is open, if any. */
  openMenu: NavbarMenu | null
  /** Opens one popover, which closes the other; `null` closes both. */
  setOpenMenu: (menu: NavbarMenu | null) => void

  isMobileMenuOpen: boolean
  /** Ties the toggle's `aria-controls` to the sheet it opens. */
  mobileMenuId: string
  toggleMobileMenu: () => void
  /** Closes the sheet and hands focus back to the toggle that opened it. */
  closeMobileMenu: () => void
  /** The toggle registers itself here so closing can refocus it. */
  registerMobileToggle: (node: HTMLButtonElement | null) => void
}

export const NavbarContext = createContext<NavbarContextValue | null>(null)

export function useNavbar(): NavbarContextValue {
  const context = useContext(NavbarContext)

  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider')
  }

  return context
}
