import type { FC } from 'react'
import AuditDetailsCard from '../../../components/audit/AuditDetails/AuditDetailsCard'
import AuditTimeline from '../../../components/audit/AuditTimeline/AuditTimeline'
import VerificationTable from '../../../components/audit/VerificationTable/VerificationTable'

const AuditDetails: FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <AuditDetailsCard />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Asset Verification</h3>
          <VerificationTable />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Timeline</h3>
          <AuditTimeline />
        </div>
      </div>
    </div>
  )
}

export default AuditDetails
