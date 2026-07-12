import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, LogOut, Settings, ShieldUser, UserRound } from 'lucide-react'

import { goToPath } from '../../../lib/demoAuth'

const UserMenu = () => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
        aria-label="Open user menu"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-900 text-sm font-bold text-white shadow-sm shadow-blue-900/20">
          AS
        </div>
        <div className="hidden text-left xl:block">
          <p className="text-sm font-semibold text-slate-900">Admin User</p>
          <p className="text-xs text-slate-500">System Administrator</p>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="absolute right-0 top-14 z-20 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
            role="menu"
          >
            {[
              { label: 'My Profile', icon: UserRound },
              { label: 'Preferences', icon: Settings },
              { label: 'Security', icon: ShieldUser },
            ].map((item) => {
              const Icon = item.icon

              return (
                <button
                  key={item.label}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => goToPath('/login')}
              className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default UserMenu
