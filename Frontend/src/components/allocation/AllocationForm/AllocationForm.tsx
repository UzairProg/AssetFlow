import type { FC } from 'react'
import { useState } from 'react'
import EmployeeSelector from '../EmployeeSelector/EmployeeSelector'
import AssetSelector from '../AssetSelector/AssetSelector'

const AllocationForm: FC = () => {
  const [priority, setPriority] = useState('Normal')

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="text-xs font-medium text-[#64748B]">Asset</label>
            <AssetSelector />
          </div>

          <div>
            <label className="text-xs font-medium text-[#64748B]">Assign To</label>
            <EmployeeSelector />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-[#64748B]">Allocation Date</label>
              <input type="date" className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-[#64748B]">Expected Return</label>
              <input type="date" className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#64748B]">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2">
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#64748B]">Notes</label>
            <textarea className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2" rows={4} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <div className="h-40 w-full rounded-md bg-[#F1F5F9]" />
            <div className="mt-3 text-sm font-medium text-[#0F172A]">Asset Preview</div>
            <div className="text-xs text-[#64748B]">Tag: AST-0001</div>
            <div className="mt-2 flex items-center gap-2">
              <button type="button" className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm font-semibold text-white">Allocate</button>
              <button type="button" className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Create Transfer</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AllocationForm
