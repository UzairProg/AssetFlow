import type { FC } from 'react'

const ActivityTable: FC = () => {
  const rows = [
    { id: 'L-001', user: 'admin', module: 'Assets', action: 'Create', when: '2026-07-10 09:12' },
    { id: 'L-002', user: 'emma', module: 'Booking', action: 'Approve', when: '2026-07-09 14:03' },
  ]

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left text-sm text-[#64748B]">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2">Module</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-[#E5E7EB] hover:bg-slate-50">
                <td className="px-3 py-3 text-sm text-[#0F172A]">{r.id}</td>
                <td className="px-3 py-3 text-sm text-[#0F172A]">{r.user}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{r.module}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{r.action}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{r.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ActivityTable
