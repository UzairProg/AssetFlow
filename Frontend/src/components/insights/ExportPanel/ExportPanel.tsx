import type { FC } from 'react'

const ExportPanel: FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm text-[#64748B]">Export PDF</div>
          <div className="mt-2">
            <button className="rounded-2xl bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white">Export</button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm text-[#64748B]">Export Excel</div>
          <div className="mt-2">
            <button className="rounded-2xl bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white">Export</button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm text-[#64748B]">Schedule Report</div>
          <div className="mt-2">
            <button className="rounded-2xl border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1E3A8A]">Schedule</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportPanel
