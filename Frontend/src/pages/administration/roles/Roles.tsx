import type { FC } from 'react'
import RoleCard from '../../../components/administration/RoleCard/RoleCard'
import RoleMatrix from '../../../components/administration/RoleMatrix/RoleMatrix'

const Roles: FC = () => {
  const roles = [
    { id: 'r1', name: 'Administrator', desc: 'Full access' },
    { id: 'r2', name: 'Asset Manager', desc: 'Manage assets and allocations' },
    { id: 'r3', name: 'Employee', desc: 'Standard user' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#0F172A]">Role Management</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {roles.map((r) => <RoleCard key={r.id} name={r.name} description={r.desc} />)}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Permission Matrix</h3>
        <RoleMatrix />
      </div>
    </div>
  )
}

export default Roles
