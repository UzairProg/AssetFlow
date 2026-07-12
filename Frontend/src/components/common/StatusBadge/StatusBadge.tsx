import type { FC } from 'react'

const StatusBadge: FC<{ status: 'active' | 'inactive' | 'pending' }> = ({ status }) => {
  const map = {
    active: 'bg-[#DCFCE7] text-green-700',
    inactive: 'bg-[#FEE2E2] text-red-700',
    pending: 'bg-[#FEF3C7] text-yellow-800',
  }
  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${map[status]}`}>{status}</span>
}

export default StatusBadge
