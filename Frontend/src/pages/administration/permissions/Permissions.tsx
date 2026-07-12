import type { FC } from 'react'
import PermissionTable from '../../../components/administration/PermissionTable/PermissionTable'

const Permissions: FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#0F172A]">Permission Management</h2>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <PermissionTable />
      </div>
    </div>
  )
}

export default Permissions
