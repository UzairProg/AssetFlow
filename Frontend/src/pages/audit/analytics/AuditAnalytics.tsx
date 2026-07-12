import type { FC } from 'react'
import AnalyticsCards from '../../../components/audit/AnalyticsCards/AnalyticsCards'
import ChartsPlaceholder from '../../../components/audit/Charts/ChartsPlaceholder'

const AuditAnalytics: FC = () => {
  return (
    <div className="space-y-6">
      <AnalyticsCards />
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Department Compliance</h3>
        <ChartsPlaceholder />
      </div>
    </div>
  )
}

export default AuditAnalytics
