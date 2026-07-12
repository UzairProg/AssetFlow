import type { FC } from 'react'
import VerificationTable from '../../../components/audit/VerificationTable/VerificationTable'

const AssetVerification: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">Asset Verification</h2>
      <VerificationTable />
    </div>
  )
}

export default AssetVerification
