import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import Sidebar from '../Sidebar/Sidebar'
import useSidebar from '../../../hooks/useSidebar/useSidebar'

const MobileSidebar = () => {
  const { mobileOpen, closeMobile } = useSidebar()

  return (
    <AnimatePresence>
      {mobileOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <button
            type="button"
            aria-label="Close sidebar overlay"
            onClick={closeMobile}
            className="absolute inset-0 cursor-default bg-slate-900/30"
          />
          <motion.aside
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative h-full w-[280px] border-r border-slate-200 bg-white shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={closeMobile}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>
            <Sidebar mobile />
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default MobileSidebar
