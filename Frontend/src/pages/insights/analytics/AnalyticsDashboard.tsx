import type { FC } from 'react'
import AnalyticsCards from '../../../components/insights/AnalyticsCards/AnalyticsCards'
import ChartPlaceholder from '../../../components/insights/Charts/ChartPlaceholder'

const AnalyticsDashboard: FC = () => {
  return (
    <div className="space-y-6">
      <AnalyticsCards />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Asset Utilization Trend</h3>
          <ChartPlaceholder />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Department Distribution</h3>
          <ChartPlaceholder />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
