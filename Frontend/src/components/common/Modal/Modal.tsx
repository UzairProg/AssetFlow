import type { FC, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

const Modal: FC<PropsWithChildren<{ open: boolean; onClose: () => void; title?: string }>> = ({ open, onClose, title, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />
      <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ duration: 0.18 }} className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        {title ? <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3> : null}
        <div className="mt-4">{children}</div>
      </motion.div>
    </div>
  )
}

export default Modal
