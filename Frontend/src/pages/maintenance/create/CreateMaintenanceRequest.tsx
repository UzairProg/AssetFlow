import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import MaintenanceRequestForm from '../../../components/maintenance/MaintenanceForm/MaintenanceRequestForm'

const CreateMaintenanceRequest: FC = () => {
  return (
    <DashboardLayout title="Create Maintenance Request" subtitle="Report an issue and request maintenance.">
      <div className="space-y-6">
        <MaintenanceRequestForm />
      </div>
    </DashboardLayout>
  )
}

export default CreateMaintenanceRequest
