import type { FC } from 'react'
import ReportBuilder from '../../../components/insights/ReportBuilder/ReportBuilder'
import ReportTable from '../../../components/insights/ReportTable/ReportTable'

const ReportsCenter: FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">Reports Center</h2>
        <ReportBuilder />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <ReportTable />
      </div>
    </div>
  )
}

export default ReportsCenter
