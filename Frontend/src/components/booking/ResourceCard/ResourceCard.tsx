import type { FC } from 'react'

const ResourceCard: FC = () => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="h-28 w-full rounded-md bg-[#F1F5F9]" />
      <div className="mt-3 text-sm font-semibold text-[#0F172A]">Conference Room A</div>
      <div className="text-xs text-[#64748B]">Capacity: 12 • Floor 3</div>
      <div className="mt-3 flex items-center gap-2">
        <button type="button" className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm font-semibold text-white">Book</button>
        <button type="button" className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Details</button>
      </div>
    </div>
  )
}

export default ResourceCard
