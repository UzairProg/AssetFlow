import type { FC } from 'react'
import SecurityCard from '../../../components/administration/SecurityCard/SecurityCard'

const SecuritySettings: FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#0F172A]">Security Settings</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SecurityCard />
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold text-[#0F172A]">Session Policy</h3>
          <div className="text-sm text-[#64748B]">Session timeout: <strong>30 mins</strong></div>
        </div>
      </div>
    </div>
  )
}

export default SecuritySettings
