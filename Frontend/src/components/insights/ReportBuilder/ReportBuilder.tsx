import type { FC } from 'react'

const ReportBuilder: FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <input placeholder="Report name" className="rounded-2xl border border-[#E5E7EB] px-3 py-2" />
        <select className="rounded-2xl border border-[#E5E7EB] px-3 py-2">
          <option>Report Type</option>
        </select>
        <select className="rounded-2xl border border-[#E5E7EB] px-3 py-2">
          <option>Date Range</option>
        </select>
      </div>

      <div className="flex items-center justify-end">
        <button className="rounded-2xl bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white">Generate</button>
      </div>
    </div>
  )
}

export default ReportBuilder
