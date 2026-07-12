import type { FC } from 'react'

const ReportTable: FC = () => {
  const sample = [
    { id: 'R-001', name: 'Asset Summary', created: '2026-06-01', status: 'Ready' },
    { id: 'R-002', name: 'Maintenance Ledger', created: '2026-06-10', status: 'Ready' },
  ]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-[#64748B]">Report history</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left text-sm text-[#64748B]">
              <th className="px-3 py-2">Report ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sample.map((r) => (
              <tr key={r.id} className="border-t border-[#E5E7EB] hover:bg-slate-50">
                <td className="px-3 py-3 text-sm text-[#0F172A]">{r.id}</td>
                <td className="px-3 py-3 text-sm text-[#0F172A]">{r.name}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{r.created}</td>
                <td className="px-3 py-3 text-sm text-[#0F172A]">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportTable
