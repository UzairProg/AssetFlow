import type { FC } from 'react'
import { useState } from 'react'
import Avatar from '../../common/Avatar/Avatar'
import StatusBadge from '../../common/StatusBadge/StatusBadge'

type Allocation = {
  id: string
  assetTag: string
  assetName: string
  holder: string
  department: string
  allocatedOn: string
  expectedReturn?: string
  status: string
}

const sample: Allocation[] = [
  { id: 'al-1', assetTag: 'AST-0001', assetName: 'Dell Latitude 7420', holder: 'John Doe', department: 'Engineering', allocatedOn: '2024-05-03', expectedReturn: '2025-05-03', status: 'Allocated' },
  { id: 'al-2', assetTag: 'AST-0003', assetName: 'iPhone 13 Pro', holder: 'Alice Smith', department: 'Sales', allocatedOn: '2024-03-10', expectedReturn: '2025-03-10', status: 'Allocated' },
  { id: 'al-3', assetTag: 'AST-0009', assetName: 'Surface Pro', holder: '—', department: 'Unassigned', allocatedOn: '2024-06-01', status: 'Available' },
]

const AllocationTable: FC = () => {
  const [rows] = useState<Allocation[]>(sample)

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#0F172A]">Current Allocations</h4>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Export</button>
          <button type="button" className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm font-semibold text-white">Allocate Asset</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[#64748B]">
              <th>Asset</th>
              <th>Holder</th>
              <th>Department</th>
              <th>Allocated On</th>
              <th>Expected Return</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="mt-3 divide-y">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.assetName} />
                    <div>
                      <div className="font-medium text-[#0F172A]">{r.assetName}</div>
                      <div className="text-xs text-[#64748B]">{r.assetTag}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-[#64748B]">{r.holder}</td>
                <td className="py-3 text-[#64748B]">{r.department}</td>
                <td className="py-3 text-[#64748B]">{r.allocatedOn}</td>
                <td className="py-3 text-[#64748B]">{r.expectedReturn || '—'}</td>
                <td className="py-3"><StatusBadge status={r.status.toLowerCase()} /></td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-sm text-[#1E3A8A]">Details</button>
                    <button type="button" className="text-sm text-[#64748B]">Transfer</button>
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

export default AllocationTable
