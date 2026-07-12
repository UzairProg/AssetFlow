import type { FC } from 'react'

const events = [
  { id: 'ev1', title: 'Transfer Requested • TR-1001', date: '2024-07-01', user: 'Mary Ops' },
  { id: 'ev2', title: 'Manager Approved', date: '2024-07-02', user: 'Manager' },
  { id: 'ev3', title: 'Asset Transferred', date: '2024-07-03', user: 'Logistics' },
]

const TransferTimeline: FC = () => {
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

export default TransferTimeline
