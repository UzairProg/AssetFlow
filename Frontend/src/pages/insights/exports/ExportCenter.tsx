import type { FC } from 'react'
import ExportPanel from '../../../components/insights/ExportPanel/ExportPanel'

const ExportCenter: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">Export Center</h2>
      <ExportPanel />
    </div>
  )
}

export default ExportCenter
