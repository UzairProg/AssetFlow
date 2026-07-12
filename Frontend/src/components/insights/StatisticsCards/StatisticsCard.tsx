import type { FC } from 'react'

type Props = { label: string; value: number | string }

const StatisticsCard: FC<Props> = ({ label, value }) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="text-sm font-medium text-[#64748B]">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-[#0F172A]">{value}</div>
    </div>
  )
}

export default StatisticsCard
