import type { FC } from 'react'

const RoleCard: FC<{ name: string; description?: string }> = ({ name, description }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-[#0F172A]">{name}</div>
      <div className="mt-1 text-sm text-[#64748B]">{description}</div>
      <div className="mt-3">
        <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Manage</button>
      </div>
    </div>
  )
}

export default RoleCard
