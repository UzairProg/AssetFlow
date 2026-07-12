import type { FC } from 'react'

type Props = { priority: 'Low' | 'Medium' | 'High' | 'Critical' }

const PriorityBadge: FC<Props> = ({ priority }) => {
  const map: Record<string, string> = {
    Low: 'bg-[#ECFDF5] text-[#16A34A]',
    Medium: 'bg-[#FFFBEB] text-[#F59E0B]',
    High: 'bg-[#FEF3F2] text-[#DC2626]',
    Critical: 'bg-[#FEF2F2] text-[#DC2626]'
  }

  return <span className={`inline-block rounded-xl px-3 py-1 text-xs font-semibold ${map[priority]}`}>{priority}</span>
}

export default PriorityBadge
