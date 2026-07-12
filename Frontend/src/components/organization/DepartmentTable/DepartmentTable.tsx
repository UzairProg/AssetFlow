import type { FC } from 'react'
import { useState } from 'react'
import Avatar from '../../common/Avatar/Avatar'
import StatusBadge from '../../common/StatusBadge/StatusBadge'
import Modal from '../../common/Modal/Modal'

type Department = {
  id: string
  name: string
  parent: string
  head: string
  employees: number
  assets: number
  status: 'active' | 'inactive'
}

const data: Department[] = [
  { id: 'dep-1', name: 'Engineering', parent: 'Headquarters', head: 'John Doe', employees: 42, assets: 120, status: 'active' },
  { id: 'dep-2', name: 'HR', parent: 'Headquarters', head: 'Alice Smith', employees: 12, assets: 30, status: 'active' },
  { id: 'dep-3', name: 'Finance', parent: 'Headquarters', head: 'Mark Lee', employees: 18, assets: 40, status: 'active' },
]

const DepartmentTable: FC = () => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Department | null>(null)

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#0F172A]">Departments</h4>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Export</button>
          <button type="button" onClick={() => setOpen(true)} className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm font-semibold text-white">Add Department</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[#64748B]">
              <th>Department</th>
              <th>Parent</th>
              <th>Head</th>
              <th>Employees</th>
              <th>Assets</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="mt-3 divide-y">
            {data.map((d) => (
              <tr key={d.id}>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={d.name} />
                    <div>
                      <div className="font-medium text-[#0F172A]">{d.name}</div>
                      <div className="text-xs text-[#64748B]">ID: {d.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-[#64748B]">{d.parent}</td>
                <td className="py-3 text-[#64748B]">{d.head}</td>
                <td className="py-3 text-[#64748B]">{d.employees}</td>
                <td className="py-3 text-[#64748B]">{d.assets}</td>
                <td className="py-3"><StatusBadge status={d.status === 'active' ? 'active' : 'inactive'} /></td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => { setActive(d); setOpen(true) }} className="text-sm text-[#1E3A8A]">View</button>
                    <button type="button" className="text-sm text-[#64748B]">Edit</button>
                    <button type="button" className="text-sm text-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={active ? active.name : 'Add Department'}>
        <p className="text-sm text-[#64748B]">This is a placeholder modal for department details / creation.</p>
      </Modal>
    </div>
  )
}

export default DepartmentTable
