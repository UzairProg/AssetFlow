import type { FC } from 'react'

type Props = { label: string; value: number | string }

const AllocationStatisticsCard: FC<Props> = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-[#64748B]">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-[#0F172A]">{value}</div>
    </div>
  )
}

export default AllocationStatisticsCard
