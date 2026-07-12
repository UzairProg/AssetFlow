import type { FC } from 'react'

type Props = { id?: string; name?: string; dept?: string; progress?: number }

const AuditCard: FC<Props> = ({ id = 'A-1001', name = 'Quarterly Audit', dept = 'IT', progress = 45 }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-[#0F172A]">{name}</div>
          <div className="text-xs text-[#64748B]">{dept} • {id}</div>
        </div>
        <div className="text-sm font-semibold text-[#0F172A]">{progress}%</div>
      </div>
    </div>
  )
}

export default AuditCard
