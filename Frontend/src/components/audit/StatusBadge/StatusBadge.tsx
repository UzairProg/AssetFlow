import type { FC } from 'react'

type Props = { status: string }

const StatusBadge: FC<Props> = ({ status }) => {
  const map: Record<string, string> = {
    Planned: 'bg-[#E5F0FF] text-[#2563EB]',
    'In Progress': 'bg-[#FFF7ED] text-[#F59E0B]',
    Completed: 'bg-[#ECFDF5] text-[#16A34A]',
    Closed: 'bg-[#FEF2F2] text-[#DC2626]',
  }

  return <span className={`inline-block rounded-xl px-3 py-1 text-xs font-semibold ${map[status] || 'bg-[#F3F4F6] text-[#64748B]'}`}>{status}</span>
}

export default StatusBadge
