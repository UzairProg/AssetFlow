import type { FC } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import StatisticsCard from '../../../components/assets/AssetStatistics/StatisticsCard'
import AssetTable from '../../../components/assets/AssetTable/AssetTable'
import AssetTimeline from '../../../components/assets/AssetTimeline/AssetTimeline'

const stats = [
  { label: 'Total Assets', value: 1248 },
  { label: 'Available', value: 842 },
  { label: 'Allocated', value: 238 },
  { label: 'Reserved', value: 45 },
  { label: 'Maintenance', value: 31 },
  { label: 'Lost', value: 12 },
  { label: 'Retired', value: 50 },
]

const AssetOverview: FC = () => {
  return (
    <DashboardLayout title="Asset Management" subtitle="Manage, monitor and track every organizational asset throughout its lifecycle.">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {stats.map((s) => (
            <StatisticsCard key={s.label} label={s.label} value={s.value} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AssetTable />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-[#0F172A]">Asset Distribution</h4>
              <div className="mt-4 h-40 flex items-center justify-center text-sm text-[#64748B]">Donut chart placeholder</div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-[#0F172A]">Monthly Asset Growth</h4>
              <div className="mt-4 h-32 flex items-center justify-center text-sm text-[#64748B]">Line chart placeholder</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-[#0F172A]">Recent Activity</h4>
          <AssetTimeline />
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default AssetOverview
