import type { FC } from 'react'
import SettingsCard from '../../../components/administration/SettingsCard/SettingsCard'

const OrganizationSettings: FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#0F172A]">Organization Settings</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SettingsCard title="Organization Info">
          <div className="space-y-3">
            <input className="w-full rounded-2xl border border-[#E5E7EB] px-3 py-2" placeholder="Organization name" />
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded border border-[#E5E7EB] bg-white" />
              <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm text-[#1E3A8A]">Upload Logo</button>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Regional Settings">
          <div className="space-y-3">
            <select className="w-full rounded-2xl border border-[#E5E7EB] px-3 py-2">
              <option>Timezone</option>
            </select>
            <select className="w-full rounded-2xl border border-[#E5E7EB] px-3 py-2">
              <option>Currency</option>
            </select>
          </div>
        </SettingsCard>
      </div>
    </div>
  )
}

export default OrganizationSettings
