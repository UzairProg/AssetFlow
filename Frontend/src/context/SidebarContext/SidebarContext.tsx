import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'

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

  useEffect(() => {
    if (!mobileOpen) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileOpen])

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