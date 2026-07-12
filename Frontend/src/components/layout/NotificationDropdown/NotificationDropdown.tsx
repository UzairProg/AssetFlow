import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { BellRing, Check, Clock3, FileText, PanelTop, Wrench } from 'lucide-react'

const notifications = [
  { title: 'Asset Assigned', detail: 'Laptop assigned to Marketing', icon: PanelTop, time: '2m ago' },
  { title: 'Booking Approved', detail: 'Conference Room A approved', icon: Check, time: '14m ago' },
  { title: 'Maintenance Completed', detail: 'Scanner repaired successfully', icon: Wrench, time: '1h ago' },
  { title: 'Audit Started', detail: 'Quarterly audit initiated', icon: FileText, time: '3h ago' },
]

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.length

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
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <BellRing className="h-5 w-5" />
        {unreadCount > 0 ? (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-white" />
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="absolute right-0 top-14 z-20 w-[26rem] max-w-[calc(100vw-1rem)] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
            role="menu"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Recent Notifications</p>
                <p className="text-xs text-slate-500">{unreadCount} unread</p>
              </div>
              <button
                type="button"
                className="rounded-2xl px-2 py-1 text-sm font-semibold text-blue-900 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                Mark all as read
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {notifications.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-slate-300 hover:bg-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-900 text-white shadow-sm shadow-blue-900/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock3 className="h-3.5 w-3.5" />
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{item.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default NotificationDropdown
