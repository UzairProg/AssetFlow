import type { FC } from 'react'

type Row = {
  asset: string
  tag: string
  expected: string
  actual: string
  assigned: string
  status: string
  condition: string
}

const sample: Row[] = [
  { asset: 'Server A', tag: 'SRV-1001', expected: 'Rack 1', actual: 'Rack 1', assigned: 'John Doe', status: 'Verified', condition: 'Good' },
  { asset: 'Printer 3', tag: 'PRN-3002', expected: 'Floor 2', actual: 'Floor 1', assigned: 'N/A', status: 'Missing', condition: 'N/A' },
]

const VerificationTable: FC = () => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-[#64748B]">Verification records</div>
        <div className="flex items-center gap-2">
          <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Bulk Verify</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left text-sm text-[#64748B]">
              <th className="px-3 py-2">Asset</th>
              <th className="px-3 py-2">Tag</th>
              <th className="px-3 py-2">Expected Location</th>
              <th className="px-3 py-2">Actual Location</th>
              <th className="px-3 py-2">Assigned</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Condition</th>
              <th className="px-3 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {sample.map((s) => (
              <tr key={s.tag} className="border-t border-[#E5E7EB] hover:bg-slate-50">
                <td className="px-3 py-3 text-sm text-[#0F172A]">{s.asset}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{s.tag}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{s.expected}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{s.actual}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{s.assigned}</td>
                <td className="px-3 py-3 text-sm text-[#0F172A]">{s.status}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{s.condition}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VerificationTable
