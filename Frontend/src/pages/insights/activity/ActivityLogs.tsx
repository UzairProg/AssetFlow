import type { FC } from 'react'
import ActivityTable from '../../../components/insights/ActivityTable/ActivityTable'

const ActivityLogs: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">Activity Logs</h2>
      <ActivityTable />
    </div>
  )
}

export default ActivityLogs
