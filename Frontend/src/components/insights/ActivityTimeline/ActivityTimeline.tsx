import type { FC } from 'react'

const ActivityTimeline: FC = () => {
  const events = [
    { id: 'E1', title: 'User login', user: 'admin', date: '2026-07-10 09:12' },
    { id: 'E2', title: 'Asset assigned', user: 'emma', date: '2026-07-09 14:03' },
  ]

  return (
    <div className="space-y-4">
      {events.map((e) => (
        <div key={e.id} className="flex items-start gap-3">
          <div className="mt-1 h-2 w-2 rounded-full bg-[#1E3A8A]" />
          <div>
            <div className="font-medium text-[#0F172A]">{e.title}</div>
            <div className="text-xs text-[#64748B]">{e.user} • {e.date}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityTimeline
