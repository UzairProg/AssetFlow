import type { FC } from 'react'
import AuditTimeline from '../../../components/audit/AuditTimeline/AuditTimeline'

const AuditHistory: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">Audit History</h2>
      <AuditTimeline compact />
    </div>
  )
}

export default AuditHistory
