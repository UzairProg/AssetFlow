import type { FC } from 'react'

type Props = { compact?: boolean }

const AuditTimeline: FC<Props> = ({ compact = false }) => {
  const events = [
    { id: 't1', title: 'Audit Created', date: '2026-06-01' },
    { id: 't2', title: 'Auditor Assigned', date: '2026-06-05' },
    { id: 't3', title: 'Verification Started', date: '2026-06-10' },
  ]

  return (
    <div className={`space-y-4 ${compact ? 'text-sm' : ''}`}>
      {events.map((e) => (
        <div key={e.id} className="flex items-start gap-3">
          <div className="mt-1 h-2 w-2 rounded-full bg-[#1E3A8A]" />
          <div>
            <div className="font-medium text-[#0F172A]">{e.title}</div>
            <div className="text-xs text-[#64748B]">{e.date}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AuditTimeline
