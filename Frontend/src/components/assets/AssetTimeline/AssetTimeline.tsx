import type { FC } from 'react'

const events = [
  { id: 'e1', title: 'Asset Registered', date: '2024-05-01', user: 'System', dept: 'Procurement' },
  { id: 'e2', title: 'Allocated to John Doe', date: '2024-05-03', user: 'Admin', dept: 'Engineering' },
  { id: 'e3', title: 'Maintenance - Battery Replace', date: '2024-06-10', user: 'Tech', dept: 'Maintenance' },
]

const AssetTimeline: FC = () => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.id} className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-[#1E3A8A]" />
            <div>
              <div className="text-sm font-medium text-[#0F172A]">{e.title}</div>
              <div className="text-xs text-[#64748B]">{e.date} • {e.user} • {e.dept}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetTimeline
