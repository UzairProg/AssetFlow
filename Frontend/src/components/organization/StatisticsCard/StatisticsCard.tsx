import type { FC } from 'react'

const StatisticsCard: FC<{ title: string; value: string | number; delta?: string; icon?: React.ReactNode }> = ({ title, value, delta, icon }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#64748B]">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold text-[#0F172A]">{value}</h3>
        </div>
        <div className="flex flex-col items-end">
          {icon}
          {delta ? <span className="mt-2 text-xs text-green-600">{delta}</span> : null}
        </div>
      </div>
    </div>
  )
}

export default StatisticsCard
