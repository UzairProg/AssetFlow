import type { FC } from 'react'
import DashboardLayout from '../../../../layouts/DashboardLayout/DashboardLayout'
import TransferTable from '../../../../components/allocation/TransferTable/TransferTable'

const TransfersList: FC = () => {
  return (
    <DashboardLayout title="Transfer Requests" subtitle="Review, approve and manage asset transfer requests.">
      <div className="space-y-6">
        <TransferTable />
      </div>
    </DashboardLayout>
  )
}

export default TransfersList
