import type { FC } from 'react'
import { useState } from 'react'
import StatusBadge from '../../common/StatusBadge/StatusBadge'

type Transfer = {
  id: string
  requestId: string
  asset: string
  currentHolder: string
  requestedBy: string
  requestedTo: string
  department: string
  priority: string
  date: string
  status: string
}

const sample: Transfer[] = [
  { id: 't1', requestId: 'TR-1001', asset: 'Dell Latitude 7420', currentHolder: 'John Doe', requestedBy: 'Mary Ops', requestedTo: 'Alice Smith', department: 'Sales', priority: 'High', date: '2024-07-01', status: 'Pending' },
  { id: 't2', requestId: 'TR-1002', asset: 'iPhone 13 Pro', currentHolder: 'Alice Smith', requestedBy: 'IT Admin', requestedTo: 'Bob Lee', department: 'Field', priority: 'Medium', date: '2024-06-28', status: 'Approved' },
]

const TransferTable: FC = () => {
  const [rows] = useState<Transfer[]>(sample)

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#0F172A]">Transfer Requests</h4>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Export</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[#64748B]">
              <th>Request ID</th>
              <th>Asset</th>
              <th>Current Holder</th>
              <th>Requested By</th>
              <th>Requested To</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="mt-3 divide-y">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="py-3 font-medium text-[#0F172A]">{r.requestId}</td>
                <td className="py-3 text-[#64748B]">{r.asset}</td>
                <td className="py-3 text-[#64748B]">{r.currentHolder}</td>
                <td className="py-3 text-[#64748B]">{r.requestedBy}</td>
                <td className="py-3 text-[#64748B]">{r.requestedTo}</td>
                <td className="py-3 text-[#64748B]">{r.department}</td>
                <td className="py-3"><div className="text-sm text-[#64748B]">{r.priority}</div></td>
                <td className="py-3 text-[#64748B]">{r.date}</td>
                <td className="py-3"><StatusBadge status={r.status.toLowerCase()} /></td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-sm text-[#1E3A8A]">Approve</button>
                    <button type="button" className="text-sm text-[#64748B]">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransferTable
