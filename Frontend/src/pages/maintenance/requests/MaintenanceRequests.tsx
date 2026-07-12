import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import MaintenanceTable from '../../../components/maintenance/MaintenanceTable/MaintenanceTable'
import MaintenanceFilterDrawer from '../../../components/maintenance/FilterDrawer/MaintenanceFilterDrawer'
import { useState } from 'react'

const MaintenanceRequests: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <DashboardLayout title="Maintenance Requests" subtitle="View and manage maintenance requests.">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <button type="button" onClick={() => setOpen(true)} className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Filters</button>
        </div>

        <MaintenanceTable />

        <MaintenanceFilterDrawer open={open} onClose={() => setOpen(false)} />
      </div>
    </DashboardLayout>
  )
}

export default MaintenanceRequests
