import type { FC } from 'react'

const employees = [
  { id: 1, name: 'John Doe', dept: 'IT', role: 'Engineer', status: 'Active' },
  { id: 2, name: 'Alice Smith', dept: 'HR', role: 'Coordinator', status: 'Active' },
  { id: 3, name: 'Mark Lee', dept: 'Finance', role: 'Analyst', status: 'Active' },
  { id: 4, name: 'Sara Khan', dept: 'Operations', role: 'Manager', status: 'On leave' },
]

const EmployeeTable: FC = () => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#0F172A]">Recent Employees</h4>
        <div className="text-xs text-[#64748B]">Showing 4</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="text-left text-xs text-[#64748B]">
              <th className="w-1/4">Name</th>
              <th className="w-1/4">Department</th>
              <th className="w-1/4">Role</th>
              <th className="w-1/4">Status</th>
            </tr>
          </thead>
          <tbody className="mt-3 divide-y">
            {employees.map((e) => (
              <tr key={e.id} className="border-b border-transparent">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-900 text-white">{e.name.split(' ').map((n)=>n[0]).slice(0,2).join('')}</div>
                    <div>
                      <div className="font-medium text-[#0F172A]">{e.name}</div>
                      <div className="text-xs text-[#64748B]">{e.id}@assetflow.local</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-[#64748B]">{e.dept}</td>
                <td className="py-3 text-[#64748B]">{e.role}</td>
                <td className="py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${e.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-800'}`}>{e.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeTable
