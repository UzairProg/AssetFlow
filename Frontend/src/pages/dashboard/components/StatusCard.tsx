import type { FC } from 'react'

const StatusCard: FC<{ title: string; status: string; details?: string }> = ({ title, status, details }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-[#64748B]">{title}</p>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-[#0F172A]">{status}</p>
          {details ? <p className="text-xs text-[#64748B]">{details}</p> : null}
        </div>
      </div>
    </div>
  )
}

export default StatusCard
