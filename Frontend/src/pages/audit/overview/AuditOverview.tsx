import type { FC } from 'react'
import AuditStatisticsCard from '../../../components/audit/AuditStatistics/AuditStatisticsCard'
import AuditCycleTable from '../../../components/audit/AuditCycleTable/AuditCycleTable'
import ChartsPlaceholder from '../../../components/audit/Charts/ChartsPlaceholder'

const AuditOverview: FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <AuditStatisticsCard label="Active Audit Cycles" value={4} color="info" />
        <AuditStatisticsCard label="Completed Audits" value={128} color="success" />
        <AuditStatisticsCard label="Pending Verifications" value={12} color="warning" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Audit Progress</h3>
          <ChartsPlaceholder />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full rounded-2xl border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1E3A8A]">Create Audit Cycle</button>
            <button className="w-full rounded-2xl border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1E3A8A]">Assign Auditor</button>
            <button className="w-full rounded-2xl border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-[#1E3A8A]">View Reports</button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Active Audit Cycles</h3>
        <AuditCycleTable />
      </div>
    </div>
  )
}

export default AuditOverview
