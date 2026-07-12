import type { FC } from 'react'
import AuditWizard from '../../../components/audit/AuditWizard/AuditWizard'

const CreateAuditCycle: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">Create Audit Cycle</h2>
      <AuditWizard />
    </div>
  )
}

export default CreateAuditCycle
