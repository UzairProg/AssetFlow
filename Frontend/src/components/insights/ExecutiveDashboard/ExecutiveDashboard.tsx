import type { FC } from 'react'
import StatisticsCard from '../StatisticsCards/StatisticsCard'
import AnalyticsCards from '../AnalyticsCards/AnalyticsCards'

const ExecutiveDashboard: FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatisticsCard label="Total Assets" value={1248} />
        <StatisticsCard label="Allocated Assets" value={872} />
        <StatisticsCard label="Active Bookings" value={34} />
        <StatisticsCard label="Maintenance Requests" value={12} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Asset Utilization</h3>
          <AnalyticsCards />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">System Health</h3>
          <div className="text-sm text-[#64748B]">All systems operational</div>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveDashboard
