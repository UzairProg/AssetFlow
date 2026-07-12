import type { PropsWithChildren } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

const PageTransition = ({ children }: PropsWithChildren) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={window.location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
