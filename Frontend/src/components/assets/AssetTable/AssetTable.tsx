import type { FC } from 'react'
import { useState } from 'react'
import Avatar from '../../common/Avatar/Avatar'
import StatusBadge from '../../common/StatusBadge/StatusBadge'

type Asset = {
  id: string
  tag: string
  name: string
  category: string
  department: string
  assignedTo?: string
  status: string
  condition: string
  purchaseDate: string
}

const sample: Asset[] = [
  { id: 'a1', tag: 'AST-0001', name: 'Dell Latitude 7420', category: 'Laptop', department: 'Engineering', assignedTo: 'John Doe', status: 'Available', condition: 'Good', purchaseDate: '2022-01-12' },
  { id: 'a2', tag: 'AST-0002', name: 'HP LaserJet Pro', category: 'Printer', department: 'Finance', assignedTo: '', status: 'Allocated', condition: 'Fair', purchaseDate: '2020-06-30' },
  { id: 'a3', tag: 'AST-0003', name: 'iPhone 13 Pro', category: 'Mobile', department: 'Sales', assignedTo: 'Alice Smith', status: 'Reserved', condition: 'Good', purchaseDate: '2023-03-08' },
]

const AssetTable: FC = () => {
  const [rows] = useState<Asset[]>(sample)

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#0F172A]">Asset Directory</h4>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Import</button>
          <button type="button" className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm font-semibold text-white">Register Asset</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[#64748B]">
              <th>Image</th>
              <th>Asset Tag</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Department</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Condition</th>
              <th>Purchase Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="mt-3 divide-y">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="py-3"><Avatar name={r.name} size={36} /></td>
                <td className="py-3 font-medium text-[#0F172A]">{r.tag}</td>
                <td className="py-3 text-[#64748B]">{r.name}</td>
                <td className="py-3 text-[#64748B]">{r.category}</td>
                <td className="py-3 text-[#64748B]">{r.department}</td>
                <td className="py-3 text-[#64748B]">{r.assignedTo || '—'}</td>
                <td className="py-3"><StatusBadge status={r.status.toLowerCase()} /></td>
                <td className="py-3"><span className="text-[#64748B]">{r.condition}</span></td>
                <td className="py-3 text-[#64748B]">{r.purchaseDate}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-sm text-[#1E3A8A]">View</button>
                    <button type="button" className="text-sm text-[#64748B]">Edit</button>
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

export default AssetTable
