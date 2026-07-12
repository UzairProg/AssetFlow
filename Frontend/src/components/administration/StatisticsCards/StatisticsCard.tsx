import type { FC } from 'react'

const StatisticsCard: FC<{ label: string; value: number | string }> = ({ label, value }) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="text-sm text-[#64748B]">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-[#0F172A]">{value}</div>
    </div>
  )
}

export default StatisticsCard
