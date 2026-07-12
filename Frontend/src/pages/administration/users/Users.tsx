import type { FC } from 'react'
import UserManagementTable from '../../../components/administration/UserManagementTable/UserManagementTable'
import SearchBar from '../../../components/administration/SearchBar/SearchBar'
import FilterDrawer from '../../../components/administration/FilterDrawer/FilterDrawer'
import { useState } from 'react'

const Users: FC = () => {
  const [openFilters, setOpenFilters] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#0F172A]">User Management</h2>
        <div className="flex items-center gap-3">
          <SearchBar />
          <button onClick={() => setOpenFilters(true)} className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm text-[#1E3A8A]">Filters</button>
          <button className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm text-white">Create User</button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <UserManagementTable />
      </div>

      <FilterDrawer open={openFilters} onClose={() => setOpenFilters(false)} />
    </div>
  )
}

export default Users
