import type { FC } from 'react'

const UserManagementTable: FC = () => {
  const users = [
    { id: 'U-1001', name: 'Emma Clarke', email: 'emma@example.com', dept: 'IT', role: 'Administrator', status: 'Active', lastLogin: '2026-07-10' },
    { id: 'U-1002', name: 'Liam Johnson', email: 'liam@example.com', dept: 'Facilities', role: 'Asset Manager', status: 'Active', lastLogin: '2026-07-08' },
  ]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-[#64748B]">Users</div>
        <div className="flex items-center gap-2">
          <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Export</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left text-sm text-[#64748B]">
              <th className="px-3 py-2">Employee ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-[#E5E7EB] hover:bg-slate-50">
                <td className="px-3 py-3 text-sm text-[#0F172A]">{u.id}</td>
                <td className="px-3 py-3 text-sm text-[#0F172A]">{u.name}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{u.email}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{u.dept}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{u.role}</td>
                <td className="px-3 py-3 text-sm text-[#0F172A]">{u.status}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagementTable
