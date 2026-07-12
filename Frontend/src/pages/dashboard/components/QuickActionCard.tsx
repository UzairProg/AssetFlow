import type { FC } from 'react'
import { motion } from 'framer-motion'

const QuickActionCard: FC<{ title: string; icon: React.ReactNode; onClick?: () => void }> = ({ title, icon, onClick }) => {
  return (
    <motion.button type="button" whileHover={{ y: -6 }} onClick={onClick} className="flex flex-col items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-5 text-sm font-semibold text-[#0F172A] shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-[#1E3A8A]">{icon}</div>
      <div>{title}</div>
    </motion.button>
  )
}

export default QuickActionCard
