import type { FC } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown } from 'lucide-react'

type KPICardProps = {
  title: string
  value: string | number
  trend?: string
  trendPositive?: boolean
  icon?: React.ReactNode
  progress?: number
}

const KPICard: FC<KPICardProps> = ({ title, value, trend, trendPositive = true, icon, progress = 0 }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#64748B]">{title}</p>
          <div className="mt-2 flex items-baseline gap-3">
            <h3 className="text-2xl font-semibold text-[#0F172A]">{value}</h3>
            {trend ? (
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${trendPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {trendPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {trend}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex-shrink-0">{icon}</div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-[#1E3A8A] transition-all" style={{ width: `${Math.min(100, Math.max(4, progress))}%` }} />
      </div>
    </motion.div>
  )
}

export default KPICard
