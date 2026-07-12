import type { FC } from 'react'

const events = [
  { id: 'm1', title: 'Request Created', date: '2024-07-01', user: 'Alice' },
  { id: 'm2', title: 'Manager Approved', date: '2024-07-02', user: 'Manager' },
  { id: 'm3', title: 'Technician Assigned', date: '2024-07-03', user: 'Bob Tech' },
]

const MaintenanceTimeline: FC = () => {
  return (
    <div className="space-y-3">
      {events.map((e) => (
        <div key={e.id} className="flex items-start gap-3">
          <div className="mt-1 h-2 w-2 rounded-full bg-[#1E3A8A]" />
          <div>
            <div className="text-sm font-medium text-[#0F172A]">{e.title}</div>
            <div className="text-xs text-[#64748B]">{e.date} • {e.user}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MaintenanceTimeline
