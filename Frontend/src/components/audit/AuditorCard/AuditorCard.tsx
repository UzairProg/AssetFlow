import type { FC } from 'react'

type Props = { name: string; department?: string; assigned?: number; available?: boolean }

const AuditorCard: FC<Props> = ({ name, department = 'Dept', assigned = 0, available = true }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-[#0F172A]">{name}</div>
          <div className="text-xs text-[#64748B]">{department}</div>
        </div>
        <div className="text-sm text-[#64748B]">Assigned: {assigned}</div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className={`text-sm font-semibold ${available ? 'text-[#16A34A]' : 'text-[#F59E0B]'}`}>{available ? 'Available' : 'Busy'}</div>
        <div>
          <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Assign</button>
        </div>
      </div>
    </div>
  )
}

export default AuditorCard
