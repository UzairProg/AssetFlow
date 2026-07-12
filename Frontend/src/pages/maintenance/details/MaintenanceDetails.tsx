import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import ApprovalTimeline from '../../../components/maintenance/ApprovalTimeline/ApprovalTimeline'
import MaintenanceTimeline from '../../../components/maintenance/MaintenanceTimeline/MaintenanceTimeline'

const MaintenanceDetails: FC = () => {
  return (
    <DashboardLayout title="Maintenance Details" subtitle="Request ID: MR-2024-0923">
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#0F172A]">AC Unit - Repair</h3>
          <div className="mt-2 text-sm text-[#64748B]">Status: Pending Approval • Priority: High</div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-[#0F172A]">Issue Description</h4>
              <p className="mt-2 text-sm text-[#64748B]">Compressor not engaging; unit intermittently shuts down.</p>
            </div>

            <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-[#0F172A]">Maintenance Timeline</h4>
              <MaintenanceTimeline />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-[#0F172A]">Approval Workflow</h4>
              <ApprovalTimeline />
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MaintenanceDetails
