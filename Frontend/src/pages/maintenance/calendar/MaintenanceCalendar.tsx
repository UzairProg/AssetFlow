import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import type { ReactNode } from 'react'

const PlaceholderCalendar = ({ children }: { children?: ReactNode }) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
    <div className="h-[520px] w-full rounded-md bg-[#F8FAFC] flex items-center justify-center text-sm text-[#64748B]">Maintenance calendar placeholder</div>
    {children}
  </div>
)

const MaintenanceCalendar: FC = () => {
  return (
    <DashboardLayout title="Maintenance Calendar" subtitle="Scheduled maintenance and upcoming jobs.">
      <div className="space-y-6">
        <PlaceholderCalendar />
      </div>
    </DashboardLayout>
  )
}

export default MaintenanceCalendar
