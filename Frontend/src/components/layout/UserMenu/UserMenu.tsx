import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, LogOut, Settings, ShieldUser, UserRound } from 'lucide-react'

import { goToPath } from '../../../lib/demoAuth'

const UserMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left shadow-sm transition hover:bg-slate-50"
        aria-label="Open user menu"
        aria-expanded={open}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
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
            className="absolute right-0 top-14 z-20 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/70"
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
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-900"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => goToPath('/login')}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
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
