import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import MaintenanceStatisticsCard from '../../../components/maintenance/MaintenanceStatistics/MaintenanceStatisticsCard'
import MaintenanceTable from '../../../components/maintenance/MaintenanceTable/MaintenanceTable'
import MaintenanceTimeline from '../../../components/maintenance/MaintenanceTimeline/MaintenanceTimeline'

const stats = [
  { label: 'Open Requests', value: 24 },
  { label: 'Pending Approval', value: 5 },
  { label: 'Assets Under Maintenance', value: 12 },
  { label: 'Critical Issues', value: 3 },
  { label: 'Completed Today', value: 8 },
  { label: 'Avg Resolution (hrs)', value: 14 },
]

const MaintenanceOverview: FC = () => {
  return (
    <DashboardLayout title="Maintenance Management" subtitle="Track, approve and monitor maintenance activities across your assets.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((s) => (
            <MaintenanceStatisticsCard key={s.label} label={s.label} value={s.value} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MaintenanceTable />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-[#0F172A]">Maintenance Trend</h4>
              <div className="mt-4 h-40 flex items-center justify-center text-sm text-[#64748B]">Chart placeholder</div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-[#0F172A]">Recent Activities</h4>
              <MaintenanceTimeline />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MaintenanceOverview
