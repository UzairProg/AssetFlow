import type { FC } from 'react'

type Props = { name?: string; skills?: string; workload?: number }

const TechnicianCard: FC<Props> = ({ name = 'Bob Tech', skills = 'HVAC, Electrical', workload = 2 }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-[#0F172A]">{name}</div>
      <div className="text-xs text-[#64748B]">Skills: {skills}</div>
      <div className="mt-2 text-xs text-[#64748B]">Current workload: {workload} jobs</div>
      <div className="mt-3">
        <button type="button" className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm text-white">Assign</button>
      </div>
    </div>
  )
}

export default TechnicianCard
