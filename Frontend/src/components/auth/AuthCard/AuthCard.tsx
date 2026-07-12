import type { PropsWithChildren } from 'react'

import { motion } from 'framer-motion'

const AuthCard = ({ children }: PropsWithChildren) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8"
    >
      {children}
    </motion.section>
  )
}

export default AuthCard
