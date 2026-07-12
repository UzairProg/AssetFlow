import type { FC } from 'react'
import AuditCard from '../AuditCard/AuditCard'

const AuditDetailsCard: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="col-span-2">
        <AuditCard id="A-1001" name="Quarterly Data Center Audit" dept="IT" progress={45} />
        <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <h4 className="mb-2 text-sm font-semibold text-[#0F172A]">Overview</h4>
          <p className="text-sm text-[#64748B]">This audit covers core infrastructure assets in the primary data center.</p>
        </div>
      </div>

      <div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <h4 className="mb-2 text-sm font-semibold text-[#0F172A]">Assigned Auditors</h4>
          <div className="space-y-2 text-sm text-[#64748B]">Emma Clarke<br/>Liam Johnson</div>
        </div>
      </div>
    </div>
  )
}

export default AuditDetailsCard
