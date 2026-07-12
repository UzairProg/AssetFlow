import type { FC } from 'react'

const DiscrepancyReport: FC = () => {
  const sample = [
    { id: 'D-001', type: 'Missing', asset: 'Printer 3', location: 'Floor 2' },
    { id: 'D-002', type: 'Damaged', asset: 'Server A', location: 'Rack 1' },
  ]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-[#64748B]">Discrepancies</div>
        <div className="flex items-center gap-2">
          <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Export PDF</button>
          <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Export Excel</button>
        </div>
      </div>

      <div className="space-y-2">
        {sample.map((s) => (
          <div key={s.id} className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-[#0F172A]">{s.type} • {s.asset}</div>
                <div className="text-xs text-[#64748B]">{s.location} • {s.id}</div>
              </div>
              <div className="text-sm text-[#DC2626]">Open</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiscrepancyReport
