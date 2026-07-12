import type { FC } from 'react'

const SecurityCard: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h4 className="mb-2 text-sm font-semibold text-[#0F172A]">Authentication</h4>
      <div className="text-sm text-[#64748B]">Two-Factor Authentication: <strong>Enabled</strong></div>
      <div className="mt-3">
        <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Manage 2FA</button>
      </div>
    </div>
  )
}

export default SecurityCard
