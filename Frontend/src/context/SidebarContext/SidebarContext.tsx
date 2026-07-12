import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'

type SidebarContextValue = {
  collapsed: boolean
  mobileOpen: boolean
  setCollapsed: (value: boolean) => void
  toggleCollapsed: () => void
  openMobile: () => void
  closeMobile: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsedState] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const value = useMemo(
    () => ({
      collapsed,
      mobileOpen,
      setCollapsed: (nextValue: boolean) => setCollapsedState(nextValue),
      toggleCollapsed: () => setCollapsedState((current) => !current),
      openMobile: () => setMobileOpen(true),
      closeMobile: () => setMobileOpen(false),
    }),
    [collapsed, mobileOpen],
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }

  return context
}

export default SidebarContext