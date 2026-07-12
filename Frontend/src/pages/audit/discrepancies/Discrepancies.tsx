import type { FC } from 'react'
import DiscrepancyReport from '../../../components/audit/DiscrepancyReport/DiscrepancyReport'

const Discrepancies: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">Discrepancy Reports</h2>
      <DiscrepancyReport />
    </div>
  )
}

export default Discrepancies
