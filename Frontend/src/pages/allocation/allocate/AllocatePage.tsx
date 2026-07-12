import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import AllocationForm from '../../../components/allocation/AllocationForm/AllocationForm'

const AllocatePage: FC = () => {
  return (
    <DashboardLayout title="Allocate Asset" subtitle="Assign an asset to an employee or team.">
      <div className="space-y-6">
        <AllocationForm />
      </div>
    </DashboardLayout>
  )
}

export default AllocatePage
