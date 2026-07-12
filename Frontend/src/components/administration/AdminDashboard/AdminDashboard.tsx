import type { FC } from 'react'
import StatisticsCard from '../StatisticsCards/StatisticsCard'
import SettingsCard from '../SettingsCard/SettingsCard'

const AdminDashboard: FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatisticsCard label="Users" value={342} />
        <StatisticsCard label="Roles" value={12} />
        <StatisticsCard label="Departments" value={8} />
        <StatisticsCard label="Active Sessions" value={27} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <SettingsCard title="Recent Changes">
            <div className="text-sm text-[#64748B]">No critical changes in the last 24 hours.</div>
          </SettingsCard>
        </div>

        <div>
          <SettingsCard title="Quick Actions">
            <div className="space-y-2">
              <button className="w-full rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm text-[#1E3A8A]">Create User</button>
              <button className="w-full rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm text-[#1E3A8A]">Assign Role</button>
            </div>
          </SettingsCard>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
