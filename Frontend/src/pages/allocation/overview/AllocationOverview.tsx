import type { FC } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import AllocationStatisticsCard from '../../../components/allocation/AllocationStatistics/AllocationStatisticsCard'
import AllocationTable from '../../../components/allocation/AllocationTable/AllocationTable'
import TransferTimeline from '../../../components/allocation/TransferTimeline/TransferTimeline'

const stats = [
  { label: 'Total Allocated', value: 238 },
  { label: 'Available', value: 842 },
  { label: 'Pending Transfers', value: 12 },
  { label: 'Due Today', value: 9 },
  { label: 'Overdue Returns', value: 4 },
  { label: 'Returned Today', value: 6 },
]

const AllocationOverview: FC = () => {
  return (
    <DashboardLayout title="Asset Allocation" subtitle="Allocate, transfer and monitor organizational assets efficiently.">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((s) => (
            <AllocationStatisticsCard key={s.label} label={s.label} value={s.value} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AllocationTable />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-[#0F172A]">Allocation Trend</h4>
              <div className="mt-4 h-40 flex items-center justify-center text-sm text-[#64748B]">Line chart placeholder</div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-[#0F172A]">Recent Allocation Activity</h4>
              <TransferTimeline />
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default AllocationOverview
