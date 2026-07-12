import type { FC } from 'react'

const steps = [
  { id: 's1', label: 'Requested', user: 'Alice', date: '2024-07-01' },
  { id: 's2', label: 'Manager Approved', user: 'Manager', date: '2024-07-02' },
  { id: 's3', label: 'Assigned', user: 'Supervisor', date: '2024-07-03' },
]

const ApprovalTimeline: FC = () => {
  return (
    <div className="space-y-3">
      {steps.map((s) => (
        <div key={s.id} className="flex items-start gap-3">
          <div className="mt-1 h-2 w-2 rounded-full bg-[#1E3A8A]" />
          <div>
            <div className="text-sm font-medium text-[#0F172A]">{s.label}</div>
            <div className="text-xs text-[#64748B]">{s.date} • {s.user}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ApprovalTimeline
